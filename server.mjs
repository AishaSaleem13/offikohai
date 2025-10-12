
import db from "./Config/db.mjs"



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



db.connection.once("open", () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  // Only start server locally
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });}


  export default app 