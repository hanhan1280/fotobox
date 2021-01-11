import React, { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useDropzone } from "react-dropzone";
import { uploadImages, getImages } from '../../actions/imageUtils';


const Upload = props => {
    const { error, setError } = useContext(ErrorContext);
    const { images, setImages, setImgList, imgLen } = props;

    const onDrop = (files) => {
        console.log(files);
        if (files.length > 1)
            setImages([...files]);
        else
            setImages([...images, files[0]]);
    }

    const files = images.map(image => (
        <li key={image.path}>{image.path}</li>
    ));


    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        maxFiles: 10,
        onDrop
    });

    const style = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: `${images.length > 0 ? '#00b0ff' : '#eeeeee'}`,
        borderStyle: 'dashed',
        backgroundColor: `${images.length > 0 ? '#e1f5fe' : '#fafafa'}`,
        color: '#757575',
        outline: 'none',
    };
    const onUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        images.map((file, i) => {
            formData.append("picture", file, file.name);
            formData.append(`desc${i}`, file.name);
        });
        await uploadImages(formData, setError);
        setImages([]);
        getImages(setError).then(imgs => setImgList(imgs));
    }

    return (
        <div className={`col s12${imgLen > 0 ? 'm6 l3' : ''}`}>
            <form noValidate onSubmit={onUpload} className="card">
                <div className="input-field file-field col s12" style={{ paddingLeft: "11.250px" }}>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <h6>
                            <p>
                                Click/Drag to upload Files 📂
                        </p>
                        </h6>
                        <ul>{files}</ul>
                    </div>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                        style={{
                            borderRadius: "0px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
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
