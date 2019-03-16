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
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.post('/placesRequest', function (req, res) {
  console.log("You are in the placesRequest route");
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
