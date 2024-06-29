/* Configuracion de firebae */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWf07KvQixxtS6pnS0Cn2qC4lNBV7XaJU",
    authDomain: "apppeliculas-45d51.firebaseapp.com",
    projectId: "apppeliculas-45d51",
    storageBucket: "apppeliculas-45d51.appspot.com",
    messagingSenderId: "14136611062",
    appId: "1:14136611062:web:9b95b617f8a19e10841cd7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/* crear, borrar, login, logout*/

import {  deleteDoc, doc, setDoc } from 'firebase/firestore';

export const deleteAccount = async (email, password) => {
    try {

        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await deleteUser(user);


        const userDocRef = doc(db, 'Usuarios', user.uid); 
        await deleteDoc(userDocRef);

        console.log('Cuenta eliminada exitosamente');
        return true;
        
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        throw error;
    }
}

export const signIn = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
        return res.user;
    } catch (error) {
        console.log("Error al iniciar sesión.", error);
        return error;
    }
}

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        return error;
    }
}

export const signUp = async (email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'Usuarios', user.uid), {
            uid: user.uid,
            ...userData,
            email: user.email,
        });
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error en el registro:", error);
        return error;
    }
};

