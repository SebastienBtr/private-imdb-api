const winston = require('winston');

/**
 * Check if all given params are not null
 */
module.exports.checkParams = (res, ...params) => {
  for (let i = 0; i < params.length; i += 1) {
    if (params[i] == null) {
      winston.error('Error : some parameters are not given');
      res.status(412).send('ERRORS.MISSING_FIELDS');
      return false;
    }
  }
  return true;
};

/**
 * Log and return an error message to the client
 */
module.exports.errorFunct = (serviceName, error, res) => {
  if (error.status === 500) {
    winston.error(`Error when request ${serviceName}`);
    winston.error(error);
  }

  res.statusCode = error.status;

  if (error.message != null) {
    res.send(error.message);
  } else {
    res.send('ERRORS.UNKNOWN');
  }
};
