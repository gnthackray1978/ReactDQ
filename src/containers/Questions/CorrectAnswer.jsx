import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import QuestionFooter from "./QuestionFooter.jsx";
import QuestionOutline from "./QuestionOutline.jsx";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import DirectionsIcon from '@material-ui/icons/Directions';

import {ScoreLib} from "../../scripts/ScoreLib.js"



const styles = theme => ({
  red: {
    color: 'red',
    display: 'contents'
  },
  black: {
    color: 'black',
    display: 'contents'
  },
  tolowerBtn : {
    textTransform: 'none'
  }
});


function CorrectAnswer(props) {

    const { classes} = props;

  const formatString = (classes, string,index) => {
   if(index !=0) string = ',' + string;

   if(index % 2 ==0){
     return   <Typography variant="h6" className ={classes.black}  >
         {string}
       </Typography>
   }
   else {
       return   <Typography variant="h6"  className ={classes.red}  >
           {string}
         </Typography>
     }
  };


  return(
    <di>
      <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {props.children.map((string,index) => (
                              formatString(classes,String(string),index)
                            ))}
                       </Typography>
    </di>
  );

}


export default withStyles(styles)(CorrectAnswer);
