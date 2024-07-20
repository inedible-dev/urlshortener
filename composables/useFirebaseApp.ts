import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseApp = () => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAmzCXZSJ-6OkKraTgEpOse6Kc8scBqtZs",
        authDomain: "url-shortener-dc836.firebaseapp.com",
        projectId: "url-shortener-dc836",
        storageBucket: "url-shortener-dc836.appspot.com",
        messagingSenderId: "46353173071",
        appId: "1:46353173071:web:7373afefeae65f3357b83a",
        measurementId: "G-8R9JG8SNEV"
    };

    // Initialize Firebase
    // const app = () => {
    //     return initializeApp(firebaseConfig)
    // }
    // const analytics = getAnalytics(app);
    // const app = () => {
    //     console.log("banana")
    // }
    return initializeApp(firebaseConfig)


}

export default firebaseApp;