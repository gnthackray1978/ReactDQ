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

  static GetCorrectAnswersForQuestion(questionData, correctAnswers){
    let carray = questionData.correctAnswers.map((id)=>{
      return correctAnswers[id].correctAnswers;
    });

    return carray;
  }

  static GetUserAnswersForQuestion(userAnswersObject, correctAnswers){

    let carray = userAnswersObject.index.map((id)=>{
      return userAnswersObject[id].answer;
    });

    return carray;
  }


  static GetScoreMultiAnswerByQueestionData(usersCorrectAnswers, questionData, attemptedAnswer,correctAnswers, callback){
    correctAnswers = questionData.correctAnswers.map((id)=>{
      return correctAnswers[id].correctAnswers;
    });


    ScoreLib.GetScoreMultiAnswer(usersCorrectAnswers, correctAnswers, attemptedAnswer, callback);

  }

  static GetScoreMultiAnswer(correctAnswers, originalAnswers, attemptedAnswer, callback){

  //  console.log(originalAnswers.length + ' ' + correctAnswers.length);

     let remainingAnswers = ScoreLib.GetRemainingAnswers(correctAnswers, originalAnswers);



     MatchLib.Match(remainingAnswers, attemptedAnswer, 2, (correct, updatedRemaining)=>{

       console.log('comparison result: '+remainingAnswers.length + ' ' + updatedRemaining.length  );

       let percentile = (100 / originalAnswers.length);

       let score = Math.floor(percentile *  (correct.length + correctAnswers.length));


       let isAttemptedAnswerCorrect = (remainingAnswers.length > updatedRemaining.length);

       callback(correctAnswers.concat(correct),score,isAttemptedAnswerCorrect);
     });



  }

  static GetRemainingAnswers(userAnswered, correctAnswers){


    //let difference  = correctAnswers.filter(x => !userAnswered.includes(x));

     let difference  = correctAnswers.filter(x => {
       return userAnswered.indexOf(x) == -1;
     });

    return difference;

  }


  static MakeRelatedUserAnswerData(questionId, instanceId, answer, userAnswers, userAnswersMapQuizInstance, isCorrect){


    const initObjectsIfReq = () => {
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
    };

    initObjectsIfReq();

    const storeUserAnswerIfReq =() =>{
      let existingAnswer = userAnswers.index.filter((idx)=>{
        return userAnswers[idx].answer == answer;
      });


      let userAnswerKey = String(userAnswers.index.length );

      //create a new answer in the user answers object
      //if our answer isnt already in there
      if(existingAnswer.length ==0){

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

      return userAnswerKey;
    };

    let userAnswerKey = storeUserAnswerIfReq();

    const mappingContainsCorrectAnswer = () => {
      let answerContains = userAnswersMapQuizInstance[compositeKey].answer.filter((idx)=>{
        return idx == userAnswerKey;
      });

      return (answerContains.length!=0);
    };

    const mappingContainsWrongAnswer = () => {
      let answerContains = userAnswersMapQuizInstance[compositeKey].wrongAnswer.filter((idx)=>{
        return idx == userAnswerKey;
      });

      return (answerContains.length!=0);
    };



    let compositeKey = instanceId + '.' +questionId;

    if(userAnswersMapQuizInstance[compositeKey] ){
      if(isCorrect){
        if(!mappingContainsCorrectAnswer())
          userAnswersMapQuizInstance[compositeKey].answer.push(userAnswerKey);
      }
      else{
        if(!mappingContainsWrongAnswer())
          userAnswersMapQuizInstance[compositeKey].wrongAnswer.push(userAnswerKey);
      }
    }
    else{
      // we don't have the quiz and the question in the store
      userAnswersMapQuizInstance[compositeKey] = {
        id: compositeKey,
        quizInstanceId : instanceId,
        questionId : questionId,
        answer : isCorrect ? [userAnswerKey] : [],
        wrongAnswer :isCorrect ? [] : [userAnswerKey],
      };

      userAnswersMapQuizInstance.index.push(compositeKey);
    }



    return {
      userAnswersMapQuizInstance: userAnswersMapQuizInstance ,
      userAnswers : userAnswers
    };

  }






}
