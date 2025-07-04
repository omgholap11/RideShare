import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import "./index.css";
// import HomePage from './HomePage.jsx'
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import HomeMain from "./components/HomeMain";
import Footer from "./components/Footer";
import BookRidePage from "./components/BookRidePage";
import Layout from "./components/Layout.jsx";
import DriverSignUp from "./components/DriverSignUp.jsx";
import DriverLogin from "./components/DriverLogIn.jsx";
import DriverDashboard from "./components/DriverDashboard.jsx";
import OfferRide from "./components/OfferRide.jsx";
import RidePlaced from "./components/RidePlaced.jsx";
import RideResults from "./components/RideResults.jsx";
import RequestedRides from "./components/RequestedRides.jsx";
import BookRide from "./components/BookRide.jsx";
import UserLoginPage from "./components/UserLogInPage.jsx";
import UserSignUpPage from "./components/UserSignUpPage.jsx";
import RideBookSuccess from "./components/RideBookSuccess.jsx";
import UserNotification from "./components/UserNotification.jsx";
import DriverFeedbackForm from "./components/DriverFeedbackForm.jsx";
import ThankingUser from "./components/ThankingUser.jsx";
import RegistrationOptions from "./components/RegistrationOptions.jsx";
import AboutUs from "./components/AboutUs.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Popup from "./components/popup.jsx";

import {Provider} from "react-redux";
import { store } from "./App/store.js";
import SupportPage from "./components/SupportPage.jsx";
import SafetyPage from "./components/SafetyPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <>
            <HomeMain />
            <Cards />
          </>
        ),
      },  
      {
        path: "book",
        element: <BookRidePage />,
      },
      {
        path: "signup",
        element: <DriverSignUp />,
      },
      {
        path : "login",
        element : <DriverLogin/>
      },
      {
        path : "dashboard",
        element : <DriverDashboard/>
      },
      {
        path : "offer",
        element : <OfferRide/>
      },
      {
          path : "rideplaced",
          element : <RidePlaced/>
      },
      {
        path : "rideresults",
        element : <RideResults/>
      },
      {
        path : "requestedrides",
        element : <RequestedRides/>
      },
      {
        path : "bookride",
        element : <BookRide/>
      },
      {
        path : "userlogin",
        element : <UserLoginPage/>
      },
      {
        path : "usersignup",
        element : <UserSignUpPage/>
      },{
        path : "ridebooksuccess",
        element : <RideBookSuccess/>
      },
      {
        path : "usernotifications",
        element : <UserNotification/>
      },
      {
        path : "driverfeedback",
        element : <DriverFeedbackForm/>
      },
      {
        path : "thankinguser",
        element : <ThankingUser/>
      },
      {
        path : "registrationoptions",
        element : <RegistrationOptions/>
      },
      {
        path : "aboutus",
        element : <AboutUs/>
      },
      {
        path : "contactus",
        element : <ContactUs/>
      },
      {
        path : "/popup",
        element : <Popup/>
      },
      {
        path : "support",
        element : <SupportPage/>
      },
      {
        path : "safety",
        element : <SafetyPage/>
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
 
 <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>
);
