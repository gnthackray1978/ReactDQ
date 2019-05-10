export class BasicQuestioner {

  // var BasicQuestioner = function (channel) {
  //     this.selectedcategory = '';
  //     this.selectedCSV = 3;
  //     this.listoftests = [];
  //     this.rawCSVData =[];
  //     this.categories =[];
  //     this.questionset = [];
  //     this.answerset = [];
  //     // used for multi answer questions
  //     this.currentQuestionState = [];
  //     this.isAnswerDisplayed = false;
  //     this.currentQuestionIdx = 0;
  //     this.score = 0;
  //     this.questionscore = 0;
  // };

  static validTestSelected(quizName, catName){
      return (quizName !=='' && catName !== '');
  }

  static ResetQuestion(questionSet, currentQuestionIdx){

      var question = questionset[currentQuestionIdx];

      question.score =0;
      question.correctAnswers = [];
      question.attemptedAnswer =[];
      question.answer = JSON.parse(JSON.stringify(question.constAnswers));

      return question;
   }

   static currentQuestionAnswer(questionset,currentQuestionIdx){
      return questionset[currentQuestionIdx].answer;
   }

   static currentQuestion(questionset,currentQuestionIdx){
      return questionset[currentQuestionIdx];
   }

   static GetQuestionType(questionTypeStr){
     let questionType;

     switch (questionTypeStr) {
         case 'MA':
             questionType = 3; // multi answer
             break;
         case 'MS':
             questionType = 4; // multi ordered answer
             break;
         case 'MS':
             questionType = 1; // multi ordered answer
             break;
         default:
             questionType = 0; //question is multiple choice
             break;
     }

     return questionType;
   }

   static CreateQuestionSetN(rawCSVData, selectedcategory) {
       console.log('creating question set');

       var csvData = rawCSVData;

       var questionColIdx = 3;
       var multiAnswerStartIdx = 5;
       var idx = 1;

       var questions = {
         index : []
       };

       var answers ={
         index :[]
       };


       let answerIdx = 0;

       while (idx < csvData.length) {
               var cols = csvData[idx];

               if (cols[2] == selectedcategory) {

                   var questionTypeStr = cols[4];

                   let questionType = BasicQuestioner.GetQuestionType(questionTypeStr);

                   // questions with multiple answers
                   if (questionType != 0) {

                       var tp = cols.slice(multiAnswerStartIdx).filter(line => line.trim() !== "").map(m=>{
                         answers[String(answerIdx)] = {
                           id: String(answerIdx),
                           answer : m
                         };
                         answers.index.push(String(answerIdx));
                         answerIdx++;
                         return String(answerIdx);
                       });

                       questions[String(idx)] = {
                         id: String(idx),
                         question : cols[questionColIdx],
                         answer : tp,
                         type: questionType
                       };

                       questions.index.push(String(idx));

                   } else {

                     answers[String(answerIdx)] = {
                       id: String(answerIdx),
                       answer : cols[multiAnswerStartIdx]
                     };

                     answers.index.push(String(answerIdx));

                     questions[String(idx)] = {
                       id: String(idx),
                       question : cols[questionColIdx],
                       answer : [String(answerIdx)],
                       type: questionType
                     };
                     questions.index.push(String(String(idx)));

                     answerIdx++;
                   }
               }


               idx++;
           }

       return {questions : questions,
       answers :answers};
   }



   static CreateQuestionSet(rawCSVData, selectedcategory) {
       console.log('creating question set');

       var csvData = rawCSVData;

       var questionColIdx = 3;
       var multiAnswerStartIdx = 5;
       var idx = 1;

       var results = {
           questionset :[],
           answerset :[]
       };

       while (idx < csvData.length) {
               var cols = csvData[idx];

               if (cols[2] == selectedcategory) {
                   var questionType = 0; // default option

                   var questionTypeStr = cols[4];

                   // questions with multiple answers
                   if (questionTypeStr != "SN") {

                       var colIdx = multiAnswerStartIdx;
                       var answer = []; // this can get over written
                       var constAnswers = []; // to use a permanent answer collection

                       while (colIdx < cols.length) {
                           answer.push(cols[colIdx]);
                           constAnswers.push(cols[colIdx]);
                           colIdx++;
                       }

                       if (colIdx > multiAnswerStartIdx) {
                           switch (questionTypeStr) {
                               case 'MA':
                                   questionType = 3; // multi answer
                                   break;
                               case 'MS':
                                   questionType = 4; // multi ordered answer
                                   break;
                               default:
                                   questionType = 1; //question is multiple choice
                                   break;
                           }
                       }

                       // questiontype is multiple choice
                       if (questionType != 1) {
                           answer.splice(0, 1);
                           constAnswers.splice(0, 1);
                       } else {
                           results.answerset.push('');

                       }


                       results.questionset.push({ question: cols[questionColIdx],
                                               answer: answer,
                                               type: questionType,
                                               constAnswers: constAnswers,
                                               score: 0,
                                               attemptedAnswer:'',
                                               correctAnswers:[]
                                             });
                   } else {


                       results.questionset.push({ question: cols[questionColIdx],
                                               answer: cols[multiAnswerStartIdx],
                                               type: questionType,
                                               constAnswers: cols[multiAnswerStartIdx],
                                               score: 0,
                                               attemptedAnswer:'',
                                               correctAnswers:[]
                                             });
                       results.answerset.push('');
                   }
               }


               idx++;
           }

       return results;
   }

   static currentQuestionSetLength(questionset){
       if (questionset !== undefined && questionset.length > 0)
           return questionset.length;
       else
           return 0;
   }


}
