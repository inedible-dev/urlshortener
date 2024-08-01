import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { env } from "~/env";
// import { env } from "~/env";

const firebaseApp = () => {

    const config = useRuntimeConfig();
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.messagingSenderId,
        appId: config.public.appId,
        measurementId: config.public.measurementId
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