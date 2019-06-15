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


    serverAnswers :{
      index :[]
    },

    testList :{
      index :[]
    },

    currentTest : undefined,

    testActive: false,

    quizQuestions : {
      index :[]
    },

    questionVisibility :{

    },

    catSelection :[],

    selectedQuiz : {
      key: '',
      quiz :'Not Set'
    },

    //answer store


    selectQuizCat : '',

    profileObj : '',
    googleApiLoggedIn : false,

    TestState : {
      Id :0,
      Active : false,
      TimeStamp : 0 //timestamp
    },


    term: "",
    status: "initial",
    order : 'asc',
    orderBy : 'date',
    selection : [],
    rawData : [],
    persons :[],
    families :[],
    gedDataRange: {s:0, e:2000},
    page : 0,
    rowsPerPage : 8,
    layout : 'descendents',
    gedLoaded :true,
    gedError :'',
    gedLoadingMessage : '',
    gedLoadingMessagesDisplayed : false,
    gedPersonListFilter : '',
    graphRunning : false,
    graphActive : false,
    graphActiveLayout  : 'descendents',
    graphActiveSelection :[],
    context : null,
    zoomin:false,
    zoomout:false,
    mapup:false,
    mapdown: false,
    mapleft :false,
    mapright :false,


    //SideDrawerLoaderVisible : true,
    SideDrawerLayoutOptionsVisible :false,
    SideDrawerOptionsVisible :false,

    staticSettings : {
      layoutDefaults :{
        topSpan :20.0,
        middleSpan :40.0,
        lowerSpan :20.0,
        distancesbetfam :100.0,
        boxHeight :70.0,
        boxWidth :70.0,
        distanceBetweenGens :170.0,
        distanceBetweenBoxs :30.0,
        zoomLevel :Number(100),
        zoomPercentage : 100.0,
        halfBoxWidth : 35.0,
        halfBoxHeight :35.0
      },
      colourScheme:{
        ancestor :{
          backgroundcolour : 'white',
          linecolour : 'black',
          textcolour : 'black',
          spousecolour : 'slateblue',
          globalAlpha : 0.5,
          lineWidth :2,
          heavyLineWidth :7,
          strokeStyle : '#99003A',
          defaultFont :'8pt Calibri'
        },
        descendent :{
          backgroundcolour : 'black',
          linecolour : '#99CCFF',
          textcolour : 'black',
          spousecolour : 'slateblue',
          globalAlpha : 0.5,
          lineWidth :2,
          heavyLineWidth :7,
          checkedOpenColour: 'red',
          checkedClosedColour: 'black',
          strokeStyle : '#99003A',
          defaultFont :'8pt Calibri'
        },
      }
    },
    fdSettings :{
      stiffness :400.0,
      repulsion :500.0,
      attractToCentreRepulsion :100.0,
      damping : 0.5,
      nearestPointDistance : 0.3,

      colourScheme : {
          mapbackgroundColour: 'white',//'#0A0A33',

          normalMainLabelColour: 'black',
          normalMainLabelBackground: 'white',
          normalMainShapeBackground: 'black',

          selectedMainLabelColour: 'purple',
          selectedMainLabelBackground: 'white',
          selectedMainShapeBackground: 'black',

          nearestMainLabelColour: 'blue',
          nearestMainLabelBackground: 'white',
          nearestMainShapeBackground: 'blue',


          normalInfoLabelColour: 'black',
          normalInfoLabelBackground: 'white',

          selectedInfoLabelColour: 'black',
          selectedInfoLabelBackground: 'white',

          nearestInfoLabelColour: 'white',
          nearestInfoLabelBackground: '#0A0A33',


          infoLineColour: '#0A0A33',
          normalLineGradient: ['#0066FF', '#1975FF', '#3385FF', '#4D94FF', '#66A3FF', '#80B2FF', '#99C2FF', '#CCE0FF', '#E6F0FF'],

          shadowColour: 'black',
         // maleColour: 'purple',
      //    femaleColour: 'purple'
    },
      speed :500,
      increment :5,
      year : 1670,
      sublayoutZoom:8500,
      sublayoutNodeThreshold : 20
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

//  console.log("store size: " + roughSizeOfObject(store.getState()));
});

export default store;



//
// client_id: clientId,

//      hosted_domain: hostedDomain,

//      discoveryDocs,

//      redirect_uri: redirectUri,
