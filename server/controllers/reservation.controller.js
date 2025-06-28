import Reservation from "../models/reservation.model.js";

// Create
export const createReservation = async (req, res) => {
    try {
        const NEW_RESERVATION = await Reservation.create(req.body)
        res.status(201).json(NEW_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Read
export const getAllReservations = async (req, res) => {
    try {
        const RESERVATIONS = await Reservation.find().sort({ date: 1 })
        res.status(201).json(RESERVATIONS)
    } catch (error) {res.status(400).json(error)}
}

export const getReservationById = async (req, res) => {
    try {
        const RESERVATION = await Reservation.findById(req.params.id)
        res.status(201).json(RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Update
export const updateReservationById = async (req, res) => {
    const options = {
        new: true,
        runValidators: true
    }
    try {
        const UPDATED_RESERVATION = await Reservation.findByIdAndUpdate(req.params.id, req.body, options)
        res.status(201).json(UPDATED_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Delete
export const deleteReservationById = async (req, res) => {
    try {
        const DELETED_RESERVATION = await Reservation.findByIdAndDelete(req.params.id)
        res.status(201).json(DELETED_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}