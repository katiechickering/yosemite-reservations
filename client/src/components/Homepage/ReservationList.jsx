import { Link } from "react-router-dom";
import { formatDate, formatString } from "../../utils/FormatFunctions";

export const ReservationList = ({loading, apiError, reservations}) => {

    return (
        <div className="flex flex-wrap">
            {loading && <p className="text-center">{loading}</p>}
            {apiError && <p className="text-red-500 text-center">{apiError}</p>}
            {reservations?.map(({ firstName, lastName, campsite, date, _id }, index) => (
                <div
                    className="flex flex-col w-[200px] h-[200px] m-6 p-5 border rounded bg-brandLightestGreen
                    border-brandBrown items-center justify-between"
                    key={index}
                >
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
            ))}
        </div>
    )
}