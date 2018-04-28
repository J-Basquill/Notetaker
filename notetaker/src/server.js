

//This is the entry point file
const keyPublishable = process.env.pk_test_AGSajVeTOdFLcg6JTYEPn6BJ;
const keySecret = process.env.sk_test_Vd9zeM730viMtqQyddodRPfu;


const express = require('express');

const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(port, function () {
    console.log('app listening on port 5000!');
});

app.use( express.static( `${__dirname}/../build` ) );

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
});

//app.listen(5000);
