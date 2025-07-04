
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MapPin, Clock, Phone, IndianRupee, Calendar } from 'lucide-react';
import { Bell, Search, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserNotification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationRequests = location.state?.requests || [];
  const [requests, setRequests] = useState(locationRequests);
  const [isempty, setIsEmpty] = useState(locationRequests.length === 0);

  const navigateBookRidePage = () => {
    navigate("/book");
  };

  const handleDeleteNotification = async (ride) => {
    console.log("Ride completed:", ride);
    try {
      const response = await fetch("http://localhost:5001/book/postcompletedrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ride }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/driverfeedback");
      } else {
        console.log("Failed to mark ride as completed.");
      }
    } catch (error) {
      console.log("Error while marking ride as completed:", error.message);
    }
  };

  const handleDeleteNotification2 = async (ride) => {
    console.log("Ride completed:", ride);
    try {
      const response = await fetch("http://localhost:5001/book/postcompletedrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ride }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/book");
      } else {
        console.log("Failed to mark ride as completed.");
      }
    } catch (error) {
      console.log("Error while marking ride as completed:", error.message);
    }
  };

  return (
    <>
      {isempty ? (
        <div className="min-h-screen bg-indigo-100 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            {/* Animation for bell notification */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="animate-ping absolute h-8 w-8 rounded-full bg-blue-400 opacity-30"></div>
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-md">
                  <Bell size={32} className="text-blue-500" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
              No Notifications Yet
            </h2>
            
            <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
              You don't have any notifications at the moment. If you've booked a ride, stay tuned as users will connect with you shortly.
            </p>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full"></div>
              <div className="px-4 text-gray-500 text-sm whitespace-nowrap">What's Next?</div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full"></div>
            </div>
            
            {/* Suggestions with subtle animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Search size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Search for a Ride</h3>
                  <p className="text-gray-600 text-sm">Haven't booked a ride yet? Search for available options that match your route.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start">
                <div className="p-3 rounded-full bg-indigo-100 mr-4">
                  <Clock size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Wait for Connections</h3>
                  <p className="text-gray-600 text-sm">If you've already booked, riders will connect with you shortly via notifications.</p>
                </div>
              </div>
            </div>
            
            {/* Interactive buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                className="px-6 py-3 bg-black hover:bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-300 shadow-md"
                onClick={navigateBookRidePage}
              >
                <MapPin size={18} className="mr-2" />
                Find a Ride
              </button>
              
              <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 border border-gray-200 shadow-sm">
                View Bookings
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            
            {/* Subtle animation at bottom */}
            <div className="mt-12 flex justify-center">
              <div className="text-sm text-gray-500 flex items-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                Checking for new notifications...
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-indigo-100 min-h-screen p-4 flex justify-center">
          <div className="w-full max-w-3xl">
            {requests.map((ride, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
                {ride.status === 'accepted' ? (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-2 rounded-full mr-4">
                        <CheckCircle className="text-green-600 h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Ride Accepted!</h2>
                        <p className="text-gray-600">Rider {ride.driverName} has accepted your ride. They will connect with you instantly.</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center mb-4">
                        <img 
                          src="gholaprohit75@gmail.com.jpg" 
                          alt={`Driver ${ride.driverName}`} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-800 text-lg">{ride.driverName}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <MapPin className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rider's source</p>
                          <p className="text-gray-700">{ride.startLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <MapPin className="text-purple-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rider's Destination</p>
                          <p className="text-gray-700">{ride.endLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                          <Clock className="text-amber-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ride Start Time</p>
                          <p className="text-gray-700">{ride.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 p-2 rounded-full mr-3">
                          <Calendar className="text-indigo-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-gray-700">{ride.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Phone className="text-green-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p className="text-gray-700">{ride.contactNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="bg-cyan-100 p-2 rounded-full mr-3">
                          <IndianRupee className="text-cyan-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated Fare</p>
                          <p className="text-gray-700">{ride.rideCost}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        onClick={() => handleDeleteNotification(ride)}
                      >
                        Ride Completed
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors">
                        Message
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="bg-red-100 p-2 rounded-full mr-4">
                        <XCircle className="text-red-600 h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Ride Declined</h2>
                        <p className="text-gray-600">Sorry, your ride was rejected by {ride.driverName}. No issue, you can seek another ride.</p>
                      </div>
                    </div>
                    
                    <button 
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      onClick={() => handleDeleteNotification2(ride)}
                    >
                      Find Another Ride
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserNotification;