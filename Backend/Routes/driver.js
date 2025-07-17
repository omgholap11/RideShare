const express = require("express");
const { handleDriverSignUp, handleDriverLogin , handleSendDriverDetails,handleDriverLogOut} = require("../Handlers/driver");
const checkForDriverAuthenticationCookie = require("../Middleware/DriverAuthentication");
const app = express();

app.post("/signup",handleDriverSignUp);

// app.get("",(req,res)=>{
//     return res.send("Hello from backend!!");
// })

app.post("/login",handleDriverLogin);

app.post("/dashboard",handleSendDriverDetails);

app.post("/logout",checkForDriverAuthenticationCookie("token"),handleDriverLogOut);



module.exports = app;