// import React from "react";
// import { User } from "lucide-react";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navigation Bar */}
//       <header className="bg-white shadow-md py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           {/* Logo and Website Name */}
//           <div className="flex items-center">
//             <div className="h-10 w-10 bg-blue-600 rounded-full mr-2"></div>
//             <div className="text-2xl font-bold text-blue-600">RideShare</div>
//           </div>

//           {/* Navigation Links */}
//           <nav className="flex items-center space-x-6">
//             <a
//               href="#about"
//               className="text-gray-600 hover:text-blue-600 transition"
//             >
//               About Us
//             </a>
//             <a
//               href="#contact"
//               className="text-gray-600 hover:text-blue-600 transition"
//             >
//               Contact Us
//             </a>
//             {/* <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">Login</button> */}
//             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center">
//               <User className="w-4 h-4 mr-2" />
//               Register
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section with Background Image */}
//       <section className="relative h-96">
//         {/* Background Image */}
//         <div className="absolute inset-0 bg-gray-900">
//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-60"
//             style={{ backgroundImage: "url('/api/placeholder/1920/600')" }}
//           ></div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
//           <h1 className="text-4xl font-bold mb-8 text-center">
//           Ride Begins Here – Let’s Go!
//           </h1>

//           {/* Action Buttons */}
//           <div className="flex space-x-6">
//             <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
//               Book a Ride
//             </button>
//             <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-semibold">
//               Offer a Ride
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Cards Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Why Choose Our Platform
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Card 1 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Save Money
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Share travel costs and reduce your daily expenses significantly.
//               </p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Eco-Friendly
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Reduce carbon emissions by sharing rides instead of taking
//                 separate vehicles.
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-purple-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Safety First
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Verified profiles and rating system ensure you travel with
//                 trusted companions.
//               </p>
//             </div>

//             {/* Card 4 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-red-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Connect
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Meet new people and build your network while traveling to your
//                 destination.
//               </p>
//             </div>

//             {/* Card 5 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-yellow-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Time-Saving
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Quick matching algorithm finds the perfect ride match in
//                 seconds.
//               </p>
//             </div>

//             {/* Extra card to make the grid look better */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-indigo-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">
//                 Secure Payments
//               </h3>
//               <p className="text-gray-600 text-center">
//                 Transactions are handled securely through our platform.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Media Section */}
//       <section className="py-12 bg-blue-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold mb-8">Connect With Us</h2>
//           <div className="flex justify-center space-x-8">
//             {/* Instagram Button */}
//             <a
//               href="#"
//               className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center hover:opacity-80 transition"
//             >
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//               </svg>
//             </a>

//             {/* YouTube Button */}
//             <a
//               href="#"
//               className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
//             >
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
//               </svg>
//             </a>

//             {/* WhatsApp Button */}
//             <a
//               href="#"
//               className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition"
//             >
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="bg-gray-800 text-white py-10">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {/* Company Info */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">RideShare</h3>
//               <p className="text-gray-400 mb-4">
//                 Connecting riders and bikers for a better, more efficient way to
//                 travel.
//               </p>
//               <div className="flex items-center">
//                 <div className="h-8 w-8 bg-blue-600 rounded-full mr-2"></div>
//                 <span className="text-gray-300">RideShare Inc.</span>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     How It Works
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Legal */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Legal</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Cookie Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition"
//                   >
//                     Safety Guidelines
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Info */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="flex items-start">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2 mt-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <span>123 Bike Street, Ride City, RD 12345</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2 mt-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span>support@rideshare.com</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2 mt-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   <span>+1 (555) 123-4567</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
//             <p>
//               © {new Date().getFullYear()} RideShare Inc. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
