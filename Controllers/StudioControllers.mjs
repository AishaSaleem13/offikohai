import Studio from "../Models/Studio.mjs";


// get api 






// postapi 


 


export const Studioid = async (req,res) => {
    try {
        const idStudio= await Studio.findById(req.params.id)
        console.log(idStudio)
        res.status(200).json({message:"getting id of product",data:idStudio})
    } catch (error) {
        res.status(500).json({message:"erorr in getting id "})
    }
}



 

