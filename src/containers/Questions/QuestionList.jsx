import React from 'react';
import { connect } from "react-redux";
import {setQuizQuestionData} from "../../store/actions/appStateActions.jsx";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleAnswer from "./SingleAnswer.jsx";
import MultiAnswer from "./MultiAnswer.jsx";
import BooleanAnswer from "./BooleanAnswer.jsx";
import MultiChoiceAnswer from "./MultiChoiceAnswer.jsx";


const styles = () => ({
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
        const questionType = quizQuestions[value].type;

        if(questionType == 'SN')
          return <SingleAnswer questionData = {quizQuestions[value]}/>

        if(questionType == 'MA')
          return <MultiAnswer questionData = {quizQuestions[value]}/>

        if(questionType == 'SN')
          return <SingleAnswer questionData = {quizQuestions[value]}/>

        if(questionType == 'BO')
          return <BooleanAnswer questionData = {quizQuestions[value]}/>

        if(questionType == 'MC')
          return <MultiChoiceAnswer questionData = {quizQuestions[value]}/>
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
  quizQuestions : PropTypes.object
};

const mapStateToProps = state => {
  return {
    quizQuestions :state.db.quizQuestions
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuizQuestionData :data =>{
      dispatch(setQuizQuestionData(data))
    }
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuestionList));
