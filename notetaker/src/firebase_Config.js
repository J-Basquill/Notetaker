
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB7342mU_GSpdtAlSntiHyGBW7eM5SzGGM",
    authDomain: "tutorial-10631.firebaseapp.com",
    databaseURL: "https://tutorial-10631.firebaseio.com",
    projectId: "tutorial-10631",
    storageBucket: "tutorial-10631.appspot.com",
    messagingSenderId: "1097769758488"
};

const app = firebase.initializeApp(config)


export { app }