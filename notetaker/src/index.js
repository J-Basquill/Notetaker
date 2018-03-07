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
let username = "immy",
    uploader = document.getElementById("uploader"),
    fileButton = document.getElementById("fileButton"),
    user = document.getElementById("username"),
    demo = document.getElementById("demo"),
    upper = document.getElementById("up"),
    down = document.getElementById("dl"),
    stRef = firebase.storage(),
    dbRef = firebase.database(),
    filePath = document.getElementById("filePath"),
    listB = document.getElementById("lis"),
    listp = document.getElementById("list");

//upper.addEventListener("click", upload);
//listB.addEventListener("click", showList);
//down.addEventListener("click", download);

function showList(){
    let userId = user.value;
    return dbRef.ref('files/' + userId).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(childChildSnapshot){
                listp.innerText += childChildSnapshot.key+": "+childChildSnapshot.val()+"\n";
            });
        });
    });

}

function uploadRef(usern, fileRef){
    dbRef.ref("files/"+usern+"/").push().set({
        file: fileRef
    });
}

function upload(){
    username = user.value;
    var file = fileButton.files[0];
    var storageRef = firebase.storage().ref(username+"/"+file.name);
    var task = storageRef.put(file);
    var path = storageRef.fullPath;
    task.on("state_changed",
        function prgress(snapshot){
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function complete(){
        });
    demo.innerHTML= path;

    uploadRef(username, path);
}

function download() {
    let storageRef =  firebase.storage().ref();

    let imgRef = storageRef.child("James/01 Help!.mp3");
    imgRef.getDownloadURL().then(function(url) {
        console.log("Download check");
        console.log(url);


    }.bind(this)).catch(function(error) {
        console.log(error);
    });
}

