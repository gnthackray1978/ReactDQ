import { createStore, applyMiddleware,compose  } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers/reducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
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


    quizMetaData : [],

    userAnswers :{
      index :[]
    },

    userAnswersMapQuizInstance :{
      index :[]
    },


    correctAnswers :{
      index :[]
    },

    // export const setRelatedUserAnswers = data =>{
    //   return async dispatch  => {
    //     dispatch({
    //       type: "SET_RELATEDUSERANSWERS",
    //       data : data
    //     });
    //   };
    // }

    quizQuestions : {
      index :[]
    },

    questionVisibility :{

    },

    catSelection :[],

    selectedQuiz : {},

    selectQuizCat : '',

    profileObj : '',
    googleApiLoggedIn : false,

    TestState : {
      Id :0,
      Active : false,
      TimeStamp : 0 //timestamp
    }

  },
  composeEnhancers(
     applyMiddleware(thunk)
   )
);

const unsubscribe = store.subscribe((arg) => {

  const roughSizeOfObject = function( object ) {

      var objectList = [];
      var stack = [ object ];
      var bytes = 0;

      while ( stack.length ) {
          var value = stack.pop();

          if ( typeof value === 'boolean' ) {
              bytes += 4;
          }
          else if ( typeof value === 'string' ) {
              bytes += value.length * 2;
          }
          else if ( typeof value === 'number' ) {
              bytes += 8;
          }
          else if
          (
              typeof value === 'object'
              && objectList.indexOf( value ) === -1
          )
          {
              objectList.push( value );

              for( var i in value ) {
                  stack.push( value[ i ] );
              }
          }
      }
      return bytes;
  }

  console.log("store size: " + roughSizeOfObject(store.getState()));
});

export default store;



//
// client_id: clientId,

//      hosted_domain: hostedDomain,

//      discoveryDocs,

//      redirect_uri: redirectUri,
