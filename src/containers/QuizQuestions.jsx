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
import {setInTest} from "../actions/creators.jsx";



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



  render() {

    const { classes } = this.props;
    const setInTest = this.props.setInTest;
    const inTest = this.props.inTest;

      return (
        <Toolbar>

          <Button color="inherit"  className={classes.start}  onClick={()=>{ setInTest(!inTest); }}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              End
            </Typography>
          </Button>


          <Button color="inherit"  className={classes.grow}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              C# Test
            </Typography>
          </Button>

          <Button color="inherit"  className={classes.start}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              Score : 90%
            </Typography>
          </Button>


        </Toolbar>
      );
    }
}

const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    inTest : state.inTest,
    selectQuizCat : state.selectQuizCat,
    selectQuizName : state.selectQuizName
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },

    setInTest :inTest =>{
      dispatch(setInTest(inTest))
    }

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizQuestions));
