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

import GoogleLogin from './google-login.jsx'
import GoogleLogout from './google-logout.jsx'

import {GoogleLib} from "../../scripts/GoogleLib.js";

import { connect } from "react-redux";
import {setProfileObj ,setGoogleApiActive,setQuizData,setPage,setRowsPerPage,setGoogleToken } from "../../actions/creators.jsx";
import loadScript from './load-script.js';

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

class GoogleButton extends Component {

  constructor(props) {
     super(props);
     this.handleSigninSuccess = this.handleSigninSuccess.bind(this);
   }

   static defaultProps = {
     isData: true
   };

   componentWillReceiveProps(){

   }

   componentDidMount() {

     console.log('componentDidMount');





      loadScript(document, 'script', 'google-login', this.props.jsSrc, () => {
         console.log('loadScript');
        const params = {
          client_id: this.props.ClientId,
          cookie_policy: this.props.cookiePolicy,
          login_hint: this.props.LoginHint,
          hosted_domain: undefined,
          fetch_basic_profile: this.props.FetchBasicProfile,
          discoveryDocs : undefined,
          ux_mode: this.props.UxMode,
          redirect_uri: undefined,
          scope: this.props.Scope,
          access_type: this.props.AccessType
        }

        if (this.props.responseType === 'code') {
          params.access_type = 'offline'
        }

        window.gapi.load('auth2', () => {

          if (!window.gapi.auth2.getAuthInstance()) {

            let auth2 = gapi.auth2.init({
                client_id: this.props.ClientId,
                scope:  this.props.Scope
            });

            // Listen for sign-in state changes.
            auth2.isSignedIn.listen((res)=>{
              console.log(res);
            });

            // Listen for changes to current user.
            auth2.currentUser.listen((res)=>{
              console.log(res);

              if (auth2.isSignedIn.get() == true) {
                this.handleSigninSuccess(res);
              }

            });

            console.log('signed in: ' + auth2.isSignedIn.get());

            // Sign in the user if they are currently signed in.
            if (auth2.isSignedIn.get() == true) {
              auth2.signIn();
            }


          }

        })
      })
    }

    componentWillUnmount() {
      this.enableButton = () => {}
      const el = document.getElementById('google-login')
      el.parentNode.removeChild(el)
    }

    handleSigninSuccess(res) {
       const basicProfile = res.getBasicProfile()
       const authResponse = res.getAuthResponse()

       this.props.setGoogleApiActive(true);
       this.props.setGoogleToken(basicProfile.getId(),authResponse,authResponse.id_token,authResponse.access_token);

       this.props.setProfileObj({
         googleId: basicProfile.getId(),
         imageUrl: basicProfile.getImageUrl(),
         email: basicProfile.getEmail(),
         name: basicProfile.getName(),
         givenName: basicProfile.getGivenName(),
         familyName: basicProfile.getFamilyName()
       });

       console.log('signed in ok');
    }

  render() {

    console.log('google api logged in: '+  this.props.GoogleApiLoggedIn);

    const { classes, ClientId, Scope} = this.props;

    const responseGoogle = (response) => {
      console.log(response);
    }

    let buttons = <GoogleLogin onSuccess={responseGoogle} onFailure={responseGoogle} />;

    if(this.props.GoogleApiLoggedIn){
      buttons = <GoogleLogout onLogoutSuccess={responseGoogle}/>;
    }

     return (
       <div>
         {buttons}
      </div>
     )
   }

}

// GoogleApiParams : {
//   scriptId : "MQ9uI5jQzqKm4wt01EV3l5pIG0z7T6jhI",
//   clientId : '183174195107-spa00qp12u40nj4kb8od7nudc149l74q.apps.googleusercontent.com',
//   scopes : 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/spreadsheets',
// },
// quizData : [],
// displayName : '',
// googleApiLoggedIn : false

const mapStateToProps = state => {
  console.log('mapStateToProps');

  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
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

    QuizData : state.quizData,
    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.googleApiLoggedIn,
    ProfileObj : state.profileObj
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },
    setProfileObj :profileObj =>{
      dispatch(setProfileObj(profileObj))
    },
    setGoogleToken :(googleId,tokenObj,tokenId,accessToken) =>{
      dispatch(setGoogleToken(googleId,tokenObj,tokenId,accessToken))
    },
    setGoogleApiActive :isActive =>{
      dispatch(setGoogleApiActive(isActive))
    },
    setQuizData :data =>{
      dispatch(setQuizData(data))
    },

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleButton));
