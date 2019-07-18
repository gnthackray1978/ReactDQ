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
import QuizItem from "./QuizItem.jsx";
import {GoogleLib} from "../../scripts/GoogleLib.js";
import QuizItemCats from "./QuizItemCats.jsx";
import AddQuiz from "./AddQuiz.jsx";
import SelectionToolBar from "./SelectionToolBar.jsx";
//testuuoi

import './SideDrawer.css';

import { connect } from "react-redux";
import { switchControlVisbility,setQuizMetaData,setSideDrawerLoaderVisible,setCatSelection,setQuizName,setQuizCat,setAddQuizMode,setDeleteQuizMode} from "../../actions/creators.jsx";

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

class SideDrawer extends Component {

   constructor(props) {
      super(props);
       this.state = {
         modalShow: this.props.show ,
         answerInput : ''
       };

   }

   componentDidMount() {

     this.props.onOpenClick(()=>{
       this.setState({ modalShow: true });
     });

   }

   toggleDrawer(state){
     if(this.state.modalShow != state){
      this.setState({ modalShow: state });

    }
   }

   clearLayout(event){
    this.props.activateLayout(false);
   }

   render() {

  //   console.log("quiz data length: "+this.props.quizData.length);
let test ;


    const { classes ,SideDrawerLoaderVisible, catSelection} = this.props;

    const setCatSelection = this.props.setCatSelection;
    const setQuizName = this.props.setQuizName;
    const setQuizCat = this.props.setQuizCat;


    const quizClick = (key => {
      //  console.log('selected quiz :' + key.quiz + ' ' + key.key);
        setQuizName(key);
        catSelection.forEach((selection)=>{
         if(selection.quiz == key.key){
           selection.open = !selection.open;
           setCatSelection(catSelection);
         }
       });


     });

     const catClick = (key => {
      //   console.log('selected cat :' + key);
         setQuizCat(key);

      });

    const isVisible = (quizName)=>{

      let currentQuiz = catSelection.filter(a=>a.quiz == quizName);

      if (currentQuiz.length == 0) return false;

      return currentQuiz[0].open;
    };

    return (
      <div>
        <Drawer open = {this.state.modalShow} >
            <div className = "inner">
              <AppBar position="static">
               <Toolbar>
                   <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                     <MenuIcon onClick={()=>{ this.toggleDrawer(false);}}/>
                   </IconButton>

                   <Button color="inherit" className ={classes.tolowerBtn}>
                     <Typography variant="h6" color="inherit" >
                       Select Quiz
                     </Typography>
                   </Button>

               </Toolbar>
             </AppBar>
             <List>
               {this.props.quizMetaData.map(function(item, index){
                    return <div key= {index}><QuizItem label ={item.quiz}  id = {item.key} onClick = {quizClick}></QuizItem>
                       <QuizItemCats names = {item.cats}  id = {index} onClick = {catClick}  isVisible ={isVisible(item.key)}></QuizItemCats> </div>;
               })}
             </List>

             <SelectionToolBar/>

          </div>
        </Drawer>
      </div>
    );
  }
}

SideDrawer.defaultProps = {
  show: false,

};

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};




const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    quizMetaData : state.quizMetaData,
    catSelection : state.catSelection,
    selectQuizCat : state.selectQuizCat,
    selectedQuiz : state.selectedQuiz,
//    quizAddMode :state.quizAddMode,
  //  quizDeleteMode :state.quizDeleteMode,
    ScriptId : state.GoogleApiParams.scriptId
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },
    setQuizMetaData :data =>{
      dispatch(setQuizMetaData(data))
    },
    setCatSelection :data =>{
      dispatch(setCatSelection(data))
    },
    setQuizName :selectedQuiz =>{
      dispatch(setQuizName(selectedQuiz))
    },
    setQuizCat :selectQuizCat =>{
      dispatch(setQuizCat(selectQuizCat))
    }

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));
