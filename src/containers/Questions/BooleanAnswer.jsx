import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import QuestionOutline from "./QuestionOutline.jsx";
import QuestionBooleanInput from "./stateless/QuestionBooleanInput.jsx";
import CorrectAnswer from "./stateless/CorrectAnswer.jsx";
import { connect } from "react-redux";
import {setUserAnswers, resetUserAnswers} from "../../store/actions/dbActions.jsx";
import {getScore,isQuestionVisible, GetCorrectAnswersForQuestion,GetUserAnswersForQuestion} from "../../store/selectors/uxSelectors.jsx";


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
    const {questionData,resetUserAnswers,setUserAnswers,score, isVisible, correctAnswers} = this.props;

    let result;

    const undo = () =>{
      resetUserAnswers(this.props.questionData.id);
    };

    const inputChanged =(arg)=>{
      setUserAnswers(arg.target.value.toLowerCase(),this.props.questionData);
    };

    if(!isVisible){
      result = <CorrectAnswer>{correctAnswers}</CorrectAnswer>
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
  questionData : PropTypes.object,
  resetUserAnswers : PropTypes.func,
  setUserAnswers : PropTypes.func,
  score : PropTypes.string,
  correctAnswers: PropTypes.object,
  isVisible : PropTypes.bool
};


const mapStateToProps =  (state, ownProps)  => {

  const {questionData} = ownProps;

  let tp = getScore(questionData.id, state);

  let correctAnswers  = GetCorrectAnswersForQuestion(questionData,state);

  let userAnswersForQuestion = GetUserAnswersForQuestion(questionData.id, state);

  let isVisible = isQuestionVisible(questionData.id, state);

  return {
    userAnswersForQuestion,
    correctAnswers ,
    isVisible : isVisible,
    score : tp,
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
