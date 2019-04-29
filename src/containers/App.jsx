import React, { Component } from 'react';
import { connect } from "react-redux";
import { beginSearch } from "../actions/creators.jsx";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';
import QuizEntrance from './QuizEntrance.jsx';
import QuizQuestions from './QuizQuestions.jsx';

const styles = theme => ({

});

class App extends Component {
  constructor(props) {
     super(props);
   }

   componentDidMount() {

   }

   render() {

    let result;

    if(this.props.inTest){
      result = <QuizQuestions/>
    }
    else {
      result = <QuizEntrance/>
    }

    return (
      <div>{result}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    inTest :state.inTest
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    }

  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
