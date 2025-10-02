import express from 'express';
import {
  createAlert,
  getMyAlerts,
  getWorkerAlerts,
  markAlertAsRead,
  markAllAlertsAsRead,
  deleteAlert,
  getAlertStatistics
} from '../controllers/alertController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Worker routes
router.get('/my', getMyAlerts);
router.patch('/:id/read', markAlertAsRead);
router.patch('/mark-all-read', markAllAlertsAsRead);
router.delete('/:id', deleteAlert);

// Officer/Supervisor/Official routes
router.post('/', authorize('officer', 'supervisor', 'official'), createAlert);
router.get('/worker/:workerId', authorize('officer', 'supervisor', 'official'), getWorkerAlerts);
router.get('/statistics', authorize('officer', 'supervisor', 'official'), getAlertStatistics);

export default router;

