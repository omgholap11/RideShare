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

  const driverId = req.user.userId;
  console.log("The drivers id >>>>>>>  ",driverId);

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
          matchedUsers: [],
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


async function handleGetRideDetails(req, res) {
  try {
    const driverId = req.user.userId;

    console.log("driver  ",driverId);

    // Get all rides created by this driver
    const driverRides = await route.find({driverId : driverId}).lean();
    console.log("All Rides: ",driverRides);
    const rideDetails = await Promise.all(
      driverRides.map(async (ride) => {
        let completedUser = null;

        // If ride is completed, fetch the user who completed it
        if (ride.status === "completed") {
          completedUser = await userRoute.findOne({
            rideId: ride._id,
            status: "completed",
          }).lean();

          if (completedUser) {
            return {
              rideId: ride._id,
              status: ride.status,
              date: ride.date,
              time: ride.rideStartTime,
              from: ride.source,
              to: ride.destination,
              completedUser: {
                name: completedUser.driverName,
                contact: completedUser.contactNumber,
                start: completedUser.startLocation,
                end: completedUser.endLocation,
                cost: completedUser.rideCost,
              },
            };
          }
        }

        // If not completed, return matchedUsers (those who requested/booked)
        const matchedUsers = (ride.matchedUsers || []).map((user) => ({
          name: user.name,
          contact: user.contactNumber,
          status: user.status,
          start: user.startLocation,
          end: user.endLocation,
          cost: user.rideCost,
          date: user.date,
          time: user.time,
        }));

        return {
          rideId: ride._id,
          status: ride.status,
          date: ride.date,
          time: ride.rideStartTime,
          from: ride.source,
          to: ride.destination,
          matchedUsers,
        };
      })
    );

    console.log(rideDetails);
    res.status(200).json({ rides: rideDetails });
  } catch (err) {
    console.error("Error fetching driver rides:", err);
    res.status(500).json({ message: "Server Error" });
  }
}



// async function handleGetMatchedRidesInDatabase(req, res) {
//   console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
//   const driverId = req.user.userId;
//   // console.log(driverId);
//   const rideDetails = await route.find({ driverId: driverId });
//   //  console.log(rideDetails);
//   let matchedUserRoutes = [];
//   let matchedDriverRouteId = [];
//   rideDetails.forEach((ride) => {
//     if (ride.status != "completed" && ride.matchedUsers.length > 0) {
//       ride.matchedUsers.forEach((matchedroutes) => {
//         if(matchedroutes.status === "requested")
//         {
//             matchedUserRoutes.push(matchedroutes);
//             matchedDriverRouteId.push(ride._id);
//         }
//       });
//     }
//   });

//   console.log("Matched users and their details:   ", matchedUserRoutes);
//   console.log("Matched Route Id:   ", matchedDriverRouteId);
//   return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
// }

// async function handleGetAcceptedRidesInDatabase(req, res) {
//   console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
//   const driverId = req.user.userid;
//   // console.log(driverId);
//   const rideDetails = await route.find({ driverId: driverId });
//   //  console.log(rideDetails);
//   let matchedUserRoutes = [];
//   let matchedDriverRouteId = [];
//   rideDetails.forEach((ride) => {
//     if (ride.status != "completed" && ride.matchedUsers.length > 0) {
//       // const start = ride.source;
//       // const end = ride.
//       ride.matchedUsers.forEach((matchedroutes) => {
//         if(matchedroutes.status === "accepted")
//         {
//             matchedUserRoutes.push(matchedroutes);
//             matchedDriverRouteId.push(ride._id);
//         }
//       });
//     }
//   });

//   console.log("Matched users and their details:   ", matchedUserRoutes);
//   console.log("Matched Route Id:   ", matchedDriverRouteId);
//   return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
// }

// async function handleGetDeclinedRidesInDatabase(req, res) {
//   console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
//   const driverId = req.user.userId;
//   console.log(driverId);
//   const rideDetails = await route.find({ driverId: driverId });
//    console.log(rideDetails);
//   let matchedUserRoutes = [];
//   let matchedDriverRouteId = [];
//   rideDetails.forEach((ride) => {
//     if (ride.status != "completed" && ride.matchedUsers.length > 0) {
//       ride.matchedUsers.forEach((matchedroutes) => {
//         if(matchedroutes.status === "declined")
//         {
//             matchedUserRoutes.push(matchedroutes);
//             matchedDriverRouteId.push(ride._id);
//         }
//       });
//     }
//   });

//   console.log("Matched users and their details:   ", matchedUserRoutes);
//   console.log("Matched Route Id:   ", matchedDriverRouteId);
//   return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
// }


// async function handleGetCompletedRidesInDatabase(req, res) {
//   console.log("Request to handleGetMatchedRidesInDatabase is obtained!!");
//   const driverId = req.user.userId;
//   console.log(driverId);
//   const rideDetails = await route.find({ driverId: driverId });
//    console.log(rideDetails);
//   let matchedUserRoutes = [];
//   let matchedDriverRouteId = [];
//   rideDetails.forEach((ride) => {
//     if (ride.status != "completed" && ride.matchedUsers.length > 0) {
//       ride.matchedUsers.forEach((matchedroutes) => {
//         if(matchedroutes.status === "completed")
//         {
//             matchedUserRoutes.push(matchedroutes);
//             matchedDriverRouteId.push(ride._id);
//         }
//       });
//     }
//   });

//   console.log("Matched users and their details:   ", matchedUserRoutes);
//   console.log("Matched Route Id:   ", matchedDriverRouteId);
//   return res.status(200).json({ matchedUserRoutes, matchedDriverRouteId });
// }

const handleEnterAcceptedRides = async (req, res) => {
  const { userId, routeId, rideCost, userRouteId } = req.body;
  console.log({ userId, routeId, rideCost, routeId });

  // const driverRoute = await route.findById(routeId);      //find ride matching

  const update = await route.findByIdAndUpdate(routeId, { status: "booked" });

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



module.exports = {
  handlePostOfferInDatabase,
  handleEnterAcceptedRides,
  handleEnterDeclinedRides,
  handleGetRideDetails,
};