import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import profilePage from './components/ProfilePage';
import { app } from './firebase_Config';
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import checkout2 from "./components/checkout2";
import FileTransfer from "./components/FileTransfer";
import Library from "./components/Library";
import './App.css';
import Uploader from "./components/Uploader";
import Downloader from "./components/Downloader";
import createProfile from "./components/CreateProfile";
import OwlLogo from './img/OwlLogo.png'


const logoStyles = {
    display: "block",
    margin: "auto",
    width: "10%",
    height: "10%"
}


function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} {...rest} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
    )
}



class App extends Component {
    constructor() {
        super();
        this.setCurrentUser = this.setCurrentUser.bind(this);


        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,

        };
    }



    setCurrentUser(user) {
        if (user) {
            this.setState({
                currentUser: user,
                authenticated: true
            })
        } else {
            this.setState({
                currentUser: null,
                authenticated: false
            })
        }
    }

    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false,
                })


            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false,
                })


            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();

    }

    render() {



        if (this.state.loading === true) {
            return (
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                    <h3>Loading</h3>
                    <Spinner />
                </div>
            )
        }


        return (

                    <div className="big-banner">

                        <Header  authenticated={this.state.authenticated} />

                        <div className="main-content" style={{padding: "1em", color: "white"}}>
                            <div className="workspace">
                                <Route exact path="/" render={(props) => {
                                    return <div>
                                        <img style={logoStyles} src={OwlLogo}></img>
                                        <h1 style={{padding: "1em", color: "white", textAlign: "center", fontFamily: "Courier New"}} >Welcome to NoteTakers</h1>
                                        <p style={{padding: "1em", color: "white", textAlign: "center", fontFamily: "Courier New", fontSize: "large"}} >A never-been-done-before, totally original, file sharing website. </p>
                                    </div>
                                }} />

                                <Route exact path="/login" render={(props) => {
                                    return <div>
                                        <img style={logoStyles} src={OwlLogo}></img>
                                        <Login setCurrentUser={this.setCurrentUser} {...props} />
                                    </div>
                                }} />
                                <Route exact path="/SignUp" render={(props) => {
                                    return <div>
                                        <img style={logoStyles} src={OwlLogo}></img>
                                        <SignUp setCurrentUser={this.setCurrentUser} {...props} />
                                    </div>
                                }} />

                                <Route exact path="/logout" component={Logout} />
                                <AuthenticatedRoute
                                    exact
                                    path="/home"
                                    authenticated={this.state.authenticated}
                                    component={Home}

                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/upload"
                                    authenticated={this.state.authenticated}
                                    component={Uploader}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/library"
                                    authenticated={this.state.authenticated}
                                    component={Library}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/download"
                                    authenticated={this.state.authenticated}
                                    component={Downloader}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/checkout2"
                                    authenticated={this.state.authenticated}
                                    component={checkout2}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/profile"
                                    authenticated={this.state.authenticated}
                                    component={profilePage}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/createProfile"
                                    authenticated={this.state.authenticated}
                                    component={createProfile}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/transfer"
                                    authenticated={this.state.authenticated}
                                    component={FileTransfer}
                                />

                        </div>
                    </div>
                <Footer />
            </div>
        );
    }
}

export default App;
