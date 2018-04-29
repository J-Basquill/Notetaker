import React from "react";
import * as firebase from "firebase";

const UploadStyles = {
    width: "100%",
    maxWidth: "400px",
    background: "crimson",
    margin: "20px auto",
    border: "3px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
}

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
            <div style={UploadStyles}>
            <h1 className="heading">UPLOADING</h1>

            Please choose a file: <input type="file" id="fileButton" required/><br/>
            Field of study: <input type="text" id="topicText" required/><br/>
            Module name: <input type="text" id="moduleText" required/><br/>
            Institution: <input type="text" id="whereText" required/><br/>
            <button id="up" onClick={this.upload.bind(this)}>Submit</button><br/>
            <progress value="0" max="100" id="uploader">0%</progress>

            </div>

    );

    }
}
