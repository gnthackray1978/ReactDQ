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

    width: 320,
    margin :5,
    padding: 10
  },
  questionContent: {
    height: 110,
    width: 320
  },
  button: {},

});



class QuestionList extends React.Component {


  render() {

    const { classes,quizQuestions } = this.props;

    const getQuestionType =(value)=>{
      if(quizQuestions[value].type == 0)
        return <SingleAnswer value = { quizQuestions[value]}></SingleAnswer>

      if(quizQuestions[value].type == 3)
        return <MultiAnswer questionData = { quizQuestions[value]}></MultiAnswer>

      if(quizQuestions[value].type == 1)
        return <SingleAnswer value = { quizQuestions[value]}></SingleAnswer>

      if(quizQuestions[value].type == 3)
        return <SingleAnswer value = { quizQuestions[value]}></SingleAnswer>

    };

    return (
      <Grid container className={classes.root} spacing={16}>
         {quizQuestions.index.map(value => (
              getQuestionType(value)
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
    selectedQuiz : state.selectedQuiz,
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
