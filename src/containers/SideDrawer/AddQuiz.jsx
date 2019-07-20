import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { connect } from "react-redux";
import {setAddQuizMode,setAddQuizName} from "../../actions/creators.jsx";

import './SideDrawer.css';

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

class AddQuiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answerInput : ''
    };
  }



  render() {

    const {classes,quizAddMode} = this.props;

    const startClick = ()=>{
      this.props.setAddQuizMode(true);
    };
    const cancelClick = ()=>{
      this.props.setAddQuizMode(false);
    };

    const addClick = ()=>{
      this.props.onAdd(this.state.answerInput);
    };

    const handleOnChange = (event)=>{
      this.setState({ answerInput: event.target.value });
    };
//


    startClick.bind(this);
    addClick.bind(this);
    cancelClick.bind(this);

    let layout;

    if(quizAddMode){
      layout = (<div><InputBase placeholder = "Quiz Name" className = {classes.input} onChange={handleOnChange}/>
          <Button color="inherit" onClick = {addClick}>Add</Button><Button color="inherit" onClick = {cancelClick}>Cancel</Button></div>);
    }
    else{
      layout = <Button color="inherit" onClick = {startClick}>Create New</Button>
    }

    return (
        <div>{layout}</div>
    );

  }

}

AddQuiz.propTypes = {
  classes: PropTypes.object,
  quizAddMode : PropTypes.bool,
  setAddQuizMode : PropTypes.func,
  onAdd : PropTypes.func,
};


const mapStateToProps = state => {
  return {
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
    quizAddMode :state.quizAddMode,
    quizDeleteMode :state.quizDeleteMode,
    quizEditNameMode :state.quizEditNameMode,
    quizEditMode :state.quizEditMode,
    quizAddName : state.quizAddName,
    quizEditName : state.quizEditName,
    ScriptId : state.GoogleApiParams.scriptId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddQuizMode :addMode =>{
      dispatch(setAddQuizMode(addMode))
    },
    setAddQuizName : quizAddName =>{
      dispatch(setAddQuizName(quizAddName))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddQuiz));
