import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonContent from './button-content'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ControlIcon from '@material-ui/icons/OpenWith';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconGoogle from './icon';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/FeedBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import NavigationIcon from '@material-ui/icons/Navigation';
import PersonIcon from '@material-ui/icons/Person';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import loadScript from './load-script.js';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {GoogleLib} from "../../scripts/GoogleLib.js";
import {PropTypes,func} from 'prop-types';
import ImageButton from "./ImageButton.jsx";



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
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

});


class GoogleButton extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
      active: false
    };

  }


  handleClick() {
    this.props.onClick(false);
  }


  render() {

    const { tag, type, className, disabledStyle, buttonText, children, render, theme, icon, ProfileObj, GoogleApiLoggedIn } = this.props;

    let disabled = false;

    if(this.props.mode != 'cancel'){

      if(this.props.mode == 'logout' && this.props.GoogleApiLoggedIn){
        disabled = false;
      }
      if(this.props.mode == 'logout' && !this.props.GoogleApiLoggedIn){
        disabled = true;
      }

      if(this.props.mode == 'login' && this.props.GoogleApiLoggedIn){
        disabled = true;
      }


    }





    if (render) {
      return render({ onClick: this.handleClick, disabled });
    }

    const initialStyle = {
      backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
      padding: 0,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Roboto, sans-serif',
      marginLeft:25
    };

    const hoveredStyle = {
      cursor: 'pointer',
      opacity: 0.9
    };

    const activeStyle = {
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      opacity: 1
    };

    const defaultStyle = (() => {


      if (this.state.active) {
        if (theme === 'dark') {
          return Object.assign({}, initialStyle, activeStyle);
        }

        return Object.assign({}, initialStyle, activeStyle);
      }

      if (this.state.hovered) {
        return Object.assign({}, initialStyle, hoveredStyle);
      }

      return initialStyle;
    })();

    const { classes, onClose, selectedValue, open } = this.props;

//    let disabled =false;
    //
    const genericProps = {
      onMouseEnter: () => this.setState({ hovered: true }),
      onMouseLeave: () => this.setState({ hovered: false, active: false }),
      onMouseDown: () => this.setState({ active: true }),
      onMouseUp: () => this.setState({ active: false }),
      onClick: ()=>{
        this.handleClick();
      } ,
      style: defaultStyle,
      type,
      disabled,
      className
    };

    let content;

    if(this.props.mode == 'cancel'){
      content = [
        <ButtonContent>
          {this.props.label}
        </ButtonContent>
      ];
    }

    if(this.props.mode == 'login' || this.props.mode == 'logout'){
      content = [
        icon && <IconGoogle key={1} active={this.state.active} />,
        <ButtonContent icon={icon} key={2}>
          {this.props.label}
        </ButtonContent>
      ];
    }

    return React.createElement(tag, genericProps,content);
  }
}




const mapStateToProps = state => {

  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    LogInDetailsVisible : state.LogInDetailsVisible,
    ClientId : state.GoogleApiParams.clientId,
    Scope : state.GoogleApiParams.scopes,
    cookiePolicy: state.GoogleApiParams.cookie_policy,
    LoginHint: state.GoogleApiParams.login_hint,
    FetchBasicProfile : state.GoogleApiParams.fetch_basic_profile,
    UxMode: state.GoogleApiParams.uxMode,
    AccessType: state.GoogleApiParams.accessType,
    type: state.GoogleApiParams.type,
    tag: state.GoogleApiParams.tag,
    buttonText: state.GoogleApiParams.buttonText,
    prompt: state.GoogleApiParams.prompt,
    disabledStyle: state.GoogleApiParams.disabledStyle,
    icon: state.GoogleApiParams.icon,
    theme: state.GoogleApiParams.theme,
    jsSrc: state.GoogleApiParams.jsSrc,

    QuizMetaData : state.quizMetaData,
    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.googleApiLoggedIn,
    ProfileObj : state.profileObj
  };
};

const mapDispatchToProps = dispatch => {

  return {

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleButton));
