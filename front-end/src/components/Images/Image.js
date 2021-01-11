import React, { useContext } from "react";
import { getImages, deleteImage } from '../../actions/imageUtils';
import { ErrorContext } from "../../contexts/ErrorContext";

const Images = (props) => {
    const { imgList, setImgList } = props;
    const { setError } = useContext(ErrorContext);

    const onDelete = async (imageId) => {
        await deleteImage(imageId, setError);
        getImages(setError).then(imgs => setImgList(imgs));
    }

    return (
        <>
            {
                (imgList) ? imgList.map((image, i) => {

                    return (
                        <div className="col s12 m6 l3" key={i}>
                            <div className="card" style={{ borderRadius: "10px" }}>
                                <div className="card-image">
                                    <img
                                        style={{ borderRadius: "10px", objectFit: "cover", height: 300 }}
                                        className="responsive-img"
                                        src={image.url}
                                        alt=""
                                    />
                                </div>
                                <div style={{ position: "absolute", top: 5, right: 5 }}>
                                    <button type="submit" className="btn-floating btn-small transparent"
                                        onClick={() => onDelete(image._id)}>
                                        <i className="white-text material-icons">close</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                ) : null
            }
        </>
    )
}

export default Images;