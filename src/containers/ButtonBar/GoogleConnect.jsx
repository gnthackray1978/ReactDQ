
import Fab from '@material-ui/core/Fab';

import React, { Component } from 'react';

import blue from '@material-ui/core/colors/blue';
import loadScript from './load-script.js';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import {GoogleLib} from "../../scripts/GoogleLib.js";
import {PropTypes,func} from 'prop-types';
import {setProfileObj ,setGoogleApiActive,setQuizMetaData,setGoogleToken,setLoginDetailsVisible,setCatSelection } from "../../actions/creators.jsx";
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
     this.handleSigninSuccess = this.handleSigninSuccess.bind(this);
     this.handleClose = this.handleClose.bind(this);
   }

   static defaultProps = {
     isData: true
   };


    componentDidMount() {
      if (window.gapi) return;

      loadScript(document, 'script', 'google-login', this.props.jsSrc, () => {

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
            access_type: this.props.AccessType,
              responseType: this.props.responseType
          };

          GoogleLib.AutoConnect(window.gapi, params, (res)=>{
            this.handleSigninSuccess(res);

            GoogleLib.SearchForQuizFiles(window.gapi, this.props.ScriptId, (arg)=>{
              this.props.setQuizMetaData(arg);

              var selection =[];

              arg.forEach((arg)=>{
                selection.push({quiz: arg.key , open:false});
              });

              this.props.setCatSelection(selection);
            });
          });
      });


    }

    componentWillUnmount() {
      // this.enableButton = () => {}
      // const el = document.getElementById('google-login')
      // el.parentNode.removeChild(el)
    }

    handleSigninSuccess(res) {
       const basicProfile = res.getBasicProfile();
       const authResponse = res.getAuthResponse();

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

    //   console.log('signed in ok');
    }

    signIn(e) {
      if (e) {
        e.preventDefault();
      }
      if (!this.props.GoogleApiLoggedIn) {

        const { responseType } = this.props;

        const params = {
          prompt,
          responseType : responseType
        };

        GoogleLib.SignIn(window.gapi, params, (res)=>{
          this.handleSigninSuccess(res);
        }, ()=>{

        });

      }
    }

    signOut() {

      GoogleLib.SignOut(window.gapi, ()=>{
        this.props.setProfileObj();
        this.props.setGoogleToken(undefined,undefined,undefined,undefined);
        this.props.setGoogleApiActive(false);
        this.props.setQuizMetaData(undefined);
        this.props.onLogoutSuccess();
      });

    }


    handleClickOpen = () => {
      this.props.setLoginDetailsVisible(true);
    }

    handleClose = value => {
      this.props.setLoginDetailsVisible(false);
    }

  renderLogoutOptions(){
    return(<div>
        <GoogleButton label ='Logout' mode = 'logout' onClick ={()=>{
              this.signOut();
              this.props.handleClick();
            }}/>

        <GoogleButton label ='Cancel' mode = 'cancel' onClick ={()=>{
              this.props.handleClick();
             }}/>
      </div>);
  }

  renderLogin() {
    //console.log('google api logged in: '+  this.props.GoogleApiLoggedIn);

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
  //console.log('mapStateToProps');

  return {
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
    setSideDrawerLoaderVisible :visible =>{
      dispatch(setSideDrawerLoaderVisible(visible))
    },
    setLoginDetailsVisible :visible =>{
      dispatch(setLoginDetailsVisible(visible))
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
    setQuizMetaData :data =>{
      dispatch(setQuizMetaData(data))
    },
    setCatSelection :data =>{
      dispatch(setCatSelection(data))
    },

  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleConnect));
