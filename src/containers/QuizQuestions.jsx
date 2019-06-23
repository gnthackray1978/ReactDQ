import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {PropTypes,func} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ScoreLib} from "../scripts/ScoreLib.js";

import { connect } from "react-redux";
import {setEndTestBatch,setQuizQuestionData, setCombinedQuizData} from "../actions/creators.jsx";
import {SheetParser} from "../scripts/SheetParser.js";
import {GoogleLib} from "../scripts/GoogleLib.js";
import QuestionList from "./Questions/QuestionList.jsx";


const styles = theme => ({
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
  //   console.log('componentDidMount: '  );
    //init question object
    const { selectQuizCat} = this.props;

    const setQuizQuestionData = this.props.setQuizQuestionData;
    const setCombinedQuizData = this.props.setCombinedQuizData;

    //SheetParser.
    GoogleLib.ReadSheet(window.gapi, this.props.ScriptId,this.props.selectedQuiz.quiz,  (arg)=>{

         var questionSet = SheetParser.CreateQuestionSetN(arg, selectQuizCat);

         setCombinedQuizData(questionSet);

    });

   }

   componentDidUpdate(){
    //  console.log('componentDidUpdate: '  );

    }



   render() {

    const { classes , selectQuizCat, selectedQuiz, currentTest,testList, testActive,userAnswersMapQuizInstance, quizQuestions} = this.props;
    const setEndTestBatch = this.props.setEndTestBatch;
    const TestState = this.props.TestState;

    let score = 'Score: '+ScoreLib.GetScoreForTest(userAnswersMapQuizInstance,currentTest,quizQuestions.index.length)+ '%';

  //  console.log('state changed');

      return (
        <div>
          <Toolbar>

            <Button color="inherit"  className={classes.start}  onClick={()=>{

              testList[currentTest].active = false;
              testList[currentTest].endTime = new Date();
              testList[currentTest].questionCount = quizQuestions.index.length;
              setEndTestBatch(currentTest, testList);


              }}>
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

          <QuestionList></QuestionList>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    TestState : state.TestState,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    ClientId : state.GoogleApiParams.clientId,
    ScriptId : state.GoogleApiParams.scriptId,
    quizQuestions :state.quizQuestions,
    //serverAnswers :state.serverAnswers,
    currentTest : state.currentTest,
    testList : state.testList,
    testActive :state.testActive,
    userAnswersMapQuizInstance: state.userAnswersMapQuizInstance
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },

    setEndTestBatch :(id,active,timestamp) =>{
      dispatch(setEndTestBatch(id,active,timestamp))
    },

    setQuizQuestionData :data =>{
      dispatch(setQuizQuestionData(data))
    },

    setCombinedQuizData :data =>{
      dispatch(setCombinedQuizData(data))
    },
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizQuestions));
