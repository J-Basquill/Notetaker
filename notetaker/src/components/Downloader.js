import React from "react";
import * as firebase from "firebase";
//git check comment
export default class Downloader extends React.Component{
    download() {
        let storageRef =  firebase.storage().ref();
        let path = document.getElementById("filePath").value;
        let imgRef = storageRef.child(path);
        imgRef.getDownloadURL().then(function(url) {
            console.log("Download check");
            console.log(url);


        }.bind(this)).catch(function(error) {
            console.log(error);
        });
    }

    showList(){
        let userId = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");
        return firebase.database().ref('files/' + userId).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childChildSnapshot){
                    document.getElementById("list").innerText += childChildSnapshot.key+": "+childChildSnapshot.val()+"\n";
                });
            });
        });

    }

    render(){
        return(
            <div>
            <h1>DOWNLOADING</h1>
            <button id="lis" onClick={this.showList.bind(this)}>List</button><br/>
        File Path:<input type="text name=" id="filePath"/>
            <button id="dl" onClick={this.download.bind(this)}>Download</button><br/>
        <p id="list"></p>
            </div>
    );
    }
}

