const express = require("express");
const router = express.Router();
const { handlePostOfferInDatabase , handlePostMatchRidesInDatabase , handleGetMatchedRidesInDatabase , handleGetAcceptedRidesInDatabase,
    handleGetDeclinedRidesInDatabase, } = require("../Handlers/offer.js");

router.post("/user", handlePostOfferInDatabase);

router.post("/matchride" , handlePostMatchRidesInDatabase);

router.post("/getrequestedrides",handleGetMatchedRidesInDatabase)

router.post("/getacceptedrides",handleGetAcceptedRidesInDatabase)

router.post("/getdeclinedrides",handleGetDeclinedRidesInDatabase)

module.exports = router;