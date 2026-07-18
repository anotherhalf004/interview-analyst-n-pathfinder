import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, 'username already taken'],
        required: true
    },
    email:{
        type:String,
        unique:[true,'Account already exists with this email'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('user',UserSchema);

export default userModel;