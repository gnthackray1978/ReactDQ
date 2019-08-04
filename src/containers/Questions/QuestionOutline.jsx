import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

import {setQuestionVisibility} from "../../store/actions/appStateActions.jsx";



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

    marginLeft : 0,
    marginRight : 0,
    top: -11
  },

  toprow: {

    height:35
  },
  label:{
    verticalAlign: 'top',
      marginRight : 10
  },
  score:{
    textAlign: 'end'
  },
  questionrow: {

    height:55
  },

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300,
   margin: 0,
   padding: 0
  }
});


function QuestionOutline(props) {

  const { classes, value, undo, setQuestionVisibility} = props;

  const handleInput = () => {
  //  console.log('setting visibility: ' + value.id) ;
    setQuestionVisibility(value.id);
  }

  return (
      <Paper className={classes.answerContainer}>
          <Grid container spacing={16}>
              <Grid item xs={9}  className={classes.toprow} >
                  <span className={classes.label} >{props.label}</span>
                  <IconButton className={classes.button}  onClick = {undo}> <Icon>replay</Icon> </IconButton>
                  <IconButton className={classes.button}  onClick = {handleInput}> <Icon>visibility</Icon> </IconButton>
              </Grid>

              <Grid item xs={3}  className={classes.score} >
                  {props.score}
              </Grid>
              <Grid item xs={12} className ={classes.questionrow}>{props.question}</Grid>

              <Grid item xs={12} className={classes.questionContent} >
                  {props.children}
              </Grid>
          </Grid>
      </Paper>
  );
}

QuestionOutline.propTypes = {
  classes: PropTypes.object.isRequired,
  value : PropTypes.object,
  setQuestionVisibility : PropTypes.func,
  undo : PropTypes.func,
  score  : PropTypes.string,
  question  : PropTypes.string,
  label  : PropTypes.string,
  children  : PropTypes.object,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :(id) =>{
      dispatch(setQuestionVisibility(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuestionOutline));
