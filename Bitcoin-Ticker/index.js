// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();




app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount,
    },
  };
});

app.post("/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.setHeader("Content-Type", "application/json");
  // TODO: Check userdetails

  // TODO: Send error if wrong

  // TODO: Create Session-id

  // TODO: insert session id in database

  res.json({'session':'gae4$Y%%hwghw'});

  res.send();
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
});
