import React from 'react';
import ResourceListItem from './resourcelistitem';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    flex: 'none',
    width: '100%',
    height: '100%',
    border: '1px solid yellow'
  },
  scrollContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: 'min-content',
    border: '1px solid magenta'
  }
};

const MOCK_INFOTAG = { type: 'VACANCY', label: 'VACANT', value: '132/200' };
const MOCK_DATA = [
  { title: 'TEST1', description: 'test1', infoTag: MOCK_INFOTAG },
  { title: 'TEST2', description: 'test2', infoTag: MOCK_INFOTAG },
  { title: 'TEST3', description: 'test3', infoTag: MOCK_INFOTAG }
];


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
        <div style={styles.scrollContainer}>
          {MOCK_DATA.map((item, id) => (
            <ResourceListItem
              key={id}
              title={item.title}
              description={item.description}
              infoTag={item.infoTag}
            />
          ))}
        </div>
      </div>
    )
  }
}
