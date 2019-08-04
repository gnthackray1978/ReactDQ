import {ScoreLib} from "../../scripts/ScoreLib.js";

// Selector
//export const resetUserAnswers= (questionId) =>{
export const getScore = (questionId, state) => {

  let userAnswersMapQuizInstance = state.db.userAnswersMapQuizInstance;
  let currentTest = state.db.currentTest;

  let score = ScoreLib.GetScoreForQuestion(userAnswersMapQuizInstance,questionId,currentTest) + '%';

  return score;
};


export const isQuestionVisible = (questionId, state) =>{

  let selectedCategory = state.applicationState.selectQuizCat;

  let quizKey = state.applicationState.selectedQuiz.key;

  let questionVisibilityObj = state.applicationState.questionVisibility;

  let questionKey = questionId + '-' + quizKey + '-'+ selectedCategory;

  let answerVisible = true;

  if(Object.prototype.hasOwnProperty.call(questionVisibilityObj, questionKey)){
     answerVisible = questionVisibilityObj[questionKey].visible;
  }

  return answerVisible;

};

//ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers)
export const GetCorrectAnswersForQuestion = (questionData, state) =>{

  let serverAnswers = state.db.serverAnswers;


  return ScoreLib.GetCorrectAnswersForQuestion(questionData, serverAnswers);

};

//ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionData.id,currentTest)
export const GetUserAnswersForQuestion = (questionId, state) =>{

  let userAnswersMapQuizInstance = state.db.userAnswersMapQuizInstance;
  let userAnswers = state.db.userAnswers;
  let currentTest = state.db.currentTest;
  let result = ScoreLib.GetUserAnswersForQuestion(userAnswers, userAnswersMapQuizInstance,questionId,currentTest);

  return result;

};
