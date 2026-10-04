import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("MongoDb connected Successfully")
        });
        await mongoose.connect(process.env.DB_URI);
    }catch(error){
        console.log("Error connect DB" ,error );
        }
}