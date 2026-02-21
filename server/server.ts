import express, { Request, Response, Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import reservationRouter from "./routes/reservation.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';

config();

const PORT: string | number = process.env.PORT || 8000;
dbConnect();

const app: Application = express();

app.use(cors({ 
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.get("/v1/yosemiteReservations/ping", (_req: Request, res: Response) => {
    res.sendStatus(200);
});

app.use("/v1/yosemiteReservations/reservation", reservationRouter);
app.use("/v1/yosemiteReservations/user", userRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
