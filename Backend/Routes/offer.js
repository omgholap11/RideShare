const express = require("express");
const router = express.Router();
const { handlePostOfferInDatabase  , handleGetRideDetails, handleEnterAcceptedRides , handleEnterDeclinedRides } = require("../Handlers/offer.js");

router.post("/postride", handlePostOfferInDatabase);

router.post("/enteracceptedrides",handleEnterAcceptedRides);

router.post("/enterdeclinedrides",handleEnterDeclinedRides);

router.get("/getridedetails",handleGetRideDetails)

module.exports = router;