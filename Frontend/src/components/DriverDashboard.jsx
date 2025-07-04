// import React, { useState } from 'react';
// import { 
//   BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
//   Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   MapPin, Clock, Users, Calendar, TrendingUp, 
//   Award, Star, DollarSign, AlertCircle, ThumbsUp 
// } from 'lucide-react';
// import { useLocation,useNavigate } from 'react-router-dom';
// import OfferRide from './OfferRide';

// const DriverDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { firstName, lastName } = location.state || {};

//   const offerRide = ()=>{
//     navigate("/offer");
//   }


//   // Sample data - would come from your API in a real app
//   const driverInfo = {
//     name: `Rohit ${lastName}`,
//     photo: "/api/placeholder/150/150", // Placeholder for driver's photoC:\Users\omgho\OneDrive\Desktop\PBL\Backend\output.jpg
//     vehicleNumber: "MH01AB1234",
//     vehicleModel: "Honda City",
//     joinDate: "15 Aug, 2023",
//     rating: 4.8,
//     totalRides: 342,
//     completedRides: 329,
//     cancellationRate: "3.8%",
//     earnings: {
//       total: "₹128,450",
//       thisMonth: "₹8,750",
//       lastMonth: "₹9,320",
//     },
//     topAreas: ["Andheri", "Bandra", "Powai", "Worli"]
//   };
  
//   const recentActivity = [
//     { id: 1, date: "23 Mar, 2025", from: "Andheri West", to: "Bandra East", amount: "₹350", rating: 5 },
//     { id: 2, date: "22 Mar, 2025", from: "Powai", to: "Juhu Beach", amount: "₹420", rating: 5 },
//     { id: 3, date: "21 Mar, 2025", from: "Worli", to: "Lower Parel", amount: "₹180", rating: 4 },
//     { id: 4, date: "20 Mar, 2025", from: "Goregaon", to: "Malad West", amount: "₹250", rating: 5 },
//   ];
  
//   const monthlyEarnings = [
//     { name: 'Oct', earnings: 7200 },
//     { name: 'Nov', earnings: 8100 },
//     { name: 'Dec', earnings: 7900 },
//     { name: 'Jan', earnings: 8500 },
//     { name: 'Feb', earnings: 9320 },
//     { name: 'Mar', earnings: 8750 },
//   ];
  
//   const weeklyRides = [
//     { name: 'Mon', rides: 8 },
//     { name: 'Tue', rides: 12 },
//     { name: 'Wed', rides: 10 },
//     { name: 'Thu', rides: 9 },
//     { name: 'Fri', rides: 15 },
//     { name: 'Sat', rides: 18 },
//     { name: 'Sun', rides: 14 },
//   ];

//   // Notification state for demo purposes
//   const [showNotification, setShowNotification] = useState(true);
  
//   return (
//     <div className="bg-gray-50 p-4 md:p-6">
//       {/* Driver info header */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row items-start md:items-center">
//           <div className="relative">
//             <img
//               src="output.jpg"
//               alt="Driver photo"
//               className="h-24 w-24 rounded-full border-4 border-green-500 object-cover"
//             />
//             <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
//           </div>
          
//           <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">{driverInfo.name}</h1>
//                 <div className="flex items-center mt-1">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`h-4 w-4 ${i < Math.floor(driverInfo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                       />
//                     ))}
//                   </div>
//                   <span className="ml-2 text-gray-600 font-medium">{driverInfo.rating}</span>
//                   <span className="ml-2 text-gray-500">({driverInfo.totalRides} rides)</span>
//                 </div>
//               </div>
              
//               <div className="mt-4 md:mt-0 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
//                 <p className="text-sm text-gray-600">Vehicle</p>
//                 <p className="font-medium text-gray-800">{driverInfo.vehicleModel} • {driverInfo.vehicleNumber}</p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <div className="flex items-center">
//                   <Users className="h-5 w-5 text-blue-600" />
//                   <p className="ml-2 text-sm font-medium text-gray-600">Total Rides</p>
//                 </div>
//                 <p className="mt-1 text-xl font-bold text-gray-800">{driverInfo.totalRides}</p>
//               </div>
              
//               <div className="bg-green-50 p-3 rounded-lg">
//                 <div className="flex items-center">
//                   <ThumbsUp className="h-5 w-5 text-green-600" />
//                   <p className="ml-2 text-sm font-medium text-gray-600">Completed</p>
//                 </div>
//                 <p className="mt-1 text-xl font-bold text-gray-800">{driverInfo.completedRides}</p>
//               </div>
              
//               <div className="bg-purple-50 p-3 rounded-lg">
//                 <div className="flex items-center">
//                   <DollarSign className="h-5 w-5 text-purple-600" />
//                   <p className="ml-2 text-sm font-medium text-gray-600">This Month</p>
//                 </div>
//                 <p className="mt-1 text-xl font-bold text-gray-800">{driverInfo.earnings.thisMonth}</p>
//               </div>
              
