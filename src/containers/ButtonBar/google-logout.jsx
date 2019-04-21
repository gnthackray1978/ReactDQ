import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Icon from './icon'
import ButtonContent from './button-content'
import loadScript from './load-script'
import { connect } from "react-redux";
import {setProfileObj ,setGoogleApiActive,setQuizData } from "../../actions/creators.jsx";



class GoogleLogout extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.state = {

      hovered: false,
      active: false
    }
  }

  signOut() {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect().then(()=>{
          this.props.setProfileObj();
          this.props.setGoogleToken(undefined,undefined,undefined,undefined);
          this.props.setGoogleApiActive(false);
          this.props.setQuizData(undefined);
          this.props.onLogoutSuccess();
        }))
      }
    }
  }

  render() {
    const { tag, type, className, disabledStyle, buttonText, children, render, theme, icon } = this.props;
    const disabled = false;

    if (render) {
      return render({ onClick: this.signOut, disabled })
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
    }

    const hoveredStyle = {
      cursor: 'pointer',
      opacity: 0.9
    }

    const activeStyle = {
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
      color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      opacity: 1
    }

    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, initialStyle, disabledStyle)
      }

      if (this.state.active) {
        if (theme === 'dark') {
          return Object.assign({}, initialStyle, activeStyle)
        }

        return Object.assign({}, initialStyle, activeStyle)
      }

      if (this.state.hovered) {
        return Object.assign({}, initialStyle, hoveredStyle)
      }

      return initialStyle
    })()
    const GoogleLogoutButton = React.createElement(
      tag,
      {
        onMouseEnter: () => this.setState({ hovered: true }),
        onMouseLeave: () => this.setState({ hovered: false, active: false }),
        onMouseDown: () => this.setState({ active: true }),
        onMouseUp: () => this.setState({ active: false }),
        onClick: this.signOut,
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

    return GoogleLogoutButton
  }
}

GoogleLogout.propTypes = {
  jsSrc: PropTypes.string,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  onLogoutSuccess: PropTypes.func,
  type: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
}


const mapStateToProps = state => {
  return {

    ClientId : state.GoogleApiParams.clientId,

    LoginHint: state.GoogleApiParams.login_hint,

    QuizData : state.quizData,
    DisplayName : state.displayName,
    GoogleApiLoggedIn : state.googleApiLoggedIn,
    ProfileObj : state.profileObj,
    type: state.GoogleApiParams.type,
    tag: state.GoogleApiParams.tag,
    buttonText: state.GoogleApiParams.logoutButtonTest,
    prompt: state.GoogleApiParams.prompt,
    disabledStyle: state.GoogleApiParams.disabledStyle,
    icon: state.GoogleApiParams.icon,
    theme: state.GoogleApiParams.theme,
    jsSrc: state.GoogleApiParams.jsSrc


  };
};

const mapDispatchToProps = dispatch => {

  return {

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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GoogleLogout));
