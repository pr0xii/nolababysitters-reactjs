import React from 'react';
import './styles.scss';
import { signUpWithEmailAndPassWord } from "../../firebase/utility";
import InputPhoto from '../../UI/InputPhoto';

export default function RegisterParent() {

    const signUpHandler = e => {
        e.preventDefault();
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const registerAs = e.target.registerAs.value;
        const profilePicture = e.target.profilePicture.files[0];
        const bio = e.target.bio.value
        signUpWithEmailAndPassWord(fullName, email, password, registerAs, profilePicture, bio);
    }
    return (
        <div className="register-page-container">
            <div className="container">
                <div className="register-box">
                    <form className='__Register-Parent' onSubmit={signUpHandler}>
                        <InputPhoto name='profilePicture' />
                        <input className="field" type='text' placeholder='Full Name' name='fullName' />
                        <input className="field" type='email' placeholder='Email' name='email' />
                        <input className="field" type='password' placeholder='Password' name='password' />
                        <div className="radio-field">
                                <input type='radio' name='registerAs' value='babysitter' className='babySitterInput' checked={true} onChange={e => { }} id='babysitter' />
                                <label htmlFor='babysitter'>BabySitter</label>
                                <input type='radio' name='registerAs' value='parent' id='parent' />
                                <label htmlFor='parent'>Parent</label>
                                <textarea className="field" placeholder='Bio' name='bio'></textarea>
                        </div>
                        <button className="btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
