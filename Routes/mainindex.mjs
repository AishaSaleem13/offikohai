import express from "express";
 const router=express.Router()
import login from "../Routes/login.mjs"


router.use("/login",login)

export default router 