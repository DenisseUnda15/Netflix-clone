
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBh8abRpOlMMPgI8ycVmKu6zx1CexpT2So",
  authDomain: "netflix-clone-44520.firebaseapp.com",
  projectId: "netflix-clone-44520",
  storageBucket: "netflix-clone-44520.firebasestorage.app",
  messagingSenderId: "569109768012",
  appId: "1:569109768012:web:56b05e905532df732551e9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup =async (name,email,password) =>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"users"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth,db, login,signup, logout};