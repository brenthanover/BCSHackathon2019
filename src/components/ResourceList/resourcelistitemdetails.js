import React from 'react';

const styles = {
  container: {
    display: 'flex',
    height: '6rem',
    width: '100%',
    backgroundColor: '#c1c1c1'
  }
};

export default class ResourceListItemDetails extends React.Component {
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
        <h1>Resource Details/ schedule</h1>
        <button onClick={() => this.handleClick('You clicked the button!')}>Admin Panel!</button>
      </div>
    )
  }
}
