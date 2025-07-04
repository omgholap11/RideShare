// import React, { useState, useEffect } from "react";
// import { User, Bell, CircleUser , Bike } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import {useSelector} from "react-redux"

// function Navbar() {

//   const navigate = useNavigate();
//   const [role , setRole] = useState(null);
//   const [userid , setUserid] = useState(null);
//   const {userType , userId} = useSelector((state)=>state.auth);
//   useEffect(()=>{
//     setUserid(userId);
//     setRole(userType);
//     console.log(userId , userType);
//   },[userType , userId])

//     const fetchUserRole = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/user/get-token", {
//           method: "GET",
//           credentials: "include", // Ensures cookies are sent
//         });

//         if (!response.ok) {
//           console.error("Token fetch failed:", response.statusText);
//           return { role: null, userid: null };
//         }

//         const data = await response.json();
//         console.log("Token Response:", data); // Debugging
//         return { role: data.role, userid: data.userid }; // "driver" | "user" | null
//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         return { role: null, userid: null };
//       }
//     };

//     useEffect(() => {
//     const checkUserRole = async () => {
//       const { role, userid } = await fetchUserRole();
//       setRole(role);
//       setUserid(userid);
//     };

//     checkUserRole();
//   }, []);

//   const navigateToUserProfile = async ()=>{
//         console.log(userid);
//         try{
//           const response = await fetch("http://localhost:5001/driver/dashboard",
//            { method : "POST",
//             headers: { "Content-Type": "application/json" },
//              body : JSON.stringify({userid}),
//            });

//            if(!response.ok)
//            {
//               console.log("Error while getting user details from Backend!!");
//            }

//            const data = await response.json();
//            console.log(data);
//            navigate("/dashboard" , {state : data});
//         }
//         catch(error)
//         {
//           console.log("Error while getting user info!!",error);
//         }
//       }

//       const navigateAboutUs = ()=>{
//         navigate("/aboutus");
//       }
//       const navigateContactUs = ()=>{
//         navigate("/contactus");
//       }

//       const navigateToRequestedRides = async()=>{
//         // const {userid} = await fetchUserRole();
//             console.log(userId);
//             try{
//               const response = await fetch("http://localhost:5001/offer/getrequestedrides",
//                { method : "POST",
//                 headers: { "Content-Type": "application/json" },
//                  body : JSON.stringify({userId}),
//                });

//                if(!response.ok)
//                {
//                   console.log("Error while getting user details from Backend!!");
//                }

//                const data = await response.json();
//                console.log(data);
//                navigate("/requestedrides" , {state : {matchedUserRoutes  : data.matchedUserRoutes , matchedDriverRouteId : data.matchedDriverRouteId}});
//             }
//             catch(error)
//             {
//               console.log("Error while getting user info!!",error);
//             }
//           }

//           const navigateToUserNotification = async ()=>{
//             // const {userid} = await fetchUserRole();
//             console.log(userId);
//             try{
//               const response = await fetch("http://localhost:5001/book/getrequestedridedetails",
//                 { method : "POST",
//                   headers: { "Content-Type": "application/json" },
//                    body : JSON.stringify({userId}),
//                  });

//                  if(!response.ok)
//                  {
//                     console.log("Error occured in backend while fetching user requested ride details!!");
//                  }

//                  const data = await response.json();
//                  const requests = data.requests;
//                  console.log(data.requests);
//                  navigate("/usernotifications",{ state : {requests}});

//             }
//            catch(error)
//            {
//             console.log("Error occured while fetching users requested rides status and details............");
//            }
//           }

//   const navigateToRegisterPage = () => navigate("/registrationoptions");
//   const navigateToHomePage = () => navigate("/");
//   // const navigateToUserProfile = () => navigate("/profile");
//   // const navigateToRequestedRides = () => navigate("/requestedrides");

//   return (
//     <header className="bg-gray-200 shadow-xl py-4 sticky top-0 z-50">
//       <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
//         {/* Logo */}
//         <div className="flex items-center space-x-3 group">
//           <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center
//             transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
//             <Bike className="text-white font-bold text-lg"/>
//           </div>
//           <button onClick={navigateToHomePage} className="text-2xl font-extrabold text-gray-800 tracking-tight
//             transition-colors duration-300 group-hover:text-blue-600">
//             RideShare
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex items-center space-x-6">
//           <div className="flex items-center space-x-6 mr-4">
//             <button onClick={navigateAboutUs} className="text-gray-800 hover:text-black transition-colors duration-300 relative group">
//               About Us
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
//             </button>
//             <button onClick={navigateContactUs} className="text-gray-800 hover:text-black transition-colors duration-300 relative group">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
//             </button>
//           </div>

