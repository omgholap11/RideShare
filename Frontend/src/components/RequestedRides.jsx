// import React, { useState, useEffect } from "react";
// import { MapPin, Phone, User, Check, X, Car, Route, IndianRupee, Calendar, Clock, Loader } from "lucide-react";
// import { useLocation } from "react-router-dom";

// // Empty states for each tab
// const EmptyRideState = ({ type }) => {
//   const messages = {
//     requested: {
//       title: "No Ride Requests",
//       description: "You haven't received any ride requests yet.",
//       question: "Have you published a ride?",
//       buttonText: "Publish Ride",
//       icon: <Car className="w-24 h-24 text-gray-400 mb-6" />
//     },
//     accepted: {
//       title: "No Accepted Rides",
//       description: "You haven't accepted any ride requests yet.",
//       question: "Check your requested rides tab for pending requests.",
//       buttonText: "View Requests",
//       icon: <Check className="w-24 h-24 text-gray-400 mb-6" />
//     },
//     rejected: {
//       title: "No Rejected Rides",
//       description: "You haven't rejected any ride requests.",
//       question: "All your ride requests are still pending or accepted.",
//       buttonText: "View Requests",
//       icon: <X className="w-24 h-24 text-gray-400 mb-6" />
//     }
//   };

//   const content = messages[type];

//   return (
//     <div className="flex flex-col m-8 items-center justify-center p-8 bg-indigo-100 rounded-xl">
//       {content.icon}
//       <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
//         {content.title}
//       </h2>
//       <div className="text-center space-y-2">
//         <p className="text-gray-600">
//           {content.description}
//         </p>
//         <p className="text-gray-600">{content.question}</p>
//         <button
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg
//           hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
//         >
//           <Route className="mr-2" />
//           {content.buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Loading state component
// const LoadingState = () => (
//   <div className="flex flex-col items-center justify-center p-16">
//     <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
//     <p className="text-gray-600 text-lg">Loading rides...</p>
//   </div>
// );

// // Error state component
// const ErrorState = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl m-8">
//     <X className="w-16 h-16 text-red-500 mb-4" />
//     <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to load rides</h3>
//     <p className="text-gray-600 mb-4">{message || "Please try again later."}</p>
//     <button
//       onClick={onRetry}
//       className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//     >
//       Try Again
//     </button>
//   </div>
// );

// // Modal for accept/reject actions
// const ActionModal = ({ isOpen, type, onClose }) => {
//   if (!isOpen) return null;

//   const isAccept = type === 'accept';

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop with blur */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       ></div>

//       {/* Square modal */}
//       <div className="bg-white rounded-lg shadow-xl z-10 w-80 h-80 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
//         <div className={`${isAccept ? 'bg-green-100' : 'bg-red-100'} p-5 rounded-full mb-6`}>
//           {isAccept ? (
//             <Check className="w-14 h-14 text-green-600" />
//           ) : (
//             <X className="w-14 h-14 text-red-600" />
//           )}
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-3">
//           {isAccept ? 'Ride Accepted!' : 'Ride Declined'}
//         </h3>
//         <p className="text-gray-700 text-lg mb-2">
//           {isAccept
//             ? 'Your journey together will be amazing!'
//             : 'No problem, there will be other opportunities.'}
//         </p>
//         <p className="text-gray-600">
//           {isAccept
//             ? 'The passenger has been notified about your decision. Safe travels!'
//             : 'The passenger has been notified about your decision.'}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Request ride card with action buttons
// const RideRequestCard = ({
//   userName,
//   cost,
//   startPoint,
//   endPoint,
//   contactNumber,
//   onAccept,
//   onDecline,
//   date,
//   time
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState('');

