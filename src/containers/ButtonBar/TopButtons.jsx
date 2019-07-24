import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {PropTypes} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import {setTestBatch} from "../../actions/appStateActions.jsx";
import GoogleConnect  from "./GoogleConnect.jsx";

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
     console.log('TopButtons');
   }



  render() {

    const { classes,selectedQuiz,selectQuizCat,testList, setTestBatch, modeChanged} = this.props;

    let createNewTest = ()=>{
    //  console.log('selected quiz: ' +this.props.selectedQuiz.key + ' selected cat: ' + this.props.selectQuizCat);
      if(selectedQuiz.key != ''){
        // add new test into the list of tests
        let key = String(testList.index.length);

        testList[key] = {
          id: key,
          quizName : selectedQuiz.quiz,
          quizCat : selectQuizCat,
          startedTime : new Date(),
          active : true
        };

        testList.index.push(key);

        //update the list of tests to include the new one
        //set that we are now in a test
        //set what the current test is
        setTestBatch(testList, key);
      }

    };


     return (
         <Toolbar>
             <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                 <MenuIcon  onClick={()=>{ modeChanged('data'); }}/>
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
             <GoogleConnect mode = "login"/>
         </Toolbar>
     )
   }

}

TopButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedQuiz :PropTypes.string,
  selectQuizCat : PropTypes.string,
  testList : PropTypes.object,
  currentTest : PropTypes.string,
  setTestBatch : PropTypes.func,
  modeChanged : PropTypes.func
};

TopButtons.defaultProps  = {
  isData: true
};


const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.uxState.SideDrawerLoaderVisible,
    selectedQuiz :state.applicationState.selectedQuiz,
    selectQuizCat : state.applicationState.selectQuizCat,
    testList : state.db.testList,
    currentTest : state.db.currentTest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTestBatch :(testList,currentTest) =>{
      dispatch(setTestBatch(testList,currentTest))
    }
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopButtons));
