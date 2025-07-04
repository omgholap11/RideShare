const user = require("../Model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {fetchDLDetails} = require("../APIs/dlAPI.js");
require("dotenv").config({ path: "../.env" });

async function handleUserSignUp(req, res) {
    console.log("Request to sign up received!!");
    const newuser = req.body;
    console.log(newuser);
  
    // Validate required fields
    if (
      !newuser ||
      !newuser.name ||
      !newuser.mobileNumber ||
      !newuser.password 
    ) {
      console.log({ msg: "failed", error: "Field missing or incorrect in signup form." });
      return res.status(400).json({ msg: "failed", error: "Field missing or incorrect in signup form." });
    }
  
    try {
      // Check if email already exists
      const existingUser = await user.findOne({ mobileNumber: newuser.mobileNumber });
      if (existingUser) {
        return res.status(400).json({ msg: "failed", error: "Email already registered." });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newuser.password, salt);
  
      // Create new driver
      const created = await user.create({
        fullName: newuser.name,
        mobileNumber: newuser.mobileNumber,
        password: hashedPassword, // Fixed typo
      });
  
      if (!created) {
        console.log({ msg: "failed", error: "Error while creating user." });
        return res.status(500).json({ msg: "failed", error: "Error while creating user." });
      }
      console.log(created);
  
      console.log("User signed up successfully!!");
      return res.status(201).json({ msg: "success" });
  
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ msg: "failed", error: "Server error." });
    }
  }
  
  
  
  
  async function handleUserLogin(req, res) {
    const { mobileNumber, password } = req.body;
  
    if (!mobileNumber || !password) {
      console.log({ msg: "failed", error: "Missing field in login form" });
      return res.status(400).json({ msg: "failed", error: "Missing field in login form" });
    }
  
    try {
      const getuser = await user.findOne({ mobileNumber });
      if (!getuser) {
        console.log({ msg: "failed", error: "Incorrect email Id entered!" });
        return res.status(401).json({ msg: "failed", error: "Incorrect email Id entered!" });
      }
  
      const checkpass = await bcrypt.compare(password, getuser.password); // Ensure "password" field exists
  
      if (!checkpass) {
        console.log({ msg: "failed", error: "Incorrect password entered" });
        return res.status(401).json({ msg: "failed", error: "Incorrect password entered" });
      }
  
      // Create JWT Token
      const token = jwt.sign(
        { name: getuser.fullName ,mobileNumber : getuser.mobileNumber, userid: getuser._id ,role : "user"},
        process.env.JWT_SECRET,  // Use an environment variable for security
        { expiresIn: "2h" }  // Token expires in 2 hour
      );
  
      // Set cookie with proper options
      res.cookie('token', token, {
        httpOnly: false,           // Changed to true for security
        secure:  false,                           //process.env.NODE_ENV === 'production',  // Only use secure in production
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      });
  
      console.log("token setted");
      console.log(token);
  
      return res.status(200).json({
        msg: "Success",
        name: getuser.fullName,
        mobileNumber: getuser.mobileNumber,
        userid: getuser._id,
        token // Include token in response for frontend storage if needed
      });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ msg: "failed", error: "Server error" });
    }
  }



  async function handleGetUserToken(req, res) {
    const token = req.cookies.token; // Retrieve token from cookies
    console.log(token);
    if (!token) {
      return res.status(401).json({ success: false, message: "No token found" });
    }
  
    try {
      // Split token into parts to extract payload (JWT format: header.payload.signature)
      const tokenParts = token.split('.');
      
      if (tokenParts.length !== 3) {
        return res.status(400).json({ success: false, message: "Invalid token format" });
      }
  
      // Decode payload (base64 decoding)
      const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
  
      if (!payload.role) {
        return res.status(400).json({ success: false, message: "Role not found in token" });
      }

      if(payload.role === "user")
      {
         return res.json({ success: true, role: payload.role, userid: payload.userid , name : payload.name , userNumber : payload.mobileNumber});
      }
      else
      {
          return res.json({ success: true, role: payload.role, userid: payload.userid});
      }
      
  
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(500).json({ success: false, message: "Error processing token" });
    }
  }
  

  module.exports = {handleUserLogin,handleUserSignUp , handleGetUserToken};