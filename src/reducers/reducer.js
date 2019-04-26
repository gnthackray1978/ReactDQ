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

    case "SET_GOOGLEAPIACTIVE":
      return {
      ...state,
      googleApiLoggedIn : action.googleApiLoggedIn,
    };

    case "SET_QUIZDATA":
      return {
      ...state,
      quizData : action.quizData,
    };



  default:
      return state;
  }
};
