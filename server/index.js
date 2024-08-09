import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import appointmentRoute from './routes/appointmentRoute.js'

dotenv.config()
const app = express()
const port = process.env.PORT


//routes
app.use('/user',userRoute)
app.use('/appointment',appointmentRoute)


//middleware
app.set('port', port)

app.use(cors({
    origin: "*"

}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//middleware 404 handlers
app.use("*", (req,res)=> {
    res.status(404).json({
        status: false,
        message: "API Doesnt exist"
    })
 

})



const server = http.createServer(app)


server.listen(port, () => {
    console.log(`server is running  on http://localhost:${port}`)
});



