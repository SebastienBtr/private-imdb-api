const express = require('express');

const router = express.Router();

const reviewsCtrl = require('../controllers/reviews.ctrl');

/**
 * Create a review
 */
router.put('/reviews/create-review', reviewsCtrl.createReview);

/**
 * Update a review, only the review author can do this
 */
router.put('/reviews/update-review', reviewsCtrl.updateReview);

/**
 * Find a review by id
 */
router.get('/reviews/:id', reviewsCtrl.getReviewById);

/**
 * Find a review by id with all associations
 */
router.get('/reviews/with-details/:id', reviewsCtrl.getReviewByIdWithAssociations);

/**
 * Delete a review by id, only the review author can do this
 */
router.delete('/reviews/:id', reviewsCtrl.deleteReviewById);

module.exports = router;
