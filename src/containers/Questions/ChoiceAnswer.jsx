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
  root: {
    flexGrow: 1,
    border: '2px solid black',
    borderRadius: 5,
    margin : 5,
    padding : 5
  },

  root2: {
     height: 110,
    width: 200

  },


  answerContainer: {

    width: 200,
    margin :5,
    padding: 10
  },
  questionContent: {
    height: 110,
    width: 200
  },
  button: {},

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 200
  }
});

class ChoiceAnswer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes,value } = this.props;

    return (
      <Grid key={value} item>
        <Paper className={classes.paper} >
          <Typography variant="h5" component="h3">
            {value}
          </Typography>


        </Paper>
      </Grid>
    );
  }
}



export default withStyles(styles)(ChoiceAnswer);
