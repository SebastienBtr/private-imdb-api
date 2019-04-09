const moviesSrv = require('./movies.srv');
const reviewsSrv = require('./reviews.srv');

/**
 * Emit via socket.io a movie
 * @param io socket.io object
 * @param movieId the id of the movie to send
 */
module.exports.sendNewMovie = (io, movieId) => {
  moviesSrv.findById(movieId, (movie) => {
    io.emit('new-movie', { movie });
  });
};

/**
 * Emit via socket.io a review
 * @param io socket.io object
 * @param reviewId the id of the review to send
 */
module.exports.sendNewReview = (io, reviewId) => {
  reviewsSrv.findByIdWithAssociations(reviewId, (review) => {
    io.emit('new-review', { review });
  });
};
