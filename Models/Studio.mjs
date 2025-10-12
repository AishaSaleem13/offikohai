import mongoose from "mongoose";
import { Schema } from "mongoose";
 const StudioSchma = new Schema({
title:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
images:[{
    type:String,
    required:true
}
],
PersonCapacity:{
    type:String,
    required:true
},
description:{
     type:String,
    required:true
},
slots:[{
time:String,
isbooked:{default:false,type:Boolean}
}]

 })


  const Studio = mongoose.model("Studio",StudioSchma)
  export default Studio