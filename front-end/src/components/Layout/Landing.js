import React from "react";
import { Link } from "react-router-dom";
import LandingImg from "../../assets/vector_art.png";

const Landing = () => {
    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: "20vh" }}>
                <div className="col s12 m12 l5 center-align" style={{ marginTop: 50 }}>
                    <h3 style={{ textShadow: "2px 3px 5px rgba(0,0,0,0.2)" }}>
                        <b>Upload</b> Images Here{" "}
                    </h3>
                    <p className="flow-text grey-text text-darken-1">
                        A minimalistic image repository for you.
                         </p>
                    <br />
                    <div className="col s12">
                        <Link
                            to="/signup"
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: 25,
                                marginBottom: 25,
                                border: "#424242 solid 2px",
                            }}
                            className="btn-flat btn-large waves-effect waves-red
                            grey-text text-darken-3 transparent"
                        > <b>Get Started</b>
                            <i className="material-icons right">arrow_forward</i>
                        </Link>
                    </div>
                </div>
                <div className="col s12 m12 l7">
                    <img src={LandingImg} className="responsive-img" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Landing;