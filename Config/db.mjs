import mongoose from 'mongoose';
import { MongoURL } from './environment.mjs';

mongoose.connect(MongoURL)

export default mongoose;
