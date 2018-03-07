import React, {Component} from "react";
import * as firebase from "firebase";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";


 export default class Register extends Component {
     state = { email: '', password: ''};




     createAccount() {
         console.log("creating account..")
         const { history } = this.props;
         const {email, password} = this.state;
         firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(function (user) {
                 history.push('./Home');
             })
             .catch(function (error) {
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

     render() {
         return (
             <div className="Register">
                 <h2>Sign Up</h2>
                 <form>
                 <FormGroup controlId="email" bsSize="large">
                     <ControlLabel>Email</ControlLabel>
                     <FormControl
                         autoFocus
                         type="email"
                         className="form-control"
                         placeholder="Email"
                         onChange={event => this.setState({email: event.target.value})}
                     />
                 </FormGroup>

                 <FormGroup controlId="password" bsSize="large">
                     <ControlLabel>Password</ControlLabel>
                     <FormControl
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={event => this.setState({password: event.target.value})}
                     />
                 </FormGroup>

                 <Button
                     className="btn btn-primary"
                     type="button"
                     block
                     disabled={!this.validateForm()}
                     bsSize="large"
                     onClick={() => this.createAccount()}
                 >
                     Create Account
                 </Button>
                 </form>
             </div>

         );
     }
 }


