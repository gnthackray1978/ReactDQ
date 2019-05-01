import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import QuestionFooter from "./QuestionFooter.jsx";


const styles = theme => ({

  answerContainer: {
    width: 220,
    margin :5,
    padding: 10
  },

  questionContent: {
    height: 110,
    width: 220
  },

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 220
  }
});

class SingleAnswer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes,value } = this.props;

    return (
     <Paper className={classes.answerContainer}>
        <Grid container spacing={16}>
          <Grid item xs={9} >
          Single Text Answer
          </Grid>
          <Grid item xs={3} >
          90%
          </Grid>
          <Grid item xs={12}>{value}</Grid>

          <Grid item xs={12} className={classes.questionContent} />

          <Grid item xs={12}>
            <QuestionFooter classes={classes} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(SingleAnswer);
