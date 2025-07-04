const express = require("express");
const router = express.Router();
const {handleBookingOfRides,handleSearchRides,handleEnterAcceptedRides,handleEnterDeclinedRides,handleGetRequestedRideDetails , handlePostCompletedRides} = require("../Handlers/book.js");


router.post("/search",handleSearchRides);

router.post("/bookride",handleBookingOfRides);

router.post("/enteracceptedrides",handleEnterAcceptedRides);

router.post("/enterdeclinedrides",handleEnterDeclinedRides);

router.post("/getrequestedridedetails",handleGetRequestedRideDetails);

router.post("/postcompletedrides",handlePostCompletedRides);

module.exports = router;