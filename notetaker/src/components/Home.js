import React, { Component } from "react";
import "../App.css";
import * as firebase from "firebase";
import {app} from "../firebase_Config";
import FileTransfer from "./FileTransfer";
import ReactDOM from 'react-dom';
import OwlLogo from '../img/OwlLogo.png'


const logoStyles = {
    display: "block",
    margin: "auto",
    width: "10%",
    height: "10%"
}


export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Home">
                   <div className="lander">
                       <img style={logoStyles} src={OwlLogo}></img>
                      <h1 className="welcome" id="welcome"  />
                    </div>

                  <div class="box">
                      <div class="table">
                          <table id="list"></table>
                      </div>

                      <div class="prev">
                        <img id="prev" src=""></img>
                        <div id="trans"></div>
                      </div>
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
                      let arr = document.getElementsByClassName("hightlight");
                      console.log(arr);
                        for(var i=0;i<arr.length;i++){
                          console.log(arr[i]);
                          arr[i].classList.remove("hightlight");
                        }
                      new_row.classList.add("hightlight");

                      let path = childChildSnapshot.child("file").val();
                        console.log(firebase.storage().ref().child(path).getDownloadURL());
                        firebase.storage().ref().child(path).getDownloadURL().then(function(url){
                          document.getElementById("prev").src=url;
                        });
                        console.log(userArr.includes(childChildSnapshot.key));
                        if(userArr.includes(childChildSnapshot.key)){

                        }else{
                            const element = <FileTransfer id={childChildSnapshot.key} />;
                            ReactDOM.render(
                                element,
                                document.getElementById('trans')
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
