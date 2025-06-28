import { useState, useEffect } from "react"
import { getAllReservations } from "../services/ReservationService"
import { Link } from "react-router-dom"
import { formatDate, formatString } from "../utils/FormatFunctions"
import { toast } from "react-toastify"

export const Home = () => {

    const [allReservations, setAllReservations] = useState([])
    const [filteredReservations, setFilteredReservations] = useState([])
    const [campsiteSearch, setCampsiteSearch] = useState("")
    const [loading, setLoading] = useState({reservationInfo: "Loading reservations..."})
    const [errors, setErrors] = useState({reservationInfo: false})

    // Store all reservations in state
    useEffect(() => {
        getAllReservations()
        .then((res) => {
            setAllReservations(res);
            setFilteredReservations(res);
        })
        .catch(error => {
            console.log("getAllReservations error:", error)
            setErrors(prev => ({...prev, reservationInfo: "Unable to load reservations."}))
            toast.error("Unable to load reservations.")
        })
        .finally(() => setLoading(prev => ({...prev, reservationInfo: false})))
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

            {/* Search by campsite form */}
            <div className="flex items-center">
                <label htmlFor="campsite" className="mr-4">Search By Campsite: </label>
                <select 
                    name="campsite"
                    id="campsite"
                    value={campsiteSearch}
                    required
                    className="mr-4"
                    onChange={handleSelectChange}
                >
                    <option disabled value="">Select a Campsite</option>
                    <option value="upperPines">Upper Pines</option>
                    <option value="lowerPines">Lower Pines</option>
                    <option value="northPines">North Pines</option>
                    <option value="wawona">Wawona</option>
                    <option value="hodgdonMeadow">Hodgdon Meadow</option>
                    <option value="tuolumneMeadows">Tuolumne Meadows</option>
                    <option value="bridalveilCreek">Bridalveil Creek</option>
                    <option value="craneFlat">Crane Flat</option>
                    <option value="tamarackFlat">Tamarack Flat</option>
                    <option value="whiteWolf">White Wolf</option>
                    <option value="yosemiteCreek">Yosemite Creek</option>
                    <option value="porcupineFlat">Porcupine Flat</option>
                    <option value="tuolumneMeadows">Tuolumne Meadows</option>
                    <option value="camp4">Camp 4</option>
                </select>
                <button type="button" onClick={resetReservations}>View All</button>
            </div>

            {/* Reservations */}
            <div className="flex flex-wrap">
                {loading.reservationInfo ? (
                    <p>{loading.reservationInfo}</p>
                ) : errors.reservationInfo ? (
                    <p className="text-red-500 text-center">{errors.reservationInfo}</p>
                ) : (
                    filteredReservations.map(({firstName, lastName, campsite, date, _id}, index)=> (
                        <div className="flex flex-col w-[200px] h-[200px] m-6 p-5 border rounded bg-brandLightestGreen
                            border-brandBrown items-center justify-between" key={index}>
                            <p>{firstName} {lastName}</p>
                            <p>{formatString(campsite)}</p>
                            <p>{formatDate(date)}</p>
                            <Link 
                                to={`/reservation/details/${_id}`}
                                className="bg-brandGreen hover:bg-brandBrown"
                            >
                                View Reservation
                            </Link>
                        </div>
                    ))
                )}
            </div>
            
        </div>
    )
}