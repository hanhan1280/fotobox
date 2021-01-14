import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white lighten-5">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo center grey-text text-darken-3"
                    ><i className="material-icons">camera</i>photobox
                </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header;