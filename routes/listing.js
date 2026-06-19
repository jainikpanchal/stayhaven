const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(wrapasync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[imageUrl]"),
    validateListing,
    wrapasync(listingController.CreateListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapasync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[imageUrl]"),
    validateListing,
    wrapasync(listingController.UpdateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapasync(listingController.DestoryListing)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapasync(listingController.renderEditForm)
);

module.exports = router;
