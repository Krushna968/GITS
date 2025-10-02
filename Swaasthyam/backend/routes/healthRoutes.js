import express from 'express';
import {
  createHealthRecord,
  getMyHealthRecords,
  getWorkerHealthRecords,
  getMyLatestStatus,
  getWorkerLatestStatus,
  getAllWorkers,
  updateHealthRecord,
  deleteHealthRecord,
  getHealthStatistics
} from '../controllers/healthController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Worker routes - accessible by workers for their own data
router.get('/records/my', getMyHealthRecords);
router.get('/status/latest', getMyLatestStatus);

// Officer/Supervisor/Official routes
router.post('/records', authorize('officer', 'supervisor', 'official'), createHealthRecord);
router.get('/records/worker/:workerId', authorize('officer', 'supervisor', 'official'), getWorkerHealthRecords);
router.get('/status/:workerId', authorize('officer', 'supervisor', 'official'), getWorkerLatestStatus);
router.get('/workers', authorize('officer', 'supervisor', 'official'), getAllWorkers);
router.put('/records/:id', authorize('officer', 'supervisor', 'official'), updateHealthRecord);
router.delete('/records/:id', authorize('officer', 'supervisor', 'official'), deleteHealthRecord);
router.get('/statistics', authorize('officer', 'supervisor', 'official'), getHealthStatistics);

export default router;

