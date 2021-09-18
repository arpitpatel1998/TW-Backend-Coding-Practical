import {Ride} from '../models/index.js';

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
    if ( limit != 0 ) {
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
    return  list;
}