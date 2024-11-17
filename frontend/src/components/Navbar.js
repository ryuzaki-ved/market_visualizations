import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    return (
        <nav className={`navbar ${isDarkMode ? 'dark' : 'light'} animate__animated animate__fadeIn`}>
            <div className="logo">
                <img src="/path/to/your/logo.png" alt="Logo" /> {/* Update with your logo path */}
            </div>
            <ul className="nav-links">
                <li><Link to="/minute-data">Minute Data</Link></li>
                <li><Link to="/tick-data">Tick Data</Link></li>
                <li>
                    <button onClick={toggleTheme} className="theme-toggle">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
