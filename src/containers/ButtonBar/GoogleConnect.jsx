
import Fab from '@material-ui/core/Fab';

import React, { Component } from 'react';

import blue from '@material-ui/core/colors/blue';
import loadScript from './load-script.js';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import {GoogleLib} from "../../scripts/GoogleLib.js";
import {PropTypes,func} from 'prop-types';

import {setQuizMetaData } from "../../store/actions/dbActions.jsx";

import {setCatSelection } from "../../store/actions/appStateActions.jsx";

import {setGoogleApi, setGoogleSignOutState} from "../../store/actions/googleActions.jsx";

import {setLoginDetailsVisible } from "../../store/actions/uxActions.jsx";

import ImageButton from "./ImageButton.jsx";
import GooglePopup from "./GooglePopup.jsx";
import GoogleButton from "./GoogleButton.jsx";

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



class GoogleConnect extends Component {

  constructor(props) {

     super(props);

     this.handleClose = this.handleClose.bind(this);
   }

   static defaultProps = {
     isData: true
   };


    componentDidMount() {
      if (window.gapi) return;

      loadScript(document, 'script', 'google-login', this.props.jsSrc, () => {
          GoogleLib.AutoConnect(window.gapi, this.props.GoogleConnectParam, (res)=>{

            this.props.setGoogleApi(res);
          //  console.log('AutoConnect success');

            GoogleLib.SearchForQuizFiles(window.gapi, this.props.ScriptId, (arg)=>{
              this.props.setQuizMetaData(arg);
              this.props.setCatSelection(arg);
            });
          });
      });


    }


    signIn(e) {
      if (e) {
        e.preventDefault();
      }
      if (!this.props.GoogleApiLoggedIn) {

        GoogleLib.SignIn(window.gapi, this.props.responseType, (res)=>{

          this.props.setGoogleApi(res);
        });

      }
    }

    handleClickOpen = () => {
      console.log('handleClickOpen');
      this.props.setLoginDetailsVisible(true);
    }

    handleClose = value => {
      this.props.setLoginDetailsVisible(false);
    }

  renderLogoutOptions(){
    return(<div>
        <GoogleButton label ='Logout' mode = 'logout' onClick ={()=>{

              GoogleLib.SignOut(window.gapi, ()=>{
                this.props.setGoogleSignOutState();
              });

              this.props.handleClick();
            }}/>

        <GoogleButton label ='Cancel' mode = 'cancel' onClick ={()=>{
              this.props.handleClick();
             }}/>
      </div>);
  }

  renderLogin() {
  //  console.log('google api logged in: '+  this.props.GoogleApiLoggedIn);

    const { classes, ClientId, Scope} = this.props;

    const responseGoogle = (response) => {
//      console.log(response);
    }

    let buttons = <GoogleButton label ='Login' mode = 'login' onClick ={()=>{
          this.signIn();
        }}/>;



    let moreInfoButton;

    if(this.props.GoogleApiLoggedIn && this.props.ProfileObj){
      if(this.props.ProfileObj.imageUrl!= '')
        moreInfoButton = <ImageButton url = {this.props.ProfileObj.imageUrl}  onClick={this.handleClickOpen}/>
      else{
        if(this.props.ProfileObj.name!= '')
          moreInfoButton = <Fab color="primary" aria-label="Add" className={classes.fab}  onClick={this.handleClickOpen}>{this.props.ProfileObj.name.charAt()}</Fab>
      }
    }

    if(this.props.GoogleApiLoggedIn){
      buttons = moreInfoButton;
    }

     return (
       <div>
         {buttons}
         <GooglePopup open={this.props.LogInDetailsVisible} ProfileObj ={this.props.ProfileObj}  onClose={(arg)=>{
             this.handleClose(arg);
           }} />
      </div>
     )

  }

  render() {

    let buttons = this.renderLogin();

    if(this.props.mode == 'logout'){
      buttons = this.renderLogoutOptions();
    }

    return(
      <div>

        {buttons}

      </div>
    );



   }

}


const mapStateToProps = state => {
//  console.log('mapStateToProps');

  const params = {
    client_id: state.google.GoogleApiParams.clientId,
    cookie_policy: state.google.GoogleApiParams.cookie_policy,
    login_hint: state.google.GoogleApiParams.login_hint,
    hosted_domain: undefined,
    fetch_basic_profile: state.google.GoogleApiParams.fetch_basic_profile,
    discoveryDocs : undefined,
    ux_mode: state.google.GoogleApiParams.uxMode,
    redirect_uri: undefined,
    scope: state.google.GoogleApiParams.scopes,
    access_type: state.google.GoogleApiParams.accessType,
    responseType: state.google.responseType
  };

  return {
    GoogleConnectParam : params,
    SideDrawerLoaderVisible : state.uxState.SideDrawerLoaderVisible,
    LogInDetailsVisible : state.uxState.LogInDetailsVisible,
    ClientId : state.google.GoogleApiParams.clientId,
    ScriptId : state.google.GoogleApiParams.scriptId,
    Scope : state.google.GoogleApiParams.scopes,
    cookiePolicy: state.google.GoogleApiParams.cookie_policy,
    LoginHint: state.google.GoogleApiParams.login_hint,
    FetchBasicProfile : state.google.GoogleApiParams.fetch_basic_profile,
    UxMode: state.google.GoogleApiParams.uxMode,
    AccessType: state.google.GoogleApiParams.accessType,
    type: state.google.GoogleApiParams.type,
    tag: state.google.GoogleApiParams.tag,
    buttonText: state.google.GoogleApiParams.buttonText,
    prompt: state.google.GoogleApiParams.prompt,
    disabledStyle: state.google.GoogleApiParams.disabledStyle,
    icon: state.google.GoogleApiParams.icon,
    theme: state.google.GoogleApiParams.theme,
    jsSrc: state.google.GoogleApiParams.jsSrc,

    QuizMetaData : state.db.quizMetaData,
    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.google.googleApiLoggedIn,
    ProfileObj : state.google.profileObj
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setGoogleApi : loginResponse =>{
      dispatch(setGoogleApi(loginResponse))
    },

    setGoogleSignOutState :() =>{
      dispatch(setGoogleSignOutState())
    },

    setQuizMetaData :data =>{
      dispatch(setQuizMetaData(data))
    },

    setCatSelection :data =>{
      dispatch(setCatSelection(data))
    },

    setLoginDetailsVisible :isVisible =>{
      dispatch(setLoginDetailsVisible(isVisible))
    }

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleConnect));
