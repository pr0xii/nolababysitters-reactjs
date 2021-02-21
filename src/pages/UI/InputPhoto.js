import React, { useState } from 'react';
import './InputPhoto.scss'

const InputPhoto = (props) => {
    const [file, setFile] = useState(null);
    const onChange = e => {
        setFile(e.target.files[0]);
    }
    return (
        <label className='user-profile-input'>
            <input type='file' onChange={onChange} name={props.name} />
            <span style={{ backgroundImage: `url(${file && URL.createObjectURL(file)})` }}> {!file && "Upload a profile Picture"} </span>
        </label>
    )
}

export default InputPhoto;