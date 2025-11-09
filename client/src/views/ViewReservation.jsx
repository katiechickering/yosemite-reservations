import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getReservationById, deleteReservationById } from "../services/reservation.service"
import { formatDate, formatString } from "../utils/FormatFunctions"
import { toast } from "react-toastify"
import { useLogin } from '../context/UserContext'
import { getCurrentUser } from "../services/user.service"

export const ViewReservation = ({setHeaderInfo}) => {

    const [reservation, setReservation] = useState({})
    const [loading, setLoading] = useState(true)
    const [apiErrors, setApiErrors] = useState({})
    const [currentUser, setCurrentUser] = useState({})

    const {id} = useParams()
    const navigate = useNavigate()
    const { isLoggedIn } = useLogin()

    // Load page with reservation data
    useEffect( () => {
        if( !isLoggedIn ){
            navigate('/login')
        }
        else {
            getCurrentUser()
                .then(res => setCurrentUser(res))
                .catch(error => {
                    console.log("getProfile error:", error)
                    setApiErrors(prev => ({...prev, getCurrentUser: "Unable to load current user."}))
                    toast.error("Unable to load current user.")
                })
            getReservationById(id)
                .then(res => {
                    res.campsite = formatString(res.campsite)
                    res.date = formatDate(res.date)
                    setReservation(res)
                    setHeaderInfo(res)
                })
                .catch(error => {
                    console.log("getReservationById error:", error)
                    setApiErrors(prev => ({...prev, getReservationById: "Unable to load reservation details."}))
                    toast.error("Unable to load reservation details.")
                })
                .finally(() => setLoading(false))
        }
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
            setApiErrors(prev => ({...prev, deleteReservationById: "Unable to delete reservation."}))
            toast.error("Unable to delete reservation.")
        })
    }

    return (
        <div className="backgroundLayout items-center">

            {/* Reservation Details */}
            <div className="flex flex-col items-center border-2 border-brandBrown bg-brandLightestGreen py-5 px-10 rounded">

                {loading && <p className="text-center">Loading reservation details...</p>}

                {apiErrors.getReservationById && <p className="text-red-500 text-center">{apiErrors.getReservationById}</p>}

                {apiErrors.getCurrentUser && <p className="text-red-500 text-center">{apiErrors.getCurrentUser}</p>}

                <p className="text-3xl">{reservation.firstName} {reservation.lastName}</p>

                <p className="mb-5">Username: @{reservation.user?.userName}</p>

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
                
                {/* Buttons if logged in user is reservation owner*/}
                { (reservation.user?._id == currentUser._id && !loading) &&
                    <div className="m-3 flex justify-evenly w-full">
                        <button type="button"
                            className="bg-brandDarkBrown hover:bg-brandBrown text-white"
                            onClick={deleteReservation}
                        >
                            Delete
                        </button>

                        <Link to={`/reservation/update/${id}`} className="bg-brandGreen hover:bg-brandBrown">Update</Link>
                    </div>
                }
                
                {apiErrors.deleteReservationById && <p className="text-red-500 text-center">{apiErrors.deleteReservationById}</p>}

            </div>

        </div>
    )
}