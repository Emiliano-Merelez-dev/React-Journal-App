import {GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async() => {


    googleProvider.setCustomParameters({

        prompt: "select_account"
      
      });

    try {

        
        

        // signInWithPopup(FirebaseAuth, googleProvider ).then((result) => {
        //     const user = result.user;
        //     console.log(user);

        // });

       
        
        
        // const result = await signInWithPopup(FirebaseAuth, googleProvider );
        const result = await signInWithPopup(FirebaseAuth, new GoogleAuthProvider());

        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials});

        // const result = await signInWithRedirect( FirebaseAuth, googleProvider );

        const {displayName, uid, email, photoURL } = result.user;
        
        return {
            ok: true,

            displayName, email, photoURL, uid
        }
        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorCode);

        return {
            ok: false,

            errorMessage 
        }
      
      }
    }


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        console.log({ email, password, displayName});
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const {uid, photoURL} = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
        
    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL ,displayName} = resp.user;
        console.log('usuario autenticado');

        return {
            ok: true,
            uid, displayName, email, photoURL
        }
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
        
        
    }
    
}


export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut(); 
}