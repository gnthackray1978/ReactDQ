import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers/reducer.js";

export default createStore(
  reducer,
  {
    SideDrawerLoaderVisible : true,
    LogInDetailsVisible : false,
    GoogleApiParams : {
      scriptId : "MQ9uI5jQzqKm4wt01EV3l5pIG0z7T6jhI",
      clientId : '183174195107-spa00qp12u40nj4kb8od7nudc149l74q.apps.googleusercontent.com',
      scopes : 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/spreadsheets',
      cookie_policy: 'single_host_origin',
      login_hint: 'login hint',
      fetch_basic_profile : true,
      uxMode: 'popup',
      accessType: 'online',

      type: 'button',
      tag: 'button',
      buttonText: 'Sign in with Google',
      logoutButtonTest : 'Logout',
      prompt: '',
      disabledStyle: {
        opacity: 0.6
      },
      icon: true,
      theme: 'light',
      jsSrc: 'https://apis.google.com/js/api.js'
    },
    GoogleToken :{
      googleId :undefined,
      tokenObj :undefined,
      tokenId :undefined,
      accessToken :undefined,
    },
    quizData : [],
    catSelection :[],
    profileObj : '',
    googleApiLoggedIn : false

  },
  applyMiddleware(thunk)
);

//
// client_id: clientId,

//      hosted_domain: hostedDomain,

//      discoveryDocs,

//      redirect_uri: redirectUri,
