import React from 'react';
import ResourceListItemDetails from './resourcelistitemdetails';
import Chip from './chip';

const LIST_BLUE = '#eceef9';
const LIST_WHITE = '#FFFFFF';

const styles = {
  container: (isOdd, isExpanded) => ({
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: isExpanded ? '16rem' : '8rem',
    backgroundColor: isOdd ? LIST_BLUE : LIST_WHITE,
    transition: 'all 0.05s ease-in-out'
  }),
  thumbnail: {
    width: '8rem',
    height: '100%',
    backgroundColor: '#c1c1c1'
  },

  innerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  // Body Styles
  body: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    width: '100%',
    padding: '0.5rem'
  },
  title: {
    fontSize: '12pt',
    marginBottom: 4,
  },
  types: {
    fontStyle: 'italic',
    fontSize: '10pt',
    marginBottom: 4,
  },
  description: {
    fontSize: '10pt',
    fontStyle: 'italic',
    marginBottom: 4,
  },

  bodyControlBar: {
    display: 'flex',
    height: '1rem',
    justifyContent: 'flex-end'
  },

  // labels
  vacancy: (status) => ({
    display: 'flex',
    flexFlow: 'row',
    color: (status === 'FULL') ? 'red' : 'green'
  }),
  label: {
    fontSize: '10pt'
  }
};

const MOCK_ITEM_DETAILS = {
  phone: "(604) 827-2584",
  schedule:[
    "Monday: 9:00 AM – 4:00 PM",
    "Tuesday: 9:00 AM – 4:00 PM",
    "Wednesday: 9:00 AM – 4:00 PM",
    "Thursday: 9:00 AM – 4:00 PM",
    "Friday: 9:00 AM – 4:00 PM",
    "Saturday: Closed",
    "Sunday: Closed"
  ],
  website: "http://pharmsci.ubc.ca/pharmacists-clinic",
};


export default class ResourceListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      phone: "(604) 827-2584",
      schedule:[
        "Monday: 9:00 AM – 4:00 PM",
        "Tuesday: 9:00 AM – 4:00 PM",
        "Wednesday: 9:00 AM – 4:00 PM",
        "Thursday: 9:00 AM – 4:00 PM",
        "Friday: 9:00 AM – 4:00 PM",
        "Saturday: Closed",
        "Sunday: Closed"
      ],
      website: "http://pharmsci.ubc.ca/pharmacists-clinic"
    };

    this.getLabel = this.getLabel.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(isExpanded) {
    // TODO: add api call for details here and set state
    this.setState({ isExpanded: !isExpanded });
  }

  getLabel() {
    const { infoTag } = this.props;

    return {
      VACANCY: <span style={styles.vacancy(infoTag.label)}><p style={styles.label}>{infoTag.label} {infoTag.value}</p></span>
    }[infoTag.type]
  }

  render() {
    const {
      index,
      name,
      icon,
      address,
      openingHours,
      types,
      infoTag
    }  = this.props;

    return (
      <div style={styles.container(index % 2, this.state.isExpanded)} onClick={() => this.handleExpand(this.state.isExpanded)}>
        <div style={styles.innerContainer}>
          <div style={styles.thumbnail}>
            logo goes here
          </div>
          <div style={styles.body}>
            <h3 style={styles.title}>{name}</h3>
            <div style={styles.types}>{
              types.slice(0, 3).map((type, id) => <Chip key={id} text={type}/>)
            }</div>
            <p style={styles.description}>{address}</p>
            <div style={styles.bodyControlBar}>
              {this.getLabel()}
            </div>
          </div>
        </div>

        {this.state.isExpanded && <ResourceListItemDetails index={index} />}
      </div>
    )
  }
}