//           {/* User & Driver UI */}
//           {role === "driver" && (
//             <div className="flex items-center space-x-4">
//               <Bell onClick={navigateToRequestedRides} className="w-7 h-7 text-gray-600 hover:text-black transition cursor-pointer transform hover:scale-110" />
//               <CircleUser onClick={navigateToUserProfile} className="w-12 h-12 text-gray-600 hover:text-black transition-colors cursor-pointer" />
//             </div>
//           )}

//           {role === "user" && (
//             <div className="flex items-center space-x-4">
//               <button onClick={navigateToUserNotification} className="px-4 py-2 bg-black text-white rounded hover:bg-black transition">
//                 Notifications
//               </button>
//             </div>
//           )}

//           {/* Unauthenticated User UI */}
//           {role === null && (
//             <button className="px-5 py-2.5 bg-black text-white rounded-lg
//                 hover:bg-black transition flex items-center space-x-2
//                 shadow-md hover:shadow-lg transform hover:scale-105
//                 active:scale-95 duration-300"
//               onClick={navigateToRegisterPage}
//             >
//               <User className="w-5 h-5" />
//               <span>Register</span>
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  CircleUser,
  Bike,
  Menu,
  X,
  ChevronDown,
  MapPin,
  CreditCard,
  Shield,
  HelpCircle,
  Settings,
  Star,
  Car,
  Calendar,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [role, setRole] = useState(null);
  const [userid, setUserid] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { userType, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    setUserid(userId);
    setRole(userType);
  }, [userType, userId]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:5001/user/get-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Token fetch failed:", response.statusText);
        return { role: null, userid: null };
      }

      const data = await response.json();
      return { role: data.role, userid: data.userid };
    } catch (error) {
      console.error("Error fetching user role:", error);
      return { role: null, userid: null };
    }
  };

  useEffect(() => {
    const checkUserRole = async () => {
      const { role, userid } = await fetchUserRole();
      setRole(role);
      setUserid(userid);
    };
    checkUserRole();
  }, []);

  const navigateToUserProfile = () => navigate("/profile");
  const navigateAboutUs = () => navigate("/aboutus");
  const navigateContactUs = () => navigate("/contactus");
  const navigateToRequestedRides = async()=>{
        const {userid} = await fetchUserRole();
            console.log(userid);
            try{
              const response = await fetch("http://localhost:5001/offer/getrequestedrides",
               { method : "POST",
                headers: { "Content-Type": "application/json" },
                 body : JSON.stringify({userid}),
               });

               if(!response.ok)
               {
                  console.log("Error while getting user details from Backend!!");
               }

               const data = await response.json();
               console.log(data);
               navigate("/requestedrides" , {state : {matchedUserRoutes  : data.matchedUserRoutes , matchedDriverRouteId : data.matchedDriverRouteId}});
            }
            catch(error)
            {
              console.log("Error while getting user info!!",error);
            }
          }
  const navigateToUserNotification = async () => {
    const { userid } = await fetchUserRole();
    console.log(userid);
    try {
      const response = await fetch(
        "http://localhost:5001/book/getrequestedridedetails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid }),
        }
      );

      if (!response.ok) {
        console.log(
          "Error occured in backend while fetching user requested ride details!!"
        );
      }

      const data = await response.json();
      const requests = data.requests;
      console.log(data.requests);
      navigate("/usernotifications", { state: { requests } });
    } catch (error) {
      console.log(
        "Error occured while fetching users requested rides status and details............"
      );
    }
  };

  const navigateToDriverProfile = async () => {
    console.log(userid);
    try {
      const response = await fetch("http://localhost:5001/driver/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid }),
      });

      if (!response.ok) {
        console.log("Error while getting user details from Backend!!");
      }

      const data = await response.json();
      console.log(data);
      navigate("/dashboard", { state: data });
    } catch (error) {
      console.log("Error while getting user info!!", error);
    }
  };

  const navigateToRegisterPage = () => navigate("/registrationoptions");
  const navigateToHomePage = () => navigate("/");
  const navigateToBookRide = () => navigate("/book");
  const navigateToOfferRide = () => navigate("/offer");
  const navigateToSupport = () => navigate("/support");
  const navigateToSafety = () => navigate("/safety");
  const navigateToRideHistory = () => navigate("/");
  const navigateToReferrals = () => navigate("/");
  const navigateToSettings = () => navigate("/");
  const navigateToFeedback = () => navigate("/");

  return (
    <div className="flex flex-col h-20 bg-indigo-100 to-purple-100 text-white">
    <header className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-indigo-100 backdrop-blur-md shadow-xl border-2 rounded-2xl border-purple-500">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl h-16">
        {/* Logo */}
        <div className="flex items-center space-x-3 group">
          <div
            className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center 
            transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg"
          >
            <Bike className="text-white w-6 h-6" />
          </div>
          <button
            onClick={navigateToHomePage}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
            transition-all duration-300 group-hover:from-indigo-700 group-hover:to-purple-700"
          >
            RideShare
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className="flex items-center space-x-1 text-slate-700 hover:text-indigo-600 transition-colors duration-300 font-medium group"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isServicesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                <div className="px-4 py-2 border-b border-slate-100 mb-2">
                  <p className="text-sm font-semibold text-slate-600">
                    Quick Actions
                  </p>
                </div>
                <button
                  onClick={navigateToBookRide}
                  className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Car className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-700">Book a Ride</p>
                    <p className="text-sm text-slate-500">
                      Find rides going your way
                    </p>
                  </div>
                </button>
                <button
                  onClick={navigateToOfferRide}
                  className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Users className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-700">Offer a Ride</p>
                    <p className="text-sm text-slate-500">Share your journey</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={navigateAboutUs}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateToSafety}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Safety
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateToSupport}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateContactUs}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* User-specific UI */}
          {role === "driver" && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={navigateToRequestedRides}
                  className="relative p-2 rounded-full hover:bg-indigo-50 transition-colors duration-300 group"
                >
                  <Bell className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-indigo-50 transition-colors duration-300 group"
                >
                  <CircleUser className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transform transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="font-semibold text-slate-700">
                        Driver Dashboard
                      </p>
                      <p className="text-sm text-slate-500">
                        Manage your rides
                      </p>
                    </div>
                    <button
                      onClick={navigateToDriverProfile}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Profile</span>
                    </button>
                    <button
                      onClick={navigateToSettings}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Settings className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Settings</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {role === "user" && (
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToUserNotification}
                className="relative px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span className="font-medium">Notifications</span>
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-indigo-50 transition-colors duration-300 group"
                >
                  <CircleUser className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transform transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="font-semibold text-slate-700">
                        User Account
                      </p>
                      <p className="text-sm text-slate-500">
                        Manage your account
                      </p>
                    </div>
                    <button
                      onClick={navigateToUserProfile}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Profile</span>
                    </button>
                    <button
                      onClick={navigateToRideHistory}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Ride History</span>
                    </button>
                    <button
                      onClick={navigateToReferrals}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Star className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Referrals</span>
                    </button>
                    <button
                      onClick={navigateToFeedback}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Feedback</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Unauthenticated User UI */}
          {role === null && (
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-700 hover:text-indigo-600 transition-colors duration-300 font-medium">
                Login
              </button>
              <button
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                  hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 
                  shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                onClick={navigateToRegisterPage}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">Register</span>
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-slate-600" />
          ) : (
            <Menu className="w-6 h-6 text-slate-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-indigo-100/50 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Services
              </p>
              <button
                onClick={navigateToBookRide}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Book a Ride
              </button>
              <button
                onClick={navigateToOfferRide}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Offer a Ride
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Company
              </p>
              <button
                onClick={navigateAboutUs}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                About Us
              </button>
              <button
                onClick={navigateToSafety}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Safety
              </button>
              <button
                onClick={navigateToSupport}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Support
              </button>
              <button
                onClick={navigateContactUs}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            {role === null && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button className="w-full px-4 py-3 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  Login
                </button>
                <button
                  onClick={navigateToRegisterPage}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    </div>
  );
}

export default Navbar;
