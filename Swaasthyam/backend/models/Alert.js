import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Worker ID is required'],
    index: true
  },
  type: {
    type: String,
    enum: ['checkup', 'medication', 'emergency', 'info', 'followup', 'vaccination'],
    required: [true, 'Alert type is required'],
    default: 'info'
  },
  message: {
    type: String,
    required: [true, 'Alert message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
    default: 'medium'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  // For scheduled alerts
  scheduledFor: {
    type: Date
  },
  // Created by (Officer/System)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Related data
  relatedRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthRecord'
  },
  // Action required
  actionRequired: {
    type: Boolean,
    default: false
  },
  actionType: {
    type: String,
    enum: ['visit_clinic', 'take_medication', 'emergency_call', 'update_info', 'none'],
    default: 'none'
  },
  actionDeadline: {
    type: Date
  },
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
alertSchema.index({ workerId: 1, createdAt: -1 });
alertSchema.index({ isRead: 1 });
alertSchema.index({ severity: 1 });
alertSchema.index({ type: 1 });
alertSchema.index({ scheduledFor: 1 });
alertSchema.index({ expiresAt: 1 });

// TTL Index - Auto delete expired alerts after 90 days
alertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save middleware to set expiry date
alertSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    // Default expiry: 90 days from creation
    this.expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  }
  next();
});

// Method to mark alert as read
alertSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to get unread count for a worker
alertSchema.statics.getUnreadCount = function(workerId) {
  return this.countDocuments({ 
    workerId, 
    isRead: false, 
    isActive: true,
    $or: [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: null }
    ]
  });
};

// Static method to get alerts by severity
alertSchema.statics.getBySeverity = function(workerId, severity) {
  return this.find({ 
    workerId, 
    severity, 
    isActive: true,
    $or: [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: null }
    ]
  })
  .sort({ createdAt: -1 })
  .populate('createdBy', 'name role')
  .exec();
};

// Static method to get active alerts for worker
alertSchema.statics.getActiveAlerts = function(workerId) {
  return this.find({
    workerId,
    isActive: true,
    $or: [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: null }
    ]
  })
  .sort({ severity: -1, createdAt: -1 })
  .populate('createdBy', 'name role')
  .populate('relatedRecord')
  .exec();
};

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;

