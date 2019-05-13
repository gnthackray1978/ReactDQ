import MatchLib from './MatchLib.js';

export class Scorelib {

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

     MatchLib.Match(answer, solution, type, (correct)=>{
        if(correct){
          question.score = 100;
        }
        else {
          question.score = 0;
        }

        callback();
     });

  }

  static GetScoreMultiAnswer(question,attemptedAnswer, callback){

     var questionObj = question;
     var answers = questionObj.answer;
     var originalAnswers = questionObj.constAnswers;

   

     MatchLib.Match(correctAnswers, remainingAnswers, 2, (correct)=>{
       if(correctAnswers.length >0){
           questionObj.correctAnswers.push(correctAnswers);
       }

       questionObj.answer = remainingAnswers;

       questionObj.score = Math.floor(((100 / originalAnswers.length) *
                       questionObj.correctAnswers.length));

       callback();
     });



  }






}
