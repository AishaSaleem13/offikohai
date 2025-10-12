import app from "./index.mjs"
import db from "./Config/db.mjs"
import Studio from "./Models/Studio.mjs";
 app.get("/testdb", async (req,res)=>{
  try {
    const count = await Studio.countDocuments();
    res.send({ message: "DB connected", studioCount: count });
  } catch(err) {
    res.send({ error: err.message });
  }
});
db.connection.once("open", () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  // Only start server locally
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}