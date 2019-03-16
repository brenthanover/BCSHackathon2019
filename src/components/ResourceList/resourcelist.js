import './resourcelist.css';
import React from 'react';
import { List } from 'semantic-ui-react';
import ResourceListItem from './resourcelistitem';
import {MapsRequestHandler} from '../Maps/maps';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    flex: 'none',
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
  }
};

const requestTypes = {
  SHELTER: "shelter",
  SAFE_INJECTION_SITE: "safe%20injection%20site",
  PHARMACY: "pharmacy",
  HOSPITAL: "hospital"
};


const MOCK_INFOTAG = { type: 'VACANCY', label: 'VACANT', value: '132/200' };

const MOCK_ITEM = {
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
};
const MOCK_ITEMS = [
  MOCK_ITEM,
  MOCK_ITEM,
  MOCK_ITEM,
  MOCK_ITEM
];

const MOCK_DATA = [
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG },
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG },
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG },
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG },
];


export default class ResourceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 49.267940,
      lon: -123.247360,
      data: []
    };

    this.queryNearbyResources = this.queryNearbyResources.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
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

  setLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    this.setState({ lat, lon });
  }

  async queryNearbyResources() {
    // TODO: here, we should call handleGetPlacesQuery() with a proper lat, lng, and request type.
    let queryResponse = await MapsRequestHandler.handleGetPlacesQuery(this.state.lat, this.state.lon, requestTypes.SAFE_INJECTION_SITE);
    console.log('resources are ', queryResponse);
    this.setState({ data: queryResponse.data.results });
    return queryResponse;
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

  componentDidMount() {
    console.log('mounted');
    this.getLocation()
      .then(this.setLocation)
      .then(this.queryNearbyResources);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
          <List celled>
            {MOCK_ITEMS.map((item, id) => (
              <List.Item key={id} style={styles.listItem}>
                <List.Content>
                  <ResourceListItem
                    index={id}
                    name={item.name}
                    icon={item.icon}
                    address={item.formatted_address}
                    openingHours={item.opening_hours}
                    types={item.types}
                    infoTag={item.infoTag}
                  />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    )
  }
}
