import {Router} from "express"
import { createReservation, deleteReservationById, getAllReservations, getReservationById, updateReservationById } from "../controllers/reservation.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const reservationRouter = Router()

reservationRouter.route("/")
    .get(protect, getAllReservations)
    .post(protect, createReservation)

reservationRouter.route("/:id")
    .get(protect, getReservationById)
    .put(protect, updateReservationById)
    .delete(protect, deleteReservationById)

export default reservationRouter