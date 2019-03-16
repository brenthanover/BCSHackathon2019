import './navbar.css';
import React from 'react';
import history from '../../history';
import Home from '../../assets/home.svg';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: 'min-content',
    backgroundColor: '#428ec1',
    padding: '0.5rem',
    fill: '#FFF'
  },
  title: {
    color: '#FFFFFF'
  },
  logo: {
    marginRight: '1rem',
    height: '1.5rem',
    color: '#FFFFFF',
    fill: '#FFF',
    path: {
      fill: '#FFF'
    }
  }
};

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Go click the button!'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(text) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div style={styles.container}>
        <img style={styles.logo} src={Home} alt="logo" className="home-logo" />
        <h1 style={styles.title}>Haven App</h1>
        <button onClick={() => history.push('/')}>main</button>
        <button onClick={() => history.push('/admin')}>admin</button>
      </div>
    )
  }
}
