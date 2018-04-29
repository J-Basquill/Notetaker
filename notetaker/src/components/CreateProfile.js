import React, { Component } from "react";
import * as firebase from "firebase";
import user from "../img/user.png";
import "../App.css";

const UploadStyles = {
    width: "100%",
    maxWidth: "400px",
    background: "crimson",
    margin: "20px auto",
    border: "3px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
}

export default class CreateProfile extends Component {


    update(){
        console.log("hello");
        let stRef = firebase.storage(),
            dbRef = firebase.database(),
            auRef = firebase.auth().currentUser,
            userId  = auRef.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");

        let fname = document.getElementById("fn").value,
            lname = document.getElementById("ln").value,
            location = document.getElementById("loc").value,
            univ = document.getElementById("uni").value,
            course = document.getElementById("course").value;
        let file = document.getElementById("profiler").files[0],
            storageRef = stRef.ref(userId+"/"+"profile/"+file.name),
            task = storageRef.put(file),
            path = storageRef.fullPath;
            console.log(path);
            task.on("state_changed",
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    document.getElementById("uploader").value = percentage;
                },
                function complete(){
                    console.log("Uploaded")
                });


        dbRef.ref("profile/"+ userId+"/").set({
            displayname: userId,
            firstname: fname,
            lastname: lname,
            location: location,
            university: univ,
            course: course,
            imgUrl: path
        });
        console.log("check");
    }



    render() {
        return (
            <div>

                                <h1 className="heading">Create Your Profile.</h1>


                                <div className="container" style={UploadStyles}>

                                            <div align= "center" >
                                                <img id="profo" src={user} />
                                                <input type="file" id="profiler"/>
                                                <progress value="0" max="100" id="uploader">0%</progress>
                                            </div>
                                            <div class="clearfix"></div>

                                            <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12">
                                                <label htmlFor="inputFname">First Name</label>
                                                <input type="text" className="form-control" ref="fn" id="fn" name="fname" placeholder="John"/>
                                            </div>
                                    <div class="clearfix"></div>
                                            <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                                                <label htmlFor="inputLname">Last Name</label>
                                                <input type="text" className="form-control" id="ln" placeholder="Doe"/>
                                            </div>
                                            <div class="clearfix"></div>

                                            <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                                                <label htmlFor="inputAddress">Location</label>
                                                <input type="text" className="form-control" id="loc" placeholder="Dublin, Ireland"/>
                                            </div>
                                            <div class="clearfix"></div>
                                            <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12" >
                                                <label htmlFor="inputUni">University</label>
                                                <input type="text" className="form-control" id="uni" placeholder="Maynooth University"/>
                                            </div>
                                            <div class="clearfix"></div>
                                            <div className="form-group col-xs-10 col-sm-12 col-md-12 col-lg-12">
                                                    <label htmlFor="inputCourse">Course Title</label>
                                                    <input type="text" className="form-control" id="course" placeholder="BA English and History"/>

                                            </div>
                                            <div class="clearfix"></div>
                                            <div align="center">
                                                <button className="btn btn-primary" onClick={this.update.bind(this)}>Update Profile</button>
                                            </div>

                                </div>

            </div>



        );
    }
}
