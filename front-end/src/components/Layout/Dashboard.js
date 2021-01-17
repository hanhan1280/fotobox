import React, { useState, useContext, useEffect } from "react";
import { getImages } from '../../actions/imageUtils';
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import ImageList from "../Images/Image";
import Upload from "../Images/Upload";

const Dashboard = () => {
    const { auth } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);
    const [imgList, setImgList] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getImages(setError).then(imgs => setImgList(imgs));
    }, [setError]);

    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: 64 }}>
                <div className="landing-copy col s12 center-align">
                    <h4>
                        <b className="grey-text text-darken-3">Hey there,</b> {auth.user.name}
                        <p className="flow-text grey-text text-darken-1" style={{ marginTop: 40 }}>
                            Let's upload some{" "}
                            <span style={{ fontFamily: "monospace" }}>IMAGES</span> 📂
                        </p>
                    </h4>
                    <div className="row">
                        <ImageList imgList={imgList} setImgList={setImgList} deletable={true} />
                        <Upload images={images} setImages={setImages} setImgList={setImgList} imgLen={imgList ? imgList.length : 0} />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Dashboard;