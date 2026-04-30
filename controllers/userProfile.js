import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'



//  Signup new user
const handleSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

      
        if (!username || username.trim().length === 0) 
            return res.status(400).json({ errMsg: "username is required" });
        if (!email || email.trim().length === 0) 
            return res.status(400).json({ errMsg: "email is required" });
        if (!password || password.length < 6) 
            return res.status(400).json({ errMsg: "password must be at least 6 characters" });

        
        const existingUser = await userModel.findOne({ email: email });

        console.log("Existing user:",existingUser)


        if (existingUser) {
            return res.status(400).json({ errMsg: "Email already registered and user exists" });
        }

        console.log("Password before hashing:",password);
        

        const hashedPassword = await bcrypt.hash(password,10)
        console.log("password after hashing",hashedPassword);
        

        // Create new user
        const newUser = await userModel.create({
            name: username,
            email: email,
            password: hashedPassword 
            
        });

        return res.status(201).json({ 
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ errMsg: "Server Error" });
    }
};

//  user login
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || email.trim().length === 0) 
            return res.status(400).json({ errMsg: "email is required" });
        if (!password || password.length < 2) 
            return res.status(400).json({ errMsg: "valid password is required" });

        
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ errMsg: "user not found" });
        }

        
       const isMatch= await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(400).json({errMsg:"invalid password"})
       }
            const token = jwt.sign(
                { id: user._id, name: user.name,email:user.email,role:user.role},
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({ 
                user: user,
                token: token, 
                message: "login success" 
            });
       

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ errMsg: "Server Error" });
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await userModel
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({
            message: "User profile",
            user
        });

    } catch (error) {
        next(error);
    }
};
const updateProfile = async (req, res, next) => {
    try {
        const { name, email, phone, address, password } = req.body;

        const user = await userModel.findById(req.user.id);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        if (name) {
            if (name.trim().length === 0) {
                const err = new Error("Name cannot be empty");
                err.statusCode = 400;
                return next(err);
            }
            user.name = name.trim();
        }

        if (email) {
            const emailLower = email.toLowerCase().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailLower)) {
                const err = new Error("Invalid email");
                err.statusCode = 400;
                return next(err);
            }

            const existingUser = await userModel.findOne({ email: emailLower });

            if (existingUser && existingUser._id.toString() !== req.user.id) {
                const err = new Error("Email already in use");
                err.statusCode = 400;
                return next(err);
            }

            user.email = emailLower;
        }

        if (phone) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                const err = new Error("Invalid phone number");
                err.statusCode = 400;
                return next(err);
            }
            user.phone = phone;
        }

        if (address) {
            user.address = {
                street: address.street || user.address.street,
                city: address.city || user.address.city,
                pincode: address.pincode || user.address.pincode
            };
        }

        if (password) {
            if (password.length < 6) {
                const err = new Error("Password must be at least 6 characters");
                err.statusCode = 400;
                return next(err);
            }

            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: "Profile updated successfully",
            user: userResponse
        });

    } catch (error) {
        next(error);
    }
};

export {
    handleSignup,      
    handleLogin,       
    getProfile,            
    updateProfile,     
           
};

