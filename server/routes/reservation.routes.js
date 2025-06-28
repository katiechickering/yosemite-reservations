import {Router} from "express"
import { createReservation, deleteReservationById, getAllReservations, getReservationById, updateReservationById } from "../controllers/reservation.controller.js"

const reservationRouter = Router()

reservationRouter.route("/")
    .get(getAllReservations)
    .post(createReservation)

reservationRouter.route("/:id")
    .get(getReservationById)
    .put(updateReservationById)
    .delete(deleteReservationById)

export default reservationRouter