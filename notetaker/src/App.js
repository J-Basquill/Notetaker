import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import * as firebase from "firebase";
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import { app } from './firebase_Config';
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Files from "./components/Files";
import './App.css';
import Uploader from "./components/Uploader";

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} {...rest} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
    )
}

function ShowRoute({component: Component, items, param, ...rest}) {
    return (
        <Route
            {...rest}
            render={({match, ...props}) => {
                if (rest.requireAuth === true && !rest.authenticated) {
                    return (
                        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                    )
                }

                const item = items[match.params[param]]
                if (item) {
                    return <Component item={item} {...props} match={match} {...rest}/>
                } else {
                    return <h1>Not Found</h1>
                }
            }}
        />
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
            <div style={{maxWidth: "1160px", margin: "0 auto"}}>
                <BrowserRouter>
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
                                    path="/Home"
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
                                    path="/Files"
                                    authenticated={this.state.authenticated}
                                    component={Files}
                                />
                                <ShowRoute
                                    exact
                                    path="/files"
                                    authenticated={this.state.authenticated}
                                    requireAuth={true}
                                    component={Files}


                                />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}

export default App;
