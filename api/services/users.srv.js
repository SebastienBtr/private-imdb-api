const bcrypt = require('bcrypt');

const models = require('../models');

const User = models.user;

/**
 * Create a user:
 * Check if the email is unique
 * Hash the password
 * Insert the user in db
 * @param user the user data to insert in the db
 * @callback success it return an object with the user inserted id
 * @callback error executed if the email is not unique
 */
module.exports.create = (user, success, error) => {
  this.uniqueEmail(user.email, (unique) => {
    if (unique) {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (!err) {
          User.create({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            profilePicture: user.profilePicture,
            password: hash,
          }).then((result) => {
            success({ insertId: result.id });
          }).catch((dbErr) => {
            error({ message: 'ERRORS.DATABASE_ERROR', error: dbErr, status: 500 });
          });
        } else {
          error(err);
        }
      });
    } else {
      error({ message: 'ERRORS.EMAIL_NOT_UNIQUE', status: 412 });
    }
  }, (err) => {
    error(err);
  });
};

/**
 * Update a user
 * @param userId the id of the user to update
 * @param user the user data to update
 * @callback success
 * @callback error
 */
module.exports.update = (userId, user, success, error) => {
  User.update({
    firstname: user.firstname,
    lastname: user.lastname,
    profilePicture: user.profilePicture,
  }, { where: { id: userId } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Update a user password
 * @param userId the id of the user to update
 * @param password the new password of the user
 * @callback success
 * @callback error
 */
module.exports.updatePassword = (userId, password, success, error) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (!err) {
      User.update({
        password: hash,
      }, { where: { id: userId } }).then(() => {
        success();
      }).catch((dbErr) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: dbErr, status: 500 });
      });
    } else {
      error(err);
    }
  });
};

/**
 * Find a user by id
 * Select all user fields except password
 * Include movies and reviews associations
 * @param id the id of the user to find
 * @callback success return the user
 * @callback error executed if the user is not found
 */
module.exports.findByIdWithAssociations = (id, success, error) => {
  User.findByPk(id, { attributes: { exclude: ['password'] }, include: ['movies', 'reviews'] }).then((user) => {
    if (user) {
      success(user);
    } else {
      error({ message: 'ERRORS.NO_USER_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a user by email
 * @param email the email of the user to find
 * @callback success return the user
 * @callback error executed if the user is not found
 */
module.exports.findByEmail = (email, success, error) => {
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      success(user);
    } else {
      error({ message: 'ERRORS.NO_USER_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};
