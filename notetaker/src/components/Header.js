import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Navbar } from "react-bootstrap";
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

class Header extends Component {
    constructor(props) {
        super(props)
        this.closePopover = this.closePopover.bind(this)
        this.state = {
            popoverOpen: false
        }
    }

    closePopover() {
        this.setState({ popoverOpen: false })
    }

    render() {
        return (
            <nav className="pt-navbar pt-dark .modifier">

                <div className="pt-navbar-group pt-align-left">
                        <Navbar.Brand>
                            <Link to="/">NoteTaker</Link>
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
                            <Link className="pt-button pt-minimal pt-icon-document" to="/library">My Files</Link>


                            <span className="pt-navbar-divider"/>
                            <button className="pt-button pt-minimal pt-icon-user"></button>
                            <button className="pt-button pt-minimal pt-icon-shopping-cart" to="/"></button>
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