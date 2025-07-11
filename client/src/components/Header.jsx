import {Link, useLocation} from 'react-router-dom'
import yosemiteIcon from '../assets/yosemiteIcon.png'
import { useLogin } from '../context/UserContext'
import { logout } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

export const Header = ({headerInfo}) => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout } = useLogin()
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
    else if (pathname.startsWith("/reservation/details")){
        headerText = `${headerInfo.firstName}'s Reservation Details` // Reservation Details Header
        route1 = "/"
        linkText1 = "View All Reservations"
        route2 = "/parkinfo"
        linkText2 = "Park Information"
    }
    else {
        headerText = "Yosemite Reservations"
    }

    // Logout button
    const handleLogout = async () => {
        try{
            await logout()
            userLogout()
            toast.success("Logout successful!")
            navigate('/login')
        } catch( error ){
            console.error('Logout Failed:', error)
            toast.error("Unable to logout.")
        }
    }

    return (
        <div className="flex justify-between items-center w-screen bg-brandGreen h-[17vh] p-3 border-2">

            <div className="flex items-center justify-between h-full">
                <Link to={"/"} className="h-full bg-transparent border-none p-0 shadow-none">
                    <img src={yosemiteIcon} alt="yosemite-icon" className="h-full"/>
                </Link>
                <h1 className="text-5xl text-white tracking-wide ml-10">{headerText}</h1>
            </div>
            {
                isLoggedIn ?
                    <div className="flex h-full justify-between items-center">
                        <Link to={route1} className="mr-5">{linkText1}</Link>
                        <Link to={route2} className="mr-5">{linkText2}</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                :
                    <div className="flex h-full justify-between items-center">
                        <Link to={'/login'} className="mr-5">Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
            }

        </div>
    )
}