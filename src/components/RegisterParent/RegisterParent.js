import React from 'react';
import './styles.scss';
import { signUpWithEmailAndPassWord } from "../../firebase/utility";
import InputPhoto from '../../pages/UI/InputPhoto';

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
        <form className='__Register-Parent' onSubmit={signUpHandler}>
            <InputPhoto name='profilePicture' />
            <input type='text' placeholder='Full Name' name='fullName' />
            <input type='email' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <div>
                <input type='radio' name='registerAs' value='babysitter' className='babySitterInput' checked={true} onChange={e => { }} id='babysitter' />
                <label htmlFor='babysitter'>BabySitter</label>
                <input type='radio' name='registerAs' value='parent' id='parent' />
                <label htmlFor='parent'>Parent</label>
                <textarea placeholder='Bio' name='bio'>

                </textarea>
            </div>
            <button>Sign Up</button>
        </form>
    );
}