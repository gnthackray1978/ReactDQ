// testActive: false,
// currentTest : undefined,
// quizMetaData : [],
// userAnswers :{
// userAnswersMapQuizInstance :{
// serverAnswers :{
// testList :{
// quizQuestions : {


export default (state = {
  testActive: false,

  currentTest : undefined,

  quizMetaData : [],

  userAnswers :{
    index :[]
  },

  userAnswersMapQuizInstance :{
    index :[]
  },

  serverAnswers :{
    index :[]
  },

  testList :{
    index :[]
  },

  quizQuestions : {
    index :[]
  },
}, action) => {
  switch (action.type) {

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



    case "SET_QUIZMETADATA":
      return {
      ...state,

        quizMetaData : [...action.quizMetaData]

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



  default:
      return state;
  }
};
