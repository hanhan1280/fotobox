import React from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/vector_art.jpg";

const Landing = () => {
    return (
        <div style={{ height: "75vh"}} className="container valign-wrapper">
            <div className="row">
                <img src={LandingImg} className="responsive-img" style={{
                    position:"absolute",
                    bottom:0,
                    right:0,
                    zIndex:-1,
                    width: "75vh"
                }}/>
                <div className="col s12 center-align">
                    <h4>
                        <b>Upload</b> Images Here{" "}
                    </h4>
                    <p className="flow-text grey-text text-darken-1">
                        A minimalistic image repository for you.
                         </p>
                    <br />
                    <div className="col s12">
                        <Link
                            to="/login"
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        > Get Started
                        
                    <i className="material-icons right">arrow_forward</i>
                        </Link>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Landing;