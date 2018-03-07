import React, {Component} from "react";
import "./Landing.css";

export default class Landing extends Component {
    render() {
        return (
            <div className="Landing">
                <div className="lander">
                    <h1>Welcome to NoteTaker</h1>
                    <p>Anyone can see this page. This is the default landing page for authenticated and non authenticated users... </p>
                </div>
            </div>
        );
    }
}