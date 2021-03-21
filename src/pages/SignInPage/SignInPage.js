import React, { useState } from 'react';
import './styles.scss';
import { signInWithEmailAndPassword } from "../../firebase/utility";
import Spinner from '../../UI/Spinner';

export default function RegisterParent() {
    const [isUserSigining, setUserSigning] = useState(false);
    const [errors, setError] = useState([]);

    const signInHandler = e => {
        e.preventDefault();
        setError([]);

        const email = e.target.email.value;
        const password = e.target.password.value;

        const newErrros = []
        if (email.trim() === "") newErrros.push("Email is not valid")
        if (password.trim() === "") newErrros.push("Password is not valid");
        if (newErrros.length > 1) return setError(newErrros);

        setUserSigning(true);
        signInWithEmailAndPassword(email, password, error => setError([error.message]));
    }
    return (
        <div className="signin-page-container">
            <div className="container">
                <div className="signin-box">
                    <h2>Sign In</h2>
                    <form className='__SignInPage' onSubmit={signInHandler}>
                        <input className="field" type='email' placeholder='Email' name='email' />
                        <input className="field" type='password' placeholder='Password' name='password' minLength={8} />
                        {errors.map((err) => <span className='error' key={err}>{err}</span>)}
                        {isUserSigining && errors.length < 1 ? <Spinner className="loader" /> : <button className="btn">Sign In</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}
