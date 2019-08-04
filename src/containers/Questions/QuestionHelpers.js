
export const getCurrentQuestionVisibility = (questionVisibilityObj, questionId, quizKey, selectedCategory) =>{

  let questionKey = questionId + '-' + quizKey + '-'+ selectedCategory;

  let answerVisible = true;

  if(Object.prototype.hasOwnProperty.call(questionVisibilityObj, questionKey)){
     answerVisible = questionVisibilityObj[questionKey].visible;
  }

  return answerVisible;

};
