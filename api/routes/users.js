const express = require('express');

const router = express.Router();

const usersCtrl = require('../controllers/users.ctrl');

/**
 * Create a user
 */
router.put('/users/create-user', usersCtrl.createUser);

/**
 * Update the current user
 */
router.put('/users/update-user', usersCtrl.updateUser);

/**
 * Update the password of the current user
 */
router.put('/users/update-password', usersCtrl.updateUserPassword);

/**
 * Find a user by id
 */
router.get('/users/:id', usersCtrl.getUserById);

/**
 * Find a user by id with all associations
 */
router.get('/users/with-details/:id', usersCtrl.getUserByIdWithAssociations);

module.exports = router;
