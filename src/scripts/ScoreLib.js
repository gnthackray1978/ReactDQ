import {MatchLib} from './MatchLib.js';

export class ScoreLib {

  static GetScoreForSet(questionSet,callback){


    var idx = 0;
    var working = 0;
    while (idx < questionSet.length) {
      working += questionSet[idx].score;
      idx++;
    }
    var score = Math.floor(((100 / (questionSet.length * 100)) * working));

    callback(score);
  }

  static GetQuestionSetScore(questionSet){
    var idx = 0;
    var working = 0;
    while (idx < questionset.length) {
        working += questionset[idx].score;
        idx++;
    }

    var score = Math.floor(((100 / (questionset.length * 100)) * working));

    return score;
  }

  static GetScoreBasic(solution,answer,callback){

     MatchLib.Match(answer, solution, 1, (correct)=>{
        if(correct){
          callback(100);
        }
        else {
          callback(0);
        }
     });

  }

  static GetScoreMultiAnswer(correctAnswers, originalAnswers, attemptedAnswer, callback){

  //  console.log(originalAnswers.length + ' ' + correctAnswers.length);

     let remainingAnswers = ScoreLib.GetRemainingAnswers(correctAnswers, originalAnswers);



     MatchLib.Match(remainingAnswers, attemptedAnswer, 2, (correct, updatedRemaining)=>{

    //   console.log(correct.length + ' ' + correctAnswers.length + ' ' +originalAnswers.length);

       let percentile = (100 / originalAnswers.length);

       let score = Math.floor(percentile *  (correct.length + correctAnswers.length));



       callback(correctAnswers.concat(correct),score);
     });



  }

  static GetRemainingAnswers(userAnswered, correctAnswers){

  //  console.log(userAnswered + ' ' + correctAnswers);

    let difference  = correctAnswers.filter(x => !userAnswered.includes(x));

//    console.log(difference );

    return difference;

  }


  static MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance){

    if(!userAnswers){
      userAnswers ={
        index :[]
      };
    }

    if(!userAnswersMapQuizInstance){
      userAnswersMapQuizInstance ={
        index :[]
      };

    }

    let userAnswerKey = String(userAnswers.index.length );



    let existingAnswer = userAnswers.index.filter((idx)=>{
      return userAnswers[idx].answer == answer;
    });



    if(existingAnswer.length ==0){
    //  console.log('store new answer: '+ userAnswerKey);
      userAnswers[userAnswerKey] = {
        id: userAnswerKey,
        answer : answer
      };
      userAnswers.index.push(userAnswerKey);
    }
    else{
    //  console.log('answer already stored');
      userAnswerKey = existingAnswer.id;
    }

  //  console.log('userAnswers 0: ' + userAnswers['0'].answer );

  //  console.log('userAnswers 1: ' + userAnswers['1'].answer);

    let tpAnswer = userAnswers[userAnswerKey].id;
    let compositeKey = quizId + questionId;

    if(userAnswersMapQuizInstance[compositeKey] ){
      //could have used indexOf but want to practice using reduce
      //we have the question and quiz in the store but we dont have the answer.


    //  let answerContains = userAnswersMapQuizInstance[compositeKey].answer.reduce((total, num)=>total === answer || num === answer || total == true);
      let answerContains = userAnswersMapQuizInstance[compositeKey].answer.filter((idx)=>{
        return idx == answer;
      });

  //    console.log('map exists: ' + answerContains );

      if(answerContains==0)
      {
        userAnswersMapQuizInstance[compositeKey].answer.push(tpAnswer);
    //    console.log('added answer' );
      }

    }
    else{
      // we don't have the quiz and the question in the store
      userAnswersMapQuizInstance[compositeKey] = {
        id: compositeKey,
        quizId : quizId,
        questionId : questionId,
        answer : [tpAnswer]
      };
      userAnswersMapQuizInstance.index.push(compositeKey);
    }



    return {
      userAnswersMapQuizInstance: userAnswersMapQuizInstance ,
      userAnswers : userAnswers
    };

  }






}
