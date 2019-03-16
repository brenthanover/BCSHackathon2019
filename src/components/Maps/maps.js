import React from 'react';

const requestTypes = {
  SHELTER: "shelter",
  SAFE_INJECTION_SITE: "safe%20injection%20site",
  PHARMACY: "pharmacy",
  HOSPITAL: "hospital"
};

let HttpClient = function() {
  this.post = function(aUrl, queryPath, aCallback) {
    let anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200){
        console.log("In this.post(): " + anHttpRequest.responseText);
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
  }

  async handleClick(text) {
    this.setState({ text: text });

    // TODO: here, we should call handleQuery() with a proper lat, lng, and request type.
    let queryResponse = await MapsRequestHandler.handleQuery(49.267940, -123.247360, requestTypes.PHARMACY);
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

    await httpClient.post("http://localhost:8080/placesRequest", queryPath, function(response) {
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
    return "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        + "?keyword=" + requestType
        + "&inputtype=textquery"
        + "&language=en"
        + "&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,plus_code,types,user_ratings_total,price_level,rating,opening_hours"
        + "&location=" + lat.toString() + "," + lng.toString()
        + "&key=" + MapsApiKey.MAPS_API_KEY
        + "&radius=2000";
  }
}