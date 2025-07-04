const express = require("express");
const { handleDriverSignUp, handleDriverLogin , handleSendDriverDetails} = require("../Handlers/driver");
const app = express();

app.post("/signup",handleDriverSignUp);

// app.get("",(req,res)=>{
//     return res.send("Hello from backend!!");
// })

app.post("/login",handleDriverLogin);

app.post("/dashboard",handleSendDriverDetails);



module.exports = app;