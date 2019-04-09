const models = require('../models');

const MovieProfessional = models.movieProfessional;

/**
 * Create elation between a movie and a professional:
 * Check if the relation is not already present
 * Insert the relation in the db
 * @param movieId the movie to insert in the db
 * @param professionalId the professional to insert in the db
 * @param role the role of the professional in the movie
 * @callback success
 * @callback error executed if the relation is already present
 */
module.exports.create = (movieId, professionalId, role, success, error) => {
  this.uniqueRelation(movieId, professionalId, role, (unique) => {
    if (unique) {
      MovieProfessional.create({
        movieId,
        professionalId,
        role,
      }).then(() => {
        success();
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    } else {
      error({ message: 'ERRORS.NOT_UNIQUE_RELATION', status: 412 });
    }
  }, (err) => {
    error(err);
  });
};

/**
 * Check if the relation between a movie and a professional is already present
 * @param movieId the movie id of the relation
 * @param professionalId the professional id of the relation
 * @param role the role of the relation
 * @callback success return true if the realtion is unique false otherwise
 * @callback error
 */
module.exports.uniqueRelation = (movieId, professionalId, role, success, error) => {
  MovieProfessional.findOne({ where: { movieId, professionalId, role } })
    .then((movieProfessional) => {
      if (movieProfessional) {
        success(false);
      } else {
        success(true);
      }
    }).catch((err) => {
      error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
    });
};

/**
 * Delete a relation between a movie and a professional
 * @param movieId the movie id of the relation
 * @param professionalId the professional id of the relation
 * @callback success
 * @callback error
 */
module.exports.delete = (movieId, professionalId, success, error) => {
  MovieProfessional.destroy({ where: { movieId, professionalId } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};
