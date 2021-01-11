import axios from "axios";

import { GET_ERRORS } from "./types";

export const getAllUsers = async (setError) => {
    try {
        let { data } = await axios.get("/api/user/all");
        return data.usersAll;
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const addFriend = async (userId, setError) => {
    try {
        let { data } = await axios.post(`/api/user/add/${userId}`);
        console.log(data.msg);
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const getFriendImgs = async (userId, setError) => {
    try {
        let { data } = await axios.get(`/api/user/friends/getImages/${userId}`);
        return data;
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getFriends = async (setError) => {
    try {
        let { data } = await axios.get("/api/user/friends");
        console.log(data.msg);
        return data.friends;
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}