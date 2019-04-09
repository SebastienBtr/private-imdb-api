const funct = require('../utils/commonFunctions.js');
const reviewsSrv = require('../services/reviews.srv.js');
const moviesSrv = require('../services/movies.srv');

/**
 * Create a review
 * @see PUT /reviews/create-review
 */
module.exports.createReview = (req, res) => {
  const { review } = req.body;
  const { movieId } = req.body;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, review, review.rate, movieId)) {
    reviewsSrv.create(review, userId, movieId, (rows) => {
      moviesSrv.addRate(movieId, review.rate, () => {
        res.status(200).send(rows);
      }, (error) => {
        funct.errorFunct('moviesSrv.addRate', error, res);
      });
    }, (error) => {
      funct.errorFunct('reviewsSrv.create', error, res);
    });
  }
};

/**
 * Update a review, only the author of the review can do this
 * @see PUT /reviews/update-review
 */
module.exports.updateReview = (req, res) => {
  const { review } = req.body;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, review, review.id, review.rate)) {
    reviewsSrv.findById(review.id, (oldReview) => {
      if (oldReview.userId === parseInt(userId, 10)) {
        reviewsSrv.update(review, () => {
          if (oldReview.rate !== review.rate) {
            moviesSrv.updateRate(oldReview.movieId, oldReview.rate, review.rate, () => {
              res.status(200).send();
            }, (error) => {
              funct.errorFunct('moviesSrv.updateRate', error, res);
            });
          } else {
            res.status(200).end();
          }
        }, (error) => {
          funct.errorFunct('reviewsSrv.update', error, res);
        });
      } else {
        funct.errorFunct('reviewsSrv.update', {
          message: 'ERRORS.UNAUTHORIZED', error: null, status: 401,
        }, res);
      }
    }, (error) => {
      funct.errorFunct('reviewsSrv.findById', error, res);
    });
  }
};

/**
 * Get a review by id
 * @see GET /reviews/:id
 */
module.exports.getReviewById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    reviewsSrv.findById(id, (review) => {
      res.status(200).send(review);
    }, (error) => {
      funct.errorFunct('reviewsSrv.findById', error, res);
    });
  }
};

/**
 * Get a review by id with all associations
 * @see GET /reviews/with-details/:id
 */
module.exports.getReviewByIdWithAssociations = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    reviewsSrv.findByIdWithAssociations(id, (review) => {
      res.status(200).send(review);
    }, (error) => {
      funct.errorFunct('reviewsSrv.findByIdWithAssociations', error, res);
    });
  }
};

/**
 * Delete a review by id, only the author of the review can do this
 * @see DELETE /reviews/:id
 */
module.exports.deleteReviewById = (req, res) => {
  const { id } = req.params;
  const { sub: userId } = req.user;

  if (funct.checkParams(res, id)) {
    reviewsSrv.findById(id, (review) => {
      if (review.userId === parseInt(userId, 10)) {
        reviewsSrv.deleteById(id, () => {
          res.status(200).end();
        }, (error) => {
          funct.errorFunct('reviewsSrv.deleteById', error, res);
        });
      } else {
        funct.errorFunct('reviewsSrv.deleteById', {
          message: 'ERRORS.UNAUTHORIZED', error: null, status: 401,
        }, res);
      }
    }, (error) => {
      funct.errorFunct('reviewsSrv.findById', error, res);
    });
  }
};
