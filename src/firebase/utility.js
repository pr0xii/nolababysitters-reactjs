import firebase from './firebase';

export const auth = new firebase.auth();

export const db = new firebase.firestore();
export const storageRef = new firebase.storage().ref();

export const signUpWithEmailAndPassWord = (fullName, email, password, registerAs, profileImage, bio) => {
    const url = `images/${new Date().getTime()}`
    const task = storageRef.child(url).put(profileImage)
    task.on('state_changed', snapshot => {
        const percentageBytesTransferred = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentageBytesTransferred)
    },
        err => console.log(err),
        _ => storageRef.child(url).getDownloadURL()
            .then(photoURL => {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(credendial => {
                        db.doc(`users/${credendial.user.uid}`).set({
                            displayName: fullName,
                            email: email,
                            registerAs: registerAs,
                            bio: bio,
                        })
                        return credendial.user.updateProfile({ displayName: fullName, photoURL: photoURL })
                    })
                    .catch(err => console.log(err))
            })
    )
};

export const signInWithEmailAndPassword = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
}

export const signOut = () => firebase.auth().signOut()