import React, { Component } from "react";
import "./Home.css";
import * as firebase from "firebase";
import {app} from "../firebase_Config";


export default class Home extends Component {

    componentDidMount(){
        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");
        document.getElementById('welcome').innerHTML = "Welcome " + userId + "! ";
    };


    render() {
        return (
            <div>
                <div className="Home">
                    <div className="lander">
                        <h1 className="welcome" id="welcome"  />



                    </div>
                </div>
            </div>
        );
    }
}