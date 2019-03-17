import React from 'react';
import ResourceListItem from './resourcelistitem';

import firebase from '../../Firebase';
const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    flex: 'none',
    width: '100%',
    height: '100%',
    border: '1px solid yellow'
  },
  scrollContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: 'min-content',
    border: '1px solid magenta'
  }
};

const MOCK_INFOTAG = { type: 'VACANCY', label: 'VACANT', value: '132/200' };
const MOCK_DATA = [
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG }
];


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Go click the button!',
      location: {
        lat: 0,
        long:0,
      },
      resources: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.getResources = this.getResources.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.db = firebase.database();

    this.getResources();
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
              label: (resource.capacity >= resource.occupants),
              value: `${resource.occupants}/${resource.capacity}`
            }
          }
      })
      this.setState({resources: shelters});
    }.bind(this));
  }

  getLocation() {
      return;
  }

  handleClick(text) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
          {this.state.resources.map((item, id) => (
            <ResourceListItem
              key={id}
              title={item.title}
              description={item.description}
              infoTag={item.infoTag}
            />
          ))}
        </div>
      </div>
    )
  }
}
