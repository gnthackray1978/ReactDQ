import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import QuestionOutline from "./QuestionOutline.jsx";
import {ScoreLib} from "../../scripts/ScoreLib.js"
import { connect } from "react-redux";
import {getCurrentQuestionVisibility} from "./QuestionHelpers.js";

import {setUserAnswersMultiChoice, resetUserAnswers} from "../../store/actions/dbActions.jsx";


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

  render() {
//    console.log('rendered multi answer');

    const { classes,questionData,userAnswersMapQuizInstance ,currentTest,selectQuizCat,
          questionVisibility,serverAnswers,selectedQuiz,resetUserAnswers} = this.props;

    let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionData.id,currentTest) + '%';

    let result;

    const undo = () =>{
      resetUserAnswers(questionData.id);
    };

    const inputChanged =(arg)=>{
      let answerInput = arg.target.value.toLowerCase();

      let newState = this.state.options;

      if(newState.includes(answerInput)){
        newState = newState.filter(f=>f != answerInput);
      }
      else{
        newState.push(answerInput);
      }

      this.setState( { options : newState  });

      setUserAnswersMultiChoice(newState,questionData);
    };

    //console.log('checked visibility');
    if(!getCurrentQuestionVisibility(questionVisibility,questionData.id,selectedQuiz.key,selectQuizCat)){
      let correctAnswer = ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers);

      result = <CorrectAnswer classes ={classes}>{correctAnswer}</CorrectAnswer>
    }
    else {

       let possibleAnswers = ScoreLib.GetPossibleAnswersForQuestion(questionData, serverAnswers);

       result = (<div>
           <MultiChoiceInput  classes ={classes} onChange={inputChanged} possibleAnswers = {possibleAnswers}/>
       </div>)
    }

    return (
      <QuestionOutline label = 'Multiple Choice' score = {score} question = {questionData.question}  value = {questionData} undo = {undo}>{result}</QuestionOutline>
    );
  }
}


const mapStateToProps = state => {
//  console.log('mapStateToProps');
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
    setUserAnswersMultiChoice :(optionState,questionData) =>{
      dispatch(setUserAnswersMultiChoice(optionState,questionData))
    },
    resetUserAnswers :questionId =>{
      dispatch(resetUserAnswers(questionId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultiChoiceAnswer));
