import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBsW8QEeuSkyRgEaq6OT_T5hAaB2aNDDtA",
    authDomain: "unichat-4e334.firebaseapp.com",
    projectId: "unichat-4e334",
    storageBucket: "unichat-4e334.appspot.com",
    messagingSenderId: "549123697",
    appId: "1:549123697:web:b5b7a0"


}).auth();