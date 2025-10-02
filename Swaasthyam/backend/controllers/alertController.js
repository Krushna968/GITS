import Alert from '../models/Alert.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Create new alert
// @route   POST /api/alerts
// @access  Private (Officer, Supervisor, Official)
export const createAlert = asyncHandler(async (req, res, next) => {
  const {
    workerId,
    type,
    message,
    title,
    severity,
    actionRequired,
    actionType,
    actionDeadline,
    scheduledFor,
    relatedRecord
  } = req.body;

  // Verify worker exists
  const worker = await User.findById(workerId);
  if (!worker) {
    return next(new AppError('Worker not found', 404));
  }

  if (worker.role !== 'worker') {
    return next(new AppError('Alerts can only be created for workers', 400));
  }

  // Create alert
  const alert = await Alert.create({
    workerId,
    type: type || 'info',
    message,
    title,
    severity: severity || 'medium',
    actionRequired: actionRequired || false,
    actionType: actionType || 'none',
    actionDeadline,
    scheduledFor,
    relatedRecord,
    createdBy: req.user.id
  });

  // Populate createdBy field
  await alert.populate('createdBy', 'name role');

  res.status(201).json({
    success: true,
    message: 'Alert created successfully',
    data: alert
  });
});

// @desc    Get my alerts (for logged-in worker)
// @route   GET /api/alerts/my
// @access  Private (Worker)
export const getMyAlerts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const onlyUnread = req.query.unread === 'true';

  let query = {
    workerId: req.user.id,
    isActive: true,
    $or: [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: null }
    ]
  };

  if (onlyUnread) {
    query.isRead = false;
  }

  const alerts = await Alert.find(query)
    .sort({ severity: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name role')
    .populate('relatedRecord');

  const total = await Alert.countDocuments(query);
  const unreadCount = await Alert.getUnreadCount(req.user.id);

  res.status(200).json({
    success: true,
    count: alerts.length,
    total,
    unreadCount,
    page,
    pages: Math.ceil(total / limit),
    data: alerts
  });
});

// @desc    Get alerts for specific worker
// @route   GET /api/alerts/worker/:workerId
// @access  Private (Officer, Supervisor, Official)
export const getWorkerAlerts = asyncHandler(async (req, res, next) => {
  const { workerId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Verify worker exists
  const worker = await User.findById(workerId);
  if (!worker) {
    return next(new AppError('Worker not found', 404));
  }

  const query = {
    workerId,
    isActive: true,
    $or: [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: null }
    ]
  };

  const alerts = await Alert.find(query)
    .sort({ severity: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name role')
    .populate('relatedRecord');

  const total = await Alert.countDocuments(query);
  const unreadCount = await Alert.getUnreadCount(workerId);

  res.status(200).json({
    success: true,
    count: alerts.length,
    total,
    unreadCount,
    page,
    pages: Math.ceil(total / limit),
    worker: {
      id: worker._id,
      name: worker.name,
      phone: worker.phone,
      qrId: worker.qrId
    },
    data: alerts
  });
});

// @desc    Mark alert as read
// @route   PATCH /api/alerts/:id/read
// @access  Private (Worker)
export const markAlertAsRead = asyncHandler(async (req, res, next) => {
  const alert = await Alert.findById(req.params.id);

  if (!alert) {
    return next(new AppError('Alert not found', 404));
  }

  // Workers can only mark their own alerts as read
  if (req.user.role === 'worker' && alert.workerId.toString() !== req.user.id) {
    return next(new AppError('Not authorized to mark this alert as read', 403));
  }

  await alert.markAsRead();

  res.status(200).json({
    success: true,
    message: 'Alert marked as read',
    data: alert
  });
});

// @desc    Mark all alerts as read
// @route   PATCH /api/alerts/mark-all-read
// @access  Private (Worker)
export const markAllAlertsAsRead = asyncHandler(async (req, res, next) => {
  await Alert.updateMany(
    {
      workerId: req.user.id,
      isRead: false,
      isActive: true
    },
    {
      isRead: true,
      readAt: new Date()
    }
  );

  res.status(200).json({
    success: true,
    message: 'All alerts marked as read',
    data: {}
  });
});

// @desc    Delete/deactivate alert
// @route   DELETE /api/alerts/:id
// @access  Private (Officer, Supervisor, Official, or Worker for their own)
export const deleteAlert = asyncHandler(async (req, res, next) => {
  const alert = await Alert.findById(req.params.id);

  if (!alert) {
    return next(new AppError('Alert not found', 404));
  }

  // Workers can only delete their own alerts
  if (req.user.role === 'worker' && alert.workerId.toString() !== req.user.id) {
    return next(new AppError('Not authorized to delete this alert', 403));
  }

  alert.isActive = false;
  await alert.save();

  res.status(200).json({
    success: true,
    message: 'Alert deleted successfully',
    data: {}
  });
});

// @desc    Get alert statistics
// @route   GET /api/alerts/statistics
// @access  Private (Officer, Supervisor, Official)
export const getAlertStatistics = asyncHandler(async (req, res, next) => {
  const totalAlerts = await Alert.countDocuments({ isActive: true });
  const unreadAlerts = await Alert.countDocuments({ isActive: true, isRead: false });
  
  const severityCounts = await Alert.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: '$severity',
        count: { $sum: 1 }
      }
    }
  ]);

  const typeCounts = await Alert.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);

  const statistics = {
    totalAlerts,
    unreadAlerts,
    severityBreakdown: severityCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
    typeBreakdown: typeCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {})
  };

  res.status(200).json({
    success: true,
    data: statistics
  });
});

