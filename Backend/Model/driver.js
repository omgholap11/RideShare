const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender : {
      type : String,
      required : true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    drivingLicenseNumber:{
      type : String,
      required : true,
      unique : true,
    },
    dateOfBirth:{
      type : String,
      required : true,
    },
    vehicleName : {
      type : String,
      required : true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    report : {
      type : String,
      required : true,
    },
    image : {
      type : String,
      required : true,
    }
  },
  { timestamps: true }
);


const driver = mongoose.model("driver",driverSchema);

module.exports = driver;