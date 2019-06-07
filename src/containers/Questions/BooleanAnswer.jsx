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

import QuestionBooleanInput from "./QuestionBooleanInput.jsx";
import CorrectAnswer from "./CorrectAnswer.jsx";
import {MatchLib} from "../../scripts/MatchLib.js"
import {ScoreLib} from "../../scripts/ScoreLib.js"
import {QuestionHelpers} from "./QuestionHelpers.js"

import { connect } from "react-redux";

import { setQuizMetaData,setCatSelection,setQuizName,setQuizCat,setQuestionVisibility, setRelatedUserAnswers} from "../../actions/creators.jsx";


const styles = theme => ({
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

  answersofarlabel: {
    marginTop :5,
    height:30
  },
  answersofar: {
    marginTop :5,
    height:70
  }
});


class BooleanAnswer extends React.Component {

  constructor(props) {
    super(props);

  }

  inputChanged =(arg)=>{
    console.log('input changed');



    let answerInput = arg.target.value.toLowerCase();
    let solution = this.props.correctAnswers;
    let selectedQuiz = this.props.selectedQuiz.key;
    let setRelatedUserAnswers = this.props.setRelatedUserAnswers;
    let userAnswers = this.props.userAnswers;
    let userAnswersMapQuizInstance = this.props.userAnswersMapQuizInstance;
    let currentTestId = this.props.currentTest;
    let questionData = this.props.questionData;

    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTestId, userAnswers, userAnswersMapQuizInstance);

    let userAnswersArray = ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionData.id,currentTestId);

    ScoreLib.GetScoreMultiAnswerByQueestionData(userAnswersArray, questionData, answerInput, solution,
      (updatedUserAnswers,score, isCorrect)=>{

          ScoreLib.UpdateEnteredAnswerObjs(questionData.id, currentTestId, answerInput, userAnswers, userAnswersMapQuizInstance,isCorrect,score);

          setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

    });


  };

  undo = () =>{

    const { questionData,userAnswersMapQuizInstance, currentTest,userAnswers} = this.props;

    console.log('undo clicked');
    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTest, userAnswers, userAnswersMapQuizInstance);

    this.props.setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

  };


  render() {
    console.log('boolean answer rendered');

    const { classes,questionData,userAnswersMapQuizInstance, currentTest,selectQuizCat,questionVisibility,correctAnswers,selectedQuiz} = this.props;

    let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

    let result;

    if(!QuestionHelpers.IsAnswerVisible(questionData.id,selectedQuiz.key,selectQuizCat,questionVisibility)){
      result = <CorrectAnswer>{ScoreLib.GetCorrectAnswersForQuestion(questionData, correctAnswers)}</CorrectAnswer>
    }
    else {
       result = <QuestionBooleanInput onChange={this.inputChanged} onClick = {this.onClick} />
    }

    return (
      <QuestionOutline label = 'Boolean Answer' score = {score} question = {questionData.question}  value = {questionData}  undo = { this.undo}>
        {result}
      </QuestionOutline>
    );
  }
}


const mapStateToProps = state => {
  return {

    quizMetaData : state.quizMetaData,
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    questionVisibility :state.questionVisibility,
    correctAnswers : state.correctAnswers,
    userAnswers : state.userAnswers,
    userAnswersMapQuizInstance: state.userAnswersMapQuizInstance,
    currentTest :state.currentTest
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :data =>{
      dispatch(setQuestionVisibility(data))
    },
    setRelatedUserAnswers :data =>{
      dispatch(setRelatedUserAnswers(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooleanAnswer));
