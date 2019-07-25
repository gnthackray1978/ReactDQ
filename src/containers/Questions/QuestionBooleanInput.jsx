import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { connect } from "react-redux";


const styles = theme => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 301,
     height :48
   },
   rg: {
     marginLeft: 8,
     marginTop: 8,
   },




});


const QuestionBooleanInput = props =>
<div>
<Paper className={props.classes.root} elevation={1}>
        <FormControl component="fieldset">
        <RadioGroup aria-label="position" name="position" onChange={props.onChange} row  className ={props.classes.rg}>
          <FormControlLabel
            value="true"
            control={<Radio color="primary" />}
            label="True"
            labelPlacement="end"
          />
          <FormControlLabel
            value="false"
            control={<Radio color="primary" />}
            label="False"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>

  </Paper></div>;


export default withStyles(styles)(QuestionBooleanInput);
