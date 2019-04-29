import React, { Component } from 'react';
import { connect } from "react-redux";
import { beginSearch,setSideDrawerLoaderVisible } from "../actions/creators.jsx";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';


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
          <TopButtons  isData = {true} modeChanged = { this.handleInput }/>
          <SideDrawer onOpenClick = {click => this.dataClick = click} />
        </div>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuizEntrance));
