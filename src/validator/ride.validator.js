import Joi from 'joi';

/**
 * Function for validating request for ride list
 * @param {*} data Ride Data
 * @return {JSON} error and message
 */
export const requestRideList = async (data) => {
  const Schema = Joi.object({
    limit: Joi.number().required().min(0),
    page: Joi.number().required().min(1),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = '';
  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }
  return { error, message };
};

/**
 * Function for validating request for ride Data
 * @param {*} data Ride Data
 * @return {JSON} error and message
 */
export const createRideRequest = async (data) => {
  const Schema = Joi.object({
    start: Joi.object().keys({
      lat: Joi.number().required(),
      long: Joi.number().required()
    }).required(),
    end: Joi.object().keys({
      lat: Joi.number().required(),
      long: Joi.number().required()
    }).required(),
    driver: Joi.object().keys({
      name: Joi.string().required(),
      vehicleNumber: Joi.string().required(),
      vehicleType: Joi.string().required(),
    }).required(),
    driver: Joi.object().keys({
      name: Joi.string().required(),
      vehicleNumber: Joi.string().required(),
      vehicleType: Joi.string().required(),
    }).required(),
    customers: Joi.array().items(Joi.object({
      name: Joi.string().required(),
    })).required(),
  });
  const validate = Schema.validate(data);
  let error = false;
  let message = '';
  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }
  return { error, message };
}

/**
 * Function for validating request for ride Id
 * @param {*} data Ride Data
 * @return {JSON} error and message
 */
export const getRideDetailsRequest = async (data) => {
  const Schema = Joi.object({
    rideId: Joi.string().required().length(24),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = '';
  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }
  return { error, message };
}