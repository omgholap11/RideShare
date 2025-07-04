const driver = require("../Model/driver.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {convertStringToImage} = require("../strToImage.js");
const {fetchDLDetails} = require("../APIs/dlAPI.js");
require("dotenv").config({ path: "../.env" });


async function handleDriverSignUp(req, res) {
  console.log("Request to sign up received!!");
  const newuser = req.body;
  console.log(newuser);

  // Validate required fields
  if (
    !newuser ||
    !newuser.firstName ||
    !newuser.lastName ||
    !newuser.emailId ||
    !newuser.gender ||
    !newuser.password ||
    !newuser.confirmPassword ||
    !newuser.mobileNumber ||
    !newuser.vehicleNumber ||
    !newuser.drivingLicenseNumber ||
    !newuser.dateOfBirth ||
    !newuser.state ||
    !newuser.address ||
    !newuser.vehicleName
  ) {
    console.log({ msg: "failed", error: "Field missing or incorrect in signup form." });
    return res.status(400).json({ msg: "failed", error: "Field missing or incorrect in signup form." });
  }


  try {
   
    const existingDriver = await driver.findOne({ emailId: newuser.emailId });
    if (existingDriver) {
      return res.status(400).json({ msg: "failed", error: "Email already registered." });
    }
  

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newuser.password, salt);

    
    const created = await driver.create({
      firstName: newuser.firstName,
      lastName: newuser.lastName,
      gender: newuser.gender,
      mobileNumber: newuser.mobileNumber,
      emailId: newuser.emailId,
      password: hashedPassword,
      vehicleNumber: newuser.vehicleNumber,
      drivingLicenseNumber: newuser.drivingLicenseNumber,
      address: newuser.address,
      state: newuser.state,
      dateOfBirth: newuser.dateOfBirth,
      report: 0,
      vehicleName: newuser.vehicleName,
      image : `${newuser.emailId}.jpg`
    });
console.log(created);
    // if (!created) {
    //   console.log({ msg: "failed", error: "Error while creating user." });
    //   return res.status(500).json({ msg: "failed", error: "Error while creating user." });
    // }

    // res.setHeader("Content-Type", "application/json");
    console.log("User signed up successfully!!");
    return res.status(201).json({ msg: "success" });

  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}




async function handleDriverLogin(req, res) {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    console.log({ msg: "failed", error: "Missing field in login form" });
    return res.status(400).json({ msg: "failed", error: "Missing field in login form" });
  }

  try {
    const getuser = await driver.findOne({ emailId });
    if (!getuser) {
      console.log({ msg: "failed", error: "Incorrect email Id entered!" });
      return res.status(401).json({ msg: "failed", error: "Incorrect email Id entered!" });
    }

    const checkpass = await bcrypt.compare(password, getuser.password); // Ensure "password" field exists

    if (!checkpass) {
      console.log({ msg: "failed", error: "Incorrect password entered" });
      return res.status(401).json({ msg: "failed", error: "Incorrect password entered" });
    }

  
    const token = jwt.sign(
      { emailId: getuser.emailId, userid: getuser._id ,role : "driver"},
      process.env.JWT_SECRET, 
      { expiresIn: "2h" }  
    );

  
    res.cookie('token', token, {
      httpOnly: false,           //true
      secure: false,                  //process.env.NODE_ENV === 'production'
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    console.log("token setted");

    return res.status(200).json({
      msg: "Success",
      firstName: getuser.firstName,
      lastName: getuser.lastName,
      userid: getuser._id,
      token 
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "failed", error: "Server error" });
  }
}






async function handleSendDriverDetails(req,res){
    const driverId = req.body.userid;
    console.log(driverId);
    console.log("Request to send info recieved");
    const driverInfo = await driver.findById(driverId);
    if(!driverInfo)
    {
        console.log("User does not exist in database!!");
        return res.status(404).json({msg : "Failed to fetch userdetails"});
    }
    return res.status(200).json({name : `${driverInfo.firstName} ${driverInfo.lastName}`, 
    image : driverInfo.image , vehicleName : driverInfo.vehicleName , vehicleNumber : driverInfo.vehicleNumber})
}


module.exports = {handleDriverSignUp,handleDriverLogin,handleSendDriverDetails};


// handleDriverSignUp();








// const dln = "MH1420230052295";
  //   const dateOfBirth = "2005-09-13";
  //   const year = dateOfBirth.substring(0,4);
  //   const month = dateOfBirth.substring(5,7);
  //   const date = dateOfBirth.substring(8,10);
  //   const dob = `${date}-${month}-${year}`;

  // await fetchDLDetails(dln,dob).then((details)=>{
  //   console.log(details);
  //   // console.log(details.Succeeded);
  //   // console.log(details.Succeeded.statusMessage);
  //   // console.log(details.Succeeded.data);
  //   // console.log(details.Succeeded.data.result);
  //   images = details.Succeeded.data.result.image;
  //   console.log(details.Succeeded.data.result.image);
  // })

  // console.log(details.Succeeded.data.result.image);

    // const response = await fetchDLDetails(dln,dob);
    // console.log(response);
    // // response?.Succeeded?.statusMessage
    // let imageString;
    // console.log(response.Succeeded);
    // console.log(response.Succeeded.statusMessage);
    // console.log(response.Succeeded.data);
    // console.log(response.Succeeded.data.result);
    // console.log(response.Succeeded.data.result.image);

    // if (response?.Succeeded?.statusMessage === "Success") {
    //    imageString = response.Succeeded.data.result.image;
    //   // return { success: true, image: imageString };
    // }
    // console.log("Image>>>   ",imageString);
    // } else {
    //   return res.status(500).json({msg : "Error while fetching user driving details!!"});
    // }

    // console.log(imageString);

    // convertStringToImage(imageString,`${newuser.emailId}`);