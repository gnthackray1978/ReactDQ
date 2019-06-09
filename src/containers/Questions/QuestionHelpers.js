

export class QuestionHelpers {

  static IsAnswerVisible(questionId, quizId, questionCat, questionVisibility){
    let questionKey = questionId + '-' + quizId + '-'+ questionCat;

    let answerVisible = true;

    if(questionVisibility.hasOwnProperty(questionKey)){
       answerVisible = questionVisibility[questionKey].visible;
    }

    return answerVisible;

  }



}
