import React from "react";
import * as firebase from "firebase";


export default class FileTransfer extends React.Component{



    render(){

        return(
            <div>
                <h1>FILE TRANSFER</h1>
                <p id="demo">Hello, {this.props.id}</p>

            </div>
        );
    }

    componentDidMount(){

    }
}








