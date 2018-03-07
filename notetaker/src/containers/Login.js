import React, {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import * as firebase from "firebase";

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {

            email: '',
            password: ''
        }
    }


    loggingIn () {
        console.log("logging in..");
        const { history } = this.props;
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser){
                this.props.userHasAuthenticated(true);
                history.push('../Home');
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                alert("Error : " + errorMessage);
                // ...
            });
    }



    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }


    /*We then connect the state to our two fields in the form by setting this.state.email and this.state.password
    as the value in our input fields. This means that when the state changes, React will re-render these components
    with the updated value.*/

    render() {
        return (
            <div className="Login">
                <h2>Log In</h2>
                <form>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={event => this.setState({email: event.target.value})} //updates the state
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value})}
                            type="password"
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button
                        className="btn btn-primary"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={() => this.loggingIn()}
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}