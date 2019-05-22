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
import { connect } from "react-redux";

import { setQuizMetaData,setCatSelection,setQuizName,setQuizCat,setQuestionVisibility} from "../../actions/creators.jsx";



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



class SingleAnswer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes,value,questionVisibility,quizMetaData,selectQuizCat,selectedQuiz,correctAnswers } = this.props;

    let questionKey = value.id + '-' + selectedQuiz.key + '-'+selectQuizCat;

    let answerVisible = false;

    if(questionVisibility.hasOwnProperty(questionKey)){
       answerVisible =questionVisibility[questionKey].visible
    }

    let experiment =  <Paper className={classes.root} elevation={1}>
                        <InputBase className={classes.input} placeholder="Answer here" />

                        <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                          <DirectionsIcon />
                        </IconButton>
                      </Paper>


    let tpAnswer = correctAnswers[value.correctAnswers[0]].answer;
    let answerBlock = <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {tpAnswer}
                       </Typography>

    let result;

    if(!answerVisible) result = experiment;
    if(answerVisible) result = answerBlock;

    return (
      <QuestionOutline label = 'Single Text Answer' score = '90%' question = {value.question}  value = {value}>{result}</QuestionOutline>
    );
  }
}

// <Grid item xs={12}>
//   <QuestionFooter  buttonClicked = { this.handleInput }/>
// </Grid>


const mapStateToProps = state => {
  return {

    quizMetaData : state.quizMetaData,
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    questionVisibility :state.questionVisibility,
    correctAnswers : state.correctAnswers
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :data =>{
      dispatch(setQuestionVisibility(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SingleAnswer));
