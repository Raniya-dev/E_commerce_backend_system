import express from 'express'
import {adminLogin, deleteUserAdmin} from '../controllers/authentication.js'
import { verifyToken } from '../middleware/verifyToken.js'
import authMiddleware from '../middleware/authMiddleware.js'


const authRouter = express.Router()


authRouter.post('/login',adminLogin)
authRouter.delete('/users/:userId',verifyToken,authMiddleware("admin"),deleteUserAdmin)

export default authRouter;