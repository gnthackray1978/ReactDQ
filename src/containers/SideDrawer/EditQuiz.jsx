import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {GoogleLib} from "../../scripts/GoogleLib.js";


import './SideDrawer.css';
import { connect } from "react-redux";
import {setCatSelection,setQuizName,setQuizCat,setAddQuizMode,setDeleteQuizMode,setEditQuizMode,setEditNameQuizMode} from "../../actions/creators.jsx";

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



function EditQuiz(props) {



  const handleClick = ()=>{
    props.setEditQuizMode(true);
  };

  const cancelClick = ()=>{
    props.setEditQuizMode(false);
  };



  handleClick.bind(this);

  let layout;

  if(!props.quizEditNameMode){
    layout = <Button color="inherit" onClick = {handleClick}>Edit</Button>
  }
  else{
    layout =  <div><Button color="inherit" onClick = {cancelClick}>Cancel</Button> <Button color="inherit"  >Confirm Edit</Button></div>
  }

  return (
    <div>{layout}</div>
  );
}



const mapStateToProps = state => {
  return {
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    quizAddMode :state.quizAddMode,
    quizDeleteMode :state.quizDeleteMode,
    quizEditNameMode :state.quizEditNameMode,
    quizEditMode :state.quizEditMode,
    ScriptId : state.GoogleApiParams.scriptId
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditQuiz));
