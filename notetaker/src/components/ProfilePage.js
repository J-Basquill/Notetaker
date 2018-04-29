import React, { Component } from "react";
import * as firebase from "firebase";

export default class ProfilePage extends Component {
    render() {
        return (

                    <div className="header-profile" >

                            <div >
                                <img id="profile-img" src="test" alt="profile " className="img-thumbnail" />
                            </div><br/>

                        <div className="text-center">

                            <h1 className="">John Doe</h1>
                            <p className="">Developer</p>
                            <p>Maynooth, Co. Kildare, Ireland</p>

                        </div>
                    </div>



        );
    }

    componentDidMount(){

      let userId = firebase.auth().currentUser.email;
      userId = userId.substr(0, userId.indexOf("@"));
      userId = userId.replace(".","");

        let storageRef = firebase.storage().ref();

        firebase.database().ref("profile/"+userId+"/imgUrl").once('value', function(snapshot) {
          let path = snapshot.val(),
              spaceRef = storageRef.child(path);
              spaceRef.getDownloadURL().then(function(url) {
                  console.log("Download check");
                  console.log(url);


              }.bind(this)).catch(function(error) {
                  console.log(error);
              });
        });
    }
}
