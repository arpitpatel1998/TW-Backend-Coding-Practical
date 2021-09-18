import mongoose from 'mongoose';
import { Ride } from '../models/index.js';

/**
 * Function is used to get the ride list from db
 * @param {Number} limit limit for ride list
 * @param {Number} page page for ride pagination
 * @return {Array} Ride List Array
 */
export const rideList = async (limit, page) => {
  const skip = limit == 0 ? limit : page == 1 ? 0 : page * limit;
  const skipLimitCond = [{
    '$skip': Number(skip)
  }]
  if (limit != 0) {
    skipLimitCond.push({
      '$limit': Number(limit)
    });
  }
  const list = await Ride.aggregate([
    {
      '$facet': {
        'rideList': [...skipLimitCond],
        'totalRides': [
          {
            '$count': 'count'
          }
        ]
      }
    }
  ]);
  return list;
};

/**
 * Function is used to save the ride in db
 * @param {JSON} rideData json data
 * @return {JSON} Ride Details
 */
export const saveRide = async (rideData) => {
  const newRide = new Ride(rideData);
  return await newRide.save();
};

/**
 * Function is used to get data of ride from db
 * @param {String} rideId Ride Id
 * @return {JSON} Ride Details
 */
export const rideDetails = async (rideId) => {
  const details = await Ride.findOne({ _id: mongoose.Types.ObjectId(rideId) });
  return details;
}

/**
 * Function is used to update the ride in db
 * @param {String} rideId Ride Id
 * @param {JSON} rideData json data
 * @return {JSON} Ride Details
 */
export const updateRide = async (rideId, { start, end, driver, customers }) => {
  try {
    const data = await Ride.findByIdAndUpdate(
      rideId,
      {
        $set: {
          ...(start && {
            start,
          }),
          ...(end && {
            end,
          }),
          ...(driver && {
            driver,
          }),
        },
        $push: {
          ...(customers && {
            customers,
          })
        }
      },
      {
        new: true,
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
}