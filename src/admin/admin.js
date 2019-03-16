import React from 'react';
import Navbar from '../components/NavBar/navbar';

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
  }

  handleClick(text) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div style={styles.container}>
        <Navbar/>
        <h1>Admin Page</h1>
      </div>
    )
  }
}
