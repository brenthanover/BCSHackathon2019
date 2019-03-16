import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

import Home from './home/home';
import Admin from './admin/admin';
import Maps from './components/Maps/maps';

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
        <Router history={history}>
          <Route exact path={"/"} component={Home}/>
          <Route exact path={"/admin"} component={Admin}/>
        </Router>
      </div>
    );
  }
}

export default App;
