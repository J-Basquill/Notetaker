import React from "react";
import "../App.css";
import * as firebase from "firebase";
import OwlLogo from '../img/OwlLogo.png'


const logoStyles = {
    display: "block",
    margin: "auto",
    width: "10%",
    height: "10%"
}

export default class Library extends React.Component{

    render(){
        return(
            <div>
                <img style={logoStyles} src={OwlLogo}></img> <br/>

            <div className="welcome">
                <h1 className="heading">LIBRARY</h1>
                <div class="table">
                  <table id="list"></table>
                  <a id="link" href =""download="results.jpeg"></a>
                </div>
                <div class="prev">
                  <img id="prev" src=""></img>
                </div>
            </div>
          </div>
        );
    }

    componentDidMount(){
        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");
        return firebase.database().ref('files/' + userId).once('value', function(snapshot) {
            document.getElementById("list").innerHTML += "<tr><th>Field</th><th>File</th><th>Institution</th><th>Module</th></tr>";
            snapshot.forEach(function(childSnapshot) {
                var new_row = document.getElementById("list").insertRow();
                new_row.addEventListener("click", function(){
                  let path = childSnapshot.child("file").val();
                  console.log(path);
                  firebase.storage().ref().child(path).getDownloadURL().then(function(url) {
                      var link = url;
                      window.location.href=link;
                  }).catch(function(error) {

                  });
                });
                childSnapshot.forEach(function(childChildSnapshot){
                    new_row.insertCell().innerText = childChildSnapshot.val();
                });
            });
        });
    }
}
