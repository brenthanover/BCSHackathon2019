import React from 'react';
import Navbar from '../components/NavBar/navbar';
import firebase from "../Firebase";
import {HttpClient, ROOT_URL} from '../components/Maps/maps';

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'column',
        width: '100%',
        height: '100%'
    }
};

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            occupants: 0,
            capacity: 0
        };

        this.setCapacity = this.setCapacity.bind(this);
        this.setOccupants = this.setOccupants.bind(this);
        this.setName = this.setName.bind(this);
        this.decCount = this.decCount.bind(this);
        this.incCount = this.incCount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSendTwilio = this.handleSendTwilio.bind(this);
        this.db = firebase.database();
        this.setName();
        this.setCapacity();
        this.setOccupants();
    }

    setCapacity() {
      this.db.ref(`/Shelters/Shelter1`).once('value').then((res) => {
          let capacity = res.val().capacity;
          this.setState({capacity});
      });
    }

    setOccupants() {
      this.db.ref(`/Shelters/Shelter1`).once('value').then((res) => {
          let occupants = res.val().occupants;
          this.setState({occupants});
      });
    }

    setName() {
        this.db.ref(`/Shelters/Shelter1`).once('value').then((res) => {
            let name = res.val().name;
            this.setState({name});
        });
    }

    incCount() {
        let numOfOccupants = this.state.occupants;
        if (this.state.occupants >= this.state.capacity) {
            // No!!!
        } else {
            numOfOccupants++;
            this.setState({occupants: numOfOccupants});
            this.db.ref('Shelters/Shelter1').update({occupants: numOfOccupants})
                .then(() => {
                    console.log("Success!");
                });
        }
    }

    decCount() {
        let numOfOccupants = this.state.occupants;
        if (this.state.occupants <= 0) {
            // No!!!
        } else {
            numOfOccupants--;
            this.setState({occupants: numOfOccupants});
            this.db.ref('Shelters/Shelter1').update({occupants: numOfOccupants})
                .then(() => {
                    console.log("Success!");
                });
        }
    }

    handleClick(text) {
        this.setState({text: text});

        this.firebase.database().ref('/Shelters/Shelter1').once('value').then((res) => {
            console.log('Shelter name:', res.val().name);
            console.log('Shelter location:', res.val().location);
            console.log('Shelter capacity:', res.val().capacity);
            console.log('Current number of occupants:', res.val().occupants);
        });
    }

    async handleSendTwilio() {
    console.log('here');
      let httpClient = new HttpClient();
      this.response = null;

      await httpClient.post(`${ROOT_URL}/twilio`);
      console.log('done');
    }

    render() {
        return (
            <div style={styles.container}>
                <Navbar/>
                <h1>Admin Page</h1>
                <p>Current Shelter: {this.state.name}</p>
                <p>Current number of Occupants: {this.state.occupants}</p>
                <p>Current capacity: {this.state.capacity}</p>
                <button onClick={() => this.incCount()}>Inc Count</button>
                <button onClick={() => this.decCount()}>Dec Count</button>
                {/*<div style={{ border: '1px solid black', marginTop: '2rem'}} onClick={this.handleSendTwilio}>Send Notification</div>*/}
            </div>
        )
    }
}