//   useEffect(() => {
//     // Add CSS for fade-in animation
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes fadeIn {
//         from { opacity: 0; transform: scale(0.95); }
//         to { opacity: 1; transform: scale(1); }
//       }
//       .animate-fade-in {
//         animation: fadeIn 0.3s ease-out forwards;
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {};
//   }, []);

//   // Prevent body scrolling when modal is open
//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showModal]);

//   const handleAccept = () => {
//     setModalType('accept');
//     setShowModal(true);
//     onAccept();
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000);
//   };

//   const handleDecline = () => {
//     setModalType('decline');
//     setShowModal(true);
//     onDecline();
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000);
//   };

//   return (
//     <>
//       <div
//         className="bg-white border border-gray-200 rounded-2xl overflow-hidden
//         shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
//       >
//         <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="bg-white/20 p-3 rounded-full mr-4">
//                 <User className="text-white w-7 h-7" />
//               </div>
//               <h3 className="text-xl font-bold text-white">{userName}</h3>
//             </div>
//             <div className="bg-white/10 px-4 py-2 rounded-lg">
//               <div className="flex items-center">
//                 <IndianRupee className="w-4 h-4 text-white" />
//                 <p className="text-white font-bold text-xl ml-1">{cost}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-5 space-y-4">
//           <div className="flex items-center">
//             <Calendar className="w-6 h-6 text-blue-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">Date</span>
//               <p className="text-gray-800 font-semibold">{date || "March 29, 2025"}</p>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <Clock className="w-6 h-6 text-purple-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">Time</span>
//               <p className="text-gray-800 font-semibold">{time || "10:30 AM"}</p>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <MapPin className="w-6 h-6 text-green-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">From</span>
//               <p className="text-gray-800 font-semibold">{startPoint}</p>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <MapPin className="w-6 h-6 text-red-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">To</span>
//               <p className="text-gray-800 font-semibold">{endPoint}</p>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <Phone className="w-6 h-6 text-blue-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">Contact</span>
//               <p className="text-gray-800 font-semibold">{contactNumber}</p>
//             </div>
//           </div>

//           <div className="flex space-x-4 pt-2">
//             <button
//               onClick={handleAccept}
//               className="flex-1 bg-green-600 text-white py-3 rounded-lg
//               hover:bg-green-800 transition-colors flex items-center justify-center
//               space-x-2 font-semibold"
//             >
//               <Check className="w-5 h-5" />
//               <span>Accept</span>
//             </button>

//             <button
//               onClick={handleDecline}
//               className="flex-1 bg-red-600 text-white py-3 rounded-lg
//               hover:bg-red-800 transition-colors flex items-center justify-center
//               space-x-2 font-semibold"
//             >
//               <X className="w-5 h-5" />
//               <span>Decline</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <ActionModal
//         isOpen={showModal}
//         type={modalType}
//         onClose={() => setShowModal(false)}
//       />
//     </>
//   );
// };

// // View-only ride card for accepted/rejected rides
// const RideInfoCard = ({
//   userName,
//   cost,
//   startPoint,
//   endPoint,
//   contactNumber,
//   date,
//   time,
//   status
// }) => {
//   const statusColors = {
//     accepted: "bg-gradient-to-r from-green-700 to-green-800",
//     rejected: "bg-gradient-to-r from-red-700 to-red-800"
//   };

//   const statusBadge = {
//     accepted: <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium text-sm">Accepted</div>,
//     rejected: <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium text-sm">Rejected</div>
//   };

//   return (
//     <div
//       className="bg-white border border-gray-200 rounded-2xl overflow-hidden
//       shadow-md transform transition-all duration-300 hover:scale-[1.01]"
//     >
//       <div className={`${statusColors[status]} p-4`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="bg-white/20 p-3 rounded-full mr-4">
//               <User className="text-white w-7 h-7" />
//             </div>
//             <h3 className="text-xl font-bold text-white">{userName}</h3>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="bg-white/10 px-4 py-2 rounded-lg">
//               <div className="flex items-center">
//                 <IndianRupee className="w-4 h-4 text-white" />
//                 <p className="text-white font-bold text-xl ml-1">{cost}</p>
//               </div>
//             </div>
//             {statusBadge[status]}
//           </div>
//         </div>
//       </div>

