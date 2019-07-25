

export const setQuestionVisibility= data =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUESTIONVISIBILITY",
      questionVisibility :{...data}
    });
  };
}



export const setAddQuizName= (quizAddName) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_ADDQUIZNAME",
      quizAddName : quizAddName
    });
  };
}

export const setEditQuizName= (quizEditName) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_EDITQUIZNAME",
      quizEditName : quizEditName
    });
  };
}

export const setCurrentTest= (currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_CURRENTTEST",
      currentTest : currentTest
    });
  };
}

export const setTestBatch= (testList, currentTest) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTBATCH",
      currentTest : currentTest,
      testList : testList,
      testActive :true
    });
  };
}

export const setEndTestBatch= (currentTest, testList) =>{
  return async dispatch  => {


    dispatch({
      type: "SET_ENDTEST",
      currentTest : currentTest,
      testList : testList,
      testActive :false
    });

  };
}

export const setTestActive= (testActive) =>{
  return async dispatch  => {
    dispatch({
      type: "SET_TESTACTIVE",
      testActive : testActive
    });
  };
}

export const setQuizName= selectedQuiz =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZNAME",
      selectedQuiz : selectedQuiz
    });
  };
}
export const setQuizCat= selectQuizCat =>{
  return async dispatch  => {
    dispatch({
      type: "SET_QUIZCAT",
      selectQuizCat :selectQuizCat
    });
  };
}

export const setCatSelection = data =>{
  return async dispatch  => {
    console.log('dispatched cat selection');
    var selection =[];
    if(data){
      data.forEach((arg)=>{
        selection.push({quiz: arg.key , open:false});
      });
    }

    dispatch({
      type: "SET_CATSELECTION",
      catSelection :data
    });
  };
}

export const setNameFilter = filter =>{
  return async dispatch  => {
    dispatch({
      type: "SET_GEDNAMEFILTER",
      filter: filter
    });

  };
}
