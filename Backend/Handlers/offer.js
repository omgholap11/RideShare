require("dotenv").config({ path: "../.env" });
const route = require("../Model/dirverRoute.js");
const user = require("../Model/user.js");
const driver = require("../Model/driver.js");
const { getCoords } = require("../APIs/geocoding.js");
const { getOptimizedRoute } = require("../APIs/getPolyline.js");
const { decodePolyline } = require("../Computation/decodePolyline.js");
const { getRouteDirections } = require("../APIs/olaPolyline.js");
const jwt = require("jsonwebtoken");
const userRoute = require("../Model/userRoute.js");



async function handlePostOfferInDatabase(req, res) {
  const { startLocation, endLocation, date, time } = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const driverId = decoded.userid;

  try {
    console.log("Starting coordinate lookup...");
    // const startLocation = "Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India";
    // const endLocation = "Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India";

    console.log("Looking up coordinates for:", { startLocation, endLocation });

    const coordinates = await getCoords(startLocation, endLocation);
    console.log("Received coordinates:", coordinates);

    if (!coordinates || !coordinates.start || !coordinates.end) {
      console.error("Failed to get coordinates");
      return res.status(400).json({
        success: false,
        message: "Failed to get coordinates for locations",
      });
    }

    //Radar maps API.........................
    // const start = `${coordinates.start.lat}, ${coordinates.start.lng}`;
    // const end = `${coordinates.end.lat}, ${coordinates.end.lng}`;
    //  await getOptimizedRoute(start,end)
    // .then(async (routeDetails) => {
    //   console.log("Route details:", routeDetails)
    //   const polyline = routeDetails.legs[0].geometry.polyline;
    //   const decodedPolyline = decodePolyline(polyline);

    const start = coordinates.start;
    const end = coordinates.end;
    console.log("Start ", start);
    console.log("End ", end);
    await getRouteDirections(start,end)
      .then(async (routeDetails) => {
        console.log("Route Details :", routeDetails);
        console.log("Distance: ", routeDetails.routes[0].legs[0].distance);
        console.log("Duration: ", routeDetails.routes[0].legs[0].duration);
        console.log("Polyline: ", routeDetails.routes[0].overview_polyline);

        const polyline = routeDetails.routes[0].overview_polyline;
        const decodedPolyline = decodePolyline(polyline);

        console.log("Decoded polyline:", decodedPolyline);
        const created = await route.create({
          driverId: driverId,
          source: startLocation,
          destination: endLocation,
          date: date,
          rideStartTime: time,
          status: "available",
          distance: routeDetails.routes[0].legs[0].readable_distance,
          time: routeDetails.routes[0].legs[0].readable_duration,
          routePath: decodedPolyline,
          matchedRides: [],
        });
        if (!created) {
          console.log("Failed to create route");
        }
        console.log("Route created successfully", created);
      })
      .catch((error) => console.error("Failed to get route:", error));

    return res.status(200).json({
      success: true,
      coordinates: coordinates,
    });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}


async function handlePostMatchRidesInDatabase(req, res) {
  const {
    userId,
    name,
    mobileNumber,
    startLocation,
    endLocation,
    rideId,
    rideCost,
    date,
    time,
  } = req.body;
  console.log({
    userId,
    name,
    mobileNumber,
    startLocation,
    endLocation,
    rideId,
    date,
    time,
  });
  // const user = await user.
  
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
          $set: { status: "matched" }, // Update the ride status to "matched"
          $push: {
            matchedUsers: {
              userId: userId,
              userRouteId: userRides._id,
              name: name,
              contactNumber: mobileNumber,
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

async function handleGetMatchedRidesInDatabase(req, res) {
  console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
  const driverId = req.body.userid;
  // console.log(driverId);
  const rideDetails = await route.find({ driverId: driverId });
  //  console.log(rideDetails);
  let matchedUserRoutes = [];
  let matchedDriverRouteId = [];
  rideDetails.forEach((ride) => {
    if (ride.status != "completed" && ride.matchedUsers.length > 0) {
      ride.matchedUsers.forEach((matchedroutes) => {
        if(matchedroutes.status === "requested")
        {
            matchedUserRoutes.push(matchedroutes);
            matchedDriverRouteId.push(ride._id);
        }
      });
    }
  });

  console.log("Matched users and their details:   ", matchedUserRoutes);
  console.log("Matched Route Id:   ", matchedDriverRouteId);
  return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
}

async function handleGetAcceptedRidesInDatabase(req, res) {
  console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
  const driverId = req.body.userid;
  // console.log(driverId);
  const rideDetails = await route.find({ driverId: driverId });
  //  console.log(rideDetails);
  let matchedUserRoutes = [];
  let matchedDriverRouteId = [];
  rideDetails.forEach((ride) => {
    if (ride.status != "completed" && ride.matchedUsers.length > 0) {
      // const start = ride.source;
      // const end = ride.
      ride.matchedUsers.forEach((matchedroutes) => {
        if(matchedroutes.status === "accepted")
        {
            matchedUserRoutes.push(matchedroutes);
            matchedDriverRouteId.push(ride._id);
        }
      });
    }
  });

  console.log("Matched users and their details:   ", matchedUserRoutes);
  console.log("Matched Route Id:   ", matchedDriverRouteId);
  return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
}

async function handleGetDeclinedRidesInDatabase(req, res) {
  console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
  const driverId = req.body.userid;
  console.log(driverId);
  const rideDetails = await route.find({ driverId: driverId });
   console.log(rideDetails);
  let matchedUserRoutes = [];
  let matchedDriverRouteId = [];
  rideDetails.forEach((ride) => {
    if (ride.status != "completed" && ride.matchedUsers.length > 0) {
      ride.matchedUsers.forEach((matchedroutes) => {
        if(matchedroutes.status === "declined")
        {
            matchedUserRoutes.push(matchedroutes);
            matchedDriverRouteId.push(ride._id);
        }
      });
    }
  });

  console.log("Matched users and their details:   ", matchedUserRoutes);
  console.log("Matched Route Id:   ", matchedDriverRouteId);
  return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
}


async function handleGetCompletedRidesInDatabase(req, res) {
  console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
  const driverId = req.body.userid;
  console.log(driverId);
  const rideDetails = await route.find({ driverId: driverId });
   console.log(rideDetails);
  let matchedUserRoutes = [];
  let matchedDriverRouteId = [];
  rideDetails.forEach((ride) => {
    if (ride.status != "completed" && ride.matchedUsers.length > 0) {
      ride.matchedUsers.forEach((matchedroutes) => {
        if(matchedroutes.status === "completed")
        {
            matchedUserRoutes.push(matchedroutes);
            matchedDriverRouteId.push(ride._id);
        }
      });
    }
  });

  console.log("Matched users and their details:   ", matchedUserRoutes);
  console.log("Matched Route Id:   ", matchedDriverRouteId);
  return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
}


module.exports = {
  handlePostOfferInDatabase,
  handlePostMatchRidesInDatabase,
  handleGetMatchedRidesInDatabase,
  handleGetAcceptedRidesInDatabase,
  handleGetDeclinedRidesInDatabase,
};

// async function helper(){
//   const startLocation = "Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India";
//   const endLocation = "Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India";
//   const decodedPolyline = [
//     { lat: 18.449779, lng: 73.850952 },
//     { lat: 18.449774, lng: 73.851127 },
//     { lat: 18.449757, lng: 73.851358 },
//     { lat: 18.450147, lng: 73.851308 }];
//   console.log("Decoded polyline:", decodedPolyline);
//   const created = await route.create({
//     driverId: '67dfb69c26cf25f0e7ca50af',
//     source: startLocation,
//     destination: endLocation,
//     date: '2025-03-07',
//     rideStartTime : '11:47',
//     status : "available",
//     distance : "45",
//     time : "65",
//     routePath : decodedPolyline
//   })
//   console.log(created);
// }

// helper();

// handlePostOfferInDatabase();

// return res.status(200).json({msg:"success"});
//
// try {
//
//   if (!token) {
//     return res.status(401).json({ msg: "No token found" });
//   }

//

//   // console.log("Received data:", { startLocation, endLocation, date, time, driverId });

//   const startLocation = "Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India";
//   const endLocation = "Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India";
//   getCoords(startLocation,endLocation).then((coordinates)=>{console.log(coordinates)});

// Get start location coordinates
// let startgeocode = await getCoords(startLocation);
// if (!startgeocode) {
//   return res.status(400).json({ msg: "Could not geocode start location. Please check the address and try again." });
// }
// console.log("Start location geocode:", startgeocode);

// // Get end location coordinates
// let endgeocode = await getCoords(endLocation);
// if (!endgeocode) {
//   return res.status(400).json({ msg: "Could not geocode end location. Please check the address and try again." });
// }
// console.log("End location geocode:", endgeocode);

// getCoords('Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India','Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India').then((coordinates)=>{console.log(coordinates)});
// helper();
// // Get route details
// const start = `${startgeocode.lat},${startgeocode.lng}`;
// const end = `${endgeocode.lat},${endgeocode.lng}`;

// try {
//   const routeDetail = await getOptimizedRoute(start, end);
//   console.log("Route details:", routeDetail);

//   // TODO: Save offer to database here

//   return res.status(200).json({
//     msg: "success",
//     route: routeDetail
//   });
// } catch (error) {
//   console.log("Error in getting route details ", error);
//   return res.status(500).json({ msg: "Error getting route details" });
// }

//   } catch (error) {
//     console.error("Error in handlePostOfferInDatabase:", error);
//     return res.status(500).json({ msg: "Server error", error: error.message });
//   }
// }
// }
