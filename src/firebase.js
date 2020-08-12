import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBuWaNGJ-jSUSawGah0gyFZbXL7_UKRRuo",
    authDomain: "djes-livechat.firebaseapp.com",
    databaseURL: "https://djes-livechat.firebaseio.com",
    projectId: "djes-livechat",
    storageBucket: "djes-livechat.appspot.com",
    messagingSenderId: "259050813274",
    appId: "1:259050813274:web:2cad23c19810472a256563",
    measurementId: "G-K62WXTQJDZ"
});

const db = firebaseApp.firestore();

export default db;