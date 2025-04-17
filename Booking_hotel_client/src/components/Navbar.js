import { Link } from "react-router-dom";
import React from "react";
const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Booking Hotel
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/hotels" className="text-white hover:text-gray-300">Hotels</Link>
                    <Link to="/rooms" className="text-white hover:text-gray-300">Rooms</Link>
                    <Link to="/bookings" className="text-white hover:text-gray-300">Bookings</Link>
                    <Link to="/user-profile" className="text-white hover:text-gray-300">Profile</Link>
                    <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;