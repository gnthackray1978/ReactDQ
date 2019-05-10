import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {PropTypes,func} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import { connect } from "react-redux";
import {setTestState,setQuizQuestionData, setAnswerData} from "../actions/creators.jsx";
import {BasicQuestioner} from "../scripts/BasicQuestioner.js";
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
     console.log('componentDidMount: '  );
    //init question object
    const { selectQuizCat} = this.props;

    const setQuizQuestionData = this.props.setQuizQuestionData;

    //BasicQuestioner.
    GoogleLib.ReadSheet(window.gapi, this.props.ScriptId,this.props.selectQuizName,  (arg)=>{
      //  var tp = BasicQuestioner.CreateQuestionSet(arg, selectQuizCat);

         var tp2 = BasicQuestioner.CreateQuestionSetN(arg, selectQuizCat);

         setQuizQuestionData(tp2.questions);

         setAnswerData(tp2.answers);

    });

   }

   componentDidUpdate(){
      console.log('componentDidUpdate: '  );

    }



   render() {

    const { classes , selectQuizCat, selectQuizName} = this.props;
    const setTestState = this.props.setTestState;
    const TestState = this.props.TestState;

    console.log('state changed');

      return (
        <div>
          <Toolbar>

            <Button color="inherit"  className={classes.start}  onClick={()=>{

              let date = new Date();


              let newId = TestState.Id;

              setTestState(newId, false, +date);


                //read the questions in ....


              }}>
              <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                End
              </Typography>
            </Button>


            <Button color="inherit"  className={classes.grow}>
              <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                {selectQuizName} {selectQuizCat}
              </Typography>
            </Button>

            <Button color="inherit"  className={classes.start}>
              <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                Score : 90%
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
    selectQuizName : state.selectQuizName,
    ClientId : state.GoogleApiParams.clientId,
    ScriptId : state.GoogleApiParams.scriptId,
    quizQuestions :state.quizQuestions,
    answerData :state.answerData
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },

    setTestState :(id,active,timestamp) =>{
      dispatch(setTestState(id,active,timestamp))
    },

    setQuizQuestionData :data =>{
      dispatch(setQuizQuestionData(data))
    },

    setAnswerData :data =>{
      dispatch(setAnswerData(data))
    }
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizQuestions));
