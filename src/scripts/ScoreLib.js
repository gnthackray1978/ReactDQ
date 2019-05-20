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






}
