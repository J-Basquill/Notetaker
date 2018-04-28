import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import { app } from './firebase_Config';
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import checkout2 from "./components/checkout2";

import Library from "./components/Library";
import './App.css';
import Uploader from "./components/Uploader";
import Downloader from "./components/Downloader";


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

        var background = {backgroundSize : 'cover'};
        var textStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%'
        };

        if (this.state.loading === true) {
            return (
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                    <h3>Loading</h3>
                    <Spinner />
                </div>
            )
        }

        return (
            <div style={{maxWidth: "1160px", margin: "0 auto"}}>


                    <div>
                        <Header  authenticated={this.state.authenticated} />
                        <div className="main-content" style={{padding: "1em"}}>
                            <div className="workspace">
                                <Route exact path="/login" render={(props) => {
                                    return <Login setCurrentUser={this.setCurrentUser} {...props} />
                                }} />
                                <Route exact path="/SignUp" render={(props) => {
                                    return <SignUp setCurrentUser={this.setCurrentUser} {...props} />
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

                            </div>
                        </div>
                    </div>

                <Footer />
            </div>
        );
    }
}

export default App;
