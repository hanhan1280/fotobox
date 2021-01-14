import axios from "axios";

import { GET_ERRORS } from "./types";

export const getImages = async (setError) => {
    try {
        let { data } = await axios.get("/api/images");
        if (data) return data.images;
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const uploadImages = async (imageData, setError) => {
    try {
        let { data } = await axios.post("/api/upload", imageData);
        if (data) console.log(data.msg);
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const deleteImage = async (imageId, setError) => {
    try {
        let { data } = await axios.delete(`/api/${imageId}`);
        console.log(data);
    } catch (err) {
        setError({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}