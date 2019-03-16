import React from 'react';
import Navbar from '../components/NavBar/navbar';

const firebase = require('firebase/app');
require('firebase/database');
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
            name: "asdf",
            numOfOccupants: 0,
            capacity: 20
        }

        this.handleClick = this.handleClick.bind(this);

        const config = {
            apiKey: "AIzaSyCNmaSPCktKr5T-Stq6mL3wlnIuJ9xD-Ss",
            authDomain: "bcs-hackathon-2019.firebaseapp.com",
            databaseURL: "https://bcs-hackathon-2019.firebaseio.com",
            projectId: "bcs-hackathon-2019",
            storageBucket: "bcs-hackathon-2019.appspot.com",
            messagingSenderId: "473934570743"
        };
        firebase.initializeApp(config);
        this.firebase = firebase;
        this.db = firebase.database();
        this.setName();
    }

    setName() {
        this.firebase.database().ref(`/Shelters/Shelter1`).once('value').then((res) => {
            let name = res.val().name;
            this.setState({name});
        });
    }

    incCount() {
        let numOfOccupants = this.state.numOfOccupants;
        if (this.state.numOfOccupants >= this.state.capacity) {
            // No!!!
        } else {
            numOfOccupants++;
            this.setState({numOfOccupants: numOfOccupants});
            this.db.ref('Shelters/Shelter1').update({occupants: numOfOccupants})
                .then(() => {
                    console.log("Success!");
                });
        }
    }

    decCount() {
        let numOfOccupants = this.state.numOfOccupants;
        if (this.state.numOfOccupants = 0) {
            // No!!!
        } else {
            numOfOccupants--;
            this.setState({numOfOccupants: numOfOccupants});
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
            console.log('Shelter capacity:', res.val().numOfOccupants);
            console.log('Current number of occupants:', res.val().numOfOccupants);
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <Navbar/>
                <h1>Admin Page</h1>
                <p>Current Shelter: {this.state.name}</p>
                <p>Current number of Occupants: {this.state.numOfOccupants}</p>
                <button onClick={() => this.incCount()}>Inc Count</button>
                <button onClick={() => this.decCount()}>Dec Count</button>
            </div>
        )
    }
}
