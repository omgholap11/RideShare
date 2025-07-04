const axios = require('axios');
require("dotenv").config();

const API_KEY = process.env.OLA_MAPS_API_KEY; 
// const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMRndtX0U2akoyWG5yYkpkS1d1VXl2UllUN25lZ0FibDhWLXVSTno3UzZVIn0.eyJleHAiOjE3NDM0NTM3NTEsImlhdCI6MTc0MzQ1MDE1MSwianRpIjoiM2JhYzM4NWQtYWVmMS00OWFjLWE4YWEtNTVlZmRmMmFkZDNlIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50Lm9sYW1hcHMuaW8vcmVhbG1zL29sYW1hcHMiLCJzdWIiOiIxMTFmYzE4YS1jMzAyLTQ5M2EtYmM3NS05MjQ2NGUxYzNkYzkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI2YTZjZDg2Yy1jN2I0LTRhNzAtYTFiYi1jODNkMjI3OTZkNTYiLCJzY29wZSI6IiIsImNsaWVudEhvc3QiOm51bGwsIm9yZyI6Ik9SRy1kYTMwZDFmNi1jNzZlLTQ2Y2EtOWE2My04OGU4YmMyOWFhMjUiLCJvcmcxIjp7fSwicmVhbG0iOiJvbGFtYXBzIiwiY2xpZW50QWRkcmVzcyI6bnVsbCwic2JuIjoiU0JOLTI3YWU2NzZmLWFkZWUtNDU0MC1hMGY1LWZlN2FlOGZlMzI5ZSIsImNsaWVudF9pZCI6IjZhNmNkODZjLWM3YjQtNGE3MC1hMWJiLWM4M2QyMjc5NmQ1NiJ9.Dh30TBqowlkYuNHU3AAkYaNWIBMDTguGbN5AYZa6NKKYUvrZsfSSb0RI9OnozZRRM6deMVhjw25JpkTJuDfipJbE6EUwC_GRArPrAe_ecQPxgyS4xnP9uD19aT11IfGNk4RmC1GISEVrdrBGqbG_zuMLm_NYFGVYOmsNzmL0ij-_4gaqR-wSIPyEJq-5_grPdgX2Km91DHLflKgJc0j2PaVA05w1pBAXsYtuqSKx1brz5t61TJYnZ9PUY1CdCD5JReVuKBpztGoRGm-47jsK7-TWpk42Fq4e7rHVVQzN3vE-YiArD5MsNYl3Dt8xpEb0K0BLq0jCg-nZvC4dxM5A5Q'; // Replace with your actual bearer token
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