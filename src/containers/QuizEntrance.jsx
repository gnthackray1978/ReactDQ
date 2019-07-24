import React, { Component } from 'react';
import { connect } from "react-redux";
import {setSideDrawerLoaderVisible } from "../actions/uxActions.jsx";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';
import TestHistory from './TestHistory.jsx';

const styles = () => ({

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
    SideDrawerLoaderVisible : state.uxState.SideDrawerLoaderVisible,
    selectQuizCat : state.applicationState.selectQuizCat,
    selectedQuiz : state.applicationState.selectedQuiz,
    currentTest : state.db.currentTest,
    testList : state.db.testList,
    testActive :state.db.testActive,
    userAnswersMapQuizInstance: state.db.userAnswersMapQuizInstance
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
