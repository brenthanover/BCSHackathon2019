import './resourcelist.css';
import React from 'react';
import { List } from 'semantic-ui-react';
import Lottie from 'react-lottie';
import ResourceListItem from './resourcelistitem';
import {MapsRequestHandler} from '../Maps/maps';
import history from "../../history";

import firebase from '../../Firebase';
const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: 'min-content'
  },
  listItem: {
    padding: 0
    // borderBottom: '1px solid #c1c1c1'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '1rem',
    paddingTop: '2rem'
  }
};

const MAX_ITEMS = 6;
const LOADING_DELAY = 2500;

const requestTypes = {
  SHELTER: "shelter",
  SAFE_INJECTION_SITE: "safe%20injection%20site",
  PHARMACY: "pharmacy",
  HOSPITAL: "hospital"
};

const relevantPlaceTypes = "(shelter)+OR+(injection)+OR+(pharmacy)+OR+(hospital)+OR+(financial)+OR+(legal)+OR+(food)+OR+(addiction)+OR+(recovery)+OR+(survivor)+OR+(healing)+OR+(health)";
const RADIUS_OF_EARTH = 6371000;   // radius of earth in metres

const MOCK_INFOTAG = { type: 'VACANCY', label: 'VACANT', value: '132/200' };

const MOCK_ITEMS = [
  {
    name: "Shoppers Drug Mart",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
    formatted_address: "Dentistry Bldg, 5940 University Blvd, Vancouver, BC V6T 1Z3, Canada",
    opening_hours: {
      open_now: true
    },
    types: [
      "pharmacy",
      "store",
      "health",
      "point_of_interest",
      "establishment"
    ],
    infoTag: MOCK_INFOTAG
  }
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: require('./loading.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loading = () => (
  <div style={styles.loading}>
    <Lottie options={defaultOptions}
            height="100%"
            width="100%"/>
  </div>
);

export default class ResourceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 49.267940,
      lon: -123.247360,
      data: [],
      isLoading: false
    };

    this.queryNearbyResources = this.queryNearbyResources.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.formatData = this.formatData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getResources = this.getResources.bind(this);

    this.db = firebase.database();

    this.getResources();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        }, () => {
          console.log('error1');
          reject("Geolocation is not supported by this browser.");
        });
      } else {
        console.log('error2');
        reject("Geolocation is not supported by this browser.");
      }
    })
      
    
  }

  getResources() {
    let resourceType = "Shelters";
    this.db.ref(`/${resourceType}`).orderByKey().on("value", function (snapshot){
      let resources = Object.values(snapshot.val());
      let shelters = resources.map((resource) => {
          return {
            title: resource.name,
            description: "This is a Shelter",
            infoTag: {
              type: "VACANCY",
              label: (resource.capacity > resource.occupants) ? "VACANT" : "FULL",
              value: `${resource.occupants}/${resource.capacity}`
            }
          }
      })
      this.setState({resources: shelters});
    }.bind(this));
  }

  setLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    this.setState({ lat, lon });
  }

  async queryNearbyResources() {
    // TODO: here, we should call handleGetPlacesQuery() with a proper lat, lng, and request type.
    let queryResponse = await MapsRequestHandler.handleGetPlacesQuery(this.state.lat, this.state.lon);
    console.log('resources are ', queryResponse);

    this.setState({ data: this.formatData(JSON.parse(queryResponse).data)});

    window.setTimeout(() => {
      this.setState({ isLoading: false })
    }, LOADING_DELAY);
    return this.formatData(JSON.parse(queryResponse).data);
  }

  /**
   * Formats data from queryNearbyResources() to a more flattened structure
   * ASSUME: data is from a successful response
   * @param data
   * @returns {*}
   */
  formatData(data) {
    let ret = [];
    for (let i = 0; i < data.results.length; ++i) {
      let result = data.results[i];
      let resultObj = {
        name: result.name,
        icon: result.icon,
        formatted_address: result.formatted_address,
        opening_hours: result.opening_hours,
        types: result.types,
        place_id: result.place_id,
        distanceTo: ResourceList.distanceBetweenPoints(result.geometry.location.lat, result.geometry.location.lng, this.state.lat, this.state.lon),
        infoTag: MOCK_INFOTAG,
      };
      ret.push(resultObj);
    }

    ret.sort(function(a, b) {
      return a.distanceTo - b.distanceTo;
    });
    return ret;
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

    return c * RADIUS_OF_EARTH / 1000; // in km
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getLocation()
      .then(this.setLocation)
      .then(this.queryNearbyResources);
  }

  changeLocation() {
    console.log("Changing location...");

    let position;
    if (this.state.lat === 49.281388) {
      position = {
        coords: {
          latitude: 49.267940,
          longitude: -123.247360,
        }
      }
    } else {
      position = {
        coords: {
          latitude: 49.281388,
          longitude: -123.095661,
        }
      };
    }
    this.setLocation(position);
    this.queryNearbyResources();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
        { this.state.isLoading && <Loading /> }
        { !this.state.isLoading && <div style={styles.scrollContainer}>
          <button style={{ height: '2rem' }} onClick={() => this.changeLocation()}>Toggle location</button>
          <List celled>
            {this.state.data.slice(0, MAX_ITEMS).map((item, id) => (
              <List.Item key={id} style={styles.listItem}>
                <List.Content>
                  <ResourceListItem
                    index={id}
                    name={item.name}
                    icon={item.icon}
                    address={item.formatted_address}
                    openingHours={item.opening_hours}
                    types={item.types}
                    place_id={item.place_id}
                    infoTag={item.infoTag}
                    distanceTo={item.distanceTo}
                  />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>}
      </div>
      </div>
    )
  }
}