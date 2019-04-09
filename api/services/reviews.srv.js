const models = require('../models');

const Review = models.review;

/**
 * Add a review
 * @param review the review data to insert in the db
 * @param userId the user who wants to add a review
 * @param movieId the movie concerned by the review
 * @callback success it return an object with the review inserted id
 * @callback error
 */
module.exports.create = (review, userId, movieId, success, error) => {
  this.uniqueReviewForUserToMovie(userId, movieId, (unique) => {
    if (unique) {
      Review.create({
        rate: review.rate,
        review: review.review,
        userId,
        movieId,
      }).then((result) => {
        success({ insertId: result.id });
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    } else {
      error({ message: 'ERRORS.REVIEW_NOT_UNIQUE', status: 412 });
    }
  });
};

/**
 * Check if a the user has already add a review for the movie
 * @param userId the user id
 * @param movieId the movie id
 * @callback success return true if there is not already a review false otherwise
 * @callback error
 */
module.exports.uniqueReviewForUserToMovie = (userId, movieId, success, error) => {
  Review.findOne({ where: { userId, movieId } }).then((review) => {
    if (review) {
      success(false);
    } else {
      success(true);
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Update a review
 * @param review the review data to update
 * @callback success
 * @callback error
 */
module.exports.update = (review, success, error) => {
  Review.update({
    rate: review.rate,
    review: review.review,
  }, { where: { id: review.id } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a review by id
 * @param id the id of the review to find
 * @callback success return the review
 * @callback error executed if the review is not found
 */
module.exports.findById = (id, success, error) => {
  Review.findByPk(id).then((review) => {
    if (review) {
      success(review);
    } else {
      error({ message: 'ERRORS.NO_REVIEW_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a review by id
 * Select all review fields
 * Include movie and user associations
 * @param id the id of the review to find
 * @callback success return the review
 * @callback error executed if the review is not found
 */
module.exports.findByIdWithAssociations = (id, success, error) => {
  Review.findByPk(id, { include: ['movie', { model: models.user, attributes: { exclude: ['password'] } }] })
    .then((review) => {
      if (review) {
        success(review);
      } else {
        error({ message: 'ERRORS.NO_REVIEW_FIND', status: 204 });
      }
    }).catch((err) => {
      error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
    });
};

/**
 * Delete a review by id
 * @param id the id of the review to delete
 * @callback success
 * @callback error
 */
module.exports.deleteById = (id, success, error) => {
  Review.destroy({ where: { id } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};
