'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLogin } from '@/context/UserContext';
import { logout } from '@/services/user.service'; // Update your service path
import { toast } from "react-toastify";
import { useUI } from "@/context/UIContext";

// Define the type for your prop
interface HeaderProps {
    headerInfo?: {
        firstName?: string;
        _id?: string;
    };
}

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { headerInfo } = useUI();
    const { isLoggedIn, logout: userLogout } = useLogin();

    // Logic for dynamic text/links
    let headerText = "Yosemite Reservations";
    let route1 = "/";
    let linkText1 = "View All Reservations";
    let route2 = "/parkinfo";
    let linkText2 = "Park Information";

    // Matching logic (Updated for Next.js pathnames)
    if (pathname === "/") {
        headerText = "Yosemite Reservations";
        route1 = "/reservation/add";
        linkText1 = "Create a Reservation";
    } else if (pathname === "/reservation/add") {
        headerText = "Create a Reservation";
    } else if (pathname.startsWith("/reservation/update")) {
        headerText = `Update ${headerInfo.firstName || 'Guest'}'s Reservation`;
        route1 = `/reservation/details/${headerInfo._id}`;
        linkText1 = "View Reservation";
    } else if (pathname.startsWith("/parkinfo")) {
        headerText = "Yosemite Park Information";
        route1 = "/";
        linkText1 = "View All Reservations";
        route2 = "/reservation/add";
        linkText2 = "Create a Reservation";
    } else if (pathname.startsWith("/reservation/details")) {
        headerText = `${headerInfo.firstName || 'Guest'}'s Reservation Details`;
    }

    const handleLogout = async () => {
        try {
            await logout();
            userLogout();
            toast.success("Logout successful!");
            router.push('/login');
        } catch (error) {
            console.error('Logout Failed:', error);
            toast.error("Unable to logout.");
        }
    };

    return (
        <header className="flex justify-between items-center w-full bg-brand-green min-h-[120px] p-6 border-2 relative z-20">
            <div className="flex items-center h-full">
                <Link href="/" className="h-[100px] bg-transparent border-none p-0 shadow-none relative w-[100px]">
                    <Image
                        src="/YosemiteIcon.png" 
                        alt="yosemite-icon"
                        fill
                        className="object-contain"
                        sizes="100px"
                        priority
                    />
                </Link>
                <h1 className="text-5xl text-white tracking-wide ml-10">{headerText}</h1>
            </div>

            <nav className="flex items-center h-full">
                {isLoggedIn ? (
                    <div className="flex items-center">
                        <Link href={route1} className="mr-5">{linkText1}</Link>
                        <Link href={route2} className="mr-5">{linkText2}</Link>
                        <button onClick={handleLogout} className="cursor-pointer">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link href="/login" className="mr-5">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};
