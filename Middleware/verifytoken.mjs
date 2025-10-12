// import User from "../Models/User.mjs";
// import jwtSecret from "../Config/jwt.mjs";
// import jwt from "jsonwebtoken";

// async function verifytoken(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   console.log(token + " token from verifytoken");

//   if (!token) {
//     return res.status(401).send("No access, login first");
//   }

//   try {
//     const decodedcheck = jwt.verify(token, jwtSecret);

//     const tokenExited = await User.findOne({ tokens: token });
//     if (!tokenExited) {
//       return res.status(401).send("Invalid token");
//     }

//     req.userId = decodedcheck._id;
//     req.tokentoremove = token;  // ✅ property, not function
//     next();
//   } catch (e) {
//     res.status(401).send({ message: "Invalid token!" });
//   }
// }

// export default verifytoken;
