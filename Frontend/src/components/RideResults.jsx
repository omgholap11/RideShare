// import React from 'react';
// import { Phone, MapPin, Clock, IndianRupee, User, Star ,Bike} from 'lucide-react';
// import { useLocation ,useNavigate, useNavigation} from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import { useEffect , useState} from 'react';


// const RideResults =  () => {

//   const checkAuthenticated = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/gettokendetails/get-token", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         console.error("Token fetch failed:", response.statusText);
//         return { role: null, userid: null };
//       }

//       const data = await response.json();
//       console.log("--->>" , data);
//       return { role: data.role, userid: data.userid };

//     } catch (error) {
//       console.error("Error fetching user role:", error);
//       return { role: null, userid: null };
//     }
//   };
  
  
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {rides , userStartLocation , userEndLocation , date , time} = location.state || {};

//     console.log("om  ",{rides , userStartLocation , userEndLocation , date , time});
//     // const handleSubmit = async (ride) => {
//       const handleSubmit = async (ride) => {
//         const {role , userid} = await checkAuthenticated();
//       console.log( {role , userid });
//         if (!userid || role === "driver") {
//           console.log("User is not authenticated!!!!");
//           navigate("/userlogin");
//           return;
//         }
//         console.log("Ride Id:", ride.rideId);
      
//         try {
//           const userData = {
//             startLocation: userStartLocation,
//             endLocation: userEndLocation,
//             rideId: ride.rideId,
//             rideCost : ride.rideCost,
//             date : date,
//             time : time
//           };
      
//           console.log(userData);
      
//           const response = await fetch("http://localhost:5001/offer/matchride", {
//             method: "POST",
//             credentials : "include",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData),
//           });
      
//           navigate("/ridebooksuccess", { state: { userStartLocation, userEndLocation, ride } });
//         } catch (error) {
//           console.log("Error faced while booking ride!!!", error);
//         }
//       };
    
//   if (!Array.isArray(rides)) {
//     console.error('Rides prop must be an array');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-indigo-100 py-8">
//       <div className="max-w-5xl mx-auto px-4">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
//           {rides.length > 0 ? 'Available Rides' : 'No Rides Available'}
//         </h1>

//         <div className="space-y-6">
//           {rides.map((ride) => (
//             <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
//               <div className="p-6">
//                 {/* Driver Info Section */}
//                 <div className="flex items-start space-x-6 mb-6">
//                   {/* Profile Photo Placeholder */}
//                   <div className="flex-shrink-0">
//                     <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
//                       <User className="w-8 h-8 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Driver Details */}
//                   <div className="flex-grow">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h2 className="text-xl font-semibold text-gray-800 mb-1">
//                           {ride.driverName}
//                         </h2>
//                         <div className="flex items-center space-x-4 text-sm">
//                           {/* <div className="flex items-center text-yellow-500">
//                             <Star size={16} className="fill-current" />
//                             <span className="ml-1 text-gray-600">4.8 (120 rides)</span>
//                           </div> */}
//                           <div className="flex items-center text-gray-600">
//                             <Phone size={16} className="mr-1" />
//                             <span>{ride.driverNumber}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <div className="flex items-center text-xl font-bold text-green-600 mb-1">
//                           <IndianRupee size={20} />
//                           <span>{ride.rideCost}</span>
//                         </div>
//                         <span className="text-sm text-gray-500"></span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Vehicle & Route Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* Left Column - Route Details */}
//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-3">
//                       <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">From</p>
//                         <p className="text-gray-700">{ride.rideStart}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">To</p>
//                         <p className="text-gray-700">{ride.rideEnd}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - Time & Vehicle Details */}
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3">
//                       <Clock className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">Departure Time</p>
//                         <p className="text-gray-700">{ride.rideStartTime}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Bike className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">Bike</p>
//                         <p className="text-gray-700">{ride.vehicleName}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Action Button */}
//                 <div className="flex items-center space-x-4">
//                   <button className="flex-grow bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center" onClick ={()=>{handleSubmit(ride)}}>
//                     Book Ride
//                   </button>
//                   <button className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 px-4 rounded-lg transition duration-300">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//               </div>
//           ))}
//         </div>

//         {rides.length === 0 && (
//           <div className="text-center py-12">
//             <div className="bg-red-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
//               <MapPin className="w-10 h-10 text-red-700" />
//             </div>
//             <p className="text-gray-600">
//               No rides are currently available for your route.
//               <br />
//               Please try again later or modify your search.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RideResults;


import React from 'react';
import { MapPin, Clock, IndianRupee, User, Star, Bike, Search, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RideResults = () => {
  const checkAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:5001/gettokendetails/get-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Token fetch failed:", response.statusText);
        return { role: null, userid: null };
      }

      const data = await response.json();
      console.log("--->>" , data);
      return { role: data.role, userid: data.userid };

    } catch (error) {
      console.error("Error fetching user role:", error);
      return { role: null, userid: null };
    }
  };
  
  const navigate = useNavigate();
  const location = useLocation();
  const {rides, userStartLocation, userEndLocation, date, time} = location.state || {};

  console.log("om  ",{rides, userStartLocation, userEndLocation, date, time});

  const handleSubmit = async (ride) => {
    const {role, userid} = await checkAuthenticated();
    console.log({role, userid});
    if (!userid || role === "driver") {
      console.log("User is not authenticated!!!!");
      navigate("/userlogin");
      return;
    }
    navigate("/ridedetails", {state : {ride , userStartLocation , userEndLocation , date , time}} );
    console.log("Ride Id:", ride.rideId);
  };

  const handleSearchRide = () => {
    navigate("/search-ride"); // Navigate to search page
  };
    
  if (!Array.isArray(rides)) {
    console.error('Rides prop must be an array');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Available Rides</h1>
              <p className="text-indigo-100">
                Found {rides.length} ride{rides.length !== 1 ? 's' : ''} for your journey
              </p>
            </div>
            <button 
              onClick={handleSearchRide}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Search size={20} />
              Search Ride
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {rides.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rides.map((ride, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="p-6">
                  {/* Driver Info Section */}
                  <div className="flex items-start space-x-4 mb-6">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-7 h-7 text-indigo-600" />
                      </div>
                    </div>

                    {/* Driver Details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                            {ride.driverName}
                          </h2>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                            <span>4.8 (120 rides)</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end ml-4">
                          <div className="flex items-center text-xl font-bold text-green-600 mb-1">
                            <IndianRupee size={18} />
                            <span>{ride.rideCost}</span>
                          </div>
                          <span className="text-sm text-gray-500">per seat</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Section */}
                  <div className="mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-500">From</p>
                          <p className="text-gray-800 font-medium break-words">{ride.rideStart}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="w-px h-6 bg-gray-300"></div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-500">To</p>
                          <p className="text-gray-800 font-medium break-words">{ride.rideEnd}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle & Time Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-500">Departure</p>
                        <p className="text-gray-800 font-medium text-sm">{ride.rideStartTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Bike className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-500">Vehicle</p>
                        <p className="text-gray-800 font-medium text-sm truncate">{ride.vehicleName}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button 
                    onClick={() => handleSubmit(ride)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    Check Out Ride
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Rides Available</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any rides for your route at the moment. 
              Try adjusting your search criteria or check back later.
            </p>
            <button 
              onClick={handleSearchRide}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
            >
              <Search size={18} />
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideResults;