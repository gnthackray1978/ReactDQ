import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavItem from 'react-bootstrap/NavItem';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {PropTypes,func} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import ControlIcon from '@material-ui/icons/OpenWith';
import InfoIcon from '@material-ui/icons/FeedBack';

import { connect } from "react-redux";
import {setInTest ,selectQuizName,selectQuizCat} from "../../actions/creators.jsx";
import GoogleConnect  from "./GoogleConnect.jsx";

import './TopButtons.css';

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

   }

   static defaultProps = {
     isData: true
   };


  render() {

    const { classes,selectQuizName,selectQuizCat } = this.props;

    let buttons;

    const responseGoogle = (response) => {
      console.log(response);
    }


     return (

        <Toolbar>

          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon  onClick={()=>{ this.props.modeChanged('data'); }}/>
          </IconButton>

          <Button color="inherit"  onClick={()=>{ this.props.setInTest(!this.props.inTest); }}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              Start
            </Typography>
          </Button>




          <Button color="inherit"  className={classes.grow}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              {selectQuizName + ' ' + selectQuizCat}
            </Typography>
          </Button>



          <GoogleConnect mode = "login"></GoogleConnect>

        </Toolbar>

     )
   }

}



const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    inTest : state.inTest,
    selectQuizName :state.selectQuizName,
    selectQuizCat : state.selectQuizCat

  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },
    setInTest :inTest =>{
      dispatch(setInTest(inTest))
    }

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopButtons));
