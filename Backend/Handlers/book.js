const express = require("express");
const route = require("../Model/dirverRoute.js");
const driver = require("../Model/driver.js");
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
  // const startLocation = "Santosh Nagar, Pune, Maharashtra 411046";
  // const endLocation = "Swargate Flyover, Mukund Nagar, Pune, Maharashtra 411037";

  const coordinates = await getCoords(startLocation, endLocation);
  console.log("Received coordinates:", coordinates);

  // const coordinates = {
  //     start : { lat: 18.464256561559274, lng: 73.85797833788413 },
  //     end : { lat: 18.499154020836837, lng: 73.85898544158336 }
  // };

  const userstart = coordinates.start;
  const userend = coordinates.end;
  let distance = 0;
  let ridetime = 0;
  let distanceNumber = 0;

  //Radar map api
  //  const start = `${coordinates.start.lat}, ${coordinates.start.lng}`;
  //     const end = `${coordinates.end.lat}, ${coordinates.end.lng}`;
  //    await getOptimizedRoute(start,end)
  //   .then(async (routeDetails) => {
  //     console.log("Route details:", routeDetails)
  //     distance = routeDetails.distance.text;
  //     distanceNumber = routeDetails.distance.value;
  //     ridetime = routeDetails.duration.text;
  //     })
  //     const rideCost = Math.floor(distanceNumber*(0.00325));
  //     console.log("Cost of ride : ",rideCost);
  //     console.log("Time required for ride: ",ridetime);
  //     console.log("Distance required for ride",distance);

  await getRouteDirections(userstart, userend).then(async (routeDetails) => {
    console.log("Route Details :", routeDetails);
    // console.log("Distance: ", routeDetails.routes[0].legs[0].distance);
    // console.log("Duration: ", routeDetails.routes[0].legs[0].duration);
    // console.log("Polyline: ", routeDetails.routes[0].overview_polyline);

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
  //notify user ............................
}

const handleEnterAcceptedRides = async (req, res) => {
  const { userId, routeId, rideCost, userRouteId } = req.body;
  console.log({ userId, routeId, rideCost, routeId });

  // const driverRoute = await route.findById(routeId);      //find ride matching

  const update = await route.findByIdAndUpdate(routeId, { status: "booked" });

  // console.log(driverRoute);
  // const driverDetails = await driver.findById(driverRoute.driverId);
  // const userRides = await userRoute.create({
  //     userId : userId,
  //     startLocation : driverRoute.source,
  //     endLocation : driverRoute.destination,
  //     driverName : `${driverDetails.firstName} ${driverDetails.lastName}`,
  //     contactNumber : driverDetails.mobileNumber,
  //     image : driverDetails.image,
  //     status : "accepted",
  //     time : driverRoute.rideStartTime,
  //     date : driverRoute.date,
  //     rideCost : rideCost
  // })

  const userRides = await userRoute.findByIdAndUpdate(userRouteId, {
    status: "accepted",
  });

  const updateMatchedUsers = await route.findOneAndUpdate(
    { _id: routeId, "matchedUsers.userId": userId },
    {
      $set: {
        "matchedUsers.$.status": "accepted",
      },
    }
  );    


  console.log("Ride accepted successfully");
  console.log(userRides);

  return res.status(200).json({ msg: "success" });
};

const handleEnterDeclinedRides = async (req, res) => {
  const { userId, routeId, rideCost, userRouteId } = req.body;
  console.log({ userId, routeId, rideCost, userRouteId });
  //find ride matching
  // console.log(driverRoute);
  // const driverDetails = await driver.findById(driverRoute.driverId);
  // const userRides = await userRoute.create({
  //     userId : userId,
  //     startLocation : driverRoute.source,
  //     endLocation : driverRoute.destination,
  //     driverName : `${driverDetails.firstName} ${driverDetails.lastName}`,
  //     contactNumber : driverDetails.mobileNumber,
  //     image : driverDetails.image,
  //     status : "declined",
  //     time : driverRoute.rideStartTime,
  //     date : driverRoute.date,
  //     rideCost : rideCost
  // })
  // console.log(userRides);

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  const driverRoute = await route.findById(routeId);
  if (
    driverRoute.date === currentDate &&
    driverRoute.rideStartTime > currentTime
  ) {
    const update = await route.findByIdAndUpdate(routeId, {
      status: "available",
    });
  } else {
    const update = await route.findByIdAndUpdate(routeId, {
      status: "cancelled",
    });
  }

  const updateMatchedUsers = await route.findOneAndUpdate(
    { _id: routeId, "matchedUsers.userId": userId },
    {
      $set: {
        "matchedUsers.$.status": "declined",
      },
    }
  );    

  const userRides = await userRoute.findByIdAndUpdate(userRouteId, {
    status: "declined",
  });

  console.log(userRides);
  console.log("Ride declined successfully");
  return res.status(200).json({ msg: "success" });
};

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

module.exports = {
  handleBookingOfRides,
  handleSearchRides,
  handleEnterAcceptedRides,
  handleEnterDeclinedRides,
  handleGetRequestedRideDetails,
  handlePostCompletedRides
};
