import express from "express"

import Studio from "../Models/Studio.mjs"
const router=express.Router()

router.get("/", async (req, res) => {
  try {
   // ensure connection
    const getStudio = await Studio.find();
    res.status(200).json({ message: "getting studio products", Data: getStudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in getting studio products" });
  }
})

router.post ("/post",async (req,res) => {
    try {
        console.log("text data",req.body)
            console.log("file",req.files)

if (!req.files) {
    return res.json({message:"image is required "})
}

        const {title,price,PersonCapacity,slots,description}=req.body

        if (!price||!title||!PersonCapacity||!slots||!description) {
    return res.json({message:"all fields required"})}

const parsedSlots = JSON.parse(req.body.slots);

    const postStudio = new Studio({
        title,
        price,
        PersonCapacity,
        slots:parsedSlots,
        description,
        images:req.files.map((files)=>files.path)
    },
    )
        await postStudio.save()
res.status(201).json({message:" studio post completed "})
}
    catch (error) {
        res.status(500).json({message:"error in posting product"})
    }
})

export default router