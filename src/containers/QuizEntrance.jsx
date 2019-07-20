import React, { Component } from 'react';
import { connect } from "react-redux";
import {setSideDrawerLoaderVisible } from "../actions/creators.jsx";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';
import TestHistory from './TestHistory.jsx';

const styles = theme => ({

});

class QuizEntrance extends Component {
  constructor(props) {
     super(props);
   }

  handleInput = (e) => {
    this.dataClick();
  }

  render() {
      return (
        <div >
          <TestHistory></TestHistory>
          <TopButtons  isData = {true} modeChanged = { this.handleInput }/>
          <SideDrawer onOpenClick = {click => this.dataClick = click} />


        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    TestState : state.TestState,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    currentTest : state.currentTest,
    testList : state.testList,
    testActive :state.testActive,
    userAnswersMapQuizInstance: state.userAnswersMapQuizInstance
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    }

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizEntrance));
