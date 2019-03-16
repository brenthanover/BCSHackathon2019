const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
var cors = require('cors');
require('isomorphic-fetch');
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors);
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/placesRequest', function (req, res) {
  console.log("You are in the placesRequest route");

  const buildQuery = (lat, lng, requestType) => {
    return "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
        + "?input=" + requestType
        + "&inputtype=textquery"
        + "&language=en"
        + "&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,plus_code,types,user_ratings_total,price_level,rating"
        + "&locationbias=point:" + lat.toString() + "," + lng.toString()
        + "&key=AIzaSyAsvCrLqQVzefCIIPgvWoVsx_PBpYi8l2c";
  };

  const apiUrl = buildQuery(49.267940, -123.247360, "hospital");

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
