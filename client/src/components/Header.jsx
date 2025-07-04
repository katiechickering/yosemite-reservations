import {Link, useLocation} from 'react-router-dom'
import yosemiteIcon from '../assets/yosemiteIcon.png'

export const Header = ({headerInfo}) => {

    const {pathname} = useLocation()

    let headerText
    let route1
    let linkText1
    let route2
    let linkText2

    if (pathname == "/") { // Homepage Header
        headerText = "Yosemite Reservations"
        route1 = "/reservation/add"
        linkText1 = "Create a Reservation"
        route2 = "/parkinfo"
        linkText2 = "Park Information"
    }
    else if (pathname == "/reservation/add") { // Create a Reservation Header
        headerText = "Create a Reservation"
        route1 = "/"
        linkText1 = "View All Reservations"
        route2 = "/parkinfo"
        linkText2 = "Park Information"
    }
    else if (pathname.startsWith("/reservation/update")) { // Update a Reservation Header
        headerText = `Update ${headerInfo.firstName}'s Reservation`
        route1 = `/reservation/details/${headerInfo._id}`
        linkText1 = "View Reservation"
        route2 = "/parkinfo"
        linkText2 = "Park Information"
    }
    else if (pathname.startsWith("/parkinfo")) { // Park Information Header
        headerText = "Yosemite Park Information"
        route1 = "/"
        linkText1 = "View All Reservations"
        route2 = "/reservation/add"
        linkText2 = "Create a Reservation"
    }
    else {
        headerText = `${headerInfo.firstName}'s Reservation Details` // Reservation Details Header
        route1 = "/"
        linkText1 = "View All Reservations"
        route2 = "/parkinfo"
        linkText2 = "Park Information"
    }

    return (
        <div className="flex justify-between items-center w-screen bg-brandGreen h-[17vh] p-3 border-2">
            <div className="flex items-center justify-between h-full">
                <img src={yosemiteIcon} alt="yosemite-icon" className="h-full"/>
                <h1 className="text-5xl text-white tracking-wide ml-10">{headerText}</h1>
            </div>
            <div className="flex flex-col h-full justify-evenly items-center">
                <Link to={route1} className="w-full">{linkText1}</Link>
                <Link to={route2} className="w-full">{linkText2}</Link>
            </div>
        </div>
    )
}