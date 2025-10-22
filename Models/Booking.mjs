import mongoose from "mongoose";
import { Schema } from "mongoose";
const BookingSchema=new Schema({

    Studioid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Studio",
        required:false
    },
studiiName:String,
userName:String,
noofpeople:Number,
phonenumber:Number,
slottime:String,
date:String,
 createdAt: { type: Date, default: Date.now }
}



)
const Booking = mongoose.model("Booking",BookingSchema)
export default Booking