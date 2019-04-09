const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const usersSrv = require('./users.srv.js');

/**
 * Check user credentials:
 * Check if there is a user with the given email
 * Compare the user password with the given password
 * @param email the email credential
 * @param password the password credential
 * @callback success return the user
 * @callback error executed if the credentials are not correct
 */
module.exports.checkEmailPassword = (email, password, success, error) => {
  usersSrv.findByEmail(email, (user) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        success(user);
      } else {
        error({ message: 'ERRORS.BAD_CREDENTIALS', error: err, status: 401 });
      }
    });
  }, (err) => {
    if (err.status === 204) {
      error({ message: 'ERRORS.BAD_CREDENTIALS', error: err, status: 401 });
    } else {
      error(err);
    }
  });
};

/**
 * Generate a json web token
 * The subject field of the token is the user id,
 * it make it easy to find the current user of a request
 * @param userId the id of the user
 * @callback success return the auth token
 */
module.exports.generateJWT = (userId, success) => {
  const RSA_PRIVATE_KEY = fs.readFileSync(process.env.RSA_PRIVATE_KEY_PATH);

  const id = userId.toString();

  const token = jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: process.env.TOKEN_VALIDITY,
    subject: id,
  });

  const tokenObj = {
    idToken: token,
    expiresIn: process.env.TOKEN_VALIDITY,
  };

  success(tokenObj);
};
