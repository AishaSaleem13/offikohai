import app from "./index.mjs";
import db from "./Config/db.mjs"; // now db is the connection

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
