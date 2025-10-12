import express from 'express';      


import cors from "cors"
import router from "./Routes/Studio.mjs"



  const app=express()

app.use(cors())
  app.use(express.json())
  app.get("/", (req, res) => {
  res.send("🚀 API is running on Vercel product post without img");
  
});
app.use("/",router)
    export default app; 