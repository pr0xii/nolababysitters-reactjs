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
                            photoURL,
                        })
                        return credendial.user.updateProfile({ displayName: fullName, photoURL: photoURL })
                    })
                    .catch(err => console.log(err))
            })
    )
};

export const signInWithEmailAndPassword = (email, password, errorcb) => {
    auth.signInWithEmailAndPassword(email, password)
        .catch(err => errorcb(err));
}

export const signOut = () => firebase.auth().signOut()

export const userDetails = (user) => {
    return db.doc(`users/${user.uid}`).get()
}

export const getSitters = () => {
    return db.collection('users').where('registerAs', '==', 'babysitter').get()
        .then(snapshot => {
            const sitters = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
                const sitter = snapshot.docs[i].data();
                sitter.id = snapshot.docs[i].id;
                sitters.push(sitter);
            }
            return sitters;
        })
}

export const getSitter = id => {
    const hiredPromise = db.collection('hired').where('sitterId', '==', id).get()
    const sitterPromise = db.doc(`users/${id}`).get()

    return Promise.all([hiredPromise, sitterPromise])
        .then(res => {
            const sitter = {
                id,
                hired: [],
                ...res[1].data()
            };
            res[0].docs.forEach(doc => {
                const hire = doc.data();
                hire.id = doc.id;
                sitter.hired.push(hire);
            })
            return sitter;
        })
}

export const hireBaySitter = hireDetails => {
    return db.collection('hired').add(hireDetails)
}