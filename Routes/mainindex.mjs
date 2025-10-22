import express from "express";
import calender from "../Routes/calender.mjs"
import studio from "../Routes/Studio.mjs"
import bookingForm from "../Routes/Booking.mjs"
import slots from "../Routes/Slots.mjs"

 const router=express.Router()

router.use("/studio",studio)
router.use("/calender",calender)
router.use("/slots",slots)
router.use("/bookings",bookingForm)
export default router 