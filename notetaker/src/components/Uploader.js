import React from "react";
import * as firebase from "firebase";

export default class Uploader extends React.Component{
    upload(){
        let stRef = firebase.storage(),
            dbRef = firebase.database(),
            auRef = firebase.auth().currentUser,
            userId  = auRef.email;
            userId = userId.substr(0, userId.indexOf("@"));
            userId = userId.replace(".","");
        let file = document.getElementById("fileButton").files[0],
            storageRef = stRef.ref(userId+"/"+file.name),
            task = storageRef.put(file),
            path = storageRef.fullPath,
            topic = document.getElementById("topicText").value,
            module = document.getElementById("moduleText").value,
            instit = document.getElementById("whereText").value;

        task.on("state_changed",
            function prgress(snapshot){
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                document.getElementById("uploader").value = percentage;
            },
            function complete(){
                console.log("Uploaded")
            });
        dbRef.ref("files/"+userId+"/").push().set({
            file: path,
            institution: instit,
            module: module,
            field: topic
        });

    }
    render(){

        return(
            <div>
            <h1>UPLOADING</h1>

            Please choose a file: <input type="file" id="fileButton" required/>
            Field of study: <input type="text" id="topicText" required/>
            Module name: <input type="text" id="moduleText" required/>
            Institution: <input type="text" id="whereText" required/>
            <button id="up" onClick={this.upload.bind(this)}>Submit?</button><br/>
            <progress value="0" max="100" id="uploader">0%</progress>

            </div>

    );

    }
}
