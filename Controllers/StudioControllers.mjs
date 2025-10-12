import { uploadToCloudinary } from "../Middleware/upload.mjs";
import Studio from "../Models/Studio.mjs";


// get api 

export const Studioget= async(req,res)=>{

    try {
        const getStudio= await Studio.find({},{PersonCapacity:1,images:1,title:1 })
        console.log(getStudio)
  res.status(200).json({message:"getting studio products",Data:getStudio})

    } 
       catch (error) {
  console.log("GET studio error:", error);
  res.status(500).json({ message: "error in getting studio products" });
}

    
}


// postapi 


 export const studiopost=async (req,res) => {
    try {
        console.log("text data",req.body)
            console.log("file",req.files)
            
let imageUrls = [];

if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    const uploaded = await uploadToCloudinary(file.buffer, "studio");
    imageUrls.push(uploaded.secure_url);
  }
}



        const {title,price,PersonCapacity,slots,description}=req.body

        if (!price||!title||!PersonCapacity||!slots||!description) {
    return res.json({message:"all fields required"})}

const parsedSlots = JSON.parse(req.body.slots.trim());


    const postStudio = new Studio({
        title,
        price,
        PersonCapacity,
        slots:parsedSlots,
        description,
        images:imageUrls
    },
    )
        await postStudio.save()
res.status(201).json({message:" studio post completed "})
}

   catch (error) {
    console.error("Error in posting studio:", error);
    res.status(500).json({ message: "error in posting product", error: error.message });
}
    }

 


export const Studioid = async (req,res) => {
    try {
        const idStudio= await Studio.findById(req.params.id)
        console.log(idStudio)
        res.status(200).json({message:"getting id of product",data:idStudio})
    } catch (error) {
        res.status(500).json({message:"erorr in getting id "})
    }
}



 

