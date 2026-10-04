import { Schema , model  } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required : [true , "Name must be required"] ,
    },
    email:{
        type:String,
        required : true,
        unique: true ,
    },
    password:{
        type:String,
        required :[true , "Password must be required"] ,
    },
    phone:{
        type:String,
        required : [true , "Phone must be required"] ,
    },
    age:{
        type:Number,
        min: [18, "Age must be at least 18 years old"],
        max: [60, "Age must be at most 60 years old"]
    }
});

const UserModel = model("User" , userSchema);

export default UserModel;
