const funct = require('../utils/commonFunctions.js');
const moviesSrv = require('../services/movies.srv.js');
const socketioSrv = require('../services/socketio.srv');

/**
 * Create a movie
 * @see PUT /movies/create-movie
 */
module.exports.createMovie = (req, res) => {
  const { movie } = req.body;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, movie, movie.name)) {
    moviesSrv.create(movie, userId, (rows) => {
      socketioSrv.sendNewMovie(req.io, rows.insertId);
      res.status(200).send(rows);
    }, (error) => {
      funct.errorFunct('moviesSrv.create', error, res);
    });
  }
};

/**
 * Update a movie
 * @see PUT /movies/update-movie
 */
module.exports.updateMovie = (req, res) => {
  const { movie } = req.body;

  if (funct.checkParams(res, movie, movie.id)) {
    moviesSrv.update(movie, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('moviesSrv.update', error, res);
    });
  }
};

/**
 * Get a movie by id
 * @see GET /movies/:id
 */
module.exports.getMovieById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    moviesSrv.findById(id, (movie) => {
      res.status(200).send(movie);
    }, (error) => {
      funct.errorFunct('moviesSrv.findById', error, res);
    });
  }
};

/**
 * Get a movie by id with all associations
 * @see GET /movies/with-details/:id
 */
module.exports.getMovieByIdWithAssociations = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    moviesSrv.findByIdWithAssociations(id, (movie) => {
      res.status(200).send(movie);
    }, (error) => {
      funct.errorFunct('moviesSrv.findByIdWithAssociations', error, res);
    });
  }
};

/**
 * Get a movie by name
 * @see GET /movies/name/:name
 */
module.exports.getMovieByName = (req, res) => {
  const { name } = req.params;

  if (funct.checkParams(res, name)) {
    moviesSrv.findByName(name, (movie) => {
      res.status(200).send(movie);
    }, (error) => {
      funct.errorFunct('moviesSrv.findById', error, res);
    });
  }
};

/**
 * Get all movie by pages
 * @see GET /movies/all/:page/:perPage
 */
module.exports.getAllMoviesByPage = (req, res) => {
  const { orderBy = 'id' } = req.params;
  const { page = 1 } = req.params;
  const { perPage = 20 } = req.params;

  moviesSrv.findAllByPage(orderBy, page, perPage, (movies) => {
    res.status(200).send(movies);
  }, (error) => {
    funct.errorFunct('moviesSrv.findAllByPage', error, res);
  });
};

/**
 * Delete a movie by id
 * @see DELETE /movies/:id
 */
module.exports.deleteMovieById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    moviesSrv.deleteById(id, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('moviesSrv.deleteById', error, res);
    });
  }
};
