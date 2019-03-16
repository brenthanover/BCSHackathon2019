import React from 'react';
import history from '../../history';

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '3rem',
    border: '1px solid blue'
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
        <h1>Haven App</h1>
        <button onClick={() => history.push('/')}>main</button>
        <button onClick={() => history.push('/admin')}>admin</button>
      </div>
    )
  }
}
