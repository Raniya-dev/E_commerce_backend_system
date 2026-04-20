import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    fullName:String,
    phone:String,
    street:String,
    city:String,
    state:String,
    postalCode:String
})

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },

        phoneNo:{
            type:String

        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"

        },
        addresses:[addressSchema],
        
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}

)


export const userModel = mongoose.model("Users",userSchema)

