import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { sendTokenResponse, generateTokens } from '../utils/tokenUtils.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const {
    name,
    phone,
    password,
    role,
    emergencyContact,
    language,
    location,
    dateOfBirth,
    gender,
    bloodGroup,
    occupation
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return next(new AppError('User with this phone number already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    phone,
    password,
    role: role || 'worker',
    emergencyContact,
    language,
    location,
    dateOfBirth,
    gender,
    bloodGroup,
    occupation
  });

  // Send token response
  sendTokenResponse(user, 201, res, 'User registered successfully');
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  // Validate input
  if (!phone || !password) {
    return next(new AppError('Please provide phone number and password', 400));
  }

  // Check for user (include password)
  const user = await User.findByPhone(phone);

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 401));
  }

  // Send token response
  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user.getPublicProfile()
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    emergencyContact: req.body.emergencyContact,
    language: req.body.language,
    location: req.body.location,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    bloodGroup: req.body.bloodGroup,
    occupation: req.body.occupation
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(
    key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
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
    data: user.getPublicProfile()
  });
});

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password', 400));
  }

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res, 'Password updated successfully');
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {}
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Get user
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Generate new tokens
    const tokens = generateTokens(user._id);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    return next(new AppError('Invalid or expired refresh token', 401));
  }
});

