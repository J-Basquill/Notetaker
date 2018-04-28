import React from "react";
import * as firebase from "firebase";
//git check comment
export default class Library extends React.Component{
    showList(){
        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");
        return firebase.database().ref('profiles/' + userId).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childChildSnapshot){
                    document.getElementById("list").innerText += childChildSnapshot.key+": "+childChildSnapshot.val()+"\n";
                    firebase.storage().ref().child(childChildSnapshot.val()).getDownloadURL().then(function(url) {
                        var test = url;
                        document.getElementById("lastUp").src = test;

                    }).catch(function(error) {

                    });
                });
            });
        });

    }


    render(){
        return(
            <div>
                <h1>LIBRARY</h1>
                <button id="lis" onClick={this.showList.bind(this)}>List</button><br/>
                <p id="list"></p>
                <img id="lastUp" src=""/>
            </div>
        );
    }
}

