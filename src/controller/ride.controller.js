import {rideList} from '../services/ride.service.js'
import {requestRideList} from '../validator/ride.validator.js';
import responseHelper from '../helpers/response.helper.js';
import messages from '../helpers/messages.js';

/**
 * Function is used to get the Ride List
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @return {JSON} response json with ride list
 */
export const getRidesList = async (req, res, next) => {
    try{
        const validation = await requestRideList(req.query);
        if ( validation.error ) {
            return responseHelper(res, false, [], validation.message, 400);   ;
        } 
        const {limit, page} = req.query;
        const list = await rideList(limit, page);
        return responseHelper(res, true, list, messages.RIDE_LIST, 200);        
    } catch ( err ) {
        console.log(err);
        return responseHelper(res, false, err, messages.SOMETHING_WENT_WRONG, 500)
    }

};