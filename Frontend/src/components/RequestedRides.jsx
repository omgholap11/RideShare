import React, { useState, useEffect } from "react";
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

const RequestedRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);
  const [RequestedRides, setRequestedRides] = useState([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [driverId,setDriverId] = useState(null);

  // Mock data - replace with actual API call
    const fetchDriverRideDetails = async () => {
    try {
      console.log("Fetching ride details...");
      const response = await fetch(`http://localhost:5001/offer/getridedetails`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch driver ride details");
      }

      const data = await response.json();
      console.log("Received ride data:", data);
      
      // Transform backend data to match frontend structure
      const transformedRides = data.rides.map(ride => ({
        rideId: ride.rideId,
        status: ride.status === "matched" ? "available" : ride.status,
        date: ride.date,
        time: ride.time,
        from: ride.from,
        to: ride.to,
        matchedUsers: ride.matchedUsers ? ride.matchedUsers.map(user => ({
          name: user.name || '',
          contact: user.contactNumber || user.contact || '',
          start: user.startLocation || user.start || '',
          end: user.endLocation || user.end || '',
          status: user.status || 'pending',
          cost: user.rideCost || user.cost || 0,
          userId: user.userId || '',
          userRouteId: user.userRouteId || ''
        })) : []
      }));

      console.log("Transformed rides:", transformedRides);
      setRides(transformedRides);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching driver rides:", error);
      setError("Failed to fetch rides");
      setLoading(false);
    }
  };

  useEffect(() => {
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
    // Map the backend status to frontend display status
    const filtered = rides.filter((ride) => {
      if (activeTab === "available") {
        return ride.status === "pending" || ride.status === "matched";
      }
      return ride.status === activeTab;
    });
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
      <div className="max-w-6xl mx-auto">
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
                        <h3 className="text-xl font-semibold space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="whitespace-normal break-words">
                              {ride.from}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-indigo-200">→</span>
                            <span className="whitespace-normal break-words">
                              {ride.to}
                            </span>
                          </div>
                        </h3>
                        <div className="flex items-center gap-4 mt-3 text-indigo-100">
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
                                      <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                          <MapPin className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-600 break-words">
                                              From: {user.start}
                                            </p>
                                            <p className="text-sm text-gray-600 break-words mt-1">
                                              To: {user.end}
                                            </p>
                                          </div>
                                        </div>
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

export default RequestedRides;
