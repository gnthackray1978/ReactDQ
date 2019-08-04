import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = () => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 300,
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
  answersofar: {
    marginTop :5,

  }

});

const MultiChoiceInput = props => {

  const { classes, possibleAnswers,onChange} = props;

  return  (<div>
      <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup  onChange={onChange}>
              {possibleAnswers.map((str, index)=>{
                 return (<FormControlLabel key ={index}
                     control={<Checkbox value={str}/>}
                     label={str}
                         />)
               })}
          </FormGroup>
      </FormControl>

  </div>)

}

MultiChoiceInput.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes : PropTypes.object,
  answer : PropTypes.string,
  possibleAnswers : PropTypes.array,
};



export default withStyles(styles)(MultiChoiceInput);
