import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Users, Bike, Calendar, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
function HomeMain() {
  const navigate = useNavigate();
  // const images = [
  //   "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
  //   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  //   "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  //   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  //   "rideshare_main.png",
  // ];

  const images = ["rideshare_main.png"];

  const navigateToBookPage = () => navigate("/book");
  const navigateToOfferRide = async ()=>{
     try {
      const response = await fetch("http://localhost:5001/user/get-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Token fetch failed:", response.statusText);
        navigate("/login");
      }

      const data = await response.json();
      if(data.role === "driver")
      {
        navigate("/offer");
      }
      else
      {
       navigate("/login");
      }
     
    } catch (error) {
      console.error("Error fetching user role:", error);
      navigate("/login"); 
    }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateInterval = 5000; // Extended to 5 seconds for better visibility

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        nextImage();
      }, autoRotateInterval);
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);

 return (
    <div className="relative min-h-screen bg-indigo-100 font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-300/10 to-pink-300/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Content Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 text-slate-800 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-indigo-700 tracking-wide">
                  #1 Ridesharing Platform
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Smarter Commutes,
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Better Journeys
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-light">
                Connect with travelers heading your way. Share rides, split costs, 
                and reduce your carbon footprint while making new connections.
              </p>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                onClick={navigateToBookPage}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Book a Ride
                </div>
              </button>
              
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                onClick={navigateToOfferRide}
              >
                <div className="absolute inset-0 bg-gradient-to-r  from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Bike className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Offer a Ride
                </div>
              </button>
            </div>
            
            {/* Social Proof Section */}
            <div className="pt-8 border-t border-slate-200/50">
              <p className="text-sm text-slate-500 mb-3 font-medium">Trusted by commuters worldwide</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" />
                  ))}
                </div>
                <span className="ml-2 text-slate-700 font-semibold">4.9/5</span>
                <span className="text-slate-500">from 10,000+ users</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image Carousel */}
          <div
            className="relative w-full max-w-xl mx-auto md:mx-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm bg-white/10">
              {/* Main Image */}
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={images[currentImageIndex]}
                  alt={`Rideshare experience ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full transition-all duration-700 ease-in-out"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20 backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                  style={{
                    width: isPaused ? "0%" : "100%",
                    transitionDuration: isPaused ? "0ms" : `${autoRotateInterval}ms`,
                    transitionProperty: "width",
                    transitionTimingFunction: "linear",
                  }}
                />
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* Image Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 shadow-sm ${
                    index === currentImageIndex 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-8 shadow-lg" 
                      : "bg-slate-300 hover:bg-slate-400 w-3"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Image Caption */}
            <div className="text-center mt-6 text-slate-600 italic text-sm font-medium">
              Join thousands of satisfied commuters on their daily journeys
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMain;