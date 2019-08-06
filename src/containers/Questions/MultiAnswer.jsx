import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import QuestionOutline from "./QuestionOutline.jsx";
import QuestionInput from "./stateless/QuestionInput.jsx";
import { connect } from "react-redux";
import CorrectAnswer from "./stateless/CorrectAnswer.jsx";
import {setUserAnswersForMultiAnswer, resetUserAnswers} from "../../store/actions/dbActions.jsx";
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

const FormattedString = props => {

  const { classes,index,string} = props;

  let formattedString = string;
  if(index !=0) formattedString = ',' + formattedString;

  if(index % 2 ==0){
    return   (<Typography variant="h6" className ={classes.black}  >
        {formattedString}
    </Typography>)
  }
  else {
      return(<Typography variant="h6"  className ={classes.red}  >
          {formattedString}
      </Typography>)
    }
}

const AnswerSoFar = props => {

  const { classes,AnswerSoFar} = props;

  return(<div>
      <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
        Answer so far
      </Typography>

      <Paper className={classes.root} elevation={1} className ={classes.answersofar}>
          {AnswerSoFar.map((string,index) => (
               <FormattedString key = {index} classes = {classes} string = {string} index ={index}/>
             ))}
      </Paper>
  </div>)

}


class MultiAnswer extends React.Component {

  constructor(props) {
      super(props);
      this.state = { answerInput : ''  };
  }

  render() {

    const { classes,questionData,resetUserAnswers,setUserAnswersForMultiAnswer, score, isVisible, correctAnswers, userAnswersForQuestion} = this.props;

    const undo = () =>{
      resetUserAnswers(questionData.id);
    };

    const onClick =()=>{
      setUserAnswersForMultiAnswer(this.state.answerInput.toLowerCase(),questionData);
      this.setState({
        answerInput : ''
      });
    };

    const handleOnChange = (event)=>{
      this.setState({
        answerInput : event.target.value,
      });
    }

    let result;

    if(!isVisible){
      result = <CorrectAnswer>{correctAnswers}</CorrectAnswer>
    }
    else {
       result = (<div>
           <QuestionInput onChange={handleOnChange} onClick = {onClick}  answer = {this.state.answerInput}/>
           <AnswerSoFar classes = {classes} AnswerSoFar ={userAnswersForQuestion}/>
       </div>)
    }

    return (
        <QuestionOutline label = "Multi Answer" score = {score} question = {questionData.question}  value = {questionData} undo = {undo}>{result}</QuestionOutline>
    );
  }
}

MultiAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  userAnswers : PropTypes.object,
  setRelatedUserAnswers : PropTypes.func,
  questionData : PropTypes.object,
  userAnswersForQuestion : PropTypes.array,
  score : PropTypes.string,
  correctAnswers: PropTypes.array,
  isVisible : PropTypes.bool,
  resetUserAnswers : PropTypes.func,
  setUserAnswersForMultiAnswer : PropTypes.func
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

    setUserAnswersForMultiAnswer :(answerInput,questionData) =>{
      dispatch(setUserAnswersForMultiAnswer(answerInput,questionData))
    },
    resetUserAnswers :questionId =>{
      dispatch(resetUserAnswers(questionId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultiAnswer));
