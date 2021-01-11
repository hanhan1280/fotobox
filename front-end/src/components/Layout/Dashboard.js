import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authUtils";
import { getImages } from '../../actions/imageUtils';
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import ImageList from "../Images/Image";
import Upload from "../Images/Upload";

const Dashboard = () => {
    const { auth, dispatch } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const [errors, setErrors] = useState(error);
    const [imgList, setImgList] = useState([]);
    const [images, setImages] = useState([]);

    const onLogout = e => {
        e.preventDefault();
        logoutUser(dispatch);
    };

    useEffect(() => {
        getImages(setError).then(imgs => setImgList(imgs));
    }, []);

    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: 40 }}>
                <div className="landing-copy col s12 center-align">
                    <h4>
                        <b>Hey there,</b> {auth.user.name}
                        <p className="flow-text grey-text text-darken-1" style={{ marginTop: 40 }}>
                            Let's upload some{" "}
                            <span style={{ fontFamily: "monospace" }}>IMAGES</span> 👏
                        </p>
                    </h4>
                    <div className="row">
                        <ImageList imgList={imgList} setImgList={setImgList} />
                        <Upload images={images} setImages={setImages} setImgList={setImgList} imgLen={imgList.length} />
                    </div>
                    <div className="row">
                        <button
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={onLogout}
                            className="white btn-flat btn-large waves-effect"><i className="material-icons left">keyboard_backspace</i>
                            Logout
                        </button>
                        <Link to="/friends" className="btn-flat btn-large white waves-effect" style={{
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}> Find friends
                            <i className="material-icons right">keyboard_tab</i>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Dashboard;