const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.RADAR

const API_URL = "https://api.radar.io/v1/route/optimize";  // Using your original endpoint
// const API_KEY = "prj_test_pk_a61703be1c766338fc3fa8513eac0a4324be0d48";
// const API_KEY = "prj_test_pk_949e413146c059c19867b3495660255720c3a72d";

const API_KEY = process.env.NEW_RADAR_MAP_API2;

const getOptimizedRoute = async (startCoordinates, endCoordinates) => {
  try {
    const locations = `${startCoordinates}|${endCoordinates}`;  // Dynamically setting locations

    const response = await axios.get(API_URL, {
      headers: { 
        Authorization: `${API_KEY}` 
      },
      params: {
        locations: locations,
        mode: "bike",  
        units: "metric",
        geometry: "polyline",
      },
    });
    
    console.log("Full response structure:", Object.keys(response.data));

    const routeData = response.data.route;
    if (routeData) {
      console.log("Route data keys:", Object.keys(routeData));
      
      if (routeData.legs && routeData.legs.length > 0 && routeData.legs[0].geometry)  {
        console.log("Complete Route Details:", JSON.stringify(routeData, null, 2));
        return routeData; // Return the polyline correctly
      } else {
        console.log("No direct geometry field. Full route data:", JSON.stringify(routeData, null, 2));
        return JSON.stringify(routeData, null, 2);
      }
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.statusText);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Error fetching route:", error.message);
    }
    return null;
  }
};

// Example usage:
//  { lat: 12.909342, lng: 77.62168 },
  // { lat: 12.933972, lng: 77.611342 },
// getOptimizedRoute("18.4482, 73.8584","18.6249, 73.8515")
//   .then((polyline) => console.log("Polyline:", polyline))
//   .catch((error) => console.error("Failed to get route:", error));

// getOptimizedRoute("12.909342, 77.62168","12.933972, 77.611342")
//   .then((polyline) => console.log("Polyline:", polyline))
//   .catch((error) => console.error("Failed to get route:", error));




module.exports = { getOptimizedRoute };