import mongoose from 'mongoose'

const orderItemSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    name:String,
    price:Number,
    quantity:{
        type:Number,
        required:true
    },
    image:String
})

const orderSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true
        },
        orderItems :[orderItemSchema],
        shippingAddress:{
            address:String,
            city:String,
            postalCode:String,
            phoneNo:String

        },
        paymentMethod:{
            type:String,
            required:true
        },
        paymentStatus:{
            type:String,
            enum:["pending","paid","failed"],
            default:"pending"
        },
        totalPrice:{
            type:Number,
            required:true
        },
        orderStatus:{
            type:String,
            enum:["pending","Shipped","delivered","cancelled"],
            default:"pending"
        },
        deliveredAt:Date,
      
    },
    {timestamps:true},
)

export const orderModel = mongoose.model("Order",orderSchema)