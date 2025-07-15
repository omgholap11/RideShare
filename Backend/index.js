const express = require("express");
const {connectMongoDB} = require("./Controllers/connectMongoDB.js");
const driverRoute = require("./Routes/driver.js");
const offerRoute = require("./Routes/offer.js");
const bookRoute = require("./Routes/book.js");
const userRoute = require("./Routes/user.js");
const tokenRouter = require("./Routes/tokenRoute.js");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");
const  checkForAuthenticationCookie  = require("./Middleware/Authentication.js");
require("dotenv").config();

const app = express();

// CORS configuration - must be before other middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false
}));

//connecting database ............
connectMongoDB(process.env.MONGO_URL);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(checkForAuthenticationCookie("token"));

// routes
app.use("/driver", driverRoute);
app.use("/offer", offerRoute);
app.use("/book",bookRoute);      //book == userroute
app.use("/user",userRoute)
app.use("/gettokendetails",tokenRouter);

//server
app.listen(5001, () => {  // Changed port to 5001 to match frontend request
    console.log("Server is started on port 5001!!!");
});

