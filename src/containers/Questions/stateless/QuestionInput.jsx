import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import InputBase from '@material-ui/core/InputBase';
import DirectionsIcon from '@material-ui/icons/Directions';


const styles = () => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 300,
   },
   input: {
     marginLeft: 8,
     flex: 1,
   },
   iconButton: {
     padding: 10,
   },

  answerContainer: {
    width: 320,
    margin :5,
    padding: 10
  },

  questionContent: {
  //  height: 110,
    width: 320,
    margin: 0,
    padding: 0

  },

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 320
  },

  button: {
    margin :0,
    top: -11
  },

  toprow: {

    height:35
  },

  questionrow: {

    height:55
  },

  red: {
    color: 'red',
    display: 'contents'
  },
  black: {
    color: 'black',
    display: 'contents'
  },

  answersofarlabel: {
    marginTop :5,
    height:30
  },
  answersofar: {
    marginTop :5,
    height:70
  },

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300,
   margin: 0,
   padding: 0
  }
});


const QuestionInput = props =>
  (<Paper className={props.classes.root} elevation={1}>
      <InputBase className={props.classes.input} placeholder="Answer here"  onChange={props.onChange} value ={props.answer}/>

      <IconButton color="primary" className={props.classes.iconButton} aria-label="Directions" onClick = {props.onClick}>
          <DirectionsIcon/>
      </IconButton>
  </Paper>);

QuestionInput.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes : PropTypes.object,
  answer : PropTypes.string
};

export default withStyles(styles)(QuestionInput);
