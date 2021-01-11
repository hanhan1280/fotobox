import React, { useState, useContext, useEffect } from "react";
import { getAllUsers, addFriend, getFriends } from "../../actions/userUtils";
import { ErrorContext } from "../../contexts/ErrorContext";
import { Link } from "react-router-dom";

const Friends = () => {
    const { error, setError } = useContext(ErrorContext);
    const [allUsers, setAllUsers] = useState([]);
    const [friends, setAllFriends] = useState([]);

    useEffect(() => {
        getAllUsers(setError).then(users => setAllUsers(users));
        getFriends(setError).then(users => setAllFriends(users)).catch(err => console.log(err));
    }, []);

    const onAddFriend = async (userId) => {
        console.log(allUsers);
        await addFriend(userId, setError);
        getFriends(setError).then(users => setAllFriends(users));
    }

    const isFollower = (userId) => {
        return friends.some(friend => friend._id === userId)
    }

    return (
        <div className="container valign-wrapper">
            <div className="row">
                <h4>
                    Find <b>Friends</b> Here
                </h4>
                {allUsers ?
                    allUsers.map(user => (
                        <div className="card col s12">
                            <div className="card-content">
                                <h5 style={{ marginTop: 0 }}>Go to <Link to={`/dashboard/${user._id}`}>{user.email}</Link></h5>
                                {
                                    isFollower(user._id) ? <h6 className="blue-text text-darken-1"> You are following {user.name}
                                    </h6> : <h6 className="grey-text text-darken-1"> Hi, I'm
                                    <b>{" " + user.name}</b>
                                    </h6>
                                }
                                <p style={{ display: "inline-block" }}>{user.name} has {user.imageLen} image{user.imageLen!=1?'s':''}</p>
                                {
                                    isFollower(user._id) ? null : <button style={{ float: "right" }} onClick={() => onAddFriend(user._id)} className="btn-floating btn-small grey darken-4">
                                        <i className="white-text material-icons">group_add</i>
                                    </button>
                                }                                
                            </div>
                        </div>
                    )) : null
                }
                <div className="col s12 center-align">
                    <Link
                        style={{
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        to="/dashboard"
                        className="white btn-flat btn-large waves-effect"><i className="material-icons left">keyboard_backspace</i>
                            Back to Dashboard
                        </Link>
                </div>
            </div>
        </div>

    );
};

export default Friends;