//               <div className="bg-orange-50 p-3 rounded-lg">
//                 <div className="flex items-center">
//                   <AlertCircle className="h-5 w-5 text-orange-600" />
//                   <p className="ml-2 text-sm font-medium text-gray-600">Cancel Rate</p>
//                 </div>
//                 <p className="mt-1 text-xl font-bold text-gray-800">{driverInfo.cancellationRate}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Notification banner */}
//       {showNotification && (
//         <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md shadow-sm">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <Award className="h-5 w-5 text-blue-600" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-blue-700">
//                 Congratulations! You've maintained a 4.8+ rating for 3 months straight. Keep up the great work!
//               </p>
//             </div>
//             <button 
//               onClick={() => setShowNotification(false)}
//               className="ml-auto pl-3 text-blue-500 hover:text-blue-700"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
      
//       {/* Main dashboard content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Charts section */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Earnings chart */}
//               <div>
//                 <h3 className="text-md font-medium text-gray-700 mb-2">Monthly Earnings</h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={monthlyEarnings}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
//                       <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
              
//               {/* Rides chart */}
//               <div>
//                 <h3 className="text-md font-medium text-gray-700 mb-2">Weekly Rides</h3>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={weeklyRides}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="rides" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Recent activity */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Rides</h2>
//               <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {recentActivity.map((ride) => (
//                     <tr key={ride.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{ride.date}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{ride.from}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{ride.to}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{ride.amount}</td>
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star 
//                               key={i} 
//                               className={`h-4 w-4 ${i < ride.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                             />
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
        
//         {/* Right column */}
//         <div className="space-y-6">
//           {/* Driver stats */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Statistics</h2>
            
//             <div className="space-y-4">
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <div className="flex items-center">
//                   <Clock className="h-5 w-5 text-gray-500" />
//                   <span className="ml-2 text-sm text-gray-600">Member Since</span>
//                 </div>
//                 <span className="font-medium text-gray-800">{driverInfo.joinDate}</span>
//               </div>
              
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <div className="flex items-center">
//                   <Star className="h-5 w-5 text-gray-500" />
//                   <span className="ml-2 text-sm text-gray-600">Average Rating</span>
//                 </div>
//                 <span className="font-medium text-gray-800">{driverInfo.rating}/5.0</span>
//               </div>
              
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <div className="flex items-center">
//                   <TrendingUp className="h-5 w-5 text-gray-500" />
//                   <span className="ml-2 text-sm text-gray-600">Completion Rate</span>
//                 </div>
//                 <span className="font-medium text-green-600">{Math.round((driverInfo.completedRides / driverInfo.totalRides) * 100)}%</span>
//               </div>
              
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <div className="flex items-center">
//                   <DollarSign className="h-5 w-5 text-gray-500" />
//                   <span className="ml-2 text-sm text-gray-600">Total Earnings</span>
//                 </div>
//                 <span className="font-medium text-gray-800">{driverInfo.earnings.total}</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <Calendar className="h-5 w-5 text-gray-500" />
//                   <span className="ml-2 text-sm text-gray-600">Last Month</span>
//                 </div>
//                 <span className="font-medium text-gray-800">{driverInfo.earnings.lastMonth}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Top service areas */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Service Areas</h2>
            
//             <div className="grid grid-cols-2 gap-2">
//               {driverInfo.topAreas.map((area, index) => (
//                 <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center">
//                   <MapPin className="h-4 w-4 text-gray-500" />
//                   <span className="ml-2 text-sm font-medium text-gray-700">{area}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Quick actions */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            
//             <div className="space-y-3">
//               <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={offerRide}>
//                 Go Online
//               </button>
//               <button className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
//                 View Earnings
//               </button>
//               <button className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverDashboard;


import React, { useState } from 'react';
import { 
  LineChart, BarChart, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MapPin, Fuel, Users, Share2, Leaf, 
  PieChart, DollarSign ,Hash
} from 'lucide-react';
import { useLocation, useNavigate} from 'react-router-dom';

const PersonalRideSharingDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {name , image ,vehicleName,vehicleNumber } = location.state || {};

  const offerRide = () => {
    navigate("/offer");
  }

  // Sample data focused on personal ride-sharing metrics
  const userInfo = {
    name: name,
    vehicleName: vehicleName,
    vehicleNumber : vehicleNumber,
    image : image,
    totalRides: 42,
    ridesSaved: 18,
    co2Reduced: 95, // in kg
    fuelSaved: {
      liters: 65,
      monetary: "₹3,250"
    },
    monthlyRideSharing: [
      { month: 'Oct', rides: 5 },
      { month: 'Nov', rides: 7 },
      { month: 'Dec', rides: 6 },
      { month: 'Jan', rides: 8 },
      { month: 'Feb', rides: 9 },
      { month: 'Mar', rides: 11 },
    ],
    fuelSavings: [
      { month: 'Oct', savings: 8 },
      { month: 'Nov', savings: 10 },
      { month: 'Dec', savings: 9 },
      { month: 'Jan', savings: 12 },
      { month: 'Feb', savings: 14 },
      { month: 'Mar', savings: 16 },
    ]
  };

  const recentRides = [
    { 
      id: 1, 
      date: "23 Mar, 2025", 
      from: "Home", 
      to: "Office", 
      passengers: 2, 
      fuelSaved: "₹120" 
    },
    { 
      id: 2, 
      date: "22 Mar, 2025", 
      from: "College", 
      to: "City Center", 
      passengers: 3, 
      fuelSaved: "₹180" 
    },
    // More recent rides...
  ];

  return (
    <div className="bg-indigo-100 p-4 md:p-6">
      {/* User Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full p-4">
  {/* Left Side: User Photo and Info */}
  <div className="flex flex-row items-center">
    <div className="relative">
      <img
        src={userInfo.image}
        alt="Driver photo"
        className="h-24 w-24 rounded-full border-4 border-green-500 object-cover"
      />
      <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
    </div>
    <div className="flex flex-col p-5">
      <span className="text-2xl font-bold text-green-800">
        {userInfo.name}'s Ride Sharing Impact
      </span>
      <p className="text-green-600 mt-2">Personal Bike • Ride Sharing Contributor</p>
    </div>
  </div>

  {/* Right Side: Vehicle Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0">
  {/* Vehicle Box */}
  <div className="bg-green-50 border-2 border-green-400 rounded-xl 
    shadow-md hover:shadow-lg transition-shadow duration-300 
    flex items-center p-4 space-x-4">
    <div className="bg-green-100 p-3 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-bold text-green-800">Bike Name</h3>
      <p className="text-xl font-semibold text-green-600">{userInfo.vehicleName}</p>
    </div>
  </div>

  {/* Number Box */}
  <div className="bg-blue-50 border-2 border-blue-400 rounded-xl 
    shadow-md hover:shadow-lg transition-shadow duration-300 
    flex items-center p-4 space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">
      <Hash size={20}  className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      {/* </svg> */}
    </div>
    <div>
    {/* < /> */}
      <h3 className="text-lg font-bold text-blue-800">Bike Number</h3>
      <p className="text-xl font-semibold text-blue-600">{userInfo.vehicleNumber}</p>
    </div>
  </div>
</div>



           
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600" />
              <p className="ml-2 text-sm font-medium text-gray-600">Total Shared Rides</p>
            </div>
            <p className="mt-1 text-xl font-bold text-gray-800">{userInfo.totalRides}</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-green-600" />
              <p className="ml-2 text-sm font-medium text-gray-600">CO2 Reduced</p>
            </div>
            <p className="mt-1 text-xl font-bold text-green-800">{userInfo.co2Reduced} kg</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Fuel className="h-5 w-5 text-purple-600" />
              <p className="ml-2 text-sm font-medium text-gray-600">Fuel Saved</p>
            </div>
            <p className="mt-1 text-xl font-bold text-purple-800">{userInfo.fuelSaved.liters} L</p>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <p className="ml-2 text-sm font-medium text-gray-600">Fuel Cost Saved</p>
            </div>
            <p className="mt-1 text-xl font-bold text-orange-800">{userInfo.fuelSaved.monetary}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ride Sharing Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ride Sharing Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Rides Chart */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Monthly Shared Rides</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userInfo.monthlyRideSharing}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rides" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Fuel Savings Chart */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Fuel Savings (Liters)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userInfo.fuelSavings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} L`, 'Fuel Saved']} />
                      <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          

          {/* Recent Rides */}
          
        </div>

        {/* Right Column: Additional Information */}
        <div className="space-y-6">
          {/* Top Shared Routes */}
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Shared Routes</h2>
            
            <div className="grid grid-cols-2 gap-2">
              {['Home-Office', 'College-City', 'Suburb-Downtown'].map((route, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700">{route}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Environmental Impact */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Green Impact</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <span className="ml-2 text-sm text-gray-600">Trees Saved</span>
                </div>
                <span className="font-medium text-green-800">2.4</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Share2 className="h-5 w-5 text-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Rides Shared</span>
                </div>
                <span className="font-medium text-blue-800">{userInfo.ridesSaved}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md  p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <button 
                onClick={offerRide}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Offer a Ride
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View Ride History
              </button>
              {/* <button className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Calculate Savings
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 m-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Shared Rides</h2>
              <button className="text-sm text-green-600 hover:text-green-800">View all</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passengers</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuel Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{ride.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{ride.from}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{ride.to}</td>
                      <td className="px-4 py-3 text-sm text-green-600">{ride.passengers}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{ride.fuelSaved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
};

export default PersonalRideSharingDashboard;


