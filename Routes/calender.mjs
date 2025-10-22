import Studio from "../Models/Studio.mjs"
import express from "express"
import Booking from "../Models/Booking.mjs"

// get api 

const router=express.Router()
// router.get("/",async (req,res) => {
//     try {
//         const {Studioid,date}=req.query

//         if (!Studioid || !date) {
//   return res.status(400).json({ message: "roomId and date are required" });
// }
//     const studio = await Studio.findById(Studioid);
//     if (!studio) {
//       return res.status(404).json({ message: "Studio not found" });
//     }
// const booking =await Booking.find({Studioid,date})
// const bookedslots = booking.map(b=>b.slottime? [b.slottime] : [])
// let status="green"
// if (bookedslots.length>10){
//     let status="red"
// }
// else if(bookedslots.length>6){
//     let status="yellow"
// }
// return res.status(200).json({
//   Studioid,
//   date,
//   totalSlots: studio.slots,
//   bookedslots,
//   status,
// });}

    
//      catch (error) {
//   console.error("Error fetching calendar:", error);
//   res.status(500).json({ message: "Internal server error" });
// }






router.get("/", async (req, res) => {
  try {
    const { Studioid, date } = req.query;

    if (!Studioid || !date) {
      return res.status(400).json({ message: "Studioid and date are required" });
    }

    const studio = await Studio.findById(Studioid);
    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }

    const booking = await Booking.find({ Studioid, date });

    // ✅ Better way to map slot times
    const bookedslots = booking.flatMap(b => b.slottime ? [b.slottime] : []);

    // ✅ Status logic fix
    let status = "green";
    if (bookedslots.length > 10) status = "red";
    else if (bookedslots.length > 6) status = "yellow";

    return res.status(200).json({
      Studioid,
      date,
      totalSlots: studio.slots,
      bookedslots,
      status,
    });

  } catch (error) {
    console.error("Error fetching calendar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// gettion studio id and date feteched from frontened then, getting studio id datat and store it in variable 
// so from that we can extrect slots and compare it with cming slots.then in a variable store booking field  what already booked in that 
// field with studioid,data respectively yani is id or date ki konse bookings hoye we hain field mein check akro .
// then map the bookslots 
// condition and then response return in json so can use further .then catch


export default router
