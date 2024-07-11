const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

/* GET TRIP LIST */
const getTripList = async (req, res) => {
    try {
        const { userId } = req.params
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
        res.status(202).json(trips)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find trips!", error: err.message })
    }
}

/* ADD LISTING TO WISHLIST */
const addWishlist = async (req, res) => {
    try {
        const { userId, listingId } = req.params
        const user = await User.findById(userId)
        const listing = await Listing.findById(listingId).populate("creator")

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        if (favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList })
        } else {
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

/* GET PROPERTY LIST OF USER*/
const getPropertyList = async (req, res) => {
    try {
        const { userId } = req.params
        const properties = await Listing.find({ creator: userId }).populate("creator")
        res.status(202).json(properties)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find properties!", error: err.message })
    }
}

/* GET RESERVATION LIST */
const getReservationList = async (req, res) => {
    try {
        const { userId } = req.params
        const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
        res.status(202).json(reservations)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find reservations!", error: err.message })
    }
}

module.exports = { getTripList, addWishlist, getPropertyList, getReservationList };
