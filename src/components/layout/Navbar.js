import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

/**
 * Navbar with name and logo icon
 */
function Navbar() {

    return (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <div className="container">
                        <Link
                            to="/"
                            className="col s5 brand-logo left black-text"
                        >
                            <i className="material-icons">public</i>
                            Marstagram
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;