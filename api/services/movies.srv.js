const models = require('../models');

const Movie = models.movie;

/**
 * Create a movie:
 * Check if the movie name is unique
 * Insert the movie in the db
 * @param movie the movie data to insert in the db
 * @param userId the user who want to insert the movie in the db
 * @callback success return an object with the movie inserted id
 * @callback error executed if the name is not unique
 */
module.exports.create = (movie, userId, success, error) => {
  this.uniqueName(movie.name, (unique) => {
    if (unique) {
      const date = movie.date ? new Date(movie.date) : null;
      Movie.create({
        name: movie.name,
        date,
        duration: movie.duration,
        genre: movie.genre,
        synopsis: movie.synopsis,
        imageUrl: movie.imageUrl,
        teaserUrl: movie.teaserUrl,
        nationality: movie.nationality,
        userId,
      }).then((result) => {
        success({ insertId: result.id });
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    } else {
      error({ message: 'ERRORS.NAME_NOT_UNIQUE', status: 412 });
    }
  }, (err) => {
    error(err);
  });
};

/**
 * Update a movie:
 * Check if the new movie name is unique
 * Update the movie in the db
 * @param movie the movie data to update
 * @callback success
 * @callback error executed if the name is not unique
 */
module.exports.update = (movie, success, error) => {
  this.uniqueUpdatedName(movie.name, movie.id, (unique) => {
    if (unique) {
      const date = movie.date ? new Date(movie.date) : null;
      Movie.update({
        name: movie.name,
        date,
        duration: movie.duration,
        genre: movie.genre,
        synopsis: movie.synopsis,
        imageUrl: movie.imageUrl,
        teaserUrl: movie.teaserUrl,
        nationality: movie.nationality,
      }, { where: { id: movie.id } }).then(() => {
        success();
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    } else {
      error({ message: 'ERRORS.NAME_NOT_UNIQUE', status: 412 });
    }
  }, (err) => {
    error(err);
  });
};

/**
 * Update the rate of a movie by adding a new rate in the average calcul
 * @callback success
 * @callback error
 */
module.exports.addRate = (movieId, rate, success, error) => {
  this.findById(movieId, (movie) => {
    movie.getReviews().then((reviews) => {
      const nbRate = reviews.length;
      movie.update({
        rate: (movie.rate * (nbRate - 1) + rate) / nbRate,
      }).then(() => {
        success();
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    });
  }, (err) => {
    error(err);
  });
};

/**
 * Recalcul the rate of a movie because one rate has been updated
 * @callback success
 * @callback error
 */
module.exports.updateRate = (movieId, oldRate, newRate, success, error) => {
  this.findById(movieId, (movie) => {
    movie.getReviews().then((reviews) => {
      const nbRate = reviews.length;
      movie.update({
        rate: (movie.rate * nbRate - oldRate + newRate) / nbRate,
      }).then(() => {
        success();
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    });
  }, (err) => {
    error(err);
  });
};

/**
 * Check if a movie name is already present in the movie table
 * @param name the name to test
 * @callback success return true if the name is unique false otherwise
 * @callback error
 */
module.exports.uniqueName = (name, success, error) => {
  this.findByName(name, () => {
    success(false);
  }, (err) => {
    if (err.status === 204) {
      success(true);
    } else {
      error(err);
    }
  });
};

/**
 * Check if the new name of a movie (when we update it) is already present in the movie table
 * @param name the name to test
 * @param movieId the movie that we update
 * @callback success return true if the name is unique false otherwise
 * @callback error
 */
module.exports.uniqueUpdatedName = (name, movieId, success, error) => {
  this.findByName(name, (movie) => {
    const unique = movie.id === movieId;
    success(unique);
  }, (err) => {
    if (err.status === 204) {
      success(true);
    } else {
      error(err);
    }
  });
};

/**
 * Find a movie by name
 * @param name the name of the movie to find
 * @callback success return the movie
 * @callback error executed if the movie is not found
 */
module.exports.findByName = (name, success, error) => {
  Movie.findOne({ where: { name } }).then((movie) => {
    if (movie) {
      success(movie);
    } else {
      error({ message: 'ERRORS.NO_MOVIE_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a movie by id
 * Select all movie fields
 * Include professionals, reviews and user associations
 * @param id the id of the movie to find
 * @callback success return the movie
 * @callback error executed if the movie is not found
 */
module.exports.findByIdWithAssociations = (id, success, error) => {
  Movie.findByPk(id, {
    include: [
      'reviews',
      { model: models.user, attributes: { exclude: ['password'] } },
      { model: models.professional, as: 'professionals' },
    ],
  }).then((movie) => {
    if (movie) {
      success(movie);
    } else {
      error({ message: 'ERRORS.NO_MOVIE_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a movie by id
 * @param id the id of the movie to find
 * @callback success return the movie
 * @callback error executed if the movie is not found
 */
module.exports.findById = (id, success, error) => {
  Movie.findByPk(id).then((movie) => {
    if (movie) {
      success(movie);
    } else {
      error({ message: 'ERRORS.NO_MOVIE_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find all movies order by the given field by page
 * @param orderBy the field name to order by
 * @param page the page number
 * @param perPage number the number of movies per page
 * @callback success return the movies
 * @callback error
 */
module.exports.findAllByPage = (orderBy, page, perPage, success, error) => {
  const limit = parseInt(perPage, 10);
  const offset = (page - 1) * perPage;

  Movie.findAll({ offset, limit, order: [[orderBy]] }).then((movies) => {
    success(movies);
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Delete a movie by id
 * @param id the id of the movie to delete
 * @callback success
 * @callback error
 */
module.exports.deleteById = (id, success, error) => {
  Movie.destroy({ where: { id } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};
