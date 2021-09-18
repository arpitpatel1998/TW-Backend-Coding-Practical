import {rideList,
  saveRide, rideDetails, updateRide} from '../services/ride.service.js';
import {requestRideList,
  createRideRequest,
  getRideDetailsRequest} from '../validator/ride.validator.js';
import responseHelper from '../helpers/response.helper.js';
import messages from '../helpers/messages.js';

/**
 * Function is used to get the Ride List
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @return {JSON} response json with ride list
 */
export const getRidesList = async (req, res) => {
  try {
    const validation = await requestRideList(req.query);
    if (validation.error) {
      return responseHelper(res, false, [], validation.message, 400); ;
    }
    const {limit, page} = req.query;
    const list = await rideList(limit, page);
    return responseHelper(res, true, list, messages.RIDE_LIST, 200);
  } catch (err) {
    console.log(err);
    return responseHelper(res, false, err, messages.SOMETHING_WENT_WRONG, 500);
  }
};

/**
 * Function is used to create Ride
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @return {JSON} response json with ride
 */
export const createRide = async (req, res) => {
  try {
    const validation = await createRideRequest(req.body);
    if (validation.error) {
      return responseHelper(res, false, [], validation.message, 400); ;
    }
    const addNewRide = await saveRide(req.body);
    return responseHelper(res, true, addNewRide, messages.RIDE_ADDED, 200);
  } catch (err) {
    console.log(err);
    return responseHelper(res, false, err, messages.SOMETHING_WENT_WRONG, 500);
  }
};

/**
 * Function is used to get the Ride Details
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @return {JSON} response json with ride Details
 */
export const getRideDetails = async (req, res) => {
  try {
    const validation = await getRideDetailsRequest(req.params);
    if (validation.error) {
      return responseHelper(res, false, [], validation.message, 400); ;
    }
    const ride = await rideDetails(req.params.rideId);
    if (ride) {
      return responseHelper(res, true, ride, messages.RIDE_DETAILS, 200);
    } else {
      return responseHelper(res, false, ride, messages.RIDE_NOT_FOUND, 400);
    }
  } catch (err) {
    console.log(err);
    return responseHelper(res, false, err, messages.SOMETHING_WENT_WRONG, 500);
  }
};

/**
 * Function is used to get the Ride Update
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @return {JSON} response json with ride Data
 */
export const updateRideData = async (req, res) => {
  try {
    const validation = await getRideDetailsRequest(req.params);
    if (validation.error) {
      return responseHelper(res, false, [], validation.message, 400); ;
    }
    const rideDataValidation = await createRideRequest(req.body);
    if (rideDataValidation.error) {
      return responseHelper(res, false, [], rideDataValidation.message, 400); ;
    }
    const {rideId} = req.params;
    const ride = await updateRide(rideId, req.body);
    if (ride) {
      return responseHelper(res, true, ride, messages.RIDE_UPDATED, 200);
    } else {
      return responseHelper(res, false, ride, messages.RIDE_NOT_FOUND, 400);
    }
  } catch (err) {
    console.log(err);
    return responseHelper(res, false, err, messages.SOMETHING_WENT_WRONG, 500);
  }
};
