import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token middleware
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password -refreshToken');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Token is invalid.'
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated. Please contact support.'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Token is invalid or expired.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error in authentication',
      error: error.message
    });
  }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login first.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

// Check if user is the owner of the resource or has elevated permissions
export const checkResourceOwnership = (userIdField = 'workerId') => {
  return async (req, res, next) => {
    try {
      const resourceUserId = req.params[userIdField] || req.body[userIdField];

      // Officers, supervisors, and officials can access any resource
      if (['officer', 'supervisor', 'official'].includes(req.user.role)) {
        return next();
      }

      // Workers can only access their own resources
      if (req.user.role === 'worker') {
        if (resourceUserId && resourceUserId !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'You do not have permission to access this resource'
          });
        }
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking resource ownership',
        error: error.message
      });
    }
  };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password -refreshToken');
      } catch (error) {
        // Token is invalid but we continue anyway
        req.user = null;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

