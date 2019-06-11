export class MatchLib {


  static Match(answer, solution){
    return MatchLib._multiAnswer(answer,solution);
  }


  static _basicMatch(answer,solution,callback){
    //console.log('basic matching: ' + answer + ' == ' + solution);

    if (MatchLib._arrayEqual(answer,solution,2)) {
      callback(true);
    } else {
      callback(false);
    }
  }

  // string comparisons
  static _equals(answer,solution, toLower){
     toLower = toLower || true;

    // console.log('_equals: ' + answer + ' == ' + solution);

     if(toLower){
        answer = String(answer).toLowerCase();
        solution = String(solution).toLowerCase();
     }

     if (answer.trim() == solution.trim()) {
       return true;
     } else {
       return false;
     }
  }
  // string comparisons by splitting up the string into an array
  static _arrayEqual(answer,solution,charCount){
    var that =this;
    var answerParts  =answer.split(' ');

  //  console.log('solution length: ' + solution.length);

    var solutionParts  = solution.split(' ');

    if(answerParts.length != solutionParts.length){
        return false;
    }

    var aIdx =0;
    var matchCount =0;

    var part = function(part, charCount){

        if(part.length > charCount){
            return part.substring(0,charCount);
        }

        return part;
    };

    while(aIdx < solutionParts.length){
        if(MatchLib._equals(part(answerParts[aIdx],charCount),part(solutionParts[aIdx],charCount)))
        {
            matchCount++;
        }

        aIdx++;
    }

    if(matchCount == solutionParts.length)  {
        return true;
    }
    else
    {
        return false;
    }
  }
  // string comparisons by splitting up the string into an array
  static _arrayUnsortedEqual(answer,solution){
      //var that =this;
      var answerParts  =answer.split(' ');
      var solutionParts  =solution.split(' ');

      var inSolution = function(data){
          var idx =0;

          while(idx < solutionParts.length){
              if(MatchLib._equals(solutionParts[idx],data))
                  return true;
              idx++;
          }

          return false;
      };

      var aIdx =0;
      var foundCount =0;

      while(aIdx < solutionParts.length){
          if(inSolution(answerParts[aIdx]))
              foundCount++;

          aIdx++;
      }

      if(foundCount == solution.length)  {
          return true;
      }
      else
      {
          return false;
      }
  }


  static _multiAnswer(answer,solution){

      var remainingAnswers = [];
      var correctAnswers = [];
      var that = this;

      var formatAnswer = function(correctAnswer, answer){
          if(correctAnswer.length == answer.length) return answer;

          var edittedAnswer = correctAnswer.slice(0, answer.length) + "(" + correctAnswer.slice(answer.length) +')';

          return edittedAnswer;
      };


      var fillCorrectAndRemainingAnswers = function(charCount){
        remainingAnswers = [];
        correctAnswers = [];

        var idx = 0;
        while (idx < answer.length) {
              if (MatchLib._arrayEqual(answer[idx], solution, charCount)) {
                  correctAnswers.push(formatAnswer(answer[idx], solution));
              } else {
                  remainingAnswers.push(answer[idx]);
              }
            idx++;
        }
      };



      fillCorrectAndRemainingAnswers(2);

      var charCount =3;
      while(charCount < solution.length && correctAnswers.length > 1)
      {
          fillCorrectAndRemainingAnswers(charCount);
          charCount++;
      }

      return {
        correctAnswers,
        remainingAnswers
      };
  }




  static MatchArray(answer, solution, numberOfCorrectAnswers){

    if(!Array.isArray(answer)) return 0;

    if(!Array.isArray(solution)) return 0;

    if(answer.length != solution.length) return 0;


    let idx =0;
    let numberPosMatches =0;
    let numberNegMatches =0;

    while(idx < answer.length){
      if(solution[idx] == "-1"){
        if(answer[idx] == solution[idx]){
          numberNegMatches++;
        }
      }
      else{
        if(answer[idx] == solution[idx]){
          numberPosMatches++;
        }
      }

      idx++;
    }

    let countNegsEntries = solution.length - numberOfCorrectAnswers;

    let negScore = Math.floor((100 / countNegsEntries) * numberNegMatches);

    let posScore =  Math.floor((100 / numberOfCorrectAnswers) * numberPosMatches);

    if(posScore == 0) return 0;

    if(negScore ==100) return posScore;

    return posScore - negScore;

  }




}
