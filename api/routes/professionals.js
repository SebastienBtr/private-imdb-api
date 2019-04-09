const express = require('express');

const router = express.Router();

const professionalsCtrl = require('../controllers/professionals.ctrl');

/**
 * Create a professional
 */
router.put('/professionals/create-professional', professionalsCtrl.createProfessional);

/**
 * Update a professional
 */
router.put('/professionals/update-professional', professionalsCtrl.updateProfessional);

/**
 * Find a professional by name
 */
router.get('/professionals/name/:name', professionalsCtrl.getProfessionalByName);

/**
 * Find a professional by id
 */
router.get('/professionals/:id', professionalsCtrl.getProfessionalById);

/**
 * Find a professional by id with all associations
 */
router.get('/professionals/with-details/:id', professionalsCtrl.getProfessionalByIdWithAssociations);

/**
 * Delete a professional by id
 * Maybe only accessible by an admin user ?
 */
router.delete('/professionals/:id', professionalsCtrl.deleteProfessionalById);


module.exports = router;
