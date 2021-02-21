import React from 'react';
import './styles.scss';
import { signInWithEmailAndPassword } from "../../firebase/utility";

export default function RegisterParent() {
    const signInHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    return (
        <form className='__SignInPage' onSubmit={signInHandler}>
            <input type='email' placeholder='Email' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <button>Sign In</button>
        </form>
    );
}