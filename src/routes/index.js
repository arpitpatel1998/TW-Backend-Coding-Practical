import { Router } from 'express';
import {getRidesList} from '../controller/ride.controller.js';
const router = new Router();

// TASK-005 - Get Rides
router.get('/list', getRidesList);
// TASK-006 - Add Create/Update Ride routes
export default router;
