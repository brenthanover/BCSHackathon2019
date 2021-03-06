const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
var cors = require('cors');
require('isomorphic-fetch');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());


// Twilio
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACcfa6cccf869d612b9d70cbdfdf28cc7a';
const authToken = '63a1004d1aee693be5e60613c62873a4';
const client = require('twilio')(accountSid, authToken);

app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.post('/placesRequest', function (req, res) {
  console.log("You are in the placesRequest route", port);
  console.log(req.body.queryPath);

  let apiUrl = req.body.queryPath;

  fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect('/error');
      });
});

app.post('/twilio', function (req, res) {
/*  client.messages
    .create({from: '+12049005587', body: 'A free bed is now available at your shelter. Please arrive in 30 minutes.', to: '+16042504909'})
    .then(message => console.log(message.sid));
  console.log('here backend');*/
});

app.post('/placeDetailsRequest', function (req, res) {
  console.log("You are in the placeDetailsRequest route");
  console.log(req.body.queryPath);

  let apiUrl = req.body.queryPath;

  fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect('/error');
      });
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {console.log("Listening on port " + port);});
