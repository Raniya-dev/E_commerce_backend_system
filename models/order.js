import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true
            },
            quantity: {
                type: Number,
                required: true,
                min:1,
                default:1
            },

        }
    ],
    totalAmount: {
        type:Number,
        required:true,
        min:0
    },

    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
  

}, { timestamps: true });

export const orderModel = mongoose.model("Order", orderSchema);


