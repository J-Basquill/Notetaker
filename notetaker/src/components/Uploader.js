import React from "react";
import * as firebase from "firebase";
//git check comment


let username = "immy",
    uploader = document.getElementById("uploader"),
    //fileButton = document.getElementById("fileButton"),
    //user = document.getElementById("username"),
    demo = document.getElementById("demo"),
    upper = document.getElementById("up"),
    listB = document.getElementById("lis");



export default class Uploader extends React.Component{
    upload(){
        var stRef = firebase.storage();
        var dbRef = firebase.database();
        var username = document.getElementById("username").value;
        var file = document.getElementById("fileButton").files[0];
        var storageRef = firebase.storage().ref(username+"/"+file.name);
        var task = storageRef.put(file);
        var path = storageRef.fullPath;
        task.on("state_changed",
            function prgress(snapshot){
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                document.getElementById("uploader").value = percentage;
            },
            function complete(){
            });
        //document.getElementById("demo").innerHTML= path;
        dbRef.ref("files/"+username+"/").push().set({
            file: path
        });
        // uploadRef(username, path);
    }
    render(){

        return(
            <div>
            <h1>UPLOADING</h1>
        Username:<input type="text name=" id="username"/>
            <input type="file" id="fileButton"/>
            <button id="up" onClick={this.upload.bind(this)}>Submit?</button><br/>
        <progress value="0" max="100" id="uploader">0%</progress>

            </div>

    );

    }





// uploadRef(usern, fileRef){
//     dbRef.ref("files/"+usern+"/").push().set({
//         file: fileRef
//     });
// }

}
