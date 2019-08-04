import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import QuestionOutline from "./QuestionOutline.jsx";

import QuestionBooleanInput from "./QuestionBooleanInput.jsx";
import CorrectAnswer from "./CorrectAnswer.jsx";
import {ScoreLib} from "../../scripts/ScoreLib.js"
import {getCurrentQuestionVisibility} from "./QuestionHelpers.js"

import { connect } from "react-redux";

import {setUserAnswers, resetUserAnswers} from "../../store/actions/dbActions.jsx";


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

  render() {
  //  console.log('boolean answer rendered');

    const {questionData,userAnswersMapQuizInstance, currentTest,selectQuizCat,
      questionVisibility,serverAnswers,selectedQuiz, resetUserAnswers,setUserAnswers} = this.props;

    let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

    let result;

    const undo = () =>{
      resetUserAnswers(this.props.questionData.id);
    };

    const inputChanged =(arg)=>{
      setUserAnswers(arg.target.value.toLowerCase(),this.props.questionData);
    };
//questionVisibility,questionData.id,selectedQuiz.key,selectQuizCat
    if(!getCurrentQuestionVisibility(questionVisibility,questionData.id,selectedQuiz.key,selectQuizCat)){
      result = <CorrectAnswer>{ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers)}</CorrectAnswer>
    }
    else {
       //formally there was a onclick event if things dont work unexpectedly
       //removing this could be the cause
       result = <QuestionBooleanInput onChange={inputChanged} />
    }

    return (
        <QuestionOutline label = "Boolean Answer" score = {score} question = {questionData.question}  value = {questionData}  undo = {undo}>
            {result}
        </QuestionOutline>
    );
  }
}

BooleanAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  userAnswers : PropTypes.object,
  setRelatedUserAnswers : PropTypes.func,
  questionData : PropTypes.object,
  serverAnswers : PropTypes.object,
  selectQuizCat : PropTypes.string,
  selectedQuiz : PropTypes.object,
  currentTest: PropTypes.string,
  userAnswersMapQuizInstance: PropTypes.object,
  questionVisibility: PropTypes.object,
  currentQuestionVisible : PropTypes.bool,
  resetUserAnswers : PropTypes.func,
  setUserAnswers : PropTypes.func
};


const mapStateToProps = state => {
  return {

    quizMetaData : state.db.quizMetaData,
    catSelection : state.applicationState.catSelection,
    selectQuizCat : state.applicationState.selectQuizCat,
    selectedQuiz : state.applicationState.selectedQuiz,
    questionVisibility :state.applicationState.questionVisibility,
    serverAnswers : state.db.serverAnswers,
    userAnswers : state.db.userAnswers,
    userAnswersMapQuizInstance: state.db.userAnswersMapQuizInstance,
    currentTest :state.db.currentTest
  };
};

const mapDispatchToProps = dispatch => {

  return {

    setUserAnswers :(answerInput,questionData) =>{
      dispatch(setUserAnswers(answerInput,questionData))
    },
    resetUserAnswers :questionId =>{
      dispatch(resetUserAnswers(questionId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooleanAnswer));
