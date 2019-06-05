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
    height:70
  }

});






class MultiAnswer extends React.Component {

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
    let correctAnswers = this.props.correctAnswers;
    let selectedQuiz = this.props.selectedQuiz.key;
    let setRelatedUserAnswers = this.props.setRelatedUserAnswers;
    let testInstance = this.props.currentTest;
    //user answers does not save the associated question id or test instance
    let userAnswers = this.props.userAnswers;


    //array of answer strings
    let userAnswersArray = ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionData.id,testInstance);

    ScoreLib.GetScoreMultiAnswerByQueestionData(userAnswersArray, questionData, answerInput, correctAnswers,
      (updatedUserAnswers,score, isCorrect)=>{
          ScoreLib.UpdateEnteredAnswerObjs( questionData.id, testInstance, answerInput,
             userAnswers, userAnswersMapQuizInstance,isCorrect,score);
          setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

    });



    //
    // MatchLib.Match(this.state.answers,this.state.answerInput, 2, (correctAnswers,remainingAnswers)=>{
    //   console.log(correctAnswers.length + ' ' + remainingAnswers.length);
    // });

  }


 formatString(classes, string,index){
   if(index !=0) string = ',' + string;

   if(index % 2 ==0){
     return   <Typography variant="h6" className ={classes.black}  >
         {string}
       </Typography>
   }
   else {
       return   <Typography variant="h6"  className ={classes.red}  >
           {string}
         </Typography>
     }
 }

  answersSoFar(classes){
    let userAnswersMapQuizInstance = this.props.userAnswersMapQuizInstance;
    let questionData = this.props.questionData;
    let testInstance = this.props.currentTest;
    let tpAnswerSoFar = ScoreLib.GetUserAnswersForQuestion(this.props.userAnswers, userAnswersMapQuizInstance,questionData.id,testInstance);

    return   <div>
        <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
          Answer so far
        </Typography>

        <Paper className={classes.root} elevation={1} className ={classes.answersofar}>
          {tpAnswerSoFar.map((string,index) => (
               this.formatString(classes,string,index)
             ))}
        </Paper>
      </div>

  }

  makeCorrectAnswersBlock(classes){
    let correctAnswersArray = ScoreLib.GetCorrectAnswersForQuestion(this.props.questionData, this.props.correctAnswers);

    let tpAnswer = correctAnswersArray.map((string,index) => (
         this.formatString(classes,string,index)
       ));

    let answerBlock = <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                        {tpAnswer}
                      </Typography>

    return  answerBlock;
  }

  isQuestionVisible (){

    let questionKey = this.props.questionData.id + '-' + this.props.selectedQuiz.key + '-'+ this.props.selectQuizCat;

    let answerVisible = true;

    if(this.props.questionVisibility.hasOwnProperty(questionKey)){
       answerVisible = this.props.questionVisibility[questionKey].visible
    }

    return answerVisible;
  }

  render() {
    const { classes,questionData,quizMetaData } = this.props;

    const handleOnChange = event => {
        this.setState({
          answerInput : event.target.value,
        });
      };

    let result;

    if(!this.isQuestionVisible()){
      result = this.makeCorrectAnswersBlock(classes);
    }
    else {
       result = <div>
                   <QuestionInput onChange={handleOnChange} onClick = {this.onClick}  answer = {this.state.answerInput}/>
                   {this.answersSoFar(classes)}
                </div>
    }

    return (
      <QuestionOutline label = 'Multi Answer' score = '90%' question = {questionData.question}  value = {questionData}>{result}</QuestionOutline>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultiAnswer));
