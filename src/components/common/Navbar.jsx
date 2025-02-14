import React from 'react';
import { Link } from 'react-router-dom';

const navbars = [
    {
        text : "Home",
        link : "/"
    },
    {
        text : "Movies",
        link : "/movie"
    },
    {
        text : "TV Show",
        link : "/tv"
    },
]

const navbarItems = navbars.map((navbar, index) => {
    return (
        <Link key={index}
            to={navbar.link}
            className="text-white p-2"
        >
            {navbar.text}
        </Link>
    );
}
);

const Navbar = () => {
    return (
        <nav className="pr-10 py-5 flex justify-between bg-transparent fixed w-full z-50 top-0 items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">
                        Moovie
                    </Link>
                </div>
                <div className='pr-10'>
                    {navbarItems}
                </div>
        </nav>
        
    );
}


export default Navbar;