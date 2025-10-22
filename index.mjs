import express from "express";
import db from "./Config/db.mjs"
import cors from "cors";
import router from "./Routes/mainindex.mjs"


const app = express();
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// })
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("🚀 API is running on Vercel ");
  ``
});
app.use("/",router)
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("server is running port 5000");
  });
}

export default app;