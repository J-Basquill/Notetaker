import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import * as firebase from "firebase";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        };

        let userHasAuthenticated = authenticated => {
            this.setState({isAuthenticated: authenticated});
        }
    }

    logout() {
        this.userHasAuthenticated(false);
        console.log("logging out..");
            firebase.auth().signOut()
                .then(function(){
                    //sign out sucessful
                })
                .catch(function(error) {
                    //some error
                });

    };

    render() {

        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">NoteTaker</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.state.isAuthenticated
                                ? <NavItem onClick={this.logout()}>Logout</NavItem>
                                :[
                                <RouteNavItem key={1} href="./Register">Signup</RouteNavItem>,
                                <RouteNavItem key={2} href="./Login">Login</RouteNavItem>
                            ]}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;
