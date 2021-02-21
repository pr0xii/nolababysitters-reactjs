import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyCKaBPPyEiLCmUXe44WIaircMk_3J-dKW8",
    authDomain: "babysitter-z.firebaseapp.com",
    projectId: "babysitter-z",
    storageBucket: "babysitter-z.appspot.com",
    messagingSenderId: "238189905667",
    appId: "1:238189905667:web:25d9021404a4adaadb8b36"
});


export default firebase;