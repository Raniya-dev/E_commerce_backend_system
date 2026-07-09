import express from 'express'
import ConnectDB from './config/dbConnection.js'
import { configDotenv } from 'dotenv'
import userRouter from './routes/userProfileRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import authRouter from './routes/authenticationRoutes.js'
import analyticRouter from './routes/analyticsRoutes.js'
import cors from 'cors'
import contactRouter from "./routes/contactRoute.js"
import cartRouter from "./routes/cartRoutes.js"
import storeapidataRouter from "./routes/storeapidataRoutes.js"

configDotenv()

const app = express() // ✅ FIRST create app

ConnectDB()

// ✅ CORS (ONLY ONCE, BEFORE ROUTES)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.urlencoded({extended:true}))

// ✅ Body parser
app.use(express.json())

// ✅ Routes
app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/admin', authRouter)
app.use('/analytics', analyticRouter)
app.use("/contact", contactRouter)
app.use("/cart", cartRouter);
app.use("/api",storeapidataRouter)

// ✅ Debug logger (optional)
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})