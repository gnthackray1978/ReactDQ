export class SheetParser {



   static QuestionFactory(question){

      const questionColIdx = 3;
      const multiAnswerStartIdx = 5;

      const createQuestion =( answers,questionType, cols, questionObjIdx)=> {

       if(!answers){
         answers ={
           index :[]
         };
       }


       let qType = questionType;

       var tp = cols.slice(multiAnswerStartIdx).filter(line => String(line).trim() !== "").map(m=>{

         let qType = questionType;

         if(qType == 'BO' && m.toLowerCase() == 'yes'){
           m = 'true';
         }

         if(qType == 'BO' && m.toLowerCase() == 'no'){
           m = 'no';
         }


         //console.log('question factory: ' + qType);

         let idx = String(answers.index.length+1);
         answers[idx] = {
           id: idx,
           answerText : m
         };
         answers.index.push(idx);
         //answerIdx++;
         return idx;
       });

       return {
         id: questionObjIdx,
         question : cols[questionColIdx],
         correctAnswers : tp,
         type: questionType
       };


     };

      const createMultiChoiceQuestion =( answers,questionType, cols, questionObjIdx)=> {


        if(!answers){
          answers ={
            index :[]
          };
        }

        let solutionIdxs = cols[multiAnswerStartIdx].split('|');

        let correctAnswersIdxs = [];

        let indexToAnswers = cols.slice(multiAnswerStartIdx+1).filter(line => String(line).trim() !== "").map((m,arIdx)=>{
          let idx = String(answers.index.length+1);

          answers[idx] = {
            id: idx,
            answerText : m
          };
          answers.index.push(idx);

          if(solutionIdxs.includes(String(arIdx))){
            correctAnswersIdxs.push(idx);
          }

          return idx;
        });



      return {
        id: questionObjIdx,
        question : cols[questionColIdx],
        correctAnswers : correctAnswersIdxs,
        possibleAnswers : indexToAnswers,
        type: questionType
      };


    };

      const createQuestionBasic =( answers,questionType, cols, questionObjIdx)=> {

       if(!answers){
         answers ={
           index :[]
         };
       }

       let idx = String(answers.index.length+1);
       answers[idx] = {
         id: idx,
         answerText : cols[multiAnswerStartIdx]
       };

       answers.index.push(idx);

       return {
         id: questionObjIdx,
         question : cols[questionColIdx],
         correctAnswers : [idx],
         type: questionType
       };


     };

      const questionMap = {
        'MA' : createQuestion,
        'MC' : createMultiChoiceQuestion,
        'SN' : createQuestionBasic,
        'BO' : createQuestion
      };

      return questionMap[question] || createQuestionBasic; //ignoring falsy values here
  }


   static CreateQuestionSetN(rawCSVData, selectedcategory, questionType) {
      // console.log('creating question set');

       var csvData = rawCSVData;

       var questions = {
         index : []
       };

       var answers ={
         index :[]
       };

        questions.index =  csvData.filter(f=> Array.isArray(f) && f.length > 2 && f[2]==selectedcategory).map((cols,idx)=>{
          questions[String(idx)] = SheetParser.QuestionFactory(cols[4])(answers,cols[4],cols,idx);

          return String(idx);

        });

       return {questions : questions,
       answers :answers};
   }




}
