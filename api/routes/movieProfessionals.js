const express = require('express');

const router = express.Router();

const movieProfessionalCtrl = require('../controllers/movieProfessionals.ctrl');

/**
 * Add relation between a movie and a professional
 */
router.put('/movie-professionals/add-relation', movieProfessionalCtrl.addMovieProfessional);

/**
 * Delete a relation between a movie and a professional
 * Maybe only accessible by an admin user ?
 */
router.delete('/movie-professionals/:movieId/:professionalId', movieProfessionalCtrl.deleteMovieProfessional);

module.exports = router;
