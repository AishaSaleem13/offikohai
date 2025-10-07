import express from "express"
import { Studioget,Studioid,studiopost } from "../Controllers/StudioControllers.mjs"
import upload from "../Middleware/upload.mjs"

const router=express.Router()

router.get("/",Studioget)
router.post("/post",upload.array("images"),studiopost)
router.get("/Studio/:id",Studioid)
export default router