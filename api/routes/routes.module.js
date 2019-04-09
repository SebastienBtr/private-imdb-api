const express = require('express');

const router = express.Router();

const authRoutes = require('./authentification');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const reviewsRoutes = require('./reviews');
const professionalsRoutes = require('./professionals');
const movieProfessionalsRoutes = require('./movieProfessionals');

router.use([
  authRoutes,
  usersRoutes,
  moviesRoutes,
  reviewsRoutes,
  professionalsRoutes,
  movieProfessionalsRoutes,
]);

module.exports = router;
