import React, { Component } from "react";
import "./Home.css";
import * as firebase from "firebase";
import {app} from "../firebase_Config";
import FileTransfer from "./FileTransfer";
import ReactDOM from 'react-dom';
export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Home">
             <div className="lander">
                <h1 className="welcome" id="welcome"  />
              </div>
               
                <div id="library">
                    <table id="list"></table>
                    <div id="demo"></div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let pushToArray = function(array, key){
            array.push(key);
        };

        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");
      
      document.getElementById('welcome').innerHTML = "Welcome " + userId + "! ";
      
        let userArr = [];
        firebase.database().ref('files/' + userId).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                pushToArray(userArr,childSnapshot.key);
            });
        });


        return firebase.database().ref('files/').once('value', function(snapshot) {
            document.getElementById("list").innerHTML += "<tr><th>Field</th><th>File</th><th>Institution</th><th>Module</th></tr>";
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childChildSnapshot){
                    var new_row = document.getElementById("list").insertRow();
                    new_row.addEventListener("click", function(){
                        console.log(userArr.includes(childChildSnapshot.key));
                        if(userArr.includes(childChildSnapshot.key)){

                        }else{
                            const element = <FileTransfer id={childChildSnapshot.key} />;
                            ReactDOM.render(
                                element,
                                document.getElementById('upl')
                            );
                        }
                    });
                    childChildSnapshot.forEach(function(child3Snapshot){
                        new_row.insertCell().innerText = child3Snapshot.val();

                    });
                });
            });
        });
    }
}