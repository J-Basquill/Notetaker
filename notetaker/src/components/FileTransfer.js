import React from "react";
import * as firebase from "firebase";


export default class FileTransfer extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
              id: props.id
            };
        //console.log(this.state.id);
    }
    check= function(){
        let key = this.props.id,
            userId  = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");

        firebase.database().ref('files/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot){
              console.log(childSnapshot.child(key).val());
              let value = childSnapshot.child(key).val();
              firebase.database().ref('files/'+userId).push(key).set(value);
            });
        });

    }


    render(){

        return(
            <div>
                <h1>FILE TRANSFER</h1>
                <p id="demo" >Would you like to add the file to your library?</p>
                <button onClick={this.check.bind(this)}>Button</button>

            </div>
        );
    }


}
