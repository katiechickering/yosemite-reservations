import { useState, useEffect } from "react"
import { getAllReservations } from "../services/reservation.service"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLogin } from '../context/UserContext'
import { CampsiteSearch } from "../components/Homepage/CampsiteSearch"
import { ReservationList } from "../components/Homepage/ReservationList"

export const Home = () => {

    const [allReservations, setAllReservations] = useState([])
    const [filteredReservations, setFilteredReservations] = useState([])
    const [campsiteSearch, setCampsiteSearch] = useState("")
    const [loading, setLoading] = useState({getAllReservations: "Loading reservations..."})
    const [apiErrors, setApiErrors] = useState({})

    const navigate = useNavigate()
    const { isLoggedIn } = useLogin()

    // Store all reservations in state
    useEffect(() => {
        if( !isLoggedIn ){
            navigate('/login')
        }
        else {
            getAllReservations()
                .then((res) => {
                    setAllReservations(res);
                    setFilteredReservations(res);
                })
                .catch(error => {
                    console.log("getAllReservations error:", error)
                    setApiErrors(prev => ({...prev, getAllReservations: "Unable to load reservations."}))
                    toast.error("Unable to load reservations.")
                })
                .finally(() => setLoading(prev => ({...prev, getAllReservations: false})))
        }
    }, [])

    // Sort by campsite or view all
    const handleSelectChange = (e) => {
        const value = e.target.value
        setCampsiteSearch(value)
        if (value) {
            setFilteredReservations(
                allReservations.filter(
                    (reservation) => reservation.campsite === value
                )
            )
        } else {
            setFilteredReservations(allReservations)
        }
    }

    // Reset campsite search to view all reservations
    const resetReservations = () => {
        setCampsiteSearch("")
        setFilteredReservations(allReservations)
    };

    return (
        <div className="backgroundLayout">

            {/* Search by campsite */}
            <CampsiteSearch
                campsiteSearch={campsiteSearch}
                onSelectChange={handleSelectChange}
                onReset={resetReservations}
            />

            {/* Reservations */}
            <ReservationList
                loading={loading.getAllReservations}
                apiError={apiErrors.getAllReservations}
                reservations={filteredReservations}
            />

        </div>
    )
}