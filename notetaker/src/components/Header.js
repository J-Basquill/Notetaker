import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Navbar } from "react-bootstrap";

class Header extends Component {


    render() {
        return (
            <nav className="pt-navbar pt-dark .modifier">

                <div className="pt-navbar-group pt-align-left">
                        <Navbar.Brand>
                            <Link to="/home">NoteTakers</Link>
                        </Navbar.Brand>

                    {this.props.authenticated
                        ? (
                            <div className="pt-input-group .modifier">
                                <span className="pt-icon pt-icon-search"></span>
                                <input className="pt-input" type="search" placeholder="Search files" dir="auto" />
                        </div>
                        )
                        :(
                            <div className="pt-input-group .modifier">
                                <span className="pt-icon pt-icon-search"></span>
                                <input className="pt-input" type="search" placeholder="Search files" dir="auto" />
                            </div>
                        )
                    }
                        <Navbar.Toggle/>
                </div>

                <div className="pt-navbar-group pt-align-right">

                {this.props.authenticated
                    ? (
                        <div className="pt-navbar-group pt-align-right">
                            <Link className="pt-button pt-minimal pt-icon-home" to="/home">Home</Link>
<<<<<<< HEAD
                            <Link className="pt-button pt-minimal pt-icon-document" to="/library">Library</Link>
                            <Link className="pt-button pt-minimal pt-icon-export" to="/upload">Upload file</Link>


                            <span className="pt-navbar-divider"/>
                            <Link className="pt-button pt-minimal pt-icon-user" to="/createprofile"></Link>
                            <button className="pt-button pt-minimal pt-icon-shopping-cart" to="/"></button>
=======
                            <Link className="pt-button pt-minimal pt-icon-document" to="/library">My Library</Link>
                            <Link className="pt-button pt-minimal pt-icon-export" to="/upload">Create Listing</Link>


                            <span className="pt-navbar-divider"/>
                            <Link className="pt-button pt-minimal pt-icon-user" to="/profile"></Link>
                            <Link className="pt-button pt-minimal pt-icon-shopping-cart" to="/checkout2"></Link>
>>>>>>> 1315db72bbd7b0a1daf2e493a36d8cf3b4781506
                            <Link className="pt-button pt-minimal pt-icon-log-out" to="/logout" aria-label="Log Out"></Link>
                        </div>
                    )
                    : (
                        <div className="pt-navbar-group pt-align-right">
                            <Link className="pt-button pt-intent-primary" to="/login">Log In</Link>
                            <span className="pt-navbar-divider"/>
                            <Link className="pt-button pt-intent-primary" to="/SignUp">Sign Up</Link>
                        </div>
                    )
                }
                </div>

            </nav>
        );
    }
}
export default Header;
