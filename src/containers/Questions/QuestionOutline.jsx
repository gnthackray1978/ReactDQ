import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import QuestionFooter from "./QuestionFooter.jsx";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import DirectionsIcon from '@material-ui/icons/Directions';
import { connect } from "react-redux";

import {setQuestionVisibility} from "../../actions/creators.jsx";



const styles = theme => ({
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

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300,
   margin: 0,
   padding: 0
  }
});


function QuestionOutline(props) {

  const { classes, selectedQuiz, selectQuizCat, value, questionVisibility} = props;

  const handleInput = (e) => {
    console.log(e);
    // record in the store question id
    // and whether or not it's visible.

    if(selectedQuiz)
      console.log(e + ' clicked: ' + selectedQuiz.key + ' ' + selectQuizCat + ' ' + value.id);

    let questionKey = value.id + '-' + selectedQuiz.key + '-'+selectQuizCat;

    if(!questionVisibility.hasOwnProperty(questionKey)){
      questionVisibility[questionKey] = {
        visible : false
      };
    }
    else{
      questionVisibility[questionKey].visible = !questionVisibility[questionKey].visible;
    }


    props.setQuestionVisibility(questionVisibility);

  }

  return (
    <Paper className={classes.answerContainer}>
       <Grid container spacing={16}>
         <Grid item xs={8}  className={classes.toprow} >
         {props.label}
         </Grid>
         <Grid item xs={2}  className={classes.toprow} >
         {props.score}
         </Grid>
         <Grid item xs={2}  className={classes.toprow} >
           <IconButton className={classes.button}  onClick = {handleInput}> <Icon>visibility</Icon> </IconButton>
         </Grid>

         <Grid item xs={12} className ={classes.questionrow}>{props.question}</Grid>



         <Grid item xs={12} className={classes.questionContent} >
           {props.children}
         </Grid>


       </Grid>
     </Paper>
  );
}



const mapStateToProps = state => {
  return {

    quizMetaData : state.quizMetaData,
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    questionVisibility :state.questionVisibility,
    answerData : state.answerData
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :data =>{
      dispatch(setQuestionVisibility(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuestionOutline));
