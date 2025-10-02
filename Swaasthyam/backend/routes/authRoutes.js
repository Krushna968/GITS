import express from 'express';
import {
  sendOTP,
  verifyOTP,
  register,
  getMe,
  updateProfile,
  logout,
  refreshToken
} from '../controllers/authOTPController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes - OTP Authentication
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register', register);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

export default router;

