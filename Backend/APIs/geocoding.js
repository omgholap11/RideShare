const axios = require('axios');
require("dotenv").config();
const apiKey = process.env.OLA_MAPS_API_KEY;
// console.log("api key ",apiKey);
const getCoordinatesFromAddress = async (address) => {
  if (!address) {
    console.error('Address is required');
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.olamaps.io/places/v1/geocode?address=${encodedAddress}&language=English&api_key=${apiKey}`;
    
    const response = await axios.get(url, {
      headers: {
        'Origin': 'http://localhost:5173',
        'Accept': 'application/json'
      }
    });

    if (response.data.status === 'ok' && response.data.geocodingResults && response.data.geocodingResults.length > 0) {
      const location = response.data.geocodingResults[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    console.error('No valid location data in response:', response.data);
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error.response?.data || error.message);
    return null;
  }
};

const getCoords = async (address1, address2) => {
  try {
    const coordinates1 = await getCoordinatesFromAddress(address1);
    const coordinates2 = await getCoordinatesFromAddress(address2);
    
    console.log('Coordinates found:', {
      start: coordinates1,
      end: coordinates2
    });
    
    return { 
      start: coordinates1, 
      end: coordinates2 
    };
  } catch (error) {
    console.error('Error in getCoords:', error);
    return null;
  }
};


// const startLocation = "Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India";
// const endLocation = "Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India";

// console.log("Processing locations:", { startLocation, endLocation });

// const coordinates =  getCoords(startLocation, endLocation);

module.exports = { getCoords };