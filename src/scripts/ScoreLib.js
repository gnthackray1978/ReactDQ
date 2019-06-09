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

  static MakeTestHistoryObj(testList, userAnswersMapQuizInstance){
    const numTests = testList.index.length;

    let testHistory = [{
      quizName: 'test data',
      score: 95,
      started : '9am 12/4/2019',
      ended : '10am 12/4/2019'
    }];

    if(testList.index.length > 0){
        testHistory = testList.index.map((key)=>{
        // this.props.testList[key]

        let scores = userAnswersMapQuizInstance.index.map((instancedata)=>{
          // id: compositeKey,
          // quizInstanceId : instanceId,
          // questionId : questionId,
          // score : score,
          // answer : isCorrect ? [userAnswerKey] : [],
          // wrongAnswer :isCorrect ? [] : [userAnswerKey],

          if(userAnswersMapQuizInstance[instancedata].quizInstanceId == testList[key].id){
            return userAnswersMapQuizInstance[instancedata].score;
          }
        });

        let total = scores.reduce((total,sum)=>{
            return total+sum;
        });


        return {
          quizName: testList[key].quizName.quiz,
          score: total,
          started : testList[key].startedTime.toLocaleString(),
          ended : testList[key].endTime.toLocaleString()
        };

        // this.props.testList[key] = {
        //   id: key,
        //   quizName : this.props.selectedQuiz,
        //   quizCat : this.props.selectQuizCat,
        //   startedTime : new Date(),
        //   active : true
        // };

        });
    }

    return testHistory;
  }

  static GetScoreForQuestion(userAnswersMapQuizInstance, questionId, instanceId){
    let compositeKey = instanceId + '.' +questionId;

    let mapping = userAnswersMapQuizInstance[compositeKey];

    if(!mapping){
      return 0;
    }
    else{
      return userAnswersMapQuizInstance[compositeKey].score;
    }

  }

  static GetScoreForTest(userAnswersMapQuizInstance, instanceId, numberofquestions){

     console.log('GetScoreForTest : '+instanceId);
    //
    // userAnswersMapQuizInstance.index.forEach((e)=>{
    //   console.log(userAnswersMapQuizInstance[e].id);
    //
    //
    // });

    let scores = userAnswersMapQuizInstance.index.filter(f=>userAnswersMapQuizInstance[f].quizInstanceId == instanceId).map(m=>{

     if(userAnswersMapQuizInstance[m].score  ==0) return 0;

      return userAnswersMapQuizInstance[m].score /100;
    });


    let total = 0;

    if(scores.length >0){
        total= scores.reduce((total,sum)=>{
            return total+sum;
        });
    }


    return (total/ numberofquestions)*100;

  }

  static GetCorrectAnswersForQuestion(questionData, correctAnswers){
    let carray = questionData.correctAnswers.map((id)=>{
      return correctAnswers[id].answerText;
    });

    return carray;
  }

  static GetUserAnswersForQuestion(userAnswersObject, userAnswersMapQuizInstance, questionId, instanceId){
    // return answers for a given question id and test instance
    //user info not implemented yet
    let compositeKey = instanceId + '.' +questionId;
    let carray = [];


    let returnAnswers= (item)=>{
      return userAnswersObject.index.filter((str)=>{
        return item == userAnswersObject[str].id;
      }).map((id)=>{
          return userAnswersObject[id].answer;
      });
    };

    if(userAnswersMapQuizInstance[compositeKey]){
      carray = userAnswersMapQuizInstance[compositeKey].answer.map((item)=>{
        return returnAnswers(item);
      });
    }


    return carray;
  }


  static GetScoreMultiAnswerByQueestionData(usersAnswers, questionData, attemptedAnswer,answersArg, callback){
    let correctAnswersArg = questionData.correctAnswers.map((id)=>{
      return answersArg[id].answerText;
    });


    ScoreLib.GetScoreMultiAnswer(usersAnswers, correctAnswersArg, attemptedAnswer, callback);

  }

  static GetScoreMultiAnswer(userAnswers, correctAnswersArg, attemptedAnswer, callback){

  //  console.log(originalAnswers.length + ' ' + correctAnswers.length);

     let remainingAnswers = ScoreLib.GetRemainingAnswers(userAnswers, correctAnswersArg);

     //if the correct answers that the user has already entered
     //match the original answers
     if(userAnswers.length == correctAnswersArg.length){
       callback(userAnswers,100,true);
     }
     else{
       MatchLib.Match(remainingAnswers, attemptedAnswer, 2, (correct, updatedRemaining)=>{

      //   console.log('comparison result: '+remainingAnswers.length + ' ' + updatedRemaining.length  );

         let percentile = (100 / correctAnswersArg.length);



         let score = Math.floor(percentile *  (correctAnswersArg.length - updatedRemaining.length));


         let isAttemptedAnswerCorrect = (remainingAnswers.length > updatedRemaining.length);

         callback(userAnswers.concat(correct),score,isAttemptedAnswerCorrect);
       });
      }


  }

  static GetRemainingAnswers(userAnswered, correctAnswers){


    //let difference  = correctAnswers.filter(x => !userAnswered.includes(x));
    userAnswered = userAnswered.map((m)=>{
      return String(m).toLowerCase();
    });
    correctAnswers = correctAnswers.map((m)=>{
      return String(m).toLowerCase();
    });

     let difference  = correctAnswers.filter(x => {
       return userAnswered.indexOf(x) == -1;
     });

    return difference;

  }


  static UpdateEnteredAnswerObjs(questionId, instanceId, answer, refUserAnswers, refUserAnswersMapQuizInstance, isCorrect,score){


    const initObjectsIfReq = () => {
        if(!refUserAnswers){
          refUserAnswers ={
            index :[]
          };
        }

        if(!refUserAnswersMapQuizInstance){
          refUserAnswersMapQuizInstance ={
            index :[]
          };

        }
    };

    initObjectsIfReq();

    const storeUserAnswerIfReq =() =>{
      let existingAnswer = refUserAnswers.index.filter((idx)=>{
        return refUserAnswers[idx].answer == answer;
      });


      let userAnswerKey = String(refUserAnswers.index.length );

      //create a new answer in the user answers object
      //if our answer isnt already in there
      if(existingAnswer.length ==0){

        refUserAnswers[userAnswerKey] = {
          id: userAnswerKey,
          answer : answer,
          deleted : false
        };
        refUserAnswers.index.push(userAnswerKey);
      }
      else{
      //  console.log('answer already stored');
        userAnswerKey = refUserAnswers[existingAnswer].id;
      }

      return userAnswerKey;
    };

    // add answer to the user answer object
    // and return the new id
    let userAnswerKey = storeUserAnswerIfReq();

    const mappingContainsCorrectAnswer = () => {
      let answerContains = refUserAnswersMapQuizInstance[compositeKey].answer.filter((idx)=>{
        return idx == userAnswerKey;
      });

      return (answerContains.length!=0);
    };

    const mappingContainsWrongAnswer = () => {
      let answerContains = refUserAnswersMapQuizInstance[compositeKey].wrongAnswer.filter((idx)=>{
        return idx == userAnswerKey;
      });

      return (answerContains.length!=0);
    };



    let compositeKey = instanceId + '.' +questionId;

    if(refUserAnswersMapQuizInstance[compositeKey] ){
      if(isCorrect){
        if(!mappingContainsCorrectAnswer())
          refUserAnswersMapQuizInstance[compositeKey].answer.push(userAnswerKey);
          refUserAnswersMapQuizInstance[compositeKey].score = score;
      }
      else{
        if(!mappingContainsWrongAnswer())
          refUserAnswersMapQuizInstance[compositeKey].wrongAnswer.push(userAnswerKey);
      }
    }
    else{
      // we don't have the quiz and the question in the store
      refUserAnswersMapQuizInstance[compositeKey] = {
        id: compositeKey,
        quizInstanceId : instanceId,
        questionId : questionId,
        score : score,
        answer : isCorrect ? [userAnswerKey] : [],
        wrongAnswer :isCorrect ? [] : [userAnswerKey],
      };

      refUserAnswersMapQuizInstance.index.push(compositeKey);
    }



    return {
      refUserAnswersMapQuizInstance: refUserAnswersMapQuizInstance ,
      refUserAnswers : refUserAnswers
    };

  }

  static ResetCorrectAnswersInEnteredAnswerObjs(questionId, instanceId, refUserAnswers, refUserAnswersMapQuizInstance){

    let compositeKey = instanceId + '.' +questionId;

    if(refUserAnswersMapQuizInstance[compositeKey] ){
          refUserAnswersMapQuizInstance[compositeKey].answer =[];
          refUserAnswersMapQuizInstance[compositeKey].score = 0;
    }
    else{
      // question hasnt been answered yet.
    }

    return {
      refUserAnswersMapQuizInstance: refUserAnswersMapQuizInstance ,
      refUserAnswers : refUserAnswers
    };

  }




}
