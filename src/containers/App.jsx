import React, { Component } from 'react';
import { connect } from "react-redux";
import { switchControlVisbility,beginSearch,reset } from "../actions/creators.jsx";

import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({

});


class App extends Component {
  constructor(props) {
     super(props);
   }

   componentDidMount() {

   }

   render() {

     const { term } = this.props;

    return (
        <div >
         hello
        </div>
    );
  }
}

//export default App;


const mapStateToProps = state => {
  return {
    term: state.term,

  };
};

const mapDispatchToProps = dispatch => {

  return {
    beginSearch_i :term => {
      dispatch(reset(term));
    }

  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
