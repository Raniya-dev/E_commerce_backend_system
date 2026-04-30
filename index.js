import express from 'express'
import ConnectDB from './config/dbConnection.js'
import { configDotenv } from 'dotenv'
import userRouter from './routes/userProfileRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import authRouter from './routes/authenticationRoutes.js'
import analyticRouter from './routes/analyticsRoutes.js'


configDotenv()

const app = express()
ConnectDB()

app.use(express.json())

// Routes
app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/admin',authRouter)
app.use('/analytics',analyticRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})