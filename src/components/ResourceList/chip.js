import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const MUIstyles = theme => ({
  chip: {
    marginRight: 4,
    border: '1px solid #4b96f1',
    backgroundColor: 'transparent',
    color: '#3d7ac4',
    height: '1.5rem'
  },
});

const NewChip = ({ text, classes }) => (
  <Chip label={text} className={classes.chip} />
);

export default withStyles(MUIstyles)(NewChip);
