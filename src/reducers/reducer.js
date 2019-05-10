export default (state = {}, action) => {
  switch (action.type) {

    case "SET_SDLOADVISIBLE":
      return {
      ...state,
      SideDrawerLoaderVisible : action.visible,
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
        selectQuizName : action.selectQuizName,
    };

    case "SET_QUIZCAT":
      return {
        ...state,
        selectQuizCat : action.selectQuizCat,
    };

    case "SET_TESTSTATE":
      return {
        ...state,
        TestState : action.testState
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

    case "SET_ANSWERDATA":
      return {
      ...state,
      answerData : action.answerData,
    };

    case "SET_CATSELECTION":
      return {
      ...state,
      catSelection : [...action.catSelection],
    };



  default:
      return state;
  }
};
