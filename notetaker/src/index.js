import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import './index.css';
import App from './App';


<<<<<<< HEAD
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
=======



ReactDOM.render (

    <App />, document.getElementById('root'));


registerServiceWorker();
//uploader code
>>>>>>> 21e86fc9b8b269e4d7c210fdd2c3a5b2d1d7b45f
