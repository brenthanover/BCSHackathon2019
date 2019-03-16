import React from 'react';

const requestTypes = {
  SHELTER: "shelter",
  SAFE_INJECTION_SITE: "safe%20injection%20site",
  PHARMACY: "pharmacy",
  HOSPITAL: "hospital"
};

let HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    let anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200){
        console.log("In this.get(): " + anHttpRequest.responseText);
        aCallback(anHttpRequest.responseText);
      }
    };

    anHttpRequest.open( "GET", aUrl, false );
    anHttpRequest.send( null );
  }
};

export default class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Go click the button!'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(text) {
    this.setState({ text: text });
    let queryResponse = await MapsRequestHandler.handleQuery(49.267940, -123.247360, requestTypes.HOSPITAL);
    console.log("Response: " + queryResponse);

    // This is the response containing the data you want for rendering on the front-end.
    return queryResponse;
  }

  render() {
    return (
      <div>
        <h1>Maps Page</h1>
        <button onClick={() => this.handleClick('You clicked the button!')}>Click me!</button>
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
  static async handleQuery(lat, lng, requestType) {
    let queryPath = this.buildQuery(lat, lng, requestType);
    console.log(queryPath);

    let httpClient = new HttpClient();
    this.response = null;
    let _this = this;

    await httpClient.get("http://localhost:8080/placesRequest", function(response) {
      // I could work with the result html/json here.  I could also just return it
      console.log("Returning result handleQuery()");
      _this.response = response;
    });

    return _this.response;
  }

  /**
   *  Returns the URL required for a query.
   */
  static buildQuery(lat, lng, requestType) {
    return "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
        + "?input=" + requestType
        + "&inputtype=textquery"
        + "&language=en"
        + "&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,plus_code,types,user_ratings_total,price_level,rating"
        + "&locationbias=point:" + lat.toString() + "," + lng.toString()
        + "&key=" + MapsApiKey.MAPS_API_KEY;
  }
}