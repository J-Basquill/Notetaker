import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import * as Stripe from "stripe" ;
//import {Stripe Provider} from 'react-stripe-elements';
export default class checkout2 extends Component {
  //Stripe.setPublishableKey('pk_test_AGSajVeTOdFLcg6JTYEPn6BJ');

  constructor(props) {
     super(props);
     this.state = {value: ''};

     this.handleSubmit = this.handleSubmit.bind(this);
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
   }

    render() {
        return (
          <div>
          <form onSubmit={this.handleSubmit}>
            <h1> Checkout </h1>
           <label>
             Name:
             <input type="text"/>
           </label>
                <br/>

            <label>
              Card: <input type="text" />
            </label>


           <input id="buttonCheckout" type="submit" value="Submit" />

         </form>
         </div>
        );
  }}
