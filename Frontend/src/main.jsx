import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./App/store.js";

//components
import {
  Navbar,
  BookRide,
  BookRidePage,
  Cards,
  ContactUs,
  CounterCards,
  DriverDashboard,
  DriverLogin,
  DriverSignUp,
  Footer,
  HomeMain,
  Layout,
  LogInOptions,
  OfferRide,
  RegistrationOptions,
  RequestedRides,
  RideBookSuccess,
  RideDetails,
  RidePlaced,
  Unauthorized,
  RideResults,
  RideShareFaq,
  SafetyPage,
  SupportPage,
  ThankingUser,
  UserNotification,
  UserSignUpPage,
  UserLoginPage,
  DriverFeedbackForm,
  AboutUs,
} from "./components/index.js";
import {
  checkUserAuthLoader,
  checkDriverAuthLoader,
} from "./checkAuthLoader.js";

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
        path: "login",
        element: <DriverLogin />,
      },
      {
        path: "dashboard",
        element: <DriverDashboard />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "offer",
        element: <OfferRide />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "rideplaced",
        element: <RidePlaced />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "rideresults",
        element: <RideResults />,
      },
      {
        path: "requestedrides",
        element: <RequestedRides />,
        loader: checkDriverAuthLoader,
      },
      {
        path: "bookride",
        element: <BookRide />,
      },
      {
        path: "userlogin",
        element: <UserLoginPage />,
      },
      {
        path: "usersignup",
        element: <UserSignUpPage />,
      },
      {
        path: "ridebooksuccess",
        element: <RideBookSuccess />,
        loader: checkUserAuthLoader,
      },
      {
        path: "usernotifications",
        element: <UserNotification />,
        loader: checkUserAuthLoader,
      },
      {
        path: "driverfeedback",
        element: <DriverFeedbackForm />,
        loader: checkUserAuthLoader,
      },
      {
        path: "thankinguser",
        element: <ThankingUser />,
        loader: checkUserAuthLoader,
      },
      {
        path: "registrationoptions",
        element: <RegistrationOptions />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "safety",
        element: <SafetyPage />,
      },
      {
        path: "ridedetails",
        element: <RideDetails />,
        checkUserAuthLoader,
      },
      {
        path: "loginoptions",
        element: <LogInOptions />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
