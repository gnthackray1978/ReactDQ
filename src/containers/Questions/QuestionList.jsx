import React from 'react';
import { connect } from "react-redux";
import {setTestState,setQuizQuestionData} from "../../actions/creators.jsx";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import SingleAnswer from "./SingleAnswer.jsx";
import MultiAnswer from "./MultiAnswer.jsx";
import ChoiceAnswer from "./ChoiceAnswer.jsx";
import BooleanAnswer from "./BooleanAnswer.jsx";


const styles = theme => ({
  root: {
    flexGrow: 1,
    border: '2px solid black',
    borderRadius: 5,
    margin : 5,
    padding : 5
  },


  answerContainer: {

    width: 220,
    margin :5,
    padding: 10
  },
  questionContent: {
    height: 110,
    width: 220
  },
  button: {},

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 220
  }
});



class QuestionList extends React.Component {


  render() {

    const { classes,quizQuestions } = this.props;


    return (
      <Grid container className={classes.root} spacing={16}>
         {quizQuestions.index.map(value => (
              <SingleAnswer classes = {classes} value = { quizQuestions[value]}></SingleAnswer>
            ))}

      </Grid>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    TestState : state.TestState,
    selectQuizCat : state.selectQuizCat,
    selectQuizName : state.selectQuizName,
    ClientId : state.GoogleApiParams.clientId,
    ScriptId : state.GoogleApiParams.scriptId,
    quizQuestions :state.quizQuestions
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
    }


  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuestionList));
