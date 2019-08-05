import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import QuestionOutline from "./QuestionOutline.jsx";
import QuestionInput from "./stateless/QuestionInput.jsx";
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
    height:70
  }
});



class SingleAnswer extends React.Component {


    constructor(props) {
        super(props);
        this.state = { answerInput : ''  };
      }

    render() {
      const { classes,questionData ,resetUserAnswers,setUserAnswers,isVisible,score,correctAnswers} = this.props;

      const onClick =(arg)=>{
          setUserAnswers(arg.target.value.toLowerCase(),this.props.questionData);
        };

      const handleOnChange = event => {
        this.setState({
          answerInput : event.target.value,
        });
      };


      let result;

      if(!isVisible){
        result = <CorrectAnswer>{correctAnswers}</CorrectAnswer>
      }
      else {
         result = (<div>
             <QuestionInput onChange={handleOnChange} onClick = {onClick} answer = {this.state.answerInput}/>
         </div>)
      }

      return (
          <QuestionOutline label = "Single Answer" score = {score} question = {questionData.question}  value = {questionData} undo = {()=>{

            resetUserAnswers(questionData.id);

            this.setState({
              answerInput : ''
            });

        }}>
              {result}
          </QuestionOutline>
      );
    }
}

SingleAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  userAnswers : PropTypes.object,
  questionData : PropTypes.object,
  serverAnswers : PropTypes.object,
  selectQuizCat : PropTypes.string,
  selectedQuiz : PropTypes.object,
  currentTest: PropTypes.string,
  userAnswersMapQuizInstance: PropTypes.object,
  questionVisibility: PropTypes.object,
  currentQuestionVisible : PropTypes.bool,
  resetUserAnswers : PropTypes.func,
  setUserAnswers : PropTypes.func,
};



const mapStateToProps = (state, ownProps) => {

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SingleAnswer));
