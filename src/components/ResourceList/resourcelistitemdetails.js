import React from 'react';

const styles = {
  container: {
    display: 'flex',
    height: 'min-content',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: '0.5rem'
  },
  innerContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
  },
  optionsBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
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
        <div style={styles.innerContainer}>
          <h1>Resource Details/ schedule</h1>
          <p>Details text, schedule etc...</p>

          <div style={styles.optionsBar}>
            <button onClick={() => this.handleClick('You clicked the button!')}>Admin Panel!</button>
          </div>
        </div>

      </div>
    )
  }
}
