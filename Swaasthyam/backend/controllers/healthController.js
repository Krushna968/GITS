import HealthRecord from '../models/HealthRecord.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Create new health record
// @route   POST /api/health/records
// @access  Private (Officer, Supervisor, Official)
export const createHealthRecord = asyncHandler(async (req, res, next) => {
  const {
    workerId,
    bloodPressure,
    temperature,
    weight,
    height,
    diagnosis,
    symptoms,
    medications,
    labResults,
    notes,
    status,
    nextCheckupDate,
    checkupReason
  } = req.body;

  // Verify worker exists
  const worker = await User.findById(workerId);
  if (!worker) {
    return next(new AppError('Worker not found', 404));
  }

  if (worker.role !== 'worker') {
    return next(new AppError('Health records can only be created for workers', 400));
  }

  // Create health record
  const healthRecord = await HealthRecord.create({
    workerId,
    bloodPressure,
    temperature,
    weight,
    height,
    diagnosis,
    symptoms,
    medications,
    labResults,
    notes,
    status: status || 'fit',
    nextCheckupDate,
    checkupReason,
    addedBy: req.user.id
  });

  // Populate addedBy field
  await healthRecord.populate('addedBy', 'name role');

  res.status(201).json({
    success: true,
    message: 'Health record created successfully',
    data: healthRecord
  });
});

// @desc    Get my health records (for logged-in worker)
// @route   GET /api/health/records/my
// @access  Private (Worker)
export const getMyHealthRecords = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const records = await HealthRecord.find({ 
    workerId: req.user.id,
    isDeleted: false
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .populate('addedBy', 'name role');

  const total = await HealthRecord.countDocuments({ 
    workerId: req.user.id,
    isDeleted: false
  });

  res.status(200).json({
    success: true,
    count: records.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: records
  });
});

// @desc    Get health records for specific worker
// @route   GET /api/health/records/worker/:workerId
// @access  Private (Officer, Supervisor, Official)
export const getWorkerHealthRecords = asyncHandler(async (req, res, next) => {
  const { workerId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Verify worker exists
  const worker = await User.findById(workerId);
  if (!worker) {
    return next(new AppError('Worker not found', 404));
  }

  const records = await HealthRecord.find({ 
    workerId,
    isDeleted: false
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .populate('addedBy', 'name role');

  const total = await HealthRecord.countDocuments({ 
    workerId,
    isDeleted: false
  });

  res.status(200).json({
    success: true,
    count: records.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    worker: {
      id: worker._id,
      name: worker.name,
      phone: worker.phone,
      qrId: worker.qrId
    },
    data: records
  });
});

// @desc    Get latest health status for logged-in worker
// @route   GET /api/health/status/latest
// @access  Private (Worker)
export const getMyLatestStatus = asyncHandler(async (req, res, next) => {
  const latestRecord = await HealthRecord.getLatestRecord(req.user.id);

  if (!latestRecord) {
    return res.status(200).json({
      success: true,
      message: 'No health records found',
      data: null
    });
  }

  res.status(200).json({
    success: true,
    data: latestRecord
  });
});

// @desc    Get latest health status for specific worker
// @route   GET /api/health/status/:workerId
// @access  Private (Officer, Supervisor, Official)
export const getWorkerLatestStatus = asyncHandler(async (req, res, next) => {
  const { workerId } = req.params;

  // Verify worker exists
  const worker = await User.findById(workerId);
  if (!worker) {
    return next(new AppError('Worker not found', 404));
  }

  const latestRecord = await HealthRecord.getLatestRecord(workerId);

  res.status(200).json({
    success: true,
    worker: {
      id: worker._id,
      name: worker.name,
      phone: worker.phone,
      qrId: worker.qrId
    },
    data: latestRecord
  });
});

// @desc    Get all workers (for officers to view)
// @route   GET /api/health/workers
// @access  Private (Officer, Supervisor, Official)
export const getAllWorkers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const status = req.query.status;

  // Build query
  let query = { role: 'worker' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { qrId: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) {
    query.isActive = status === 'active';
  }

  const workers = await User.find(query)
    .select('-password -refreshToken')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Get latest health status for each worker
  const workersWithStatus = await Promise.all(
    workers.map(async (worker) => {
      const latestRecord = await HealthRecord.getLatestRecord(worker._id);
      return {
        ...worker.toObject(),
        latestHealthStatus: latestRecord ? {
          status: latestRecord.status,
          date: latestRecord.date,
          nextCheckupDate: latestRecord.nextCheckupDate
        } : null
      };
    })
  );

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: workers.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: workersWithStatus
  });
});

// @desc    Update health record
// @route   PUT /api/health/records/:id
// @access  Private (Officer, Supervisor, Official)
export const updateHealthRecord = asyncHandler(async (req, res, next) => {
  let healthRecord = await HealthRecord.findById(req.params.id);

  if (!healthRecord) {
    return next(new AppError('Health record not found', 404));
  }

  // Update fields
  healthRecord = await HealthRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('addedBy', 'name role');

  res.status(200).json({
    success: true,
    message: 'Health record updated successfully',
    data: healthRecord
  });
});

// @desc    Delete health record (soft delete)
// @route   DELETE /api/health/records/:id
// @access  Private (Officer, Supervisor, Official)
export const deleteHealthRecord = asyncHandler(async (req, res, next) => {
  const healthRecord = await HealthRecord.findById(req.params.id);

  if (!healthRecord) {
    return next(new AppError('Health record not found', 404));
  }

  // Soft delete
  healthRecord.isDeleted = true;
  await healthRecord.save();

  res.status(200).json({
    success: true,
    message: 'Health record deleted successfully',
    data: {}
  });
});

// @desc    Get health statistics
// @route   GET /api/health/statistics
// @access  Private (Officer, Supervisor, Official)
export const getHealthStatistics = asyncHandler(async (req, res, next) => {
  const totalWorkers = await User.countDocuments({ role: 'worker' });
  
  // Get status counts from latest records
  const statusCounts = await HealthRecord.aggregate([
    {
      $match: { isDeleted: false }
    },
    {
      $sort: { workerId: 1, date: -1 }
    },
    {
      $group: {
        _id: '$workerId',
        latestStatus: { $first: '$status' }
      }
    },
    {
      $group: {
        _id: '$latestStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const statistics = {
    totalWorkers,
    statusBreakdown: statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
    fit: statusCounts.find(s => s._id === 'fit')?.count || 0,
    monitoring: statusCounts.find(s => s._id === 'monitoring')?.count || 0,
    unfit: statusCounts.find(s => s._id === 'unfit')?.count || 0,
    critical: statusCounts.find(s => s._id === 'critical')?.count || 0
  };

  res.status(200).json({
    success: true,
    data: statistics
  });
});

