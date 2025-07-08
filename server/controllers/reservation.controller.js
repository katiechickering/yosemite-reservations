import Reservation from "../models/reservation.model.js";

// Create
export const createReservation = async (req, res) => {
    try {
        const NEW_RESERVATION = await Reservation.create({
            ...req.body,
            user: req.user.id
        })
        res.status(201).json(NEW_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Read
export const getAllReservations = async (req, res) => {
    try {
        const RESERVATIONS = await Reservation.find().sort({ date: 1 })
        if (!RESERVATIONS) return res.status(404).json({ error: "Reservations not found" })
        res.status(201).json(RESERVATIONS)
    } catch (error) {res.status(400).json(error)}
}

export const getReservationById = async (req, res) => {
    try {
        const RESERVATION = await Reservation.findById(req.params.id)
        .populate('user', 'userName') 
        if (!RESERVATION) return res.status(404).json({ error: "Reservation not found" })
        res.status(201).json(RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Update
export const updateReservationById = async (req, res) => {
    try {
        const RESERVATION = await Reservation.findById(req.params.id);
        if (!RESERVATION) return res.status(404).json({ error: "Reservation not found" })
        if (RESERVATION.user.toString() !== req.user.id) {
            return res.status(404).json({ error: "Access Denied" })
        }
        const options = {
            new: true,
            runValidators: true
        }
        const UPDATED_RESERVATION = await Reservation.findByIdAndUpdate(req.params.id, req.body, options)
        res.status(201).json(UPDATED_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}

// Delete
export const deleteReservationById = async (req, res) => {
    try {
        const DELETED_RESERVATION = await Reservation.findById(req.params.id)
        if (!DELETED_RESERVATION) return res.status(404).json({ error: "Reservation not found" })
        if (DELETED_RESERVATION.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access Denied" })
        } 
        await Reservation.findByIdAndDelete(req.params.id)
        res.status(201).json(DELETED_RESERVATION)
    } catch (error) {res.status(400).json(error)}
}