import mongoose from 'mongoose'

const ConnectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerceDB")
        console.log("DB connected!");

        
    } catch (error) {
        console.log(error)
        
    }
}

export default ConnectDB