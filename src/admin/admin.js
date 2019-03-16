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
    }

    handleClick(text) {
        this.setState({text: text});

        // firebase.database().ref('Shelters/Shelter2').set({
        //     username: "name",
        //     email: "email",
        //     profile_picture : "imageUrl"
        // });

        this.firebase.database().ref('/Shelters/Shelter1').once('value').then((res) => {
            console.log('Shelter name:', res.name);
            console.log('Shelter location:', res.location);
            console.log('Shelter capacity:', res.capacity);
            console.log('Current number of occupants:', res.occupants);
        });

    }

    render() {
        return (
            <div style={styles.container}>
                <Navbar/>
                <h1>Admin Page</h1>
                <button onClick={() => this.handleClick()}>Click me!</button>
            </div>
        )
    }
}
