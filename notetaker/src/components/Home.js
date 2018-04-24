import React, { Component } from "react";
import "./Home.css";
import * as firebase from "firebase";

export default class Home extends Component {
    showAll = function(){
        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");

        return firebase.database().ref('files/').once('value', function(snapshot) {
            document.getElementById("list").innerHTML += "<tr><th>Field</th><th>File</th><th>Institution</th><th>Module</th></tr>";
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childChildSnapshot){
                    var new_row = document.getElementById("list").insertRow();
                    childChildSnapshot.forEach(function(child3Snapshot){
                        new_row.insertCell().innerText = child3Snapshot.val();

                    });
                });
            });
        });

    };


    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>My Account</h1>
                    <p>This will be a protected route which only an authenticated user can access...</p>
                </div>
                <div id="library">
                    <table id="list" onLoad={this.showAll.bind(this)}></table>
                    <button onClick={this.showAll.bind(this)}>Button</button>
                </div>
            </div>
        );
    }
    //showAll()
}