import React from "react";
import * as firebase from "firebase";
import ReactDOM from 'react-dom';
import Checkoutt from "./Checkoutt";

export default class FileTransfer extends React.Component{

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //           id: props.id
    //         };
    //     //console.log(this.state.id);
    // }
    check= function(){
        let key = this.props.id,
            userId  = firebase.auth().currentUser.email;
        userId = userId.substr(0, userId.indexOf("@"));
        userId = userId.replace(".","");

        firebase.database().ref('files/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot){
              if (childSnapshot.child(key).exists()) {
                let value = childSnapshot.child(key).val();
                //firebase.database().ref('files/'+userId+'/'+key).set(value);
                let obj = {key,value};
                const element = <Checkoutt  val={obj}/>;
                ReactDOM.render(
                    element,
                    document.getElementById('boxeen')
                );
              }
            });
        });



    }


    render(){

        return(
            <div>
                <p id="demo" >Would you like to add this file to your library?</p>
                <button onClick={this.check.bind(this)}>Yes</button>

            </div>
        );
    }


}
