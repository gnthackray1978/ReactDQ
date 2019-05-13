import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import QuestionFooter from "./QuestionFooter.jsx";
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";

import { setQuizMetaData,setCatSelection,setQuizName,setQuizCat,setQuestionVisibility} from "../../actions/creators.jsx";



const styles = theme => ({

  answerContainer: {
    width: 320,
    margin :5,
    padding: 10
  },

  questionContent: {
    height: 110,
    width: 320
  },

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 320
  },

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300
  }
});

class SingleAnswer extends React.Component {

  state = {
     name: '',
     answerVisible : false
   };

   handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

  constructor(props) {
    super(props);
  }

  handleInput = (e) => {
    console.log(e);
    // record in the store question id
    // and whether or not it's visible.

    if(this.props.selectedQuiz)
      console.log(e + ' clicked: ' +this.props.selectedQuiz.key + ' ' + this.props.selectQuizCat + ' ' + this.props.value.id);

    let questionKey = this.props.value.id + '-' + this.props.selectedQuiz.key + '-'+this.props.selectQuizCat;

    let questionVisibility = this.props.questionVisibility;


    if(!questionVisibility.hasOwnProperty(questionKey)){
      questionVisibility[questionKey] = {
        visible : false
      };
    }
    else{
      questionVisibility[questionKey].visible = !questionVisibility[questionKey].visible;
    }


    this.props.setQuestionVisibility(questionVisibility);

  }

  render() {
    const { classes,value,questionVisibility,quizMetaData,selectQuizCat,selectedQuiz,answerData } = this.props;

    let questionKey = value.id + '-' + selectedQuiz.key + '-'+selectQuizCat;

    let answerVisible =false;

    if(questionVisibility.hasOwnProperty(questionKey)){
       answerVisible =questionVisibility[questionKey].visible
    }

    let questionBlock = <TextField
              id="outlined-name"
              label="Answer here"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />

    let tpAnswer = answerData[value.answer[0]].answer;
    let answerBlock = <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
                         {tpAnswer}
                       </Typography>

    let result;

    if(!answerVisible) result = questionBlock;
    if(answerVisible) result = answerBlock;

    return (
     <Paper className={classes.answerContainer}>
        <Grid container spacing={16}>
          <Grid item xs={9} >
          Single Text Answer
          </Grid>
          <Grid item xs={3} >
          90%
          </Grid>
          <Grid item xs={12}>{value.question}</Grid>

          <Grid item xs={12} className={classes.questionContent} >
            {result}
          </Grid>

          <Grid item xs={12}>
            <QuestionFooter  buttonClicked = { this.handleInput }/>
          </Grid>
        </Grid>
      </Paper>
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
    answerData : state.answerData
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setQuestionVisibility :data =>{
      dispatch(setQuestionVisibility(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SingleAnswer));
