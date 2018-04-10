import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>My Account</h1>
                    <p>This will be a protected route which only an authenticated user can access...</p>
                </div>
            </div>
        );
    }
}