import React from 'react';

const Navbar = () => {
    return (
        <div className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">Moovie</div>
                <div>
                    <a href="#" className="text-white p-2">Home</a>
                    <a href="#" className="text-white p-2">Movies</a>
                    <a href="#" className="text-white p-2">TV Show</a>
                </div>
            </div>
        </div>
    );
}


export default Navbar;