import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Landing from "./containers/Landing";
import Uploader from "./components/Uploader.js";
import Downloader from "./components/Downloader.js"

export default ({childProps}) =>
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/upload" exact component={Uploader}/>
        <Route path="/download" component={Downloader}/>
        <AppliedRoute path="/Home" exact component={Home} props={childProps}/>
        <AppliedRoute path="/Login" exact component={Login} props={childProps}/>
        <AppliedRoute path="/Register" exact component={Register} props={childProps} />

    </Switch>;