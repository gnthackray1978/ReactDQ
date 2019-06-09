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



  default:
      return state;
  }
};
