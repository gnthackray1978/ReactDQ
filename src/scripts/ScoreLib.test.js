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

// test('Check setRelatedUserAnswers made correctly',()=>{
//
//   let quizId = '1';
//   let questionId = '1';
//   let answer = 'new answer';
//
//
//
//   let userAnswers ={
//     index :[]
//   };
//
//   userAnswers['0'] = {
//     id: '0',
//     answer : 'answer 1'
//   };
//   userAnswers.index.push('0');
//
//
//   let userAnswersMapQuizInstance ={
//     index :[]
//   };
//
//   let compositeKey = quizId + questionId;
//   userAnswersMapQuizInstance[compositeKey] = {
//     id: compositeKey,
//     quizId : quizId,
//     questionId : questionId,
//     answer : ['0']
//   };
//   userAnswersMapQuizInstance.index.push(compositeKey);
//
//   let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);
//
//   //console.log('user answers length: ' + userAnswers.index);
//
//   //console.log('-userAnswers 0: ' + userAnswers['0'].answer );
//
//   //console.log('-userAnswers 1: ' + userAnswers['1'].answer);
//
//   expect(userAnswers.index.length).toEqual(2);
//
//   expect(userAnswersMapQuizInstance[compositeKey].answer.length).toEqual(2);
//
//
// });

describe('setRelatedUserAnswers', () => {
  // Applies only to tests in this describe block
  let quizId,questionId,answer,userAnswers,userAnswersMapQuizInstance,compositeKey ;


  const setup = ()=>{

     quizId = '1';
     questionId = '1';
     answer = 'answer 2';


    userAnswers ={
      index :[]
    };

    userAnswers['0'] = {
      id: '0',
      answer : 'answer 1'
    };
    userAnswers.index.push('0');


    userAnswersMapQuizInstance ={
      index :[]
    };

    compositeKey = quizId + questionId;
    userAnswersMapQuizInstance[compositeKey] = {
      id: compositeKey,
      quizId : quizId,
      questionId : questionId,
      answer : ['0']
    };
    userAnswersMapQuizInstance.index.push(compositeKey);
  };

  beforeEach(() => {
    return setup();
  });

  test('correct number of user answers returned',()=>{

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);

    expect(userAnswers.index.length).toEqual(2);

  });

  test('existing answer preserved',()=>{

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);

    expect(userAnswers['0'].answer).toEqual('answer 1');

  });

  test('answer added correctly',()=>{

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);

    expect(userAnswers['1'].answer).toEqual('answer 2');

  });


  test('correct number of quiz mappings returned',()=>{

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);

    expect(userAnswersMapQuizInstance[compositeKey].answer.length).toEqual(2);

  });

  test('correct quiz mapping answer returned when added to existing mapping',()=>{

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, questionId, answer, userAnswers, userAnswersMapQuizInstance);
    let key = quizId + questionId;
    expect(userAnswersMapQuizInstance[key].answer[1]).toEqual('1');

  });

  test('correct number of quiz mapping answer returned when added to new question',()=>{

    let localQuestion = "2";

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, localQuestion, 'the', userAnswers, userAnswersMapQuizInstance);
    let key = quizId + localQuestion;

    expect(userAnswersMapQuizInstance[key].answer.length).toEqual(1);

  });

  test('correct quiz mapping answer returned when added to new question',()=>{

    let localQuestion = "2";

    let result = ScoreLib.MakeRelatedUserAnswerData(quizId, localQuestion, 'mog', userAnswers, userAnswersMapQuizInstance);
    result = ScoreLib.MakeRelatedUserAnswerData(quizId, localQuestion, 'gog', userAnswers, userAnswersMapQuizInstance);


    let key = quizId + localQuestion;

    let anskwerKey = userAnswersMapQuizInstance[key].answer[1];

    expect(userAnswers[anskwerKey].answer).toEqual('gog');

  });


});
