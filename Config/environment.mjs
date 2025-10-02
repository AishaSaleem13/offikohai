import dotenv from 'dotenv';
dotenv.config();

export const MongoURL=process.env.MONGODB_URL
export const PORT=process.env.PORT || 3000;
export const jwt_secret=process.env.jwt_secret