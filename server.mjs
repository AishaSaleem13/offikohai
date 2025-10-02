import app from "./index.mjs"
import db from "./Config/db.mjs"


db.connection.once("open", () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
