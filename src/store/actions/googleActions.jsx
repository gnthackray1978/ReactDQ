//update successful signIn

//update signout

export const setProfileObj= profileObj =>{
  return async dispatch  => {
    dispatch({
      type: "SET_PROFILE",
      profileObj :profileObj
    });
  };
}

// const authResponse = res.getAuthResponse();
//
//     this.props.setGoogleApiActive(true);
//     this.props.setGoogleToken(basicProfile.getId(),authResponse,authResponse.id_token,authResponse.access_token);
//
//     this.props.setProfileObj({
//       googleId: basicProfile.getId(),
//       imageUrl: basicProfile.getImageUrl(),
//       email: basicProfile.getEmail(),
//       name: basicProfile.getName(),
//       givenName: basicProfile.getGivenName(),
//       familyName: basicProfile.getFamilyName()
//     });


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

export const setGoogleApi = loginResponse =>{
  return async dispatch  => {

    const basicProfile = loginResponse.getBasicProfile();
    const authResponse = loginResponse.getAuthResponse();
    //     this.props.setGoogleToken(basicProfile.getId(),authResponse,authResponse.id_token,authResponse.access_token);

    const profileObj = {
          googleId: basicProfile.getId(),
          imageUrl: basicProfile.getImageUrl(),
          email: basicProfile.getEmail(),
          name: basicProfile.getName(),
          givenName: basicProfile.getGivenName(),
          familyName: basicProfile.getFamilyName()
        };

    console.log('setGoogleApi');

    dispatch({
      type: "SET_GOOGLEBATCH_PROFILE_ISACTIVE_TOKEN",
      googleApiLoggedIn :true,
      GoogleToken : {
        googleId :basicProfile.getId(),
        tokenObj :authResponse,
        tokenId :authResponse.id_token,
        accessToken :authResponse.access_token,
      },
      profileObj :profileObj
    });
  };
}


export const setGoogleApiActive = isActive =>{
  return async dispatch  => {
    console.log('setGoogleApiActive');
    dispatch({
      type: "SET_GOOGLEAPIACTIVE",
      googleApiLoggedIn :isActive
    });
  };
}

export const setGoogleSignOutState = isActive =>{
  return async dispatch  => {

    dispatch({
      type: "SET_GOOGLESIGNOUT",
      googleApiLoggedIn :isActive
    });
  };
}
