import express from "express";
import Booking from "../Models/Booking.mjs";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    console.log("📩 Body:", req.body);

    const {
      
      studiiName,
      noofpeople,
      phonenumber,
      slottime,
      date,
      userName,
    } = req.body;

    if (
      
      !studiiName ||
      !noofpeople ||
      !phonenumber ||
      !slottime ||
      !date ||
      !userName
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }


    const bookingData = new Booking({
      
      studiiName,
      noofpeople,
      phonenumber,
      slottime,
      date,
      userName,
    });

    await bookingData.save();

    res.status(200).send({
      message: "Booking posted successfully",
      booking: bookingData,
    });
  } catch (error) {
    console.error(" Error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

export default router;
