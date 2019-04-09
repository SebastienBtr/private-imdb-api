const funct = require('../utils/commonFunctions.js');
const usersSrv = require('../services/users.srv.js');

/**
 * Create a user
 * @see PUT /users/create-user
 */
module.exports.createUser = (req, res) => {
  const { user } = req.body;

  if (funct.checkParams(res, user, user.email, user.password)) {
    usersSrv.create(user, (rows) => {
      res.status(200).send(rows);
    }, (error) => {
      funct.errorFunct('usersSrv.create', error, res);
    });
  }
};

/**
 * Update the current user
 * @see PUT /users/update-user
 */
module.exports.updateUser = (req, res) => {
  const { user } = req.body;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, user)) {
    usersSrv.update(user, userId, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('usersSrv.update', error, res);
    });
  }
};

/**
 * Update the password of the current user
 * @see PUT /users/update-password
 */
module.exports.updateUserPassword = (req, res) => {
  const { password } = req.body;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, password)) {
    usersSrv.updatePassword(userId, password, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('usersSrv.updatePassword', error, res);
    });
  }
};

/**
 * Get a user by id
 * @see GET /users/:id
 */
module.exports.getUserById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    usersSrv.findById(id, (user) => {
      res.status(200).send(user);
    }, (error) => {
      funct.errorFunct('usersSrv.findById', error, res);
    });
  }
};

/**
 * Get a user by id with all associations
 * @see GET /users/with-details/:id
 */
module.exports.getUserByIdWithAssociations = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    usersSrv.findByIdWithAssociations(id, (user) => {
      res.status(200).send(user);
    }, (error) => {
      funct.errorFunct('usersSrv.findByIdWithAssociations', error, res);
    });
  }
};
