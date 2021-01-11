import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getFriendImgs } from "../../actions/userUtils";
import { ErrorContext } from "../../contexts/ErrorContext";
import ImageList from "../Images/Image";

const FriendDashboard = props => {
    const { setError } = useContext(ErrorContext);
    const [imgList, setImgList] = useState([]);
    const location = useLocation();
    const userId = props.match.params.userId;
    console.log(props.match.params.userId);
    const [friend, setFriend] = useState({});

    useEffect(() => {
        getFriendImgs(userId, setError).then(data => {
            setImgList(data.images);
            setFriend(data.friend);
        });
    }, []);

    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: 40 }}>
                <div className="landing-copy col s12 center-align">
                    <h4>
                        <b>This is</b> {friend.name}'s gallery
                    </h4>
                    <div className="row">
                        <ImageList imgList={imgList} setImgList={setImgList} />
                    </div>                    
                    <Link to="/dashboard" className="btn-flat btn-large white waves-effect" style={{
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}>
                        <i className="material-icons left">keyboard_backspace</i> To Dashboard
                    </Link>
                    <Link to="/friends" className="btn-flat btn-large white waves-effect" style={{
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}> Back to friends
                            <i className="material-icons right">keyboard_tab</i>
                    </Link>
                </div>
            </div >
        </div >
    );
};

export default FriendDashboard;