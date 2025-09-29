import express from 'express';      
import db from "./Config/db.mjs"

db.connection.once("open", () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));



  const app=express()


  app.use(express.json())

   if (process.env.NODE_ENV === 'production') {
    app.listen(5000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
   }
    export default app; 