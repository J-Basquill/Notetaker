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
            path = storageRef.fullPath;
        task.on("state_changed",
            function prgress(snapshot){
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                document.getElementById("uploader").value = percentage;
            },
            function complete(){
                console.log("Uploaded")
            });
        dbRef.ref("files/"+userId+"/").push().set({
            file: path
        });

    }
    render(){

        return(
            <div>
            <h1>UPLOADING</h1>
            <input type="file" id="fileButton"/>
            <button id="up" onClick={this.upload.bind(this)}>Submit</button><br/>
            <progress value="0" max="100" id="uploader">0%</progress>

            </div>

    );

    }
}
