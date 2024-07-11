const router = require("express").Router()
const { getTripList, addWishlist, getPropertyList, getReservationList } = require("../controllers/userController");

router.get("/:userId/trips", getTripList)
router.patch("/:userId/:listingId", addWishlist)
router.get("/:userId/properties", getPropertyList)
router.get("/:userId/reservations", getReservationList)

module.exports = router
