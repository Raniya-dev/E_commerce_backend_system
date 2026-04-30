import { userModel } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const adminLogin = async (req,res)=>{
    try {

        const{email,password}=req.body;

        const user = await userModel.findOne({email})
        console.log("Got the user:",user);
        


        if(!user){
            return res.status(404).json({errMsg:"user  not found"})

        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errMsg:"invalid password"})
        }

        if(user.role !== "admin"){
            return res.status(403).json({errMsg:"Access denied,admin only allowed"})
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},//payload
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        return res.status(200).json({user:user,token:token,message:"admin Login successfull"})
        
    } catch (error) {

        return res.status(500).json({errMsg:"Server Error"})
        
    }
}


const deleteUserAdmin = async (req,res)=>{
    try {

        const {userId}=req.params;
        const user = await userModel.findByIdAndDelete(userId)
        console.log("deleted user:",user);

        return res.status(200).json({message:"User deleted successfully"})

        
    } catch (error) {
         return res.status(500).json({errMsg:"Server Error"})
    }
}


export {adminLogin,deleteUserAdmin}