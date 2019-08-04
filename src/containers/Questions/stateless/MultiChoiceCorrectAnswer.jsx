import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 300,
     marginTop :5
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

});

const MultiChoiceCorrectAnswer = props => {

  const { classes} = props;

  return   (<div>
      <Paper className={classes.root} elevation={1} >
          <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
            The correct options are :
          </Typography>
          {props.children.map((str, index)=>{
             return (<Typography variant="h6" color="inherit" key ={index} className ={classes.answersofarlabel}>
                 {str}
             </Typography>)
           })}
      </Paper>
  </div>)

}

MultiChoiceCorrectAnswer.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes : PropTypes.object,
  answer : PropTypes.string,
  children : PropTypes.array,
};



export default withStyles(styles)(MultiChoiceCorrectAnswer);
