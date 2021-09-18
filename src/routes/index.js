import { Router } from 'express';
import {getRidesList, getRideDetails, createRide, updateRideData} from '../controller/ride.controller.js';
const router = new Router();


router.get('/list', getRidesList);
router.get('/:rideId', getRideDetails);
router.post('/', createRide);
router.put('/:rideId', updateRideData);
export default router;
