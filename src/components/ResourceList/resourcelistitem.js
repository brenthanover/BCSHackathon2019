import React from 'react';
import ResourceListItemDetails from './resourcelistitemdetails';

const styles = {
  container: (isExpanded) => ({
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: 'min-content',
    border: '1px solid blue'
  }),
  thumbnail: {
    width: '8rem',
    height: '100%',
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
  },
  title: {

  },
  description: {

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
  })
};


export default class ResourceListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };

    this.getLabel = this.getLabel.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(isExpanded) {
    this.setState({ isExpanded: !isExpanded });
  }

  getLabel() {
    const { infoTag } = this.props;

    return {
      VACANCY: <span style={styles.vacancy(infoTag.label)}><p>{infoTag.label} {infoTag.value}</p></span>
    }[infoTag.type]
  }

  render() {
    const { title, description }  = this.props;

    return (
      <div style={styles.container(this.state.isExpanded)}>
        <div style={styles.innerContainer}>
          <div style={styles.thumbnail}>
            logo goes here
          </div>
          <div style={styles.body}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.description}>{description}</p>

            <div style={styles.bodyControlBar}>
              {this.getLabel()}
              <button onClick={() => this.handleExpand(this.state.isExpanded)}>See More</button>
            </div>
          </div>
        </div>

        {this.state.isExpanded && <ResourceListItemDetails />}
      </div>
    )
  }
}
