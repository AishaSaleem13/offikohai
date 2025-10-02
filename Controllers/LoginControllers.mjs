
import User from "../Models/User.mjs";


export const get  = async () => {
    try {
        console.log(`hogya`)
        res.status(555).send({message:"getting login application"})
    } catch (error) {
        res.status(565).send({message:"catch errro in login getting "})
    }
}

// 

export const signupapi = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    const user = new User(req.body);
    await user.save();
    console.log("User saved:", user);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error("Registering error:", e.message);
    return res.status(400).json({ message: "registering error", error: e.message });
  }
};


export const login = async (req,res) => {
   try{
     const {Email,Password}=req.body
const useremailcheck = await User.findOne({ Email: Email });
console.log("Email from body:", Email);


    if (!useremailcheck){
    return res.status(404).send({ message: 'User Not Found' });
    }

    // password check in login 
    const userpasswordcheck = useremailcheck.comparepassword (Password)
    if (!userpasswordcheck){

        return res.status(400).send({message:`password incorrect`})
    }

    // genrate token 
const tokengenration = useremailcheck.generatetoken()
useremailcheck.tokens.push(tokengenration)
await useremailcheck.save()
   res.send({ message: 'User logged in successfully!', token:tokengenration });
}
   
 catch (e) {
    console.error("Login error:", e); // 👈 console me exact error dikhega
    res.status(500).send({ message:`error in generating token `,
       error:e.message });

    }
}
export const logout = async(req,res)=>{
await User.findByIdAndUpdate(req.userId, {$pull:{tokens:req.tokentoremove}}) 
res.send({message:"user logout successfully"})
}