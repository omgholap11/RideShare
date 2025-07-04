const axios = require('axios');
require("dotenv").config();
/**
 * Get route information between start and end locations using Ola Maps
 * @param {Object} start - Starting location object with lat and lng properties
 * @param {Object} end - Ending location object with lat and lng properties
 * @param {string} apiKey - Your Ola Maps API key
 * @returns {Promise<Object>} - Promise resolving to object with polyline, distance, and duration
 */

const apiKey = process.env.OLA_MAPS_API_KEY;
async function getRouteInfo(start, end, apiKey) {

  if (!start || !start.lat || !start.lng || !end || !end.lat || !end.lng) {
    throw new Error("Invalid start or end location. Both must have lat and lng properties.");
  }
  if (!apiKey) {
    throw new Error("API key is required.");
  }

  try {
    const url = "https://api.olamaps.io/routing/v1/routeOptimizer";

    const response = await axios({
      method: 'POST',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173', // Replace with your domain
        'Authorization': `Bearer ${BEARER_TOKEN}`},
      data: {
        locations: `${start.lat}%2C${start.lng}%7C${end.lat}%2C${end.lng}`,
        source: "first",
        destination: "last",
        round_trip: false,
        mode: "driving",
        steps: true,
        overview: "full",
        language: "en",
        traffic_metadata: false,
        api_key : apiKey
      }
    });

    const data = response.data;

    // Check if the route was found
    if (data.status !== "OK" || !data.routes || !data.routes[0]) {
      throw new Error("No route found or invalid response from Ola Maps API");
    }

    
    const route = data.routes[0];
    const leg = route.legs[0]; 

    return {
      polyline: route.overview_polyline,
      distance: {
        value: leg.distance,
        text: leg.readable_distance 
      },
      duration: {
        value: leg.duration,
        text: leg.readable_duration 
      },
      steps: leg.steps 
    };
  } catch (error) {
    
    if (error.response) {
      
      throw new Error(`Route API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      
      throw new Error('No response received from route API');
    } else {

      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}


getRouteInfo(
  { lat: 12.909342, lng: 77.62168 },
  { lat: 12.933972, lng: 77.611342 },
  apiKey 
)
  .then(result => console.log('Route details:', result))
  .catch(error => console.error('Failed to get route:', error.message));


  module.exports = { getRouteInfo };