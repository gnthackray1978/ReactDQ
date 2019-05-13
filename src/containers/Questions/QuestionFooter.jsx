import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

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
    width: 300
  }
});


class QuestionFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.questionFooter}>
        <Grid item>
          <IconButton className={classes.button}  onClick={()=>{ this.props.buttonClicked('visibility'); }}>
            <Icon>visibility</Icon>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.button} onClick={()=>{ this.props.buttonClicked('undo'); }}>
            <Icon>undo</Icon>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.button} onClick={()=>{ this.props.buttonClicked('completed'); }}>
            <Icon>done</Icon>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(QuestionFooter);
