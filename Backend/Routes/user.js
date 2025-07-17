const express = require("express");
const { handleUserLogin,handleUserSignUp ,handleUserLogOut} = require("../Handlers/user");
const checkForUserAuthenticationCookie = require("../Middleware/UserAuthentication");
const app = express();

app.post("/signup",handleUserSignUp);

app.post("/login",handleUserLogin);

app.post("/logout",checkForUserAuthenticationCookie("token"),handleUserLogOut);

module.exports = app;