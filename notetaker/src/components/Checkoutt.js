import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../App.css";
import * as firebase from "firebase";
//import * as Stripe from "stripe" ;
//import {Stripe Provider} from 'react-stripe-elements';
export default class Checkoutt extends Component {
  //Stripe.setPublishableKey('pk_test_AGSajVeTOdFLcg6JTYEPn6BJ');


  constructor(props) {
     super(props);
     this.state = {value: ''};

     this.handleSubmit = this.handleSubmit.bind(this);
     console.log(this.props.val);
   }

  //  var checkoutHandler = StripeCheckout.configure({
  //           key: "pk_test_AGSajVeTOdFLcg6JTYEPn6BJ",
  //           locale: "auto"
  //         });
  //
  //
  // var button = document.getElementById("buttonCheckout");
  // button.addEventListener("click", function(event) {
  //   checkoutHandler.open({     name: "Sample Store",
  //                             description: "Example Purchase",
  //                             token: handleToken  });
  // });
  //

   handleSubmit(event) {

     alert('Payment made ' + this.state.value);
     event.preventDefault();
     let  key = this.props.val.key,
          value = this.props.val.value,
          userId  = firebase.auth().currentUser.email;
          userId = userId.substr(0, userId.indexOf("@"));
          userId = userId.replace(".","");
      console.log(value);
     firebase.database().ref('files/'+userId+'/'+key).set(value);
   }

    render() {
        return (
          <div className="form">
              <form onSubmit={this.handleSubmit}>
                <h1 className="heading"> Checkout {this.props.val.key} </h1>
                <p>Field: {this.props.val.value.field}</p>
                <p>Module: {this.props.val.value.module}</p>
                <p>Institution: {this.props.val.value.institution}</p>
                <p>File: {this.props.val.value.file}</p>
               <label>
                 Card number:
                 <input type="text" req/>
               </label>
                    <br/>

                <label>
                  CVC: <input type="text" req />
                </label> <br/>

               <input id="buttonCheckout" type="submit" value="Submit" />

             </form>
         </div>
        );
  }}
