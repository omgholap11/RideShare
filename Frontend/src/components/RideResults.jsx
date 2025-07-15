import React from 'react';
import { Phone, MapPin, Clock, IndianRupee, User, Star ,Bike} from 'lucide-react';
import { useLocation ,useNavigate, useNavigation} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect , useState} from 'react';


const RideResults =  () => {

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
    const {rides , userStartLocation , userEndLocation , date , time} = location.state || {};

    console.log("om  ",{rides , userStartLocation , userEndLocation , date , time});
    // const handleSubmit = async (ride) => {
      const handleSubmit = async (ride) => {
        const {role , userid} = await checkAuthenticated();
      console.log( {role , userid });
        if (!userid || role === "driver") {
          console.log("User is not authenticated!!!!");
          navigate("/userlogin");
          return;
        }
        console.log("Ride Id:", ride.rideId);
      
        try {
          const userData = {
            startLocation: userStartLocation,
            endLocation: userEndLocation,
            rideId: ride.rideId,
            rideCost : ride.rideCost,
            date : date,
            time : time
          };
      
          console.log(userData);
      
          const response = await fetch("http://localhost:5001/offer/matchride", {
            method: "POST",
            credentials : "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
      
          navigate("/ridebooksuccess", { state: { userStartLocation, userEndLocation, ride } });
        } catch (error) {
          console.log("Error faced while booking ride!!!", error);
        }
      };
    
  if (!Array.isArray(rides)) {
    console.error('Rides prop must be an array');
    return null;
  }

  return (
    <div className="min-h-screen bg-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {rides.length > 0 ? 'Available Rides' : 'No Rides Available'}
        </h1>

        <div className="space-y-6">
          {rides.map((ride) => (
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
              <div className="p-6">
                {/* Driver Info Section */}
                <div className="flex items-start space-x-6 mb-6">
                  {/* Profile Photo Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>

                  {/* Driver Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                          {ride.driverName}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm">
                          {/* <div className="flex items-center text-yellow-500">
                            <Star size={16} className="fill-current" />
                            <span className="ml-1 text-gray-600">4.8 (120 rides)</span>
                          </div> */}
                          <div className="flex items-center text-gray-600">
                            <Phone size={16} className="mr-1" />
                            <span>{ride.driverNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-xl font-bold text-green-600 mb-1">
                          <IndianRupee size={20} />
                          <span>{ride.rideCost}</span>
                        </div>
                        <span className="text-sm text-gray-500"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle & Route Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Route Details */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">From</p>
                        <p className="text-gray-700">{ride.rideStart}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">To</p>
                        <p className="text-gray-700">{ride.rideEnd}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Time & Vehicle Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Departure Time</p>
                        <p className="text-gray-700">{ride.rideStartTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bike className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bike</p>
                        <p className="text-gray-700">{ride.vehicleName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex items-center space-x-4">
                  <button className="flex-grow bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center" onClick ={()=>{handleSubmit(ride)}}>
                    Book Ride
                  </button>
                  <button className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 px-4 rounded-lg transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
              </div>
          ))}
        </div>

        {rides.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-red-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-red-700" />
            </div>
            <p className="text-gray-600">
              No rides are currently available for your route.
              <br />
              Please try again later or modify your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideResults;
