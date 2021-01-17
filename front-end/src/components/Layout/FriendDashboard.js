import React, { useState, useContext, useEffect } from "react";
import { getFriendImgs } from "../../actions/userUtils";
import { ErrorContext } from "../../contexts/ErrorContext";
import ImageList from "../Images/Image";

const FriendDashboard = props => {
    const { setError } = useContext(ErrorContext);
    const [imgList, setImgList] = useState([]);
    const userId = props.match.params.userId;
    const [friend, setFriend] = useState({});

    useEffect(() => {
        getFriendImgs(userId, setError).then(data => {
            setImgList(data.images);
            setFriend(data.friend);
        });
    }, [setError, userId]);

    return (
        <div className="container valign-wrapper">
            <div className="row" style={{ marginTop: 64 }}>
                <div className="landing-copy col s12 center-align">
                    <h4>
                        <b>This is</b> {friend.name}'s gallery
                    </h4>
                    <div className="row">
                        <ImageList imgList={imgList} setImgList={setImgList} deletable={false} />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default FriendDashboard;