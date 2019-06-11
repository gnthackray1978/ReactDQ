import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

  const { classes, possibleAnswers,onChange} = props;

  return   <div>
    <FormControl component="fieldset" className={classes.formControl}>
       <FormGroup  onChange={onChange}>
         {possibleAnswers.map((str, index)=>{
             return <FormControlLabel key ={index}
                      control={ <Checkbox value={str}/> }
                      label={str}
                    />
           })}
       </FormGroup>
     </FormControl>


    </div>

}

class MultiChoiceAnswer extends React.Component {

  constructor(props) {
      super(props);
      this.state = { options : []  };
    }


    inputChanged =(arg)=>{



      //
      let answerInput = arg.target.value.toLowerCase();
      let serverAnswers = this.props.serverAnswers;
      let selectedQuiz = this.props.selectedQuiz.key;
      let setRelatedUserAnswers = this.props.setRelatedUserAnswers;
      let userAnswers = this.props.userAnswers;
      let userAnswersMapQuizInstance = this.props.userAnswersMapQuizInstance;
      let currentTestId = this.props.currentTest;
      let questionData = this.props.questionData;

      let newState = this.state.options;
      if(newState.includes(answerInput)){
        newState = newState.filter(f=>f != answerInput);
      }
      else{
        newState.push(answerInput);
      }

      this.setState( { options : newState  });

      // // so that if the user changes their mind and enters the wrong answer then their score goes down.
      ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTestId, userAnswers, userAnswersMapQuizInstance);

      let result = ScoreLib.GetScoreForMultiChoice(questionData,serverAnswers,newState);

       ScoreLib.UpdateEnteredAnswerObjs(questionData.id, currentTestId, result.answer, userAnswers, userAnswersMapQuizInstance,result.isCorrect, result.score);

       setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

    };


  undo = (arg) =>{
    console.log('undo clicked');
    const { questionData,userAnswersMapQuizInstance ,currentTest,userAnswers} = this.props;
    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTest, userAnswers, userAnswersMapQuizInstance);

    this.props.setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});
  }

  render() {
    const { classes,questionData,userAnswersMapQuizInstance ,currentTest,selectQuizCat,questionVisibility,serverAnswers,selectedQuiz,userAnswers} = this.props;

    let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

    let result;

    if(!QuestionHelpers.IsAnswerVisible(questionData.id,selectedQuiz.key,selectQuizCat,questionVisibility)){
      let correctAnswer = ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers);

      result = <CorrectAnswer classes ={classes}>{correctAnswer}</CorrectAnswer>
    }
    else {

       let possibleAnswers = ScoreLib.GetPossibleAnswersForQuestion(questionData, serverAnswers);

       result = <div>
                   <MultiChoiceInput  classes ={classes} onChange={this.inputChanged} possibleAnswers = {possibleAnswers}/>
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
