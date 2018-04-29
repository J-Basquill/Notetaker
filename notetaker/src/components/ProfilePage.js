import React, { Component } from "react";
import * as firebase from "firebase";

export default class ProfilePage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">

                            </div>
                            <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                                <img src="" alt="profile " className="img-thumbnail" />
                            </div>
                        </div>
                        <div className="text-center">

                            <h1 className="display-4 text-center-white">John Doe</h1>
                            <p className="lead text-center">Developer</p>
                            <p>Maynooth, Co. Kildare, Ireland</p>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}