//       <div className="p-5 space-y-4">
//         <div className="flex items-center">
//           <Calendar className="w-6 h-6 text-blue-500 mr-3" />
//           <div>
//             <span className="text-sm text-gray-500">Date</span>
//             <p className="text-gray-800 font-semibold">{date || "March 29, 2025"}</p>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <Clock className="w-6 h-6 text-purple-500 mr-3" />
//           <div>
//             <span className="text-sm text-gray-500">Time</span>
//             <p className="text-gray-800 font-semibold">{time || "10:30 AM"}</p>
//           </div>
//         </div>

//         { status === "accepted" &&
//         (<div className="flex items-center">
//             <Phone className="w-6 h-6 text-blue-500 mr-3" />
//             <div>
//               <span className="text-sm text-gray-500">Contact</span>
//               <p className="text-gray-800 font-semibold">{contactNumber}</p>
//             </div>
//          </div>)}

//         <div className="flex items-center">
//           <MapPin className="w-6 h-6 text-green-500 mr-3" />
//           <div>
//             <span className="text-sm text-gray-500">From</span>
//             <p className="text-gray-800 font-semibold">{startPoint}</p>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <MapPin className="w-6 h-6 text-red-500 mr-3" />
//           <div>
//             <span className="text-sm text-gray-500">To</span>
//             <p className="text-gray-800 font-semibold">{endPoint}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const fetchUserRole = async () => {
//   try {
//     const response = await fetch("http://localhost:5001/user/get-token", {
//       method: "GET",
//       credentials: "include", // Ensures cookies are sent
//     });

//     if (!response.ok) {
//       console.error("Token fetch failed:", response.statusText);
//       return { role: null, userid: null };
//     }

//     const data = await response.json();
//     return { role: data.role, userid: data.userid }; // "driver" | "user" | null
//   } catch (error) {
//     console.error("Error fetching user role:", error);
//     return { role: null, userid: null };
//   }
// };

// const RideManagement = () => {
//   const [activeTab, setActiveTab] = useState("requested");
//   const [userId, setUserId] = useState(null);

//   // Get location state
//   const location = useLocation();
//   const { matchedUserRoutes = [], matchedDriverRouteId = [] } = location.state || {};

//   // State for all ride types
//   const [requestedRides, setRequestedRides] = useState([]);
//   const [acceptedRides, setAcceptedRides] = useState([]);
//   const [rejectedRides, setRejectedRides] = useState([]);

//   // Loading and error states
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Initialize with data and fetch user info
//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const { userid } = await fetchUserRole();
//         if (!userid) {
//           setError("Unable to authenticate. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         setUserId(userid);
//         // Set initial requested rides from location state
//         setRequestedRides(matchedUserRoutes || []);
//         // Fetch initial data
//         await fetchRequestedRides(userid);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error initializing:", error);
//         setError("Failed to load initial data.");
//         setLoading(false);
//       }
//     };

//     initialize();
//   }, [matchedUserRoutes]);

//   // Function to fetch requested rides
//   const fetchRequestedRides = async (uid) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const id = uid || userId;
//       if (!id) {
//         throw new Error("User ID not available");
//       }

//       const response = await fetch("http://localhost:5001/offer/getrequestedrides", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userid: id }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch requested rides");
//       }

//       const data = await response.json();
//       setRequestedRides(data.matchedUserRoutes || []);
//       console.log(data.matchedUserRoutes);
//       setActiveTab("requested");
//     } catch (error) {
//       console.error("Error fetching requested rides:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to fetch accepted rides
//   const fetchAcceptedRides = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!userId) {
//         throw new Error("User ID not available");
//       }

//       const response = await fetch("http://localhost:5001/offer/getacceptedrides", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userid: userId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch accepted rides");
//       }

//       const data = await response.json();
//       setAcceptedRides(data.matchedUserRoutes || []);
//       setActiveTab("accepted");
//     } catch (error) {
//       console.error("Error fetching accepted rides:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to fetch rejected rides
//   const fetchRejectedRides = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!userId) {
//         throw new Error("User ID not available");
//       }

//       const response = await fetch("http://localhost:5001/offer/getdeclinedrides", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userid: userId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch declined rides");
//       }

//       const data = await response.json();
//       setRejectedRides(data.matchedUserRoutes || []);
//       setActiveTab("rejected");
//     } catch (error) {
//       console.error("Error fetching declined rides:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAcceptRide = async (ride, routeId) => {
//     try {
//       setLoading(true);

//       const userData = {
//         userId: ride.userId,
//         routeId: routeId,
//         rideCost: ride.rideCost,
//         userRouteId : ride.userRouteId,
//       };

//       const response = await fetch(
//         "http://localhost:5001/book/enteracceptedrides",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to accept ride");
//       }

//       // Update local state optimistically
//       setRequestedRides(prev => prev.filter(r => r.userId !== ride.userId));

//       // Add to accepted rides immediately
//       setAcceptedRides(prev => [...prev, ride]);

//       // Refresh data in background
//       await fetchRequestedRides();

//     } catch (error) {
//       console.error("Error accepting ride:", error);
//       setError("Failed to accept ride. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeclineRide = async (ride, routeId) => {
//     try {
//       setLoading(true);

//       const userData = {
//         userId: ride.userId,
//         routeId: routeId,
//         rideCost: ride.rideCost,
//         userRouteId : ride.userRouteId,
//       };

//       const response = await fetch(
//         "http://localhost:5001/book/enterdeclinedrides",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to decline ride");
//       }

//       // Update local state optimistically
//       setRequestedRides(prev => prev.filter(r => r.userId !== ride.userId));

//       // Add to rejected rides immediately
//       setRejectedRides(prev => [...prev, ride]);

//       // Refresh data in background
//       await fetchRequestedRides();

//     } catch (error) {
//       console.error("Error declining ride:", error);
//       setError("Failed to decline ride. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render tab content based on active tab
//   const renderTabContent = () => {
//     // Show loading state if loading
//     if (loading) {
//       return <LoadingState />;
//     }

//     // Show error state if there's an error
//     if (error) {
//       return (
//         <ErrorState
//           message={error}
//           onRetry={() => {
//             if (activeTab === "requested") fetchRequestedRides();
//             else if (activeTab === "accepted") fetchAcceptedRides();
//             else if (activeTab === "rejected") fetchRejectedRides();
//           }}
//         />
//       );
//     }

//     switch (activeTab) {
//       case "requested":
//         return (
//           <>
//             {requestedRides.length === 0 ? (
//               <EmptyRideState type="requested" />
//             ) : (
//               <div className="space-y-4">
//                 {requestedRides.map((request, index) => (
//                   <RideRequestCard
//                     key={request.userId || index}
//                     userName={request.name}
//                     cost={request.rideCost}
//                     startPoint={request.startLocation}
//                     endPoint={request.endLocation}
//                     contactNumber={request.contactNumber}
//                     date={request.date}
//                     time={request.time}
//                     onAccept={() => handleAcceptRide(request, matchedDriverRouteId[index])}
//                     onDecline={() => handleDeclineRide(request, matchedDriverRouteId[index])}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         );
//       case "accepted":
//         return (
//           <>
//             {acceptedRides.length === 0 ? (
//               <EmptyRideState type="accepted" />
//             ) : (
//               <div className="space-y-4">
//                 {acceptedRides.map((ride, index) => (
//                   <RideInfoCard
//                     key={ride.userId || index}
//                     userName={ride.name}
//                     cost={ride.rideCost}
//                     startPoint={ride.startLocation}
//                     endPoint={ride.endLocation}
//                     contactNumber={ride.contactNumber}
//                     date={ride.date}
//                     time={ride.time}
//                     status="accepted"
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         );
//       case "rejected":
//         return (
//           <>
//             {rejectedRides.length === 0 ? (
//               <EmptyRideState type="rejected" />
//             ) : (
//               <div className="space-y-4">
//                 {rejectedRides.map((ride, index) => (
//                   <RideInfoCard
//                     key={ride.userId || index}
//                     userName={ride.name}
//                     cost={ride.rideCost}
//                     startPoint={ride.startLocation}
//                     endPoint={ride.endLocation}
//                     date={ride.date}
//                     time={ride.time}
//                     status="rejected"
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   // Handle tab switching
//   const handleTabChange = (tab) => {
//     if (tab === activeTab) return; // Don't reload if already on this tab

//     if (tab === "requested") {
//       fetchRequestedRides();
//     } else if (tab === "accepted") {
//       fetchAcceptedRides();
//     } else if (tab === "rejected") {
//       fetchRejectedRides();
//     }
//   };

//   return (
//     <div className="bg-indigo-100 p-7 min-h-screen">
//       <div className="max-w-3xl mx-auto">
//         {/* Tab Navigation */}
//         <div className="bg-white rounded-t-xl overflow-hidden flex mb-4 shadow-md">
//           <button
//             className={`flex-1 py-4 font-medium text-center transition-colors ${
//               activeTab === "requested"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => handleTabChange("requested")}
//             disabled={loading}
//           >
//             Requested Rides
//           </button>
//           <button
//             className={`flex-1 py-4 font-medium text-center transition-colors ${
//               activeTab === "accepted"
//                 ? "bg-green-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => handleTabChange("accepted")}
//             disabled={loading}
//           >
//             Accepted Rides
//           </button>
//           <button
//             className={`flex-1 py-4 font-medium text-center transition-colors ${
//               activeTab === "rejected"
//                 ? "bg-red-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => handleTabChange("rejected")}
//             disabled={loading}
//           >
//             Rejected Rides
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-md">
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//             {activeTab === "requested" && "Ride Requests"}
//             {activeTab === "accepted" && "Accepted Rides"}
//             {activeTab === "rejected" && "Rejected Rides"}
//           </h2>

//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RideManagement;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MapPin,
  Clock,
  User,
  Phone,
  IndianRupee,
  Calendar,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

const DriverRidesComponent = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);
  const [requestedRides, setRequestedRides] = useState([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [driverId,setDriverId] = useState(null);

  // Mock data - replace with actual API call
   const fetchDriverRideDetails = async () => {
  try {
    console.log("Button clicked!");
    const response = await fetch(`http://localhost:5001/offer/getridedetails`, {
      method: "GET",
      credentials : "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch driver ride details");
    }

    const data = await response.json();
    setRides(data.rides);
    console.log(rides);
    return data; // expected to be { rides: [...] }
  } catch (error) {
    console.error("Error fetching driver rides:", error);
    throw error;
  }
};

  useEffect(() => {

    // const mockData = {
    //   rides: [
    //     {
    //       rideId: "64abc123",
    //       status: "available",
    //       date: "2025-07-04",
    //       time: "10:00 AM",
    //       from: "Pune",
    //       to: "Mumbai",
    //       matchedUsers: [
    //         {
    //           name: "Ravi",
    //           contact: "9876543210",
    //           status: "accepted",
    //           start: "Katraj",
    //           end: "Andheri",
    //           cost: 120,
    //           date: "2025-07-04",
    //           time: "10:00 AM",
    //           userId: "user123",
    //           userRouteId: "route123",
    //           rideCost: 120,
    //         },
    //         {
    //           name: "Priya",
    //           contact: "9876543211",
    //           status: "pending",
    //           start: "Baner",
    //           end: "Borivali",
    //           cost: 140,
    //           date: "2025-07-04",
    //           time: "10:00 AM",
    //           userId: "user456",
    //           userRouteId: "route456",
    //           rideCost: 140,
    //         },
    //       ],
    //     },
    //     {
    //       rideId: "64xyz456",
    //       status: "completed",
    //       date: "2025-06-20",
    //       time: "09:30 AM",
    //       from: "Nashik",
    //       to: "Pune",
    //       completedUser: {
    //         name: "Amit",
    //         contact: "9123456780",
    //         start: "Nashik Road",
    //         end: "Swargate",
    //         cost: 150,
    //       },
    //     },
    //     {
    //       rideId: "64def789",
    //       status: "declined",
    //       date: "2025-07-10",
    //       time: "02:00 PM",
    //       from: "Pune",
    //       to: "Nashik",
    //       matchedUsers: [],
    //     },
    //     {
    //       rideId: "64ghi012",
    //       status: "available",
    //       date: "2025-07-15",
    //       time: "08:00 AM",
    //       from: "Mumbai",
    //       to: "Goa",
    //       matchedUsers: [],
    //     },
    //   ],
    // };

    fetchDriverRideDetails();
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchRequestedRides = async () => {
    // Placeholder for actual API call
    console.log("Fetching requested rides...");
  };

  const handleAcceptRide = async (ride, routeId) => {
    try {
      setLoading(true);

      const userData = {
        userId: ride.userId,
        routeId: routeId,
        rideCost: ride.rideCost,
        userRouteId: ride.userRouteId,
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
      setRequestedRides((prev) => prev.filter((r) => r.userId !== ride.userId));

      // Add to accepted rides immediately
      setAcceptedRides((prev) => [...prev, ride]);

      // Update the rides state to mark the user as accepted
      setRides((prevRides) =>
        prevRides.map((r) => {
          if (r.rideId === routeId) {
            return {
              ...r,
              matchedUsers: r.matchedUsers.map((user) =>
                user.userId === ride.userId
                  ? { ...user, status: "accepted" }
                  : user
              ),
            };
          }
          return r;
        })
      );

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
        userRouteId: ride.userRouteId,
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
      setRequestedRides((prev) => prev.filter((r) => r.userId !== ride.userId));

      // Add to rejected rides immediately
      setRejectedRides((prev) => [...prev, ride]);

      // Remove the user from the rides state
      setRides((prevRides) =>
        prevRides.map((r) => {
          if (r.rideId === routeId) {
            return {
              ...r,
              matchedUsers: r.matchedUsers.filter(
                (user) => user.userId !== ride.userId
              ),
            };
          }
          return r;
        })
      );

      // Refresh data in background
      await fetchRequestedRides();
    } catch (error) {
      console.error("Error declining ride:", error);
      setError("Failed to decline ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "available":
        return <Clock className="w-4 h-4" />;
      case "declined":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getUserStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTabCount = (status) => {
    const count = rides.filter((ride) => ride.status === status).length;
    console.log(`Count for ${status}:`, count);
    return count;
  };

  const getFilteredRides = () => {
    console.log("Active tab:", activeTab);
    console.log("All rides:", rides);
    const filtered = rides.filter((ride) => ride.status === activeTab);
    console.log("Filtered rides:", filtered);
    return filtered;
  };

  const getFilteredMatchedUsers = (matchedUsers = []) => {
    return matchedUsers.filter(
      (user) => user.status !== "declined" && user.status !== "cancelled"
    );
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    const { type, ride, routeId } = confirmAction;
    setShowConfirm(false);
    setConfirmAction(null);
    if (type === "accept") await handleAcceptRide(ride, routeId);
    else await handleDeclineRide(ride, routeId);
  };

  const renderConfirmationModal = () =>
    showConfirm &&
    confirmAction && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Confirm{" "}
            {confirmAction.type === "accept" ? "Acceptance" : "Rejection"}
          </h3>
          <p className="text-gray-600 mb-4">
            Are you sure you want to <strong>{confirmAction.type}</strong> the
            ride request of <strong>{confirmAction.ride.name}</strong>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm text-white ${
                confirmAction.type === "accept"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={handleConfirmAction}
            >
              Yes, {confirmAction.type}
            </button>
          </div>
        </div>
      </div>
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg mb-6 w-48"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 mb-4">
                <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Rides</h1>
          <p className="text-gray-600">Manage and track your motorbike rides</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-white rounded-lg p-2 shadow-sm">
            {[
              { key: "available", label: "Available", icon: Clock },
              { key: "completed", label: "Completed", icon: Check },
              { key: "declined", label: "Declined", icon: X },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  console.log("Tab clicked:", key);
                  setActiveTab(key);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    activeTab === key
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {getTabCount(key)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {getFilteredRides().length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No {activeTab} rides
            </h3>
            <p className="text-gray-600">
              {activeTab === "available" &&
                "You don't have any available rides at the moment"}
              {activeTab === "completed" &&
                "You haven't completed any rides yet"}
              {activeTab === "declined" && "You don't have any declined rides"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {getFilteredRides().map((ride) => (
              <div
                key={ride.rideId}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Ride Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {ride.from} → {ride.to}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-indigo-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {ride.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {ride.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                          ride.status
                        )}`}
                      >
                        {getStatusIcon(ride.status)}
                        {ride.status.charAt(0).toUpperCase() +
                          ride.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ride Content */}
                <div className="p-6">
                  {ride.status === "completed" && ride.completedUser ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Completed Ride
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              {ride.completedUser.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span className="text-sm">
                              {ride.completedUser.contact}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span className="text-sm">
                              {ride.completedUser.start} →{" "}
                              {ride.completedUser.end}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-800">
                              ₹{ride.completedUser.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : ride.status === "declined" ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-red-800">
                        <X className="w-5 h-5" />
                        <span className="font-semibold">
                          This ride was declined
                        </span>
                      </div>
                      <p className="text-red-600 text-sm mt-2">
                        No passenger details available
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Matched Passengers (
                        {getFilteredMatchedUsers(ride.matchedUsers).length})
                      </h4>

                      {getFilteredMatchedUsers(ride.matchedUsers).length ===
                      0 ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="w-6 h-6 text-gray-400" />
                          </div>
                          <h5 className="font-semibold text-gray-600 mb-1">
                            No bookings yet
                          </h5>
                          <p className="text-gray-500 text-sm">
                            Passengers will appear here once they book your ride
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {getFilteredMatchedUsers(ride.matchedUsers).map(
                            (user, index) => (
                              <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-600" />
                                        <span className="font-medium">
                                          {user.name}
                                        </span>
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${getUserStatusColor(
                                            user.status
                                          )}`}
                                        >
                                          {user.status}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm">
                                          {user.contact}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm">
                                          {user.start} → {user.end}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <IndianRupee className="w-4 h-4 text-gray-600" />
                                        <span className="font-semibold text-gray-800">
                                          ₹{user.cost}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {user.status === "pending" && (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => (
                                          setConfirmAction({
                                            type: "accept",
                                            ride: user,
                                            routeId: ride.rideId,
                                          }),
                                          setShowConfirm(true)
                                        )}
                                        className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                                      >
                                        Accept
                                      </button>

                                      {/* Decline Button */}
                                      <button
                                        onClick={() => (
                                          setConfirmAction({
                                            type: "decline",
                                            ride: user,
                                            routeId: ride.rideId,
                                          }),
                                          setShowConfirm(true)
                                        )}
                                        className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                                      >
                                        Decline
                                      </button>

                                      {/* Popup */}
                                      {renderConfirmationModal()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRidesComponent;
