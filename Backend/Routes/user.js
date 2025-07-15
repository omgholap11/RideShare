const express = require("express");
const { handleUserLogin,handleUserSignUp ,handleGetUserToken} = require("../Handlers/user");
const app = express();

app.post("/signup",handleUserSignUp);

app.post("/login",handleUserLogin);

module.exports = app;