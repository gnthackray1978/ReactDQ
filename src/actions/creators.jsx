
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


export const setProfileObj= profileObj =>{
  return async dispatch  => {
    dispatch({
      type: "SET_PROFILE",
      profileObj :profileObj
    });
  };
}

export const setInTest= inTest =>{
  return async dispatch  => {
    dispatch({
      type: "SET_INTEST",
      inTest :inTest
    });
  };
}

export const setQuizName= selectQuizName =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZNAME",
      selectQuizName : selectQuizName
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

export const setQuizData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZDATA",
      quizData :data
    });
  };
}

export const setQuizCurrentData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZCURRENTDATA",
      quizCurrentData :data
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
