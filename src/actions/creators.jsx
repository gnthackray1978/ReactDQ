
export const beginSearch = term => {

  return async dispatch  => {
    dispatch({
      type: "BEGIN_SEARCH",
      term
    });

  };

};
