import { MongoURL} from "./environment.mjs"
import mongoose from "mongoose"

mongoose.connect(MongoURL)
 export default mongoose