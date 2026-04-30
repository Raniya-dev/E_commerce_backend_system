import express from 'express'
import { handleLogin, handleSignup, getProfile, updateProfile } from '../controllers/userProfile.js';
import { verifyToken } from '../middleware/verifyToken.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();


userRouter.post('/signup', handleSignup);

userRouter.post('/login', handleLogin);


userRouter.get('/profile', verifyToken,authMiddleware, getProfile);


userRouter.put('/profile', authMiddleware, updateProfile)


export default userRouter;