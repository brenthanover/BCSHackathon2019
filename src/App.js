import React, { Component } from 'react';
import { GPS, NFC, Maps } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GPS />
        {/*<NFC />*/}
        {/*<Maps />*/}
      </div>
    );
  }
}

export default App;
