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


   componentWillMount() {
     // let correctAnswers = this.props.correctAnswers;
     // let answerArray = this.props.questionData.correctAnswers.map((id)=>{
     //   return correctAnswers[id].answer;
     // });
     //
     // this.setState({
     //   answers : answerArray,
     // });

    // console.log(' answer array now:  '+ this.state.answers.length);
   }

  onClick = (arg)=>{

    let userAnswersMapQuizInstance = this.props.userAnswersMapQuizInstance;
    let questionData = this.props.questionData;
    let answerInput = this.state.answerInput.toLowerCase();
    let correctAnswers = this.props.correctAnswers;
    let selectedQuiz = this.props.selectedQuiz.key;
    let setRelatedUserAnswers = this.props.setRelatedUserAnswers;
    let userAnswers = this.props.userAnswers;
    let userAnswersArray = ScoreLib.GetUserAnswersForQuestion(userAnswers, correctAnswers);

    ScoreLib.GetScoreMultiAnswerByQueestionData(userAnswersArray, questionData, answerInput, correctAnswers,
      (updatedUserAnswers,score, isCorrect)=>{
          ScoreLib.MakeRelatedUserAnswerData(selectedQuiz, questionData.id, answerInput,
             userAnswers, userAnswersMapQuizInstance,isCorrect);
          setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});

    });



    //
    // MatchLib.Match(this.state.answers,this.state.answerInput, 2, (correctAnswers,remainingAnswers)=>{
    //   console.log(correctAnswers.length + ' ' + remainingAnswers.length);
    // });

  }



  render() {
    const { classes,questionData,questionVisibility,quizMetaData,selectQuizCat,selectedQuiz,correctAnswers,userAnswers } = this.props;

    let questionKey = questionData.id + '-' + selectedQuiz.key + '-'+selectQuizCat;
    let tpAnswerSoFar = ScoreLib.GetUserAnswersForQuestion(userAnswers, correctAnswers);
    let answerVisible = false;

    if(questionVisibility.hasOwnProperty(questionKey)){
       answerVisible =questionVisibility[questionKey].visible
    }

    const handleOnChange = event => {


        this.setState({
          answerInput : event.target.value,
        });

      };


    const formatAnswer =(string,index)=>{
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
    };



    let experiment =  <div>

                      <QuestionInput onChange={handleOnChange} onClick = {this.onClick}/>


                      <Typography variant="h6" color="inherit"  className ={classes.answersofarlabel}>
                        Answer so far
                      </Typography>

                      <Paper className={classes.root} elevation={1} className ={classes.answersofar}>
                        {tpAnswerSoFar.map((string,index) => (
                             formatAnswer(string,index)
                           ))}
                      </Paper>

                      </div>

    let correctAnswersArray = ScoreLib.GetCorrectAnswersForQuestion(questionData, correctAnswers);

    let tpAnswer = correctAnswersArray.map((string,index) => (
         formatAnswer(string,index)
       ));


    let answerBlock = <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {tpAnswer}
                       </Typography>

    let result;

    if(!answerVisible) result = experiment;
    if(answerVisible) result = answerBlock;

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
