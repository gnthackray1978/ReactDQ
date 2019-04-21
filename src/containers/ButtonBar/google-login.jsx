import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from './icon';
import ButtonContent from './button-content';
import { connect } from "react-redux";
import {setProfileObj ,setGoogleApiActive,setQuizData } from "../../actions/creators.jsx";
import loadScript from './load-script';

const styles = theme => ({

});

class GoogleLogin extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
    //  disabled: true,
      hovered: false,
      active: false
    };
  }

  enableButton() {
    this.setState({
      disabled: false
    })
  }



  signIn(e) {
    if (e) {
      e.preventDefault();
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { onSuccess, onFailure, prompt, responseType } = this.props;
      const options = {
        prompt
      };

      if (responseType === 'code') {
        auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err));
      } else {
        auth2.signIn(options).then(res => this.handleSigninSuccess(res), err => onFailure(err));
      }
    }
  }

  handleSigninSuccess(res) {
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();

    this.props.setGoogleToken(basicProfile.getId(),authResponse,authResponse.id_token,authResponse.access_token);
    this.props.setGoogleApiActive(true);
    
    this.props.setProfileObj({
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    });

  }

  render() {
    const { tag, type, className, disabledStyle, buttonText, children, render, theme, icon } = this.props;

    const disabled = this.state.disabled || this.props.disabled;



    if (render) {
      return render({ onClick: this.signIn, disabled });
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
      fontFamily: 'Roboto, sans-serif'
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
      if (disabled) {
        return Object.assign({}, initialStyle, disabledStyle);
      }

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


    const googleLoginButton = React.createElement(
      tag,
      {
        onMouseEnter: () => this.setState({ hovered: true }),
        onMouseLeave: () => this.setState({ hovered: false, active: false }),
        onMouseDown: () => this.setState({ active: true }),
        onMouseUp: () => this.setState({ active: false }),
        onClick: this.signIn,
        style: defaultStyle,
        type,
        disabled,
        className
      },
      [
        icon && <Icon key={1} active={this.state.active} />,
        <ButtonContent icon={icon} key={2}>
          {children || buttonText}
        </ButtonContent>
      ]
    )

    return googleLoginButton
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  redirectUri: PropTypes.string,

  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,

  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,

  responseType: PropTypes.string,
  type: PropTypes.string,

  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
}



const mapStateToProps = state => {
  return {
    SideDrawerLoaderVisible : state.SideDrawerLoaderVisible,
    ClientId : state.GoogleApiParams.clientId,

    LoginHint: state.GoogleApiParams.login_hint,

    QuizData : state.quizData,
    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.googleApiLoggedIn,
    ProfileObj : state.profileObj,
    type: state.GoogleApiParams.type,
    tag: state.GoogleApiParams.tag,
    buttonText: state.GoogleApiParams.buttonText,
    prompt: state.GoogleApiParams.prompt,
    disabledStyle: state.GoogleApiParams.disabledStyle,
    icon: state.GoogleApiParams.icon,
    theme: state.GoogleApiParams.theme,
    jsSrc: state.GoogleApiParams.jsSrc


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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleLogin));
