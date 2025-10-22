// Get roomId, date, and hours

// Fetch total slots for that studio (from Studio collection)

// Fetch booked slots (from Booking collection)

// Compare → Return only consecutive free blocks



// get ai 

import express from "express"
import Studio from "../Models/Studio.mjs"
import Booking from "../Models/Booking.mjs"
const router = express.Router()
router.get("/",async (req,res) => {
    try {
        const {Studioid,date,hour}=req.query
          if (!Studioid || !date || !hour) {
      return res.status(400).json({ message: "roomId, date, and hours are required" });
    }
       const studio= await Studio.findOne( {_id: Studioid, date })
        if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }
       const bookings= await Booking.find({Studioid,date}) 
        if (!bookings) {
      return res.status(404).json({ message: "bookings not found" });
    }
       const bookedslots= bookings.flatMap(b=>b.slots.flatMap(s=>s.time))

       let availableslots=studio.slots.filter(s=>!bookedslots.includes(s.time))
       let freeslots=[]

       for (let index = 0; index <availableslots.length -hour; index++) {
             let block = availableslots.slice(index,index+Number(hour))

             let iscontinious=true
             for (let i = 0; i < block.length -1; i++) {
              if (!check(block[i].time,block[j+1].time)){
                iscontinious=false
                break
              }}
            if (iscontinious){
                freeslots.push(block)
            }}
        const check= (time1,time2)=>{
         const end=parentint(time1.split("-")[1].split(":")[0])
         const start =parseInt(time2.split("-")[0].split(":")[0])
         return end===start
        }
        res.send(200).json({
            Studioid,
            date,
            hour,
            freeslots,
         message: "Successful — consecutive free slots fetched",
        }
        )
        
        }
      catch (error) {
    res.status(500).json({ message: error.message });
  }
})







export default router;

// summary [
// first we get studio id date and hour selected by user in query .then 
// we get studio to get its slots .then booking to get that id booking from its field.
// then we map booked slots double maopping map then by map get its tiem used flatmap so it put all array in single array .
// then filter studioslots and check tat with booked slots ,store it in variable .
// then made an array .then loop the filter slots with givn condition of - hour so it do  the steps in given condition like hour is 4 so 
// one step get end length of 4 then again loop ,then in block ariable we dodi slice give starting oint  and constion i+hour cause 
// last value didnt go up in slice so it will take care of it .
// then after again loop with consition of -1 means check on index tehn again loop  so it will give from array
// (one index to check if its continious like [11:00-12:00 12:00-1:00 1:00-2:00 2:00-3:00]this is one index cause hour is give 4 

// ) 
// then in lopp it will check by function by end and satrt value  and if true it will  give you the selected free slots of give hour time 

// ]
