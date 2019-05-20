import {ScoreLib} from "./ScoreLib.js";

test('Check Multi Answer Score 100%',done=>{

  //static GetScoreMultiAnswer(correctAnswers, originalAnswers, remainingAnswers, attemptedAnswer, callback){

  let originalAnswers = ['the','black','dog'];
  let correctAnswers = ['black','dog'];
  let attemptedAnswer = 'the';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{
    expect(score).toEqual(100);
    done();
  });

});

test('Check Multi Answer Updated Correct Answers',done=>{
  let originalAnswers = ['the','black','dog','log'];
  let correctAnswers = ['black','dog'];
  let attemptedAnswer = 'the';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{

    expect(correctAnswers.sort()).toEqual(['black','dog','the'].sort());
    done();
  });

});

test('Check Multi Answer Updated Wrong Answers ',done=>{
  let originalAnswers = ['the','black','dog','log'];
  let correctAnswers = ['black','dog'];
  let attemptedAnswer = 'bog';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{

    expect(correctAnswers.sort()).toEqual(['black','dog'].sort());
    done();
  });

});

test('Check Multi Answer Updated Wrong Answers With No Correct Answers ',done=>{
  let originalAnswers = ['the','black','dog','log'];
  let correctAnswers = [];
  let attemptedAnswer = 'bog';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{

    expect(correctAnswers.sort()).toEqual([].sort());
    done();
  });

});


test('Check Multi Answer Score 75%',done=>{
  let originalAnswers = ['the','black','dog','log'];
  let correctAnswers = ['black','dog'];
  let attemptedAnswer = 'the';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{
    expect(score).toEqual(75);
    done();
  });

});

test('Check Multi Answer Score 0%',done=>{
  let originalAnswers = ['the','black','dog','log'];
  let correctAnswers = [];
  let attemptedAnswer = 'bog';

  ScoreLib.GetScoreMultiAnswer(correctAnswers,originalAnswers,attemptedAnswer,(correctAnswers,score)=>{
    expect(score).toEqual(0);
    done();
  });

});

test('Check Basic Answer Score 100%',done=>{



  ScoreLib.GetScoreBasic('bob the cat','bob the cat',(score)=>{
    expect(score).toEqual(100);
    done();
  });

});

test('Check Remaining Answers Calculated Correctly',()=>{

  //static GetScoreMultiAnswer(correctAnswers, originalAnswers, remainingAnswers, attemptedAnswer, callback){

  let correctAnswers = ['the','black','dog'];
  let userAnswered = ['black','dog'];


  let remainedAnswers = ScoreLib.GetRemainingAnswers(userAnswered, correctAnswers);


  expect(remainedAnswers.length).toEqual(correctAnswers.length - userAnswered.length);


  if(remainedAnswers.length == (correctAnswers.length - userAnswered.length)){
    expect(remainedAnswers[0]).toBe('the');
  }


   correctAnswers = ['the','black','dog'];
   userAnswered = ['the','black','dog'];

   remainedAnswers = ScoreLib.GetRemainingAnswers(userAnswered, correctAnswers);


   expect(remainedAnswers.length).toEqual(correctAnswers.length - userAnswered.length);


   correctAnswers = ['the','black','dog'];
   userAnswered = [];

   remainedAnswers = ScoreLib.GetRemainingAnswers(userAnswered, correctAnswers);

   expect(remainedAnswers.length).toEqual(correctAnswers.length - userAnswered.length);

   if(remainedAnswers.length == (correctAnswers.length - userAnswered.length)){
     expect(remainedAnswers[0]).toBe('the');
     expect(remainedAnswers[1]).toBe('black');
     expect(remainedAnswers[2]).toBe('dog');
   }




});
