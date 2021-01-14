import React from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/vector_art.png";

const Landing = () => {
    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: "15vh"}}>
                <div className="col s12 m12 l4 center-align"  style={{ marginTop: 50}}>
                    <h3 style={{textShadow: "2px 3px 5px rgba(0,0,0,0.3)"}}>
                        <b>Upload</b> Images Here{" "}
                    </h3>
                    <p className="flow-text grey-text text-darken-1">
                        A minimalistic image repository for you.
                         </p>
                    <br />
                    <div className="col s12">
                        <Link
                            to="/login"
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: 25,
                                marginBottom: 25
                            }}
                            className="btn btn-large waves-effect waves-light hoverable grey darken-3"
                        > Get Started
                        
                    <i className="material-icons right">arrow_forward</i>
                        </Link>
                    </div>  
                </div>
                <div className="col s12 m12 l7 offset-l1">
                    <img src={LandingImg} className="responsive-img"/>
                </div>
            </div>
        </div>
    );
}

export default Landing;