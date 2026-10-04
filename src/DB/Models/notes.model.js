import mongoose, { Schema , model  } from "mongoose";

const notesSchema = new Schema({
    title:{
        type:String,
        required : [true , "Title must be required"] ,
        validate: {
    validator: function (value) {
        return value !== value.toUpperCase();
    },
    message: "Title must not be entirely uppercase"
}
    },
    content:{
        type:String,
        required:[true , "Content must be required"] ,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required :[true , "UserId must be required"] ,
        ref : "User"
    }
},{
    timestamps:true
});

const notesModel = model("Notes" , notesSchema);

export default notesModel;