export default (state = {
  quizAddName : '',
  quizEditName : '',

  questionVisibility :{

  },

  catSelection :[],

  selectedQuiz : {
    key: '',
    quiz :'Not Set'
  },
  selectQuizCat : ''
}, action) => {
  switch (action.type) {

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

    case "SET_CATSELECTION":
      return {
      ...state,
      catSelection : [...action.catSelection],
    };




  default:
      return state;
  }
};
