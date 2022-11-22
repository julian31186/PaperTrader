import { connect } from "mongoose";

export const connectDatabase = async () => {
    const token:string = process.env.MONGO_TOKEN!;
    await connect(token);
    console.log("Database Connected!")
}