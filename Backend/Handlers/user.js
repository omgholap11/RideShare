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
  
      // Create new driver
      const created = await user.create({
        fullName: newuser.name,
        mobileNumber: newuser.mobileNumber,
        password: newuser.password,
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
  
  
  
  
  // async function handleUserLogin(req, res) {
  //   const { mobileNumber, password } = req.body;
  
  //   if (!mobileNumber || !password) {
  //     console.log({ msg: "failed", error: "Missing field in login form" });
  //     return res.status(400).json({ msg: "failed", error: "Missing field in login form" });
  //   }
  
  //   try {
  //     const getuser = await user.findOne({ mobileNumber });
  //     if (!getuser) {
  //       console.log({ msg: "failed", error: "Incorrect email Id entered!" });
  //       return res.status(401).json({ msg: "failed", error: "Incorrect email Id entered!" });
  //     }
  
  //     const checkpass = await bcrypt.compare(password, getuser.password); // Ensure "password" field exists
  
  //     if (!checkpass) {
  //       console.log({ msg: "failed", error: "Incorrect password entered" });
  //       return res.status(401).json({ msg: "failed", error: "Incorrect password entered" });
  //     }
  
  //     // Create JWT Token
  //     const token = jwt.sign(
  //       { name: getuser.fullName ,mobileNumber : getuser.mobileNumber, userid: getuser._id ,role : "user"},
  //       process.env.JWT_SECRET,  // Use an environment variable for security
  //       { expiresIn: "2h" }  // Token expires in 2 hour
  //     );
  
  //     // Set cookie with proper options
  //     res.cookie('token', token, {
  //       httpOnly: false,           // Changed to true for security
  //       secure:  false,                           //process.env.NODE_ENV === 'production',  // Only use secure in production
  //       sameSite: 'lax',
  //       maxAge: 2 * 60 * 60 * 1000, // 2 hours
  //     });
  
  //     console.log("token setted");
  //     console.log(token);
  
  //     return res.status(200).json({
  //       msg: "Success",
  //       name: getuser.fullName,
  //       mobileNumber: getuser.mobileNumber,
  //       userid: getuser._id,
  //       token // Include token in response for frontend storage if needed
  //     });
  
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return res.status(500).json({ msg: "failed", error: "Server error" });
  //   }
  // }


   const handleUserLogin = async (req,res)=>{
  const {mobileNumber , password} = req.body;
  if (!mobileNumber || !password) {
    return res.status(404).json({ msg: "Invalid fields Entered!!!" });
  }

  const User = await user.matchedUserAndGenerateToken(mobileNumber , password);
  console.log(User);
  
  if(User.error)
  {
    return res.status(500).json({error : "Sign In failed!!"});
  }

  console.log("Token of user: ",User.token);
  const token = User.token ;
  return res.status(200).cookie('token' ,token , { httpOnly: true , secure : false , sameSite : 'Lax' , maxAge: 2 * 60 * 60 * 1000,} ).json({msg : "Sign In succedded"});
}



  module.exports = {handleUserLogin,handleUserSignUp };