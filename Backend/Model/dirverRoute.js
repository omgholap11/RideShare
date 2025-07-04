const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    driverId: {
        type : mongoose.Schema.Types.ObjectId,  // reference of the user
        ref : "drivers",
    },
    routePath : [
        {
            lat :Number,
            lng : Number,
            _id : false,
        }
    ],
    distance : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    rideStartTime : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["completed","cancelled","matched","available","onHold","booked","notBooked"],
        required : true,
    },
    source : {
        type : String,
        required : true,
    },
    destination : {
        type : String,
        required : true,
    },
    matchedUsers: [
        {
          userId : {type : mongoose.Schema.Types.ObjectId , ref : "users"},
          userRouteId : {type : mongoose.Schema.Types.ObjectId , ref : "userRoute"},
          name: { type: String, required: true },
          contactNumber: { type: String, required: true },
          startLocation: { type: String, required: true },
          endLocation: { type: String, required: true },
          status: { type: String, enum: ["requested", "accepted", "declined"], default: "requested" },
          rideCost : {type:Number , required : true},
          time : {type : String , required : true},
          date : {type : String , required : true}
        }
    ]
},{timestamps : true});


const route = mongoose.model("route",routeSchema);

module.exports = route;
    