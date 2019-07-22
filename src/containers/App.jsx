import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

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

    if(this.props.testActive){
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

const mapStateToProps = state => { return { testActive :state.db.testActive }; };

const mapDispatchToProps = dispatch => {return {}; };



//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
