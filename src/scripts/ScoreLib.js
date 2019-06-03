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

  static GetCorrectAnswersForQuestion(questionData, correctAnswers){
    let carray = questionData.correctAnswers.map((id)=>{
      return correctAnswers[id].correctAnswers;
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


  static MakeRelatedUserAnswerData(questionId, instanceId, answer, userAnswers, userAnswersMapQuizInstance, isCorrect,score){


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

    // add answer to the user answer object
    // and return the new id
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
          userAnswersMapQuizInstance[compositeKey].score = score;
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
        score : score,
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
