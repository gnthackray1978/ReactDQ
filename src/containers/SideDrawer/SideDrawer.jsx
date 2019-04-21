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
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css';

import { connect } from "react-redux";
import { switchControlVisbility,reset,setSideDrawerLoaderVisible} from "../../actions/creators.jsx";




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

});

 class SideDrawer extends Component {

   constructor(props) {
      super(props);
       this.state = {
         modalShow: this.props.show ,
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

    const { classes ,SideDrawerLoaderVisible} = this.props;

    return (
      <div>
        <Drawer open={this.state.modalShow} >
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
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    }

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));
