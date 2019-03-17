import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flex: 'none',
    height: 'min-content',
    width: '100%',
    //backgroundColor: '#FFFFFF',
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
    const {
      phone,
      website,
      schedule
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <h1>Resource Details/ schedule</h1>
          <p>{phone}</p>
          <p>{website}</p>
          {schedule.map(item => <p>{item}</p>)}
          {/*<p>{schedule}</p>*/}

          <div style={styles.optionsBar}>
            <button onClick={() => this.handleClick('You clicked the button!')}>Admin Panel!</button>
          </div>
        </div>

      </div>
    )
  }
}
