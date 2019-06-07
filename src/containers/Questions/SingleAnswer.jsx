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



class SingleAnswer extends React.Component {


    constructor(props) {
        super(props);
        this.state = { answerInput : ''  };
      }


    onClick = (arg)=>{
      //console.log('current test is : ' + this.props.currentTest + ' - test name: ' + this.props.selectedQuiz.key + ' ' + this.props.selectedQuiz.quiz);



      let answerInput = this.state.answerInput.toLowerCase();
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
      console.log('single answer rendered');

      const { classes,questionData,quizMetaData ,userAnswersMapQuizInstance, currentTest,userAnswers} = this.props;

      let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

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
                     <QuestionInput onChange={handleOnChange} onClick = {this.onClick} answer = {this.state.answerInput}/>
                  </div>
      }

      return (
        <QuestionOutline label = 'Single Answer' score = {score} question = {questionData.question}  value = {questionData} undo = {()=>{
            console.log('undo clicked');
            // so that if the user changes their mind and enters the wrong answer then their score goes down.
            ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTest, userAnswers, userAnswersMapQuizInstance);

            this.props.setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

            this.setState({
              answerInput : ''
            });
          }}>{result}</QuestionOutline>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SingleAnswer));
