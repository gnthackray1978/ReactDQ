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
import {setInTest,setQuizCurrentData} from "../actions/creators.jsx";
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

    const setQuizCurrentData = this.props.setQuizCurrentData;

    //BasicQuestioner.
    GoogleLib.ReadSheet(window.gapi, this.props.ScriptId,this.props.selectQuizName,  (arg)=>{
        var tp = BasicQuestioner.CreateQuestionSet(arg, selectQuizCat);

         setQuizCurrentData(tp.questionset);

    });

   }

   componentDidUpdate(){
      console.log('componentDidUpdate: '  );
     // if (prevProps.inTest !== this.props.inTest) {
     //   console.log('componentDidUpdate: ' + prevProps.inTest +this.props.inTest );
     // }
    }



   render() {

    const { classes , selectQuizCat, selectQuizName} = this.props;
    const setInTest = this.props.setInTest;
    const inTest = this.props.inTest;

      return (
        <div>
          <Toolbar>

            <Button color="inherit"  className={classes.start}  onClick={()=>{
                setInTest(!inTest);
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
    inTest : state.inTest,
    selectQuizCat : state.selectQuizCat,
    selectQuizName : state.selectQuizName,
    ClientId : state.GoogleApiParams.clientId,
    ScriptId : state.GoogleApiParams.scriptId,
    quizCurrentData :state.quizCurrentData
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },

    setInTest :inTest =>{
      dispatch(setInTest(inTest))
    },

    setQuizCurrentData :data =>{
      dispatch(setQuizCurrentData(data))
    }
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizQuestions));
