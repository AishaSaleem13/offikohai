import dotenv from 'dotenv';
dotenv.config();

export const MongoURL=process.env.MONGODB_URL
export const PORT=process.env.PORT || 5000;