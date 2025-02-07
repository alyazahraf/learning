import React from 'react';
import { Link } from 'react-router-dom';

const navbars = [
    {
        text : "Home",
        link : "#"
    },
    {
        text : "Movies",
        link : "#"
    },
    {
        text : "TV Show",
        link : "#"
    },
]

const navbarItems = navbars.map((navbar, index) => {
    return (
        <Link key={index}
            href={navbar.link}
            className="text-white p-2"
        >
            {navbar.text}
        </Link>
    );
}
);

const Navbar = () => {
    return (
        <nav className="px-10 py-5 flex justify-between">
                <div className="text-white text-2xl font-bold">Moovie</div>
                <div>
                    {navbarItems}
                </div>
        </nav>
        
    );
}


export default Navbar;