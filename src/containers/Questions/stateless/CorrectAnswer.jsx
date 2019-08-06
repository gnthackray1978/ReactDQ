import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';


const styles = () => ({
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
     return   <Typography variant="h6" className ={classes.black}  key = {index}>
         {string}
       </Typography>
   }
   else {
       return   <Typography variant="h6"  className ={classes.red}  key = {index} >
           {string}
         </Typography>
     }
  };


  return(
    <div>
      <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {props.children.map((string,index) => (
                              formatString(classes,String(string),index)
                            ))}
                       </Typography>
    </div>
  );

}


export default withStyles(styles)(CorrectAnswer);
