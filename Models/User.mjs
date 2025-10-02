// user schma for auth and authorize work 
import { request } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import jwtSecret from "../Config/jwt.mjs"
import { Schema } from "mongoose";
const userSchme =Schema({

FullName:{
    type:String,
    required:true
}
,
Email:{
    type:String,
    required:true
},
Password:{
    type:String,
    required:true
},
ConfirmPassword:{
    type:String,
    required:false
}
,QuickQuestion:{
    type:String,
    required:true

},
tokens:{
    default:[],
    type:[String]
}

})
userSchme.pre('save',function(next){
    const user=this
    if(user.isModified("Password")){
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(user.Password,salt)


        user.Password=hash
    }
next()
})


userSchme.methods.comparepassword =function(Password){

    const user=this

    console.log(`from raw password ${Password}`)
    console.log(`from db password ${user.Password}`)
     return  bcrypt.compareSync (Password, user.Password);


}


userSchme.methods.generatetoken = function (){
    const {_id}= this
    const token = jwt.sign({_id},jwtSecret)
    return token 
}


const User= mongoose.model("User",userSchme)
export default User