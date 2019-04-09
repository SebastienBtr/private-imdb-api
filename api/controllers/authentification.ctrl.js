const funct = require('../utils/commonFunctions.js');
const authSrv = require('../services/authentification.srv.js');

/**
 * Login a user:
 * Check the credentials
 * Generate an auth token
 * @see POST /auth/login
 */
module.exports.login = (req, res) => {
  if (funct.checkParams(res, req.body.email, req.body.password)) {
    const { email } = req.body;
    const { password } = req.body;

    authSrv.checkEmailPassword(email, password, (user) => {
      authSrv.generateJWT(user.id, (token) => {
        res.status(200).send(token);
      }, (error) => {
        funct.errorFunct('authSrv.generateJWT', error, res);
      });
    }, (error) => {
      funct.errorFunct('authSrv.checkEmailPassword', error, res);
    });
  }
};
