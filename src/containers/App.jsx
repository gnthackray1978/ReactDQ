import React, { Component } from 'react';
import { connect } from "react-redux";
import { beginSearch } from "../actions/creators.jsx";

import { withStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer/SideDrawer.jsx';
import TopButtons from './ButtonBar/TopButtons.jsx';


const styles = theme => ({

});


class App extends Component {
  constructor(props) {
     super(props);
   }

   componentDidMount() {

   }

   handleInput = (e) => {

     this.dataClick();
   }

   render() {

     const { term } = this.props;

    return (
        <div >
          <TopButtons  isData = {true} modeChanged = { this.handleInput }/>
          <SideDrawer onOpenClick = {click => this.dataClick = click} />
        </div>
    );
  }
}

//export default App;


const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
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
