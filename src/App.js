import React, { Component } from 'react';
import { GPS, NFC, Maps, NavBar, ResourceList } from './components';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column'
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <ResourceList />
        {/*<GPS />*/}
        {/*<NFC />*/}
        {/*<Maps />*/}
      </div>
    );
  }
}

export default App;
