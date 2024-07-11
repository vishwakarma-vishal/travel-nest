const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoute.js")
const listingRoutes = require("./routes/listingRoute.js")
const bookingRoutes = require("./routes/bookingRoute.js")
const userRoutes = require("./routes/userRoute.js")

const dbConnect = require("./config/database.js");
dbConnect(); //database connection 

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ROUTES
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});

