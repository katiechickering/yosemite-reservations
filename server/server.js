import express from "express"
import cors from "cors"
import {config} from "dotenv"
import dbConnect from "./config/mongoose.config.js"
import reservationRouter from "./routes/reservation.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'

config()

const PORT = process.env.PORT
dbConnect()
const app = express()

app.use( cors( { origin: process.env.CORS_ORIGIN, credentials: true } ) )

app.use(express.json())
app.use(cookieParser())

// wake up free server
app.get("/v1/yosemiteReservations/ping", (req, res) => res.sendStatus(200))

app.use("/v1/yosemiteReservations/reservation", reservationRouter)
app.use("/v1/yosemiteReservations/user", userRouter)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))