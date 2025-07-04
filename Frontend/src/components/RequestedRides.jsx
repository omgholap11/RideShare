import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Check, X, Car, Route, IndianRupee, Calendar, Clock, Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

// Empty states for each tab
const EmptyRideState = ({ type }) => {
  const messages = {
    requested: {
      title: "No Ride Requests",
      description: "You haven't received any ride requests yet.",
      question: "Have you published a ride?",
      buttonText: "Publish Ride",
      icon: <Car className="w-24 h-24 text-gray-400 mb-6" />
    },
    accepted: {
      title: "No Accepted Rides",
      description: "You haven't accepted any ride requests yet.",
      question: "Check your requested rides tab for pending requests.",
      buttonText: "View Requests",
      icon: <Check className="w-24 h-24 text-gray-400 mb-6" />
    },
    rejected: {
      title: "No Rejected Rides",
      description: "You haven't rejected any ride requests.",
      question: "All your ride requests are still pending or accepted.",
      buttonText: "View Requests",
      icon: <X className="w-24 h-24 text-gray-400 mb-6" />
    }
  };

  const content = messages[type];

  return (
    <div className="flex flex-col m-8 items-center justify-center p-8 bg-indigo-100 rounded-xl">
      {content.icon}
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        {content.title}
      </h2>
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          {content.description}
        </p>
        <p className="text-gray-600">{content.question}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg 
          hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
        >
          <Route className="mr-2" />
          {content.buttonText}
        </button>
      </div>
    </div>
  );
};

// Loading state component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center p-16">
    <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 text-lg">Loading rides...</p>
  </div>
);

// Error state component
const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl m-8">
    <X className="w-16 h-16 text-red-500 mb-4" />
    <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to load rides</h3>
    <p className="text-gray-600 mb-4">{message || "Please try again later."}</p>
    <button 
      onClick={onRetry}
      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Modal for accept/reject actions
const ActionModal = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;
  
  const isAccept = type === 'accept';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Square modal */}
      <div className="bg-white rounded-lg shadow-xl z-10 w-80 h-80 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className={`${isAccept ? 'bg-green-100' : 'bg-red-100'} p-5 rounded-full mb-6`}>
          {isAccept ? (
            <Check className="w-14 h-14 text-green-600" />
          ) : (
            <X className="w-14 h-14 text-red-600" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {isAccept ? 'Ride Accepted!' : 'Ride Declined'}
        </h3>
        <p className="text-gray-700 text-lg mb-2">
          {isAccept 
            ? 'Your journey together will be amazing!' 
            : 'No problem, there will be other opportunities.'}
        </p>
        <p className="text-gray-600">
          {isAccept 
            ? 'The passenger has been notified about your decision. Safe travels!' 
            : 'The passenger has been notified about your decision.'}
        </p>
      </div>
    </div>
  );
};

// Request ride card with action buttons
const RideRequestCard = ({
  userName,
  cost,
  startPoint,
  endPoint,
  contactNumber,
  onAccept,
  onDecline,
  date,
  time
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  
  useEffect(() => {
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {};
  }, []);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);
  
  const handleAccept = () => {
    setModalType('accept');
    setShowModal(true);
    onAccept();
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };
  
  const handleDecline = () => {
    setModalType('decline');
    setShowModal(true);
    onDecline();
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden 
        shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <User className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">{userName}</h3>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <IndianRupee className="w-4 h-4 text-white" />
                <p className="text-white font-bold text-xl ml-1">{cost}</p>
              </div>
            </div>
          </div>
        </div>
    
        <div className="p-5 space-y-4">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">Date</span>
              <p className="text-gray-800 font-semibold">{date || "March 29, 2025"}</p>
            </div>
          </div>
    
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-purple-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">Time</span>
              <p className="text-gray-800 font-semibold">{time || "10:30 AM"}</p>
            </div>
          </div>
    
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">From</span>
              <p className="text-gray-800 font-semibold">{startPoint}</p>
            </div>
          </div>
    
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">To</span>
              <p className="text-gray-800 font-semibold">{endPoint}</p>
            </div>
          </div>
    
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">Contact</span>
              <p className="text-gray-800 font-semibold">{contactNumber}</p>
            </div>
          </div>
    
          <div className="flex space-x-4 pt-2">
            <button
              onClick={handleAccept}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg 
              hover:bg-green-800 transition-colors flex items-center justify-center 
              space-x-2 font-semibold"
            >
              <Check className="w-5 h-5" />
              <span>Accept</span>
            </button>
  
            <button
              onClick={handleDecline}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg 
              hover:bg-red-800 transition-colors flex items-center justify-center 
              space-x-2 font-semibold"
            >
              <X className="w-5 h-5" />
              <span>Decline</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <ActionModal 
        isOpen={showModal}
        type={modalType}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

// View-only ride card for accepted/rejected rides
const RideInfoCard = ({
  userName,
  cost,
  startPoint,
  endPoint,
  contactNumber,
  date,
  time,
  status
}) => {
  const statusColors = {
    accepted: "bg-gradient-to-r from-green-700 to-green-800",
    rejected: "bg-gradient-to-r from-red-700 to-red-800"
  };

  const statusBadge = {
    accepted: <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium text-sm">Accepted</div>,
    rejected: <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium text-sm">Rejected</div>
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden 
      shadow-md transform transition-all duration-300 hover:scale-[1.01]"
    >
      <div className={`${statusColors[status]} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <User className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">{userName}</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <IndianRupee className="w-4 h-4 text-white" />
                <p className="text-white font-bold text-xl ml-1">{cost}</p>
              </div>
            </div>
            {statusBadge[status]}
          </div>
        </div>
      </div>
  
      <div className="p-5 space-y-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <span className="text-sm text-gray-500">Date</span>
            <p className="text-gray-800 font-semibold">{date || "March 29, 2025"}</p>
          </div>
        </div>
  
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-purple-500 mr-3" />
          <div>
            <span className="text-sm text-gray-500">Time</span>
            <p className="text-gray-800 font-semibold">{time || "10:30 AM"}</p>
          </div>
        </div>

        { status === "accepted" &&
        (<div className="flex items-center">
            <Phone className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <span className="text-sm text-gray-500">Contact</span>
              <p className="text-gray-800 font-semibold">{contactNumber}</p>
            </div>
         </div>)}
  
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-gray-800 font-semibold">{startPoint}</p>
          </div>
        </div>
  
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-red-500 mr-3" />
          <div>
            <span className="text-sm text-gray-500">To</span>
            <p className="text-gray-800 font-semibold">{endPoint}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchUserRole = async () => {
  try {
    const response = await fetch("http://localhost:5001/user/get-token", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent
    });

    if (!response.ok) {
      console.error("Token fetch failed:", response.statusText);
      return { role: null, userid: null };
    }

    const data = await response.json();
    return { role: data.role, userid: data.userid }; // "driver" | "user" | null
  } catch (error) {
    console.error("Error fetching user role:", error);
    return { role: null, userid: null };
  }
};

const RideManagement = () => {
  const [activeTab, setActiveTab] = useState("requested");
  const [userId, setUserId] = useState(null);
  
  // Get location state
  const location = useLocation();
  const { matchedUserRoutes = [], matchedDriverRouteId = [] } = location.state || {};
  
  // State for all ride types
  const [requestedRides, setRequestedRides] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize with data and fetch user info
  useEffect(() => {
    const initialize = async () => {
      try {
        const { userid } = await fetchUserRole();
        if (!userid) {
          setError("Unable to authenticate. Please log in again.");
          setLoading(false);
          return;
        }
        
        setUserId(userid);
        // Set initial requested rides from location state
        setRequestedRides(matchedUserRoutes || []);
        // Fetch initial data
        await fetchRequestedRides(userid);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing:", error);
        setError("Failed to load initial data.");
        setLoading(false);
      }
    };
    
    initialize();
  }, [matchedUserRoutes]);
  
  // Function to fetch requested rides
  const fetchRequestedRides = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const id = uid || userId;
      if (!id) {
        throw new Error("User ID not available");
      }
      
      // You'll need to implement this endpoint in your backend
      const response = await fetch("http://localhost:5001/offer/getrequestedrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: id }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch requested rides");
      }
      
      const data = await response.json();
      setRequestedRides(data.matchedUserRoutes || []);
      console.log(data.matchedUserRoutes);
      setActiveTab("requested");
    } catch (error) {
      console.error("Error fetching requested rides:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch accepted rides
  const fetchAcceptedRides = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        throw new Error("User ID not available");
      }
      
      const response = await fetch("http://localhost:5001/offer/getacceptedrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch accepted rides");
      }
      
      const data = await response.json();
      setAcceptedRides(data.matchedUserRoutes || []);
      setActiveTab("accepted");
    } catch (error) {
      console.error("Error fetching accepted rides:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch rejected rides
  const fetchRejectedRides = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        throw new Error("User ID not available");
      }
      
      const response = await fetch("http://localhost:5001/offer/getdeclinedrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch declined rides");
      }
      
      const data = await response.json();
      setRejectedRides(data.matchedUserRoutes || []);
      setActiveTab("rejected");
    } catch (error) {
      console.error("Error fetching declined rides:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRide = async (ride, routeId) => {
    try {
      setLoading(true);
      
      const userData = {
        userId: ride.userId,
        routeId: routeId,
        rideCost: ride.rideCost,
        userRouteId : ride.userRouteId,
      };
      
      const response = await fetch(
        "http://localhost:5001/book/enteracceptedrides",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to accept ride");
      }

      // Update local state optimistically
      setRequestedRides(prev => prev.filter(r => r.userId !== ride.userId));
      
      // Add to accepted rides immediately
      setAcceptedRides(prev => [...prev, ride]);
      
      // Refresh data in background
      await fetchRequestedRides();
      
    } catch (error) {
      console.error("Error accepting ride:", error);
      setError("Failed to accept ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineRide = async (ride, routeId) => {
    try {
      setLoading(true);
      
      const userData = {
        userId: ride.userId,
        routeId: routeId,
        rideCost: ride.rideCost,
        userRouteId : ride.userRouteId,
      };
      
      const response = await fetch(
        "http://localhost:5001/book/enterdeclinedrides",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline ride");
      }
      
      // Update local state optimistically
      setRequestedRides(prev => prev.filter(r => r.userId !== ride.userId));
      
      // Add to rejected rides immediately
      setRejectedRides(prev => [...prev, ride]);
      
      // Refresh data in background
      await fetchRequestedRides();
      
    } catch (error) {
      console.error("Error declining ride:", error);
      setError("Failed to decline ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    // Show loading state if loading
    if (loading) {
      return <LoadingState />;
    }
    
    // Show error state if there's an error
    if (error) {
      return (
        <ErrorState 
          message={error} 
          onRetry={() => {
            if (activeTab === "requested") fetchRequestedRides();
            else if (activeTab === "accepted") fetchAcceptedRides();
            else if (activeTab === "rejected") fetchRejectedRides();
          }} 
        />
      );
    }
    
    switch (activeTab) {
      case "requested":
        return (
          <>
            {requestedRides.length === 0 ? (
              <EmptyRideState type="requested" />
            ) : (
              <div className="space-y-4">
                {requestedRides.map((request, index) => (
                  <RideRequestCard
                    key={request.userId || index}
                    userName={request.name}
                    cost={request.rideCost}
                    startPoint={request.startLocation}
                    endPoint={request.endLocation}
                    contactNumber={request.contactNumber}
                    date={request.date}
                    time={request.time}
                    onAccept={() => handleAcceptRide(request, matchedDriverRouteId[index])}
                    onDecline={() => handleDeclineRide(request, matchedDriverRouteId[index])}
                  />
                ))}
              </div>
            )}
          </>
        );
      case "accepted":
        return (
          <>
            {acceptedRides.length === 0 ? (
              <EmptyRideState type="accepted" />
            ) : (
              <div className="space-y-4">
                {acceptedRides.map((ride, index) => (
                  <RideInfoCard
                    key={ride.userId || index}
                    userName={ride.name}
                    cost={ride.rideCost}
                    startPoint={ride.startLocation}
                    endPoint={ride.endLocation}
                    contactNumber={ride.contactNumber}
                    date={ride.date}
                    time={ride.time}
                    status="accepted"
                  />
                ))}
              </div>
            )}
          </>
        );
      case "rejected":
        return (
          <>
            {rejectedRides.length === 0 ? (
              <EmptyRideState type="rejected" />
            ) : (
              <div className="space-y-4">
                {rejectedRides.map((ride, index) => (
                  <RideInfoCard
                    key={ride.userId || index}
                    userName={ride.name}
                    cost={ride.rideCost}
                    startPoint={ride.startLocation}
                    endPoint={ride.endLocation}
                    date={ride.date}
                    time={ride.time}
                    status="rejected"
                  />
                ))}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  // Handle tab switching
  const handleTabChange = (tab) => {
    if (tab === activeTab) return; // Don't reload if already on this tab
    
    if (tab === "requested") {
      fetchRequestedRides();
    } else if (tab === "accepted") {
      fetchAcceptedRides();
    } else if (tab === "rejected") {
      fetchRejectedRides();
    }
  };

  return (
    <div className="bg-indigo-100 p-7 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl overflow-hidden flex mb-4 shadow-md">
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === "requested"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleTabChange("requested")}
            disabled={loading}
          >
            Requested Rides
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === "accepted"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleTabChange("accepted")}
            disabled={loading}
          >
            Accepted Rides
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              activeTab === "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleTabChange("rejected")}
            disabled={loading}
          >
            Rejected Rides
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {activeTab === "requested" && "Ride Requests"}
            {activeTab === "accepted" && "Accepted Rides"}
            {activeTab === "rejected" && "Rejected Rides"}
          </h2>
          
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default RideManagement;