import express from "express";


import studio from "../Routes/Studio.mjs"

 const router=express.Router()

router.use("/studio",studio)

export default router 