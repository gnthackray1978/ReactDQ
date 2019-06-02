
export const setSideDrawerLoaderVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_SDLOADVISIBLE",
      visible :visible
    });
  };
}

export const setLoginDetailsVisible = visible =>{
  return async dispatch  => {
    dispatch({
      type: "SET_LOGINLOADVISIBLE",
      visible :visible
    });
  };
}

// case "SET_QUESTIONVISIBILITY":
//   return {
//     ...state,
//     questionVisibility : action.questionVisibility,
// };

export const setQuestionVisibility= data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUESTIONVISIBILITY",
      questionVisibility :{...data}
    });
  };
}

export const setProfileObj= profileObj =>{
  return async dispatch  => {
    dispatch({
      type: "SET_PROFILE",
      profileObj :profileObj
    });
  };
}




export const setCurrentTest= (currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_CURRENTTEST",
      currentTest : currentTest
    });
  };
}

export const setTestBatch= (testList, currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTBATCH",
      currentTest : currentTest,
      testList : testList,
      testActive :true
    });
  };
}

export const setEndTestBatch= (currentTest, testList) =>{
  return async dispatch  => {


    dispatch({
      type: "SET_ENDTEST",
      currentTest : currentTest,
      testList : testList,
      testActive :false
    });

  };
}

export const setTestActive= (testActive) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTACTIVE",
      testActive : testActive
    });
  };
}

export const setQuizName= selectedQuiz =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZNAME",
      selectedQuiz : selectedQuiz
    });
  };
}
export const setQuizCat= selectQuizCat =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZCAT",
      selectQuizCat :selectQuizCat
    });
  };
}


export const setGoogleToken= (googleId,tokenObj,tokenId,accessToken) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GOOGLETOKEN",
      GoogleToken : {
        googleId :googleId,
        tokenObj :tokenObj,
        tokenId :tokenId,
        accessToken :accessToken,
      }
    });
  };
}


export const setGoogleApiActive = isActive =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GOOGLEAPIACTIVE",
      googleApiLoggedIn :isActive
    });
  };
}

export const setQuizMetaData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZMETADATA",
      quizMetaData :data
    });
  };
}



export const setQuizQuestionData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZQUESTIONDATA",
      quizQuestions :data
    });
  };
}

export const setCombinedQuizData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_COMBINEDDATA",
      data : data
    });
  };
}

export const setRelatedUserAnswers = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_RELATEDUSERANSWERS",
      data : data
    });
  };
}



export const setCatSelection = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_CATSELECTION",
      catSelection :data
    });
  };
}
