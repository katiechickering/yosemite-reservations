import {model, Schema} from "mongoose"

const ReservationSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            minlength: [2, "First name must be at least 2 characters."],
            maxlength: [30, "First name must be no more than 30 characters."]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            minlength: [2, "Last name must be at least 2 characters."],
            maxlength: [30, "Last name must be no more than 30 characters."]
        },
        campsite: {
            type: String,
            required: [true, "Campsite is required."],
            enum: [
                "upperPines", "lowerPines", "northPines", "wawona", "hodgdonMeadow",
                "tuolumneMeadows", "bridalveilCreek", "craneFlat", "tamarackFlat",
                "whiteWolf", "yosemiteCreek", "porcupineFlat", "tuolumneMeadows", "camp4"
            ]
        },
        date: {
            type: Date,
            required: [true, "Date is reqired."],
            validate: [
                {
                    validator: v => {
                    let today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return v >= today
                    },
                    message: "Your reservation date must not be in the past."
                },
                {
                    validator: v => {
                        let oneYearFromToday = new Date()
                        oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1)
                        oneYearFromToday.setHours(0, 0, 0, 0)
                        return v <= oneYearFromToday
                    },
                    message: "Your reservation cannot be more than 1 year in advance."
                },
            ]
        },
        lengthOfStay: {
            type: Number,
            required: [true, "The length of stay is required."],
            min: [1, "Your reservation must be at least 1 day long."],
            max: [14, "Your reservation cannot be longer than 2 weeks."]
        },
        partySize: {
            type: Number,
            required: [true, "The size of your party is required."],
            min: [1, "Your party must have at least 1 person."],
            max: [8, "Your party cannot have more than 8 people."]
        },
        hasPets: {
            type: Boolean,
            default: false
        },
        hasRV: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const Reservation = model("Reservation", ReservationSchema)
export default Reservation