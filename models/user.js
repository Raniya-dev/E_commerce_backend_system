import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
       
        role: {
            type: String,
            enum: ["user", "admin", "guest"],
            default: "user"

        },

        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            pincode: { type: String }
        },


        isActive: {
            type: Boolean,
            default: true
        }
    }


)


export const userModel = mongoose.model("Users", userSchema)

