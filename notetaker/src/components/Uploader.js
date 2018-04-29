import React from "react";
import * as firebase from "firebase";
import "../App.css";

const UploadStyles = {
    width: "100%",
    maxWidth: "400px",
    color: "black",
    background: "#fcc93d",
    opacity: "0.7",
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
            <div>
            <h1 className="heading">Upload your file.</h1>
            <div className="form" style={UploadStyles}>


                <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                    <label htmlFor="fileButton">Please choose a file: </label>
                    <input type="file" id="fileButton" required/>
                </div><br/>

                    <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                        <label htmlFor="topicText">Field of Study</label>
                        <input type="text" className="form-control" id="topicText" required/>
                    </div> <br/>

                    <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                        <label htmlFor="topicText">Module name </label>
                        <input type="text" className="form-control" id="moduleText" required/>
                    </div> <br/>

                    <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                        <label htmlFor="topicText">Institution</label>
                        <input type="text"  className="form-control" id="whereText" required/>
                    </div> <br/>
                <div align="center">
                <button className="btn btn-primary" id="up" onClick={this.upload.bind(this)}>Submit</button>
                </div>
                    <div align="center">
                    <progress value="0" max="100" id="uploader">0%</progress>
                    </div><br/>


            </div>
            </div>
    );

    }
}
