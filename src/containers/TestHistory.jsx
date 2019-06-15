import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import VisualisationHandler from "./VisualisationHandler.jsx";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import DirectionsIcon from '@material-ui/icons/Directions';
import {ScoreLib} from "../scripts/ScoreLib.js";
import { connect } from "react-redux";




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
  //  width: 320,
    margin :25,
    padding: 10
  },

  questionContent: {
  //  height: 110,
  //  width: 320,
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

  griditem: {

    margin:25
  },
  gridheader: {
    marginTop:5,
    marginLeft:15
  },

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300,
   margin: 0,
   padding: 0
  }
});


function TestHistory(props) {

  const { classes, testList, userAnswersMapQuizInstance} = props;

  let history = ScoreLib.MakeTestHistoryObj(testList,userAnswersMapQuizInstance);

  let historyComponent = history.map((m)=>{
     return <Grid container   >
               <Grid item xs={1} className ={classes.griditem}  >
                 {m.quizName}
               </Grid>
               <Grid item xs={1} className ={classes.griditem}  >
                 {m.quizCat}
               </Grid>
               <Grid item xs={2} className ={classes.griditem} >
                 {m.score}
               </Grid>
               <Grid item xs={2} className ={classes.griditem}  >
                 {m.started}
               </Grid>
               <Grid item xs={2} className ={classes.griditem} >
                 {m.ended}
               </Grid>
             </Grid>
   });

  return (
    <Paper className={classes.answerContainer}>
      <VisualisationHandler></VisualisationHandler>
       <Grid container spacing={16}>
         <Grid item xs={8}  className={classes.toprow} >
         <Typography className={classes.gridheader} >
           Test Results
         </Typography>
         </Grid>
         {historyComponent}
       </Grid>
     </Paper>
  );
}



const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    TestState : state.TestState,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    currentTest : state.currentTest,
    testList : state.testList,
    testActive :state.testActive,
    userAnswersMapQuizInstance: state.userAnswersMapQuizInstance
  };
};

const mapDispatchToProps = dispatch => {

  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestHistory));
