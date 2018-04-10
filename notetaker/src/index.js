import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";
import './index.css';
import App from './App';
import Uploader from "./components/Uploader";


var config = {
  apiKey: "AIzaSyB7342mU_GSpdtAlSntiHyGBW7eM5SzGGM",
  authDomain: "tutorial-10631.firebaseapp.com",
  databaseURL: "https://tutorial-10631.firebaseio.com",
  projectId: "tutorial-10631",
  storageBucket: "tutorial-10631.appspot.com",
  messagingSenderId: "1097769758488"
};
firebase.initializeApp(config);
registerServiceWorker();
ReactDOM.render (

           <Router>
               <App />
           </Router>, document.getElementById('root')
);


//uploader code
