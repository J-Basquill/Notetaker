import React from "react";
import * as firebase from "firebase";
//git check comment
export default class Library extends React.Component{

    render(){
        return(
            <div>
                <h1>LIBRARY</h1>
                <table id="list"></table>
                <img id="lastUp" src=""/>
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
                childSnapshot.forEach(function(childChildSnapshot){
                    new_row.insertCell().innerText = childChildSnapshot.val();
                    firebase.storage().ref().child(childChildSnapshot.val()).getDownloadURL().then(function(url) {
                        var test = url;
                        document.getElementById("lastUp").src = test;
                    }).catch(function(error) {

                    });

                });
            });
        });
    }
}
