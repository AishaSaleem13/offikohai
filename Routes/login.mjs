import express from "express"
import { get, login, logout, signupapi } from "../Controllers/LoginControllers.mjs";
import verifyToken from "../Middleware/verifytoken.mjs"

const router = express.Router();

router.post("/signup",signupapi)
router.post("/login",login)
router.put("/logout",verifyToken,logout)
router.get("/",get)

export default router