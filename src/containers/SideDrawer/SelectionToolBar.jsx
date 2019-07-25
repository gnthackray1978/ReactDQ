import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {GoogleLib} from "../../scripts/GoogleLib.js";
import AddQuiz from "./AddQuiz.jsx";
import DeleteQuiz from "./DeleteQuiz.jsx";
import EditQuizName from "./EditQuizName.jsx";
import EditQuiz from "./EditQuiz.jsx";

import './SideDrawer.css';
import { connect } from "react-redux";
import { setCatSelection,setQuizName,setQuizCat} from "../../store/actions/appStateActions.jsx";
import {setAddQuizMode,setDeleteQuizMode,setEditQuizMode,setEditNameQuizMode} from "../../store/actions/uxActions.jsx";


const styles = theme => ({

  root: {
    paddingRight: theme.spacing.unit,
    minHeight : window.innerHeight -10
  },

  list: {
    width: 420,
  },

  fullList: {
    width: 'auto',
  },
  mygrid:{
    margin:'0px'
  },
  input:{
    width: '100px'
  },
  label: {

    textAlign: 'center',

  },
  toolBar: {
    paddingLeft :'12px',
    minHeight: '0px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
     top: 'auto',
     bottom: 0,
   },
});


class SelectionToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerInput : ''
    };
  }

  render() {

    const { classes , quizAddMode,quizDeleteMode, selectQuizCat,quizEditNameMode,quizEditMode} = this.props;

    console.log('selected quiz cat: ' + selectQuizCat);

    const addClick = (param => {
        console.log('addClick: ' + param);
        GoogleLib.CreateFile(window.gapi, this.props.ScriptId, param, ()=>{
          console.log('finished');
        });
    });




    const showDeleteOptions = function(){
      return selectQuizCat != '' && !quizAddMode && !quizEditNameMode && !quizEditMode ;
    };

    const showCreate = function(){
      return !quizDeleteMode  && !quizEditNameMode && !quizEditMode ;
    };

    const showEdit = function(){
      return selectQuizCat != '' && !quizDeleteMode  && !quizEditNameMode && !quizAddMode ;
    };

    const showEditName = function(){
      return selectQuizCat != '' && !quizDeleteMode  && !quizEditMode && !quizAddMode ;
    };


    let bottomToolbar =[];


    if(showCreate())
      bottomToolbar.push(<AddQuiz  key="1" onAdd = {addClick} />);

    if(showDeleteOptions())
      bottomToolbar.push(<DeleteQuiz key="2" />);

    if(showEdit())
      bottomToolbar.push(<EditQuiz key="3" />);

    if(showEditName())
      bottomToolbar.push(<EditQuizName key="4" />);

    return(
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
        {bottomToolbar}
        </Toolbar>
      </AppBar>);
  }

}

const mapStateToProps = state => {
  return {
    catSelection : state.applicationState.catSelection,
    selectQuizCat : state.applicationState.selectQuizCat,
    selectedQuiz : state.applicationState.selectedQuiz,

    quizAddMode :state.uxState.quizAddMode,
    quizDeleteMode :state.uxState.quizDeleteMode,
    quizEditNameMode :state.uxState.quizEditNameMode,
    quizEditMode :state.uxState.quizEditMode,

    ScriptId : state.google.GoogleApiParams.scriptId
  };
};

const mapDispatchToProps = dispatch => {

  return {

    setCatSelection :data =>{
      dispatch(setCatSelection(data))
    },
    setQuizName :selectedQuiz =>{
      dispatch(setQuizName(selectedQuiz))
    },
    setQuizCat :selectQuizCat =>{
      dispatch(setQuizCat(selectQuizCat))
    },
    setAddQuizMode :addMode =>{
      dispatch(setAddQuizMode(addMode))
    },
    setDeleteQuizMode :deleteMode =>{
      dispatch(setDeleteQuizMode(deleteMode))
    },
    setEditQuizMode : quizEditMode =>{
      dispatch(setEditQuizMode(quizEditMode))
    },
    setEditNameQuizMode : quizEditNameMode =>{
      dispatch(setEditNameQuizMode(quizEditNameMode))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectionToolBar));
