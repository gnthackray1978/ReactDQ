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
import { GoogleLogin } from 'react-google-login';

import { connect } from "react-redux";
import {setData ,setOrder,setSelected,setPage,setRowsPerPage } from "../../actions/creators.jsx";
import GoogleButton  from "./GoogleButton.jsx";

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
    marginLeft: 50,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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

    const { classes } = this.props;

    let buttons;

    const responseGoogle = (response) => {
      console.log(response);
    }


     return (
       <AppBar position="static">
        <Toolbar>

          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon  onClick={()=>{ this.props.modeChanged('data'); }}/>
          </IconButton>





          <Button color="inherit"  className={classes.grow}>
            <Typography variant="h6" color="inherit"  className ={classes.tolowerBtn}>
              Start
            </Typography>
          </Button>



          <GoogleButton></GoogleButton>

        </Toolbar>
      </AppBar>
     )
   }

}



const mapStateToProps = state => {

  return {

  };
};

const mapDispatchToProps = dispatch => {

  return {

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TopButtons));
