import React, { useContext, useState, useMemo } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useDropzone } from "react-dropzone";
import { uploadImages, getImages } from '../../actions/imageUtils';
import Tooltip from '@material-ui/core/Tooltip';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    cursor: "pointer",
    color: '#e0e0e0',
    outline: 'none',
    transition: '.24s ease-in-out'
};

const acceptStyle = {
    borderColor: '#00b0ff',
    backgroundColor: '#e1f5fe',
    color: '#64b5f6'
}

const errorStyle = {
    borderColor: '#ef5350',
    backgroundColor: '#ffebee',
    color: '#e57373'
}

const Upload = props => {
    const { setError } = useContext(ErrorContext);
    const { images, setImages, setImgList, imgLen } = props;
    const [errors, setErrors] = useState(null);

    const onDrop = (files) => {
        if (images.length + files.length > 10) {
            setErrors("File Limit is 10");
        }
        else {
            setErrors(null);
            setImages([...images, ...files]);
        }
    }

    const remove = (key) => {
        setImages(images.filter((img, i) => (i !== key)));
    }

    const files = images.map((image, i) => (
        <li key={image.path} className="valign-wrapper" style={{ marginLeft: 25, flexDirection: "row" }}>
            <i className="material-icons grey-text text-lighten-1">image</i>
            <Tooltip title="Delete Image" aria-label="delete" placement="top-start" arrow>
                <span onClick={() => remove(i)} className="grey-text text-darken-3" style={{ margin: "5px", fontWeight: 500 }}>{image.path}</span>
            </Tooltip>
            {(image.size / 1048576).toFixed(2)} mb
        </li>
    ));

    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        maxFiles: 10,
        onDrop
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(images.length > 0 ? acceptStyle : {}),
        ...(errors ? errorStyle : {})
    }), [
        errors,
        images,
    ]);

    const onUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        images.forEach((file, i) => {
            formData.append("picture", file, file.name);
            formData.append(`desc${i}`, file.name);
        });
        await uploadImages(formData, setError);
        setImages([]);
        getImages(setError).then(imgs => setImgList(imgs));
    }

    return (
        <div className={`col s12 ${imgLen > 0 ? 'm6 l3' : ''}`}>
            <form noValidate onSubmit={onUpload} className="card" style={{ borderRadius: 10 }}>
                <div className="input-field file-field col s12" style={{ paddingLeft: "11.250px" }}>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <div className="center-align">
                            <i className={`material-icons medium`}
                            >cloud_upload</i>
                            <p className="grey-text text-darken-3" style={{ margin: 5, fontWeight: 500 }}>
                                Click/Drag to upload Files
                            </p>
                        </div>
                    </div>
                    <span className="red-text">{errors}</span>
                    <ul className="left-align">{files}</ul>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                        style={{
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                        }}
                        className="btn btn-small waves-effect waves-light hoverable grey darken-3">
                        Upload<i className="material-icons right">file_upload</i>
                    </button>
                </div>
            </form>
        </div >
    )
}

export default Upload;
