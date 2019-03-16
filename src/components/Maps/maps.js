import React from 'react';

// const ROOT_URL = "http://localhost:8080";
const ROOT_URL = "";

/*
const requestTypes = {
  SHELTER: "shelter",
  SAFE_INJECTION_SITE: "safe%20injection%20site",
  PHARMACY: "pharmacy",
  HOSPITAL: "hospital",
  FINANCIAL: "financial",
  LEGAL: "legal",
  FOOD: "food",
};
*/

const relevantPlaceTypes = "(shelter)+OR+(injection)+OR+(pharmacy)+OR+(hospital)+OR+(financial)+OR+(legal)+OR+(food)+OR+(addiction)+OR+(recovery)+OR+(survivor)+OR+(healing)+OR+(health)";
const RADIUS_OF_EARTH = 6371000;   // radius of earth in metres

let HttpClient = function() {
  this.post = function(aUrl, queryPath, aCallback) {
    let anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200){
        aCallback(anHttpRequest.responseText);
      }
    };

    let data = {queryPath: queryPath};

    anHttpRequest.open( "POST", aUrl, false );
    anHttpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    anHttpRequest.send( JSON.stringify(data));
  }
};

export default class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Go click the button!'
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleIndividualPlaceClick = this.handleIndividualPlaceClick.bind(this);
  }

  async handleClick(text) {
    this.setState({ text: text });

    // TODO: here, we should call handleGetPlacesQuery() with a proper lat, lng, and request type.
    let queryResponse = await MapsRequestHandler.handleGetPlacesQuery(49.267940, -123.247360);
    console.log("Response: " + queryResponse);

    // This is the response containing the data you want for rendering on the front-end.
    return queryResponse;
  }

  async handleIndividualPlaceClick(placeId) {

    // TODO: here, we should call handleGetPlaceDetails() with a proper placeId from our getPlacesQuery.
    let queryResponse = await MapsRequestHandler.handleGetPlaceDetails(placeId);
    console.log("Response: " + queryResponse);
    return queryResponse;
  }

  render() {
    return (
      <div>
        <h1>Maps Page</h1>
        <button onClick={() => this.handleClick('You clicked the button!')}>Get list of nearby places</button>
        <button onClick={() => this.handleIndividualPlaceClick("ChIJv1Ta5shyhlQR_6flUsZ9Vok")}>Get detailed info for one place</button>
        <p>Text: {this.state.text}</p>
      </div>
    )
  }
}

export class MapsApiKey {
  static MAPS_API_KEY = "AIzaSyAsvCrLqQVzefCIIPgvWoVsx_PBpYi8l2c";
}

export class MapsRequestHandler {
  /**
   * Given a lat, lng, and requestType (enum): see above, return response.
   * @param lat
   * @param lng
   * @param requestType
   * @returns {Promise<void>}
   */
  static async handleGetPlacesQuery(lat, lng, requestType) {
    let queryPath = this.buildGetPlacesQuery(lat, lng, requestType);
    console.log(queryPath, lat, lng);

    let httpClient = new HttpClient();
    this.response = null;
    let _this = this;

    await httpClient.post(`${ROOT_URL}/placesRequest`, queryPath, function(response) {
      // I could work with the result html/json here.  I could also just return it
      console.log("Returning result handleGetPlacesQuery()");
      _this.response = response;
    });

    return _this.response;
  }

  /**
   *  Returns the URL required for a "get places" query.
   */
  static buildGetPlacesQuery(lat, lng) {
    return "https://maps.googleapis.com/maps/api/place/textsearch/json"
        + "?query=" + relevantPlaceTypes
        + "&language=en"
        + "&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,plus_code,types,user_ratings_total,price_level,rating,opening_hours"
        + "&location=" + lat.toString() + "," + lng.toString()
        + "&key=" + MapsApiKey.MAPS_API_KEY
        + "&radius=12000";
  }

  /**
   * Given a placeid (retrieved from a separate "get places" query), return contact information for that one place.
   * @param placeid
   * @returns {string}
   */
  static async handleGetPlaceDetails(placeId) {
    let queryPath = this.buildGetPlaceDetailsQuery(placeId);

    console.log(queryPath);

    let httpClient = new HttpClient();
    this.response = null;
    let _this = this;

    await httpClient.post(`${ROOT_URL}/placeDetailsRequest`, queryPath, function(response) {
      // I could work with the result html/json here.  I could also just return it
      console.log("Returning result handleGetPlaceDetails()");
      _this.response = response;
    });

    return _this.response;
  }

  static buildGetPlaceDetailsQuery(placeid) {
    return "https://maps.googleapis.com/maps/api/place/details/json"
        + "?key=" + MapsApiKey.MAPS_API_KEY
        + "&placeid=" + placeid
        + "&language=en"
        + "&fields=formatted_phone_number,international_phone_number,opening_hours,website"
  }

  /**
   * Returns distance (in km) between two points represented by lat1,lng1 and lat2,lng2
   * Implementation from CPSC210 (Paul Carter)
   * @param lat1
   * @param lng1
   * @param lat2
   * @param lng2
   * @returns {number}
   */
  static distanceBetweenPoints(lat1, lng1, lat2, lng2) {
    lat1 = lat1 / 180.0 * Math.PI;
    lat2 = lat2 / 180.0 * Math.PI;
    const deltaLon = (lng1 - lng2) / 180.0 * Math.PI;
    const deltaLat = (lat1 - lat2) / 180.0 * Math.PI;

    const a = Math.sin(deltaLat / 2.0) * Math.sin(deltaLat / 2.0)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.sin(deltaLon / 2.0) * Math.sin(deltaLon / 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return c * RADIUS_OF_EARTH;
  }
}
