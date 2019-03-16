import './home.css';
import React from 'react';
import { NavBar, ResourceList } from '../components';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <NavBar />
        <ResourceList />
      </div>
    )
  }
}
