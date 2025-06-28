import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {getReservationById, createReservation, updateReservation} from "../services/ReservationService"
import { toast } from "react-toastify"

const DEFAULT_FORM_VALUES = {
    firstName: "",
    lastName: "",
    campsite: "",
    date: "",
    lengthOfStay: "",
    partySize: "",
    hasPets: false,
    hasRV: false
}

export const ReservationForm = ({setHeaderInfo}) => {

    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState({reservationInfo: "Loading reservation details..."})
    const [dataErrors, setDataErrors] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()

    // Set today's date and 1 year from now for date validations
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let oneYearFromToday = new Date(today)
    oneYearFromToday.setFullYear(today.getFullYear() + 1)

    // Load page as the create form or edit form based on the url
    useEffect(() => {
        if (id) {
            getReservationById(id)
            .then(res => {
                res.date = res.date.slice(0, 10)
                setFormData(res)
                setHeaderInfo(res)
            })
            .catch(error => {
                console.log("getReservationById error:", error)
                setDataErrors(prev => ({...prev, reservationInfo: "Unable to load reservation details."}))
                toast.error("Unable to load reservation details.")
            })
            .finally(() => setLoading(prev => ({...prev, reservationInfo: false})))
        } else {
            setFormData(DEFAULT_FORM_VALUES)
            setLoading(prev => ({...prev, reservationInfo: false}))
        }
    }, [id])

    // Dynamically set form data
    const handleChange = e => {
        const {name, value} = e.target
        if (name == "hasPets") {
            setFormData(prev => ({...prev, [name]: !prev.hasPets}))
        }
        else if (name == "hasRV") {
            setFormData(prev => ({...prev, [name]: !prev.hasRV}))
        }
        else {
            setFormData(prev => ({...prev, [name]: value}))
        }
        validateData(name, value)
    }

    // Validate form inputs dynamically
    const validateData = (name, value) => {
        const validations = {
            firstName: value => (
                value.length < 2 ? "First name must be at least 2 characters."
                : value.length > 30 ? "Name must be no more than 30 characters."
                : false
            ),
            lastName: value => (
                value.length < 2 ? "Last name must be at least 2 characters."
                : value.length > 30 ? "Last name must be no more than 30 characters."
                : false
            ),
            campsite: () => false,
            date: value => {
                value = new Date(value)
                return (value < today ? "Your reservation date must not be in the past."
                : value > oneYearFromToday ? "Your reservation cannot be more than 1 year in advance."
                : false)
            },
            lengthOfStay: value => (
                value < 1 ? "Your reservation must be at least 1 day long."
                : value > 14 ? "Your reservation cannot be longer than 2 weeks."
                : false
            ),
            partySize: value => (
                value < 1 ? "Your party must have at least 1 person."
                : value > 8 ? "Your party cannot have more than 8 people."
                : false
            ),
            hasPets: () => false,
            hasRV: () => false
        }
        setFormErrors(prev => ({...prev, [name]: validations[name](value)}))
    }

    // Check for errors before submitting form
    const isReadyToSubmit = () => {
        for (let key in formErrors){
            if (formErrors[key] != false) {
                return false
            }
        }
        return true
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()
        if (!isReadyToSubmit()){
            toast.error("Please make corrections to the form.")
        }
        else if (id) {
            updateReservation(formData)
            .then(res => {
                toast.success("Reservation updated successfully!")
                navigate(`/reservation/details/${id}`)
            })
            .catch((error) => {
                console.log("updateReservation error:", error)
                setDataErrors(prev => ({...prev, updateRequest: "Unable to update reservation."}))
                toast.error("Unable to update reservation.")
            })
        }
        else {
            createReservation(formData)
            .then(res => {
                toast.success("Reservation created successfully!")
                navigate("/")
            })
            .catch((error) => {
                console.log("createReservation error:", error)
                setDataErrors(prev => ({...prev, createRequest: "Unable to create reservation."}))
                toast.error("Unable to create reservation.")
            })
        }
    }

    return (
        <div className="backgroundLayout items-center flex flex-col">

            <div className="w-1/2">
                <p className="text-center text-xl font-bold mb-8">
                    Not sure which campsite to stay at? Check out the
                    campsite section in the Park Information button above.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="border border-brandBrown bg-brandLightestGreen p-10">
                {loading.reservationInfo && <p>{loading.reservationInfo}</p>}
                {dataErrors.reservationInfo &&
                    <p className="text-red-500 text-center">
                        {dataErrors.reservationInfo}
                    </p>
                }

                <div className="mb-5">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                        id="firstName"
                        required
                        className={formErrors.firstName ? "error" : ""}
                    />
                    {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        name="lastName"
                        id="lastName"
                        required
                        className={formErrors.lastName ? "error" : ""}
                    />
                    {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="campsite">Campsite: </label>
                    <select
                        name="campsite"
                        id="campsite"
                        required
                        value={formData.campsite}
                        onChange={handleChange}
                        className="ml-2"
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
                </div>

                <div className="mb-5">
                    <label htmlFor="date">Arrival Date: </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        name="date"
                        id="date"
                        required
                        className={formErrors.date ? "error" : ""}
                    />
                    {formErrors.date && <p className="text-red-500">{formErrors.date}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="lengthOfStay">Number of Days at the Campsite: </label>
                    <input
                        type="number"
                        value={formData.lengthOfStay}
                        onChange={handleChange}
                        name="lengthOfStay"
                        id="lengthOfStay"
                        required
                        min={1}
                        max={14}
                        className={formErrors.lengthOfStay ? "error" : ""}
                    />
                    {formErrors.lengthOfStay && <p className="text-red-500">{formErrors.lengthOfStay}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="partySize">Number of People in Your Party: </label>
                    <input
                        type="number"
                        value={formData.partySize}
                        onChange={handleChange}
                        name="partySize"
                        id="partySize"
                        required
                        min={1}
                        max={8}
                        className={formErrors.partySize ? "error" : ""}
                    />
                    {formErrors.partySize && <p className="text-red-500">{formErrors.partySize}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="hasPets">Bringing Pets?</label>
                    <input
                        type="checkbox"
                        value={formData.hasPets}
                        onChange={handleChange}
                        name="hasPets"
                        id="hasPets"
                        checked={formData.hasPets}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="hasRV">Bringing an RV?</label>
                    <input
                        type="checkbox"
                        value={formData.hasRV}
                        onChange={handleChange}
                        name="hasRV"
                        id="hasRV"
                        checked={formData.hasRV}
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-brandGreen hover:bg-brandBrown">
                        {id ? `Update Reservation` : "Submit Reservation"}
                    </button>
                </div>

                {dataErrors.createRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.createRequest}
                    </p>
                }
                {dataErrors.updateRequest &&
                    <p className="text-red-500 text-center">
                        {dataErrors.updateRequest}
                    </p>
                }
            </form>

        </div>
    )
}