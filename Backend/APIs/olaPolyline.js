const axios = require('axios');
require("dotenv").config();

const API_KEY = process.env.OLA_MAPS_API_KEY; 
const BEARER_TOKEN = process.env.BEARER_TOKEN;
/**
 * Fetches route directions between two geographic coordinates.
 * @param {Object} origin - The starting point with latitude and longitude.
 * @param {Object} destination - The ending point with latitude and longitude.
 */
async function getRouteDirections(origin, destination) {
  const url = 'https://api.olamaps.io/routing/v1/directions';
  const params = {
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    mode: 'driving',
    alternatives: 'false',
    steps: 'true',
    overview: 'full',
    language: 'en',
    traffic_metadata: 'false',
    api_key: API_KEY,
  };

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Origin': 'http://localhost:5001'
  };

  try {
    const response = await axios.post(url, null, { params, headers });
    console.log('Route Directions:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching route directions:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Example usage:
// const origin = { lat: 12.993103152916301, lng: 77.54332622119354 };
// const destination = { lat: 12.972006793201695, lng: 77.5800850011884 };

// getRouteDirections(origin, destination);

// getRouteDirections({ lat: 12.993103152916301, lng: 77.54332622119354 },{ lat: 12.972006793201695, lng: 77.5800850011884 })
//   .then((polyline) => 
//  { console.log("Polyline:", polyline);
//   console.log(polyline.routes[0].legs[0].distance);
//   console.log(polyline.routes[0].legs[0].duration);
//   console.log(polyline.routes[0].overview_polyline);
// }
// ).catch((error) => console.error("Failed to get route:", error));


module.exports = {getRouteDirections};