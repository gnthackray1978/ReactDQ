import {ScoreLib} from "../../scripts/ScoreLib.js"


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

export const setQuizMetaData = data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZMETADATA",
      quizMetaData :data
    });
  };
}

export const setMetaDataCatSelection = data =>{
  return async dispatch  => {
    var selection =[];
    if(data.catSelection){
      data.catSelection.forEach((arg)=>{
        selection.push({quiz: arg.key , open:false});
      });
    }

    dispatch({
      type: "SET_QZMETADATA_CATSELECTION_BATCH",
      quizMetaData :data.meta,
      catSelection :selection

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

export const resetUserAnswers= (questionId) =>{
  return async (dispatch, getState)  => {

    // the contents of the state object come from the calling react Component
    // and are objects within the redux store.
    const {userAnswersMapQuizInstance, userAnswers, currentTest} = getState().db;

    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionId, currentTest, userAnswers, userAnswersMapQuizInstance);

    dispatch({
      type: "SET_RELATEDUSERANSWERS",
      data : {userAnswers,userAnswersMapQuizInstance}
    });
  }

};

//setRelatedUserAnswers
export const setUserAnswers= (answerInput,questionData) =>{
  return async (dispatch, getState)  => {


    // the contents of the state object come from the calling react Component
    // and are objects within the redux store.
    const {serverAnswers, userAnswersMapQuizInstance, userAnswers, currentTest} = getState().db;

    // questiondata and answerinput are generated when the user clicks on
    // stuff in the calling component.
    let answerInput = answerInput.toLowerCase();
    let questionDataId = questionData.id;


    // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionDataId, currentTest, userAnswers, userAnswersMapQuizInstance);

    let userAnswersArray = ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionDataId,currentTest);

    ScoreLib.GetScoreMultiAnswerByQueestionData(userAnswersArray, questionData, answerInput, serverAnswers,
      (updatedUserAnswers,score, isCorrect)=>{
          ScoreLib.UpdateEnteredAnswerObjs(questionData.id, currentTest, answerInput, userAnswers, userAnswersMapQuizInstance,isCorrect,score);
        //  setRelatedUserAnswers({userAnswers,userAnswersMapQuizInstance});
          dispatch({
            type: "SET_RELATEDUSERANSWERS",
            data : {userAnswers,userAnswersMapQuizInstance}
          });
    });


  };
}

export const setUserAnswersMultiChoice= (optionState,questionData) =>{
  return async (dispatch, getState)  => {


    // the contents of the state object come from the calling react Component
    // and are objects within the redux store.
    const {serverAnswers, userAnswersMapQuizInstance, userAnswers, currentTest} = getState().db;

    // questiondata and answerinput are generated when the user clicks on
    // stuff in the calling component.
    // // so that if the user changes their mind and enters the wrong answer then their score goes down.
    ScoreLib.ResetCorrectAnswersInEnteredAnswerObjs(questionData.id, currentTest, userAnswers, userAnswersMapQuizInstance);

    let result = ScoreLib.GetScoreForMultiChoice(questionData,serverAnswers,optionState);

     ScoreLib.UpdateEnteredAnswerObjs(questionData.id, currentTest, result.answer, userAnswers, userAnswersMapQuizInstance,result.isCorrect, result.score);

    dispatch({
      type: "SET_RELATEDUSERANSWERS",
      data : {userAnswers,userAnswersMapQuizInstance}
    });



  };
}
