import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import * as Stripe from "stripe" ;
//import {Stripe Provider} from 'react-stripe-elements';
export default class checkout extends Component {
  //Stripe.setPublishableKey('pk_test_AGSajVeTOdFLcg6JTYEPn6BJ');

makePayment(){
  var stripe = require("stripe")("pk_test_AGSajVeTOdFLcg6JTYEPn6BJ");
    const charge = stripe.charges.create({
      amount: 10,
      currency: 'usd',
      source: 'tok_visa',
      description: "Charge for madison.harris@example.com"
      }, function(err, charge) {
   // asynchronously called
        if(err){
          alert(err);
        }else{
          alert("payment made");
        }
    });
}

monthExpiry(){
       var select = document.getElementsByClassName('card-expiry-month'),
           month = new Date().getMonth() + 1;

       for (var i = 1; i <= 12; i++) {
          document.getElementsByClassName('card-expiry-month').innerHTML="<option value='"+i+"' "+(month === i ? "selected" : "")+">"+i+"</option>";
       }
       for ( var i = 1; i <= 12; i++ )
           var opt = sel.options[i];
             document.getElementsByClassName('card-expiry-month').innerHTML= i;
           if ( opt.selected === true ) {
               //break;
           }
       }

}

yearExpiry(){
      var select = document.getElementsByClassName('card-expiry-year'),
          year = new Date().getFullYear();

      for (var i = 0; i < 12; i++) {
          document.getElementsByClassName('card-expiry-year').innerHTML="<option value='"+(i + year)+"' "+(i === 0 ? "selected" : "")+">"+(i + year)+"</option>";
      }
}


    render() {
        return (
        <div className="check">

          <h1>Checkout</h1>
          <form action="success.html"  >

              <label for="name" class="stripeLabel">Your Name</label>
              <input type="text" name="name" class="required" />
              <br/>
              <label for="email">E-mail Address</label>
              <input type="text" name="email" class="required" />
              <br/>
              <label>Card Number</label>
              <input type="text" maxlength="20" autocomplete="off" class="required" />
              <br/>
              <label>CVC</label>
              <input type="text" maxlength="4" autocomplete="off" class="card-cvc stripe-sensitive required" />
              <br/>
              <label>Expiration</label>
                    <div class="expiry-wrapper">
                    <select class="card-expiry-month stripe-sensitive required" onClick="makePayment()"> </select>

                    <span> / </span>
                    <select class="card-expiry-year stripe-sensitive required" onClick="yearExpiry()"></select>
                    </div>
                    <br/>
          <button type="submit" name="submit-button" >Submit</button>
          <span class="payment-errors"></span>

        </form>
        </div>

        );
  }}
