
export default (state = {}, action) => {
  switch (action.type) {

    case "123TEST":
        return {
          ...state,
          onetwothreetest: true
        };

    default:
        return state;
    }
};
