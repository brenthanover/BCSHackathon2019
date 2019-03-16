import React from 'react';

export default class GPS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'Go click the button!',
            lat: undefined,
            lon: undefined,
        };

        this.handleClick = this.handleClick.bind(this);
        this.setLocation = this.setLocation.bind(this);
    }

    handleClick() {
        this.getLocation()
            .then(this.setLocation);
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                }, () => {
                    reject("Geolocation is not supported by this browser.");
                });
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        })
    }

    setLocation(position) {
        let text = "Here's your location: ";
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.setState({text, lat, lon});
    }

    render() {
        return (
            <div>
                <h1>GPS Page</h1>
                <button onClick={() => this.handleClick()}>Click me!</button>
                <p>Text: {this.state.text}</p>
                <p>Lat: {this.state.lat}</p>
                <p>Lon: {this.state.lon}</p>

            </div>
        )
    }
}
