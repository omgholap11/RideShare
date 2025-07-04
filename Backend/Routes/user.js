const express = require("express");
const { handleUserLogin,handleUserSignUp ,handleGetUserToken} = require("../Handlers/user");
const app = express();

app.post("/signup",handleUserSignUp);
// Replace with your actual secret key

app.get("/get-token",handleGetUserToken);

app.post("/login",handleUserLogin);

module.exports = app;