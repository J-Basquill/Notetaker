import React from "react";
import * as firebase from "firebase";
//git check comment
export default class Library extends React.Component{
    showList(){
        let userId = document.getElementById("username").value;
        return firebase.database().ref('files/' + userId).once('value', function(snapshot) {
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

    // displayImages(){
    //     let stRef = firebase.storage().ref(),
    //         imgRef = stRef.child(path),
    // }

    render(){
        return(
            <div>
                <h1>DOWNLOADING</h1>
                Username:<input type="text name=" id="username"/>
                <button id="lis" onClick={this.showList.bind(this)}>List?</button><br/>
                <p id="list"></p>
                <img id="lastUp" src=""/>
            </div>
        );
    }
}

