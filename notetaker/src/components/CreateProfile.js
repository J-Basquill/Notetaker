import React, { Component } from "react";
import * as firebase from "firebase";


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
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <div className="container">

                                            <div>
                                                <img id="profo" src="../img/images.png" />
                                                <input type="file" id="profiler"/>
                                                <progress value="0" max="100" id="uploader">0%</progress>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputFname">First Name</label>
                                                    <input type="text" className="form-control" ref="fn" id="fn" name="fname" placeholder="John"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputLname">Last Name</label>
                                                    <input type="text" className="form-control" id="ln" placeholder="Doe"/>
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputAddress">Location</label>
                                                <input type="text" className="form-control" id="loc" placeholder="Dublin, Ireland"/>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputUni">University</label>
                                                <input type="text" className="form-control" id="uni" placeholder="Maynooth University"/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="inputCourse">Course Title</label>
                                                    <input type="text" className="form-control" id="course" placeholder="BA English and History"/>
                                                </div>
                                            </div>
                                            <button onClick={this.update.bind(this)}>Button</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
