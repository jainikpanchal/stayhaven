const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapasync = require("../utils/wrapasync.js");
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");

// reviews post route
router.post("/", validatereview, isLoggedIn, wrapasync(reviewControllers.CreateReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapasync(reviewControllers.DeleteReview));

module.exports = router;
