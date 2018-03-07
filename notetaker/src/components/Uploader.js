import React from "react";
//git check comment
export default class Uploader extends React.Component{
    render(){
        return(
            <div>
            <h1>UPLOADING</h1>
        Username:<input type="text name=" id="username"/>
            <input type="file" id="fileButton"/>
            <button id="up">Submit?</button><br/>
        <progress value="0" max="100" id="uploader">0%</progress>
            <button id="lis">List?</button><br/>
        File Path:<input type="text name=" id="filePath"/>
            <button id="dl">Download</button><br/>
            <button id="j2d">Go to Downloading</button><br/>
        <p id="list"></p>

            </div>
    );
    }
}
