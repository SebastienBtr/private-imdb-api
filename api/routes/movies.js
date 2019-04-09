const express = require('express');

const router = express.Router();

const moviesCtrl = require('../controllers/movies.ctrl');

/**
 * Create a movie
 */
router.put('/movies/create-movie', moviesCtrl.createMovie);

/**
 * Update a movie
 */
router.put('/movies/update-movie', moviesCtrl.updateMovie);

/**
 * Find a movie by name
 */
router.get('/movies/name/:name', moviesCtrl.getMovieByName);

/**
 * Find all movies order by the given field (default id)
 * and by page (default page = 1, perPage = 20)
 */
router.get('/movies/all/:orderBy?/:page?/:perPage?', moviesCtrl.getAllMoviesByPage);

/**
 * Find a movie by id
 */
router.get('/movies/:id', moviesCtrl.getMovieById);

/**
 * Find a movie by id with all associations
 */
router.get('/movies/with-details/:id', moviesCtrl.getMovieByIdWithAssociations);

/**
 * Delete a movie by id
 * Maybe only accessible by the user who added the movie ? or by an admin user ?
 */
router.delete('/movies/:id', moviesCtrl.deleteMovieById);


module.exports = router;
