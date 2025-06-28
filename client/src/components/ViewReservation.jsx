import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getReservationById, deleteReservationById } from "../services/ReservationService"
import { formatDate, formatString } from "../utils/FormatFunctions"
import { toast } from "react-toastify"

export const ViewReservation = ({setHeaderInfo}) => {

    const [reservation, setReservation] = useState({})
    const [loading, setLoading] = useState({reservationInfo: "Loading reservation details..."})
    const [errors, setErrors] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    // Load page with reservation data
    useEffect( () => {
        getReservationById(id)
        .then(res => {
            res.campsite = formatString(res.campsite)
            res.date = formatDate(res.date)
            setReservation(res)
            setHeaderInfo(res)
        })
        .catch(error => {
            console.log("getReservationById error:", error)
            setErrors(prev => ({...prev, reservationInfo: "Unable to load reservation details."}))
            toast.error("Unable to load reservation details.")
        })
        .finally(() => setLoading(prev => ({...prev, reservationInfo: false})))
    }, [id])

    // Delete reservation
    const deleteReservation = () => {
        deleteReservationById(id)
        .then(RES => {
            toast.success("Reservation deleted successfully!")
            navigate("/")
        })
        .catch(error => {
            console.log("deleteReservationById error:", error)
            setErrors(prev => ({...prev, deleteRequest: "Unable to delete reservation."}))
            toast.error("Unable to delete reservation.")
        })
    }

    return (
        <div className="backgroundLayout items-center">

            {/* Reservation Details */}
            <div className="flex flex-col items-center border border-brandBrown bg-brandLightestGreen py-5 px-10">
                {loading.reservationInfo && <p>{loading.reservationInfo}</p>}
                {errors.reservationInfo && <p className="text-red-500 text-center">{errors.reservationInfo}</p>}
                <p className="m-5 text-3xl">{reservation.firstName} {reservation.lastName}</p>
                <p className="m-3">{reservation.campsite} Campsite</p>
                <p className="m-3">Arrival Date: {reservation.date}</p>
                <p className="m-3">{reservation.lengthOfStay} Days</p>
                <p className="m-3">{reservation.partySize} People</p>
                <p className="m-3">
                    {reservation.hasPets
                    ? `${reservation.firstName} is bringing pets!`
                    : "No Pets"}
                </p>
                <p className="m-3">
                    {reservation.hasRV
                    ? `${reservation.firstName} is bringing an RV!`
                    : "No RV"}
                </p>

                {/* Buttons */}
                <div className="m-3 flex justify-evenly w-full">
                    <button type="button"
                        className="bg-brandDarkBrown hover:bg-brandBrown text-white"
                        onClick={deleteReservation}
                    >
                        Delete
                    </button>
                    <Link to={`/reservation/update/${id}`} className="bg-brandGreen hover:bg-brandBrown">Update</Link>
                </div>
                {errors.deleteRequest && <p className="text-red-500 text-center">{errors.deleteRequest}</p>}

            </div>

        </div>
    )
}