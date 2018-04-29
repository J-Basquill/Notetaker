import React, { Component } from "react";
import * as firebase from "firebase";
import {Link} from "react-router-dom"
import { Spinner } from '@blueprintjs/core';



export default class ProfilePage extends Component {





    render() {
        return (

                    <div className="header-profile" >

                            <div >
                                <img id="img" src="test" alt="profile " className="img-thumbnail" />
                            </div><br/>

                        <div className="text-center">

                            <h1 id="name" className=""></h1>

                            <p id="location"></p>
                            <p id="uni"></p>
                            <p id="crs"></p>
                            <Link className="btn btn-primary" to="/createprofile" >Update Profile</Link>
                        </div>
                    </div>



        );
    }

    componentDidMount(){


      let userId = firebase.auth().currentUser.email;
      userId = userId.substr(0, userId.indexOf("@"));
      userId = userId.replace(".","");
      let storageRef = firebase.storage().ref();
      var nm = "john";

        firebase.database().ref("profile/"+userId+"/firstname").once('value', function(snapshot) {
             nm = snapshot.val();

        });

        firebase.database().ref("profile/"+userId+"/lastname").once('value', function(snapshot) {
            let lm = snapshot.val();
            document.getElementById('name').innerHTML = nm + " " +lm;

        });

        firebase.database().ref("profile/"+userId+"/location").once('value', function(snapshot) {
            let lc = snapshot.val();
            document.getElementById('location').innerHTML = lc;

        });

        firebase.database().ref("profile/"+userId+"/university").once('value', function(snapshot) {
            let uni = snapshot.val();
            document.getElementById('uni').innerHTML = uni;

        });

        firebase.database().ref("profile/"+userId+"/course").once('value', function(snapshot) {
            let crs = snapshot.val();
            document.getElementById('crs').innerHTML = crs;

        });

        firebase.database().ref("profile/"+userId+"/imgUrl").once('value', function(snapshot) {
          let path = snapshot.val(),
              spaceRef = storageRef.child(path);
              spaceRef.getDownloadURL().then(function(url) {
                  let test = url;
                  console.log("Download check");
                  console.log(url);
                  <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                      <h3>Loading</h3>
                      <Spinner />
                  </div>
                  document.getElementById('img').src = url;


              }.bind(this)).catch(function(error) {
                  console.log(error);
              });
            console.log('After requesting download URL');

        });
    }
}
