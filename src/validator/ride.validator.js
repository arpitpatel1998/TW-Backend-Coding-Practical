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
