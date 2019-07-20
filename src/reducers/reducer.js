
export default (state = {}, action) => {
  switch (action.type) {

    case "SET_SDLOADVISIBLE":
      return {
      ...state,
      SideDrawerLoaderVisible : action.visible,
    };


    case "SET_ADDQUIZ":
      return {
      ...state,
      quizAddMode : action.quizAddMode,
    };

    case "SET_ADDQUIZNAME":
      return {
      ...state,
      quizAddName : action.quizAddName,
    };

    case "SET_EDITQUIZNAME":
      return {
      ...state,
      quizEditName : action.quizEditName,
    };


    case "SET_DELETEQUIZ":
      return {
      ...state,
      quizDeleteMode : action.quizDeleteMode,
    };

    case "SET_EDITQUIZ":
      return {
      ...state,
      quizEditMode : action.quizEditMode,
    };

    case "SET_EDITNAMEQUIZ":
      return {
      ...state,
      quizEditNameMode : action.quizEditNameMode,
    };

    case "SET_LOGINLOADVISIBLE":
      return {
      ...state,
      LogInDetailsVisible : action.visible,
    };

    case "SET_PROFILE":
      return {
        ...state,
        profileObj : action.profileObj,
    };

    case "SET_GOOGLETOKEN":
      return {
        ...state,
        GoogleToken : action.GoogleToken,
    };

    case "SET_QUIZNAME":
      return {
        ...state,
        selectedQuiz : action.selectedQuiz,
    };

    case "SET_QUESTIONVISIBILITY":
      return {
        ...state,
        questionVisibility : action.questionVisibility,
    };

    case "SET_QUIZCAT":
      return {
        ...state,
        selectQuizCat : action.selectQuizCat,
    };



    case "SET_CURRENTTEST":
      return {
        ...state,
        currentTest : action.currentTest
    };

    case "SET_TESTBATCH":
      return {
        ...state,
        testList : action.testList,
        currentTest : action.currentTest,
        testActive :action.testActive
    };

    case "SET_ENDTEST":
      return {
        ...state,
        testList : action.testList,
        currentTest : action.currentTest,
        testActive :action.testActive
    };


    case "SET_TESTACTIVE":
      return {
      ...state,
      testActive : action.testActive,
    };

    case "SET_GOOGLEAPIACTIVE":
      return {
      ...state,
      googleApiLoggedIn : action.googleApiLoggedIn,
    };

    case "SET_QUIZMETADATA":
      return {
      ...state,
      quizMetaData : [...action.quizMetaData],
    };

    case "SET_QUIZQUESTIONDATA":
      return {
      ...state,
      quizQuestions : action.quizQuestions,
    };

    case "SET_COMBINEDDATA":
      return {
      ...state,
      serverAnswers : {...action.data.answers},
      quizQuestions : {...action.data.questions},
    };

    case "SET_RELATEDUSERANSWERS":
      return {
      ...state,
      userAnswers : {...action.data.userAnswers},
      userAnswersMapQuizInstance : {...action.data.userAnswersMapQuizInstance},
    };

    case "SET_CATSELECTION":
      return {
      ...state,
      catSelection : [...action.catSelection],
    };

    case "SET_SDLAYVISIBLE":
      return {
      ...state,
      SideDrawerLayoutOptionsVisible : action.visible,
    };
    case "SET_SDOPTSVISIBLE":
      return {
        ...state,
        SideDrawerOptionsVisible : action.visible,
    };


    case "SET_GEDNAMEFILTER":
      return {
         ...state,
         graph : {
           ...state.graph,
           gedPersonListFilter : action.filter
         }
    };

    case "SET_SUBSETFDPARAMS":
      return {
         ...state,
         graph : {
           ...state.graph,
           fdSettings :{
             ...state.fdSettings,
             stiffness :action.stiffness,
             repulsion :action.repulsion,
             damping : action.damping,
             speed :action.speed,
             increment :action.increment,
             year : action.runfrom,
             sublayoutZoom:action.zoomthreshold,
             sublayoutNodeThreshold : action.nodethreshold
           }
        }
    };


    case "CONTROLS_OPEN":
        return {
          ...state,
          graph : {
            ...state.graph,
            controlVisible: true
          }
        };

    case "CONTROLS_CLOSE":
        return {
          ...state,
          graph : {
            ...state.graph,
            controlVisible: false
          }
        };


    case "YEAR_INCREMENT_INIT":
          return {
            ...state,
            graph : {
              ...state.graph,
              incrementSize : action.incrementSize,
              timeSpeed : action.timeSpeed
            }
          };

    case "GED_LOAD_STATUS":
          return {
            ...state,
            graph : {
              ...state.graph,
              gedLoadingMessage : action.gedLoadingMessage,
              gedLoadingMessagesDisplayed : action.gedLoadingMessagesDisplayed
            }
          };
    case "GED_LOAD_ERROR":
          return {
            ...state,
            graph : {
              ...state.graph,
              gedLoaded :action.gedLoaded,
              gedError :action.gedError
            }
          };


    case "SET_CONTEXT":
          return {
            ...state,
            graph : {
              ...state.graph,
              context : action.context,
            }
          };


    case "ACTIVATE_GRAPH":
          return {
            ...state,
            graph : {
              ...state.graph,
              graphActive : action.graphActive,
              graphActiveLayout :action.graphActiveLayout,
              graphActiveSelection :action.graphActiveSelection
            }
          };



    case "SET_DATA":
          return {
            ...state,
            graph : {
              ...state.graph,
              persons : action.persons,
              families: action.families,
              gedDataRange: action.gedDataRange,
              gedLoaded :true
            }
          };

    case "ZOOMIN_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              zoomin : action.isSet,
            }
          };

    case "ZOOMOUT_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              zoomout : action.isSet,
            }
          };

    case "MAPUP_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              mapup : action.isSet,
            }
          };

    case "MAPDOWN_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              mapdown : action.isSet,
            }
          };

    case "MAPLEFT_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              mapleft : action.isSet,
            }
          };

    case "MAPRIGHT_DOWN":
          return {
            ...state,
            graph : {
              ...state.graph,
              mapright : action.isSet,
            }
          };

    case "TOGGLE_GRAPHRUNNING":
          return {
            ...state,
            graph : {
              ...state.graph,
              graphRunning : action.isSet,
            }
          };



  default:
      return state;
  }
};
