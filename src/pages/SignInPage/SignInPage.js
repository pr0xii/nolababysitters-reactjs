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
        if (password.trim() === "") newErrros.push("Passwrod is not valid");
        if (newErrros.length > 1) return setError(newErrros);

        setUserSigning(true);
        signInWithEmailAndPassword(email, password, error => setError([error.message]));
    }
    return (
        <form className='__SignInPage' onSubmit={signInHandler}>
            <input type='email' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' minLength={8} />
            {errors.map((err) => <span className='error' key={err}>{err}</span>)}
            {isUserSigining && errors.length < 1 ? <Spinner /> : <button>Sign In</button>}
        </form>
    );
}