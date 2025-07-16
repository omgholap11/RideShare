const express = require("express");
const route = require("../Model/dirverRoute.js");
const driver = require("../Model/driver.js");
const user = require("../Model/user.js");
const { getCoords } = require("../APIs/geocoding.js");
const { findIntersections } = require("../Computation/intersection.js");
const userRoute = require("../Model/userRoute.js");
const { getOptimizedRoute } = require("../APIs/getPolyline.js");
const { getRouteDirections } = require("../APIs/olaPolyline.js");

async function handleSearchRides(req, res) {
  const { startLocation, endLocation, date, time } = req.body;

  console.log("Booking a ride for:", {
    startLocation,
    endLocation,
    date,
    time,
  });
  const coordinates = await getCoords(startLocation, endLocation);
  console.log("Received coordinates:", coordinates);
  const userstart = coordinates.start;
  const userend = coordinates.end;
  let distance = 0;
  let ridetime = 0;
  let distanceNumber = 0;
  await getRouteDirections(userstart, userend).then(async (routeDetails) => {
    console.log("Route Details :", routeDetails);
    distance = routeDetails.routes[0].legs[0].readable_distance;
    distanceNumber = routeDetails.routes[0].legs[0].distance;
    ridetime = routeDetails.routes[0].legs[0].duration;
  });
  const rideCost = Math.floor(distanceNumber * 0.0045);
  console.log("Cost of ride : ", rideCost);

  const allrides = await route.find({});
  // console.log(allrides);
  let matchrides = [];
  let counts = 0;
  await Promise.all(
    allrides.map(async (ride) => {
      const driversPath = ride.routePath;
      if (
        ride.status === "available" &&
        date == ride.date &&  
        time <= ride.rideStartTime
      ) {
        const intersection = findIntersections(driversPath, userstart, userend);
        if (
          intersection.firstIntersection != null &&
          intersection.lastIntersection != null
        ) {
          counts++;
          const driverDetails = await driver.findOne(ride.driverId);
          // console.log(driverDetails);
          matchrides.push({
            rideStart: ride.source,
            rideEnd: ride.destination,
            rideStartTime: ride.rideStartTime,
            driverName: `${driverDetails.firstName} ${driverDetails.lastName}`,
            driverNumber: driverDetails.mobileNumber,
            vehicleName: driverDetails.vehicleName,
            rideId: ride._id,
            rideCost: rideCost,
          });
        }
      }
    })
  );
  //send these match rides to front end
  console.log(matchrides);
  console.log("Total matched rides: ", counts);
  return res.status(200).json({ rides: matchrides });
}

// const

async function handleBookingOfRides(req, res) {
  const rideId = req.body.rideId;
  const ride = await route.findByIdAndUpdate(rideId, { status: "booked" });

}

const handleGetRequestedRideDetails = async (req, res) => {         //user notification page
  const { userid } = req.body;
  console.log(userid);
  const allrequests = await userRoute.find({});
  let requests = [];

  allrequests.forEach((request) => {
    if (request.userId == userid &&( request.status === "accepted" ||  request.status === "declined") && request.rideId != "completed") {
      requests.push(request);
    }
  });
  console.log(requests);
  return res.status(200).json({ requests });
};



const handlePostCompletedRides = async (req,res)=>{
    const {ride} = req.body;
    console.log(ride);
    console.log("Ride details to mark it as completed",ride);
    const userRouteId = ride._id;
    const rideDetails = await userRoute.findByIdAndUpdate(userRouteId, {status : "completed"});
    await route.findOneAndUpdate(
        { "matchedUsers.userRouteId": userRouteId },
        { $set: { "matchedUsers.$.status": "completed" } }
      );
    const update = await route.findOneAndUpdate({_id : ride.rideId},{$set : {status : "completed"}});
    console.log(update)
    console.log("Ride marked as completed successfully",rideDetails);
    return res.status(200).json({msg : "success"});
}


async function handlePostMatchRidesInDatabase(req, res) {
  const {
    startLocation,
    endLocation,
    rideId,
    rideCost,
    date,
    time,
  } = req.body;
  console.log({
    startLocation,
    endLocation,
    rideId,
    date,
    time,
  });

  const userId = req.user.userId;
  console.log("User id>> ",userId);
  const User = await user.findById(userId);

  
  const routeDetails = await route.findById(rideId);
  const driverDetails = await driver.findById(routeDetails.driverId);
  const userRides = await userRoute.create({
          userId : userId,
          rideId : rideId,
          driverName : driverDetails.firstName + " " + driverDetails.lastName,
          startLocation : routeDetails.source,
          endLocation : routeDetails.destination,  
          contactNumber : driverDetails.mobileNumber,
          image : driverDetails.image,
          status : "requested",
          time : time,
          date : date,
          rideCost : rideCost
      })


      const ride = await route.findByIdAndUpdate(
        rideId,
        {
          $set: { status: "pending" }, // Update the ride status to "matched"
          $push: {
            matchedUsers: {
              userId: userId,
              userRouteId: userRides._id,
              name: User.name,
              contactNumber: User.mobileNumber,
              startLocation: startLocation,
              endLocation: endLocation,
              status: "requested",
              rideCost: rideCost,
              date: date,
              time: time,
            },
          },
        },
        { new: true } // Returns the updated document
      );


console.log("matched user: ",ride);
  console.log(userRides);
  console.log({
    msg: "Ride request is send to rider he will connect you in shortyl",
  });
  return res
    .status(200)
    .json({
      msg: "Ride request is send to rider he will connect you in shortyl",
    });
}


module.exports = {
  handleBookingOfRides,
  handleSearchRides,
  handleGetRequestedRideDetails,
  handlePostCompletedRides,
  handlePostMatchRidesInDatabase
};
