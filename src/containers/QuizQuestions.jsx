import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {PropTypes} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ScoreLib} from "../scripts/ScoreLib.js";
import { connect } from "react-redux";
import {setEndTestBatch, setCombinedQuizData} from "../actions/creators.jsx";
import {SheetParser} from "../scripts/SheetParser.js";
import {GoogleLib} from "../scripts/GoogleLib.js";
import QuestionList from "./Questions/QuestionList.jsx";

const styles = () => ({
  grow: {
    marginLeft: 5,
    flexGrow: 1,
  },

  start: {
    marginLeft: 5,
    flexGrow: 0,
  },

  tolowerBtn : {
    textTransform: 'none'
  }
});

class QuizQuestions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectQuizCat,setCombinedQuizData,ScriptId,selectedQuiz} = this.props;

    GoogleLib.ReadSheet(window.gapi, ScriptId,selectedQuiz.quiz,  (arg)=>{
         let questionSet = SheetParser.CreateQuestionSetN(arg, selectQuizCat);
         setCombinedQuizData(questionSet);
    });
  }

   render() {

    const { classes , selectQuizCat, selectedQuiz, currentTest,testList,userAnswersMapQuizInstance, setEndTestBatch, quizQuestions} = this.props;


    let score = 'Score: '+ScoreLib.GetScoreForTest(userAnswersMapQuizInstance,currentTest,quizQuestions.index.length)+ '%';

  //  console.log('state changed');

    const updateListCallBatch = ()=>{
      testList[currentTest].active = false;
      testList[currentTest].endTime = new Date();
      testList[currentTest].questionCount = quizQuestions.index.length;
      setEndTestBatch(currentTest, testList);
    };

      return (
          <div>
              <Toolbar>
                  <Button color="inherit"  className={classes.start}  onClick={updateListCallBatch}>
                      <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                      End
                      </Typography>
                  </Button>
                  <Button color="inherit"  className={classes.grow}>
                      <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                          {selectedQuiz.quiz} {selectQuizCat}
                      </Typography>
                  </Button>
                  <Button color="inherit"  className={classes.start}>
                      <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                          {score}
                      </Typography>
                  </Button>
              </Toolbar>
              <QuestionList/>
          </div>
      );
    }
}

QuizQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
  quizQuestions : PropTypes.array,
  selectQuizCat : PropTypes.string,
  setCombinedQuizData : PropTypes.func,
  ScriptId : PropTypes.number,
  selectedQuiz : PropTypes.string,
  currentTest: PropTypes.string,
  testList: PropTypes.object,
  userAnswersMapQuizInstance: PropTypes.object,
  setEndTestBatch : PropTypes.func
};

const mapStateToProps = state => {
  return {
    selectQuizCat : state.applicationState.selectQuizCat,
    selectedQuiz : state.applicationState.selectedQuiz,
    ScriptId : state.google.GoogleApiParams.scriptId,
    quizQuestions :state.db.quizQuestions,
    currentTest : state.db.currentTest,
    testList : state.db.testList,
    userAnswersMapQuizInstance: state.db.userAnswersMapQuizInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEndTestBatch :(id,active,timestamp) =>{
      dispatch(setEndTestBatch(id,active,timestamp))
    },

    setCombinedQuizData :data =>{
      dispatch(setCombinedQuizData(data))
    },
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizQuestions));
