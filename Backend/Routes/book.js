const express = require("express");
const router = express.Router();
const {handleBookingOfRides,handleSearchRides,handleGetRequestedRideDetails ,handlePostMatchRidesInDatabase, handlePostCompletedRides} = require("../Handlers/book.js");
const checkForUserAuthenticationCookie = require("../Middleware/UserAuthentication.js");


router.post("/search",handleSearchRides);

router.post("/bookride",checkForUserAuthenticationCookie("token"), handleBookingOfRides);

router.post("/matchride" , checkForUserAuthenticationCookie("token"),  handlePostMatchRidesInDatabase);

router.post("/getrequestedridedetails",checkForUserAuthenticationCookie("token"),handleGetRequestedRideDetails);

router.post("/postcompletedrides",checkForUserAuthenticationCookie("token"),handlePostCompletedRides);

module.exports = router;