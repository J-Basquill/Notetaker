import React from "react";
//git check comment
export default class Downloader extends React.Component{
    render(){
        return(
            <div>
            <h1>DOWNLOADING</h1>
        Username:<input type="text name=" id="username"/>
            <button id="lis">List?</button><br/>
        File Path:<input type="text name=" id="filePath"/>
            <button id="dl">Download</button><br/>
            <button id="j2u">Go to Uploading</button><br/>
        <p id="list"></p>
            </div>
    );
    }
}
