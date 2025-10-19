import express from "express"
import upload from "../Middleware/upload.mjs"
import mongoose from "mongoose"

import Studio from "../Models/Studio.mjs"
const router=express.Router()

router.get("/", async (req, res) => {
  try {
   // ensure connection
    const getStudio = await Studio.find({},{PersonCapacity:1,title:1,images:1});
    res.status(200).json({ message: "getting studio products", Data: getStudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in getting studio products" });
  }
})

router.post ("/post",upload.array("images"),async (req,res) => {
    try {
        console.log("text data",req.body)
            console.log("file",req.files)

if (!req.files || req.files.length === 0) {
  return res.json({ message: "image is required" });
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid studio ID" });
  }

  try {
    const idStudio = await Studio.findById(id);
    if (!idStudio) {
      return res.status(404).json({ message: "Studio not found" });
    }
    res.status(200).json({ message: "getting id of product", data: idStudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in getting id" });
  }
});
// delete api

router.delete("/:id", async (req, res) => {
  try {
    const deletestudio = await Studio.deleteOne({ _id: req.params.id });

    if (deletestudio.deletedCount === 0) {
      return res.status(404).send({ message: "Studio not found" });
    }

    res.send({ message: "Studio deleted successfully", deletestudio });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});


export default router