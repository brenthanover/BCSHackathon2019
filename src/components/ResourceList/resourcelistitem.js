import React from 'react';
import ResourceListItemDetails from './resourcelistitemdetails';
import Chip from './chip';
import {MapsRequestHandler} from '../Maps/maps';

const LIST_BLUE = '#eceef9';
const LIST_WHITE = '#FFFFFF';

const styles = {
  container: (isOdd, isExpanded) => ({
    display: 'flex',
    flexFlow: 'column',
    flex: 'none',
    width: '100%',
    // height: ''
    minHeight: isExpanded ? '20rem' : 'auto',
    backgroundColor: isOdd ? LIST_BLUE : LIST_WHITE,
    transition: 'all 0.05s ease-in-out'
  }),
  thumbnail: {
    width: '8rem',
    height: '100%',
    paddingTop: '1rem',
    textAlign: 'center',
  },

  innerContainer: {
    display: 'flex',
    flex: 'none',
    width: '100%',
    height: 'min-content',
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

  distance: {
    fontSize: '10pt',
    fontStyle: 'italic',
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

    this.formatData = this.formatData.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleIndividualPlaceClick = this.handleIndividualPlaceClick.bind(this);
  }

  async handleIndividualPlaceClick(isExpanded) {
    // TODO: here, we should call handleGetPlaceDetails() with a proper placeId from our getPlacesQuery.
    const { place_id } = this.props;
    let queryResponse = await MapsRequestHandler.handleGetPlaceDetails(place_id);
    console.log("Response: " + queryResponse);
    this.setState({ data: this.formatData(JSON.parse(queryResponse).data) });
    this.setState({ isExpanded: !isExpanded });
    return queryResponse;
  }

  /**
   * Formats data from queryNearbyResources() to a more flattened structure
   * ASSUME: data is from a successful response
   * @param data
   * @returns {*}
   */
  formatData(data) {
    console.log('data is ', data);
    let resultObj = {
      isExpanded: true,
      phone: data.result.formatted_phone_number,
      schedule: data.result.opening_hours ? data.result.opening_hours.weekday_text : 'Hours unavailable',
      website: data.result.website
    };
    return resultObj
  }

  handleExpand(isExpanded) {
    // TODO: add api call for details here and set state
    this.handleIndividualPlaceClick(isExpanded);
      // .then(() => this.setState({ isExpanded: !isExpanded }))
      // .catch(() => this.setState({ isExpanded: false }));
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
      infoTag,
      distanceTo
    }  = this.props;

    return (
      <div style={styles.container(index % 2, this.state.isExpanded)} onClick={() => this.handleExpand(this.state.isExpanded)}>
        <div style={styles.innerContainer}>
          <div style={styles.thumbnail}>
            <img src={icon} alt={"icon"}/>
            <p style={styles.distance}>{distanceTo.toFixed(2)} km</p>
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

        {this.state.isExpanded && <ResourceListItemDetails
          schedule={this.state.schedule}
          phone={this.state.phone}
          website={this.state.website}
          index={index} />}
      </div>
    )
  }
}
