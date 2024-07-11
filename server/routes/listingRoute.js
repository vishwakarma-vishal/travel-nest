const router = require("express").Router();
const multer = require("multer");

const { createListing, getListingByCategory, getListingBySearch, getSingleListing } = require("../controllers/listingController")

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), createListing);
router.get("/", getListingByCategory)
router.get("/search/:search", getListingBySearch)
router.get("/:listingId", getSingleListing)

module.exports = router
