import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCjOfDsTPtcBrLTXG6BKvUByd2lhkLprx8",
    authDomain: "skillsphere-e6304.firebaseapp.com",
    projectId: "skillsphere-e6304",
    storageBucket: "skillsphere-e6304.firebasestorage.app",
    messagingSenderId: "13503420889",
    appId: "1:13503420889:web:51e6eaef1a927cd6a1e1c8"
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();