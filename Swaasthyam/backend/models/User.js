import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  // OTP fields for authentication
  otp: {
    type: String,
    select: false // Don't return OTP by default
  },
  otpExpiry: {
    type: Date,
    select: false // Don't return OTP expiry by default
  },
  role: {
    type: String,
    enum: ['worker', 'officer', 'supervisor', 'official'],
    default: 'worker',
    required: true
  },
  qrId: {
    type: String,
    unique: true,
    sparse: true // Allow null values, but enforce uniqueness when present
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    relationship: {
      type: String,
      trim: true
    }
  },
  language: {
    type: String,
    enum: ['en', 'hi', 'ml', 'ta', 'te', 'kn', 'bn', 'gu', 'mr', 'pa'],
    default: 'en'
  },
  location: {
    state: {
      type: String,
      trim: true
    },
    district: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  occupation: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    select: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for better query performance
userSchema.index({ phone: 1 });
userSchema.index({ qrId: 1 });
userSchema.index({ role: 1 });


// Generate unique QR ID for workers
userSchema.pre('save', async function(next) {
  if (this.role === 'worker' && !this.qrId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const state = this.location?.state?.substring(0, 2).toUpperCase() || 'IN';
    this.qrId = `SW-${state}-${timestamp}-${random}`;
  }
  next();
});

// Method to verify OTP
userSchema.methods.verifyOTP = function(candidateOTP) {
  // Check if OTP matches and is not expired
  if (!this.otp || !this.otpExpiry) {
    return false;
  }
  
  const isOTPMatch = this.otp === candidateOTP;
  const isNotExpired = new Date() < this.otpExpiry;
  
  return isOTPMatch && isNotExpired;
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.otp;
  delete userObject.otpExpiry;
  delete userObject.refreshToken;
  delete userObject.__v;
  return userObject;
};

// Static method to find by phone
userSchema.statics.findByPhone = function(phone) {
  return this.findOne({ phone }).select('+otp +otpExpiry');
};

const User = mongoose.model('User', userSchema);

export default User;

