const mongoose = require("mongoose");

const userRouteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Corrected type
      ref: "user", // Reference to the "User" collection
      required: true
    },
    rideId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the "Driver" collection
      ref: "route",
      required: true
    },
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    },
    time: {
      type: String, // Use a string for formatted time (or Date if using timestamps)
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed","requested"], // Possible ride statuses
      default: "pending"
    },
    rideCost : {
      type:Number,
      required : true,
    },
    date : {
      type : String,
      required : true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userRoute", userRouteSchema);
