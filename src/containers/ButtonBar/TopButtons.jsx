import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavItem from 'react-bootstrap/NavItem';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {PropTypes,func} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import ControlIcon from '@material-ui/icons/OpenWith';
import InfoIcon from '@material-ui/icons/FeedBack';

import { connect } from "react-redux";
import {setTestBatch ,selectQuizName,selectQuizCat} from "../../actions/creators.jsx";
import GoogleConnect  from "./GoogleConnect.jsx";

import './TopButtons.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
  flexGrow: 1,
  },
  grow: {
    marginLeft: 5,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,

  },
  tolowerBtn : {
    textTransform: 'none'
  }
});

class TopButtons extends Component {

  constructor(props) {
     super(props);

   }

   static defaultProps = {
     isData: true
   };


  render() {

    const { classes,selectedQuiz,selectQuizCat,TestState } = this.props;

    let buttons;

    const responseGoogle = (response) => {
      console.log(response);
    }

    let createNewTest = ()=>{


      let key = String(this.props.testList.index.length );

      this.props.testList[key] = {
        id: key,
        quizName : this.props.selectedQuiz,
        quizCat : this.props.selectQuizCat,
        timeStamp : new Date(),
        started : true
      };

      this.props.testList.index.push(key);


      this.props.setTestBatch(this.props.testList, key);

    };

     return (

        <Toolbar>

          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon  onClick={()=>{ this.props.modeChanged('data'); }}/>
          </IconButton>

          <Button color="inherit"  onClick={()=>createNewTest()}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              Start
            </Typography>
          </Button>




          <Button color="inherit"  className={classes.grow}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              {selectedQuiz.quiz + ' ' + selectQuizCat}
            </Typography>
          </Button>



          <GoogleConnect mode = "login"></GoogleConnect>

        </Toolbar>

     )
   }

}



const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    TestState : state.TestState,
    selectedQuiz :state.selectedQuiz,
    selectQuizCat : state.selectQuizCat,
    testList : state.testList,
    currentTest : state.currentTest
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },
    setTestBatch :(testList,currentTest) =>{
      dispatch(setTestBatch(testList,currentTest))
    }

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopButtons));
