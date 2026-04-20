import express from 'express'
import ConnectDB from './config/dbConnection.js'


const app = express()
ConnectDB()


app.get('/',(req,res)=>{
    res.send("hello world")
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
})