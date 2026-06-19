const Listing = require("../models/listings.js");
const ExpressError = require("../utils/expresserror.js");

module.exports.index = async (req, res) => {
    let query = {};
    let searchVal = "";
    if (req.query.search) {
        searchVal = req.query.search.trim();
        query = { location: { $regex: searchVal, $options: "i" } };
    }
    const indexlisting = await Listing.find(query);
    res.render("listings/index.ejs", { indexlisting, searchVal });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.CreateListing = async (req, res, next) => {
    if (!req.file) {
        throw new ExpressError(400, "Image is required");
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.imageUrl = {
        url: req.file.path,
        filename: req.file.filename,
    };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.imageUrl.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.UpdateListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (typeof req.file !== "undefined") {
        listing.imageUrl = {
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.DestoryListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
};
