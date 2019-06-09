import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import QuestionOutline from "./QuestionOutline.jsx";
import QuestionInput from "./QuestionInput.jsx";
import {MatchLib} from "../../scripts/MatchLib.js"
import {ScoreLib} from "../../scripts/ScoreLib.js"
import { connect } from "react-redux";
import {QuestionHelpers} from "./QuestionHelpers.js";
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
    
  }

});


const CorrectAnswer = props => {

  const { classes} = props;

  return   <div>


      <Paper className={classes.root} elevation={1} className ={classes.answersofar}>

        <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
          The correct options are :
        </Typography>

       {props.children.map((str)=>{
         return <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
           {str}
         </Typography>
       })}
      </Paper>
    </div>

}

const MultiChoiceInput = props => {

  const { classes} = props;

  return   <div>
    MultiChoiceInput
    </div>

}

class MultiChoiceAnswer extends React.Component {

  constructor(props) {
      super(props);
      this.state = { answerInput : ''  };
    }


  onClick = (arg)=>{

    // id: compositeKey,
    // quizInstanceId : instanceId,
    // questionId : questionId,
    // score : score,
    // answer : isCorrect ? [userAnswerKey] : [],
    // wrongAnswer :isCorrect ? [] : [userAnswerKey],

    let userAnswersMapQuizInstance = this.props.userAnswersMapQuizInstance;
    let questionData = this.props.questionData;
    let answerInput = this.state.answerInput.toLowerCase();
    let serverAnswers = this.props.serverAnswers;
    let selectedQuiz = this.props.selectedQuiz.key;
    let setRelatedUserAnswers = this.props.setRelatedUserAnswers;
    let testInstance = this.props.currentTest;
    //user answers does not save the associated question id or test instance
    let userAnswers = this.props.userAnswers;


    //array of answer strings
    let userAnswersArray = ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionData.id,testInstance);

    ScoreLib.GetScoreMultiAnswerByQueestionData(userAnswersArray, questionData, answerInput, serverAnswers,
      (updatedUserAnswers,score, isCorrect)=>{
          ScoreLib.UpdateEnteredAnswerObjs( questionData.id, testInstance, answerInput,
             userAnswers, userAnswersMapQuizInstance,isCorrect,score);
          setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});
          this.setState({
            answerInput : ''
          });
    });

  }

  handleOnChange = (arg)=>{
    this.setState({
      answerInput : event.target.value,
    });
  }

  undo = (arg) =>{
    console.log('undo clicked');
    const { questionData,userAnswersMapQuizInstance ,currentTest,userAnswers} = this.props;
    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTest, userAnswers, userAnswersMapQuizInstance);

    this.props.setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});
  }

  render() {
    const { classes,questionData,userAnswersMapQuizInstance ,currentTest,selectQuizCat,questionVisibility,serverAnswers,selectedQuiz,userAnswers} = this.props;

    let score = '77%';
    //ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

    let result;

    if(!QuestionHelpers.IsAnswerVisible(questionData.id,selectedQuiz.key,selectQuizCat,questionVisibility)){
      let correctAnswer = ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers);

      result = <CorrectAnswer classes ={classes}>{correctAnswer}</CorrectAnswer>
    }
    else {
       result = <div>
                   <MultiChoiceInput onChange={this.handleOnChange} onClick = {this.onClick}  answer = {this.state.answerInput}/>

                </div>
    }

    return (
      <QuestionOutline label = 'Multiple Choice' score = {score} question = {questionData.question}  value = {questionData} undo = {this.undo}>{result}</QuestionOutline>
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
    serverAnswers : state.serverAnswers,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultiChoiceAnswer));
