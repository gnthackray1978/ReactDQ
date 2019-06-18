import React, { Component } from 'react';
import { connect } from "react-redux";
import { beginSearch,setSideDrawerLoaderVisible } from "../actions/creators.jsx";

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
      // const numTests = this.props.testList.index.length;
      //
      //
      //
      // let testHistory = this.props.testList.index.map((key)=>{
      //   // this.props.testList[key]
      //
      //   let scores = this.props.userAnswersMapQuizInstance.index.map((instancedata)=>{
      //     // id: compositeKey,
      //     // quizInstanceId : instanceId,
      //     // questionId : questionId,
      //     // score : score,
      //     // answer : isCorrect ? [userAnswerKey] : [],
      //     // wrongAnswer :isCorrect ? [] : [userAnswerKey],
      //
      //     if(this.props.userAnswersMapQuizInstance[instancedata].quizInstanceId == this.props.testList[key].id){
      //       return this.props.userAnswersMapQuizInstance[instancedata].score;
      //     }
      //   });
      //
      //   let total = scores.reduce((total,sum)=>{
      //       return total+sum;
      //   });
      //
      //   return {
      //     quizName: key.selectedQuiz,
      //     score: total,
      //     started : key.startedTime,
      //     ended : key.endTime
      //   };
      //
      //   // this.props.testList[key] = {
      //   //   id: key,
      //   //   quizName : this.props.selectedQuiz,
      //   //   quizCat : this.props.selectQuizCat,
      //   //   startedTime : new Date(),
      //   //   active : true
      //   // };
      // });

  //    console.log(testHistory.length);

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
