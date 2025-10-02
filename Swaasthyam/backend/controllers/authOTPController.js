import User from '../models/User.js';
import { sendTokenResponse } from '../utils/tokenUtils.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateOTP, getOTPExpiry, sendOTPviaSMS } from '../utils/otpService.js';

/**
 * @desc    Send OTP to phone number
 * @route   POST /api/auth/send-otp
 * @access  Public
 */
export const sendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return next(new AppError('Please provide a valid 10-digit phone number', 400));
    }

    // Check if user exists
    let user = await User.findOne({ phone });
    
    if (!user) {
      return next(new AppError('User not found. Please register first.', 404));
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via SMS (currently mocked)
    await sendOTPviaSMS(phone, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your mobile number',
      data: {
        phone,
        expiresIn: '5 minutes'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify OTP and login user
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    // Validate input
    if (!phone || !otp) {
      return next(new AppError('Please provide phone number and OTP', 400));
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return next(new AppError('Please provide a valid 10-digit phone number', 400));
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      return next(new AppError('Please provide a valid 6-digit OTP', 400));
    }

    // Find user with OTP
    const user = await User.findByPhone(phone);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Verify OTP
    const isOTPValid = user.verifyOTP(otp);

    if (!isOTPValid) {
      return next(new AppError('Invalid or expired OTP', 401));
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true; // Mark user as verified
    await user.save();

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Register new user (without password)
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, phone, role, location, dateOfBirth, gender, bloodGroup, occupation, emergencyContact } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return next(new AppError('Please provide name and phone number', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return next(new AppError('User with this phone number already exists', 400));
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      role: role || 'worker',
      location,
      dateOfBirth,
      gender,
      bloodGroup,
      occupation,
      emergencyContact
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify with OTP to login.',
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      location: req.body.location,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      occupation: req.body.occupation,
      emergencyContact: req.body.emergencyContact,
      language: req.body.language
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res, next) => {
  try {
    // Clear refresh token
    await User.findByIdAndUpdate(req.user.id, { refreshToken: undefined });

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError('Please provide refresh token', 401));
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user and check if refresh token matches
    const user = await User.findById(decoded.id).select('+refreshToken');

    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError('Invalid refresh token', 401));
    }

    // Send new tokens
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return next(new AppError('Invalid refresh token', 401));
  }
};

export default {
  sendOTP,
  verifyOTP,
  register,
  getMe,
  updateProfile,
  logout,
  refreshToken
};

