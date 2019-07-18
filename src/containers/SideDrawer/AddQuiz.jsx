import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import InputBase from '@material-ui/core/InputBase';
import { connect } from "react-redux";
import { switchControlVisbility,setQuizMetaData,setSideDrawerLoaderVisible,setCatSelection,setQuizName,setQuizCat,
  setAddQuizMode,setDeleteQuizMode,setEditQuizMode,setEditNameQuizMode, setAddQuizName, setEditQuizName} from "../../actions/creators.jsx";

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

    const {classes,quizAddName,quizAddMode} = this.props;

    const startClick = ()=>{
      this.props.setAddQuizMode(true);
    };
    const cancelClick = ()=>{
      this.props.setAddQuizMode(false);
    };

    const addClick = (param)=>{
      this.props.onAdd(this.state.answerInput);
    };

    const handleOnChange = (event)=>{
    //  console.log('setting :' + event.target.value);
      this.setState({ answerInput: event.target.value });
    };



    startClick.bind(this);
    addClick.bind(this);
    cancelClick.bind(this);

    let layout;

    if(quizAddMode){
      layout = <div><InputBase placeholder="Quiz Name…" className = {classes.input}
         onChange={handleOnChange}/><Button color="inherit" onClick = {addClick}>Add</Button><Button color="inherit" onClick = {cancelClick}>Cancel</Button></div>
    }
    else{
      layout = <Button color="inherit" onClick = {startClick}>Create New</Button>
    }

    return (
      <div>{layout}</div>
    );

  }





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
    quizAddName : state.quizAddName,
    quizEditName : state.quizEditName,
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
    },
    setAddQuizName : quizAddName =>{
      dispatch(setAddQuizName(quizAddName))
    },
    setEditQuizName : quizEditName =>{
      dispatch(setEditQuizName(quizEditName))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddQuiz));
