import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Worker ID is required'],
    index: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Vital Signs
  bloodPressure: {
    systolic: {
      type: Number,
      min: [0, 'Systolic BP cannot be negative'],
      max: [300, 'Systolic BP seems too high']
    },
    diastolic: {
      type: Number,
      min: [0, 'Diastolic BP cannot be negative'],
      max: [200, 'Diastolic BP seems too high']
    }
  },
  temperature: {
    type: Number,
    min: [90, 'Temperature seems too low'],
    max: [110, 'Temperature seems too high']
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative'],
    max: [500, 'Weight seems too high']
  },
  height: {
    type: Number,
    min: [0, 'Height cannot be negative'],
    max: [300, 'Height seems too high']
  },
  // Medical Information
  diagnosis: {
    type: String,
    trim: true,
    maxlength: [500, 'Diagnosis cannot exceed 500 characters']
  },
  symptoms: [{
    type: String,
    trim: true
  }],
  medications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    dosage: {
      type: String,
      trim: true
    },
    frequency: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      trim: true
    }
  }],
  labResults: [{
    testName: String,
    result: String,
    unit: String,
    date: Date,
    normalRange: String
  }],
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  // Health Status
  status: {
    type: String,
    enum: ['fit', 'monitoring', 'unfit', 'critical'],
    default: 'fit',
    required: true
  },
  // Next Checkup
  nextCheckupDate: {
    type: Date
  },
  checkupReason: {
    type: String,
    trim: true
  },
  // Added By (Officer/Doctor)
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Attachments
  attachments: [{
    filename: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Audit Fields
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
healthRecordSchema.index({ workerId: 1, date: -1 });
healthRecordSchema.index({ status: 1 });
healthRecordSchema.index({ addedBy: 1 });
healthRecordSchema.index({ nextCheckupDate: 1 });

// Virtual for BMI calculation
healthRecordSchema.virtual('bmi').get(function() {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    return (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  return null;
});

// Virtual for blood pressure category
healthRecordSchema.virtual('bpCategory').get(function() {
  if (this.bloodPressure?.systolic && this.bloodPressure?.diastolic) {
    const { systolic, diastolic } = this.bloodPressure;
    
    if (systolic < 120 && diastolic < 80) return 'Normal';
    if (systolic < 130 && diastolic < 80) return 'Elevated';
    if (systolic < 140 || diastolic < 90) return 'High (Stage 1)';
    if (systolic >= 140 || diastolic >= 90) return 'High (Stage 2)';
    if (systolic >= 180 || diastolic >= 120) return 'Critical';
  }
  return null;
});

// Ensure virtuals are included in JSON
healthRecordSchema.set('toJSON', { virtuals: true });
healthRecordSchema.set('toObject', { virtuals: true });

// Static method to get latest record for a worker
healthRecordSchema.statics.getLatestRecord = function(workerId) {
  return this.findOne({ workerId, isDeleted: false })
    .sort({ date: -1 })
    .populate('addedBy', 'name role')
    .exec();
};

// Static method to get worker's health history
healthRecordSchema.statics.getWorkerHistory = function(workerId, limit = 10) {
  return this.find({ workerId, isDeleted: false })
    .sort({ date: -1 })
    .limit(limit)
    .populate('addedBy', 'name role')
    .exec();
};

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

export default HealthRecord;

