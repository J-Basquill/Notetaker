import React from "react";
import * as firebase from "firebase";


export default class FileTransfer extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
              id: props.id
            };
        console.log(this.state.id);
    }

    render(){
        firebase.database().ref('files/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            });
        });

        function check(key){
            console.log(key);
        }

        return(
            <div>
                <h1>FILE TRANSFER</h1>
                <p id="demo">Hello, {this.props.id}</p>
                <button onClick="{this.check({this.props.id}).bind(this)}">Button</button>

            </div>
        );
    }

    componentDidMount(){

    }
}








