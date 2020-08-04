import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

const UploadFiles = () => {
    const [imgCollection, setImgCollection] = useState<FileList | null>(null);

    const onFileChange = (files: FileList) => {
        setImgCollection(files);
    }

    const onSubmit = () => {
        console.log(imgCollection);
        if (imgCollection) {
            const formData = new FormData();
            Array.from(imgCollection).map(file => {
                formData.append('imgCollection', file);
            });

            axios.post("http://localhost:3001/api/upload", formData, {})
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
        
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <form>
                        <h3>React Multiple File Upload</h3>
                        <div className="form-group">
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    if (e.target.files) {
                                        console.log("yes");
                                        onFileChange(e.target.files);
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSubmit();
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadFiles;