import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import VisualisationHandler from "./VisualisationHandler.jsx";
import {ScoreLib} from "../scripts/ScoreLib.js";
import { connect } from "react-redux";




const styles = () => ({
  root: {
     padding: '2px 4px',
     display: 'flex',
     alignItems: 'center',
     width: 300,
   },
   input: {
     marginLeft: 8,
     flex: 1,
   },
   iconButton: {
     padding: 10,
   },

  answerContainer: {
  //  width: 320,
    margin :25,
    padding: 10
  },

  questionContent: {
  //  height: 110,
  //  width: 320,
    margin: 0,
    padding: 0

  },

  questionFooter: {
    justifyContent: "flex-end",
    height: 30,
    width: 320
  },

  button: {
    margin :0,
    top: -11
  },

  toprow: {

    height:35
  },

  questionrow: {

    height:55
  },

  griditem: {

    margin:25
  },
  gridheader: {
    marginTop:5,
    marginLeft:15
  },

  textField: {
   marginLeft: 0,
   marginRight: 0,
   width: 300,
   margin: 0,
   padding: 0
  }
});

function populateGraph(mygraph,quizMetaData,history){
  let user=  mygraph.newNode({ label: 'George',
                         RecordLink: {currentDescendantCount :0, Label: 'George'},
                         RecordId : 1,
                         type: 'normal' });

  let idx =0;
  let catIdx =0;
  let nodeIdx =0;

  while(idx < quizMetaData.length){
      let test=   mygraph.newNode({ label: quizMetaData[idx].quiz,
                            RecordLink:  {currentDescendantCount :0, Label: quizMetaData[idx].quiz},
                            RecordId : nodeIdx,
                            type: 'testNode' });

      mygraph.newEdge(user ,test, { type: 'userlink' });

      catIdx =0;

      while(catIdx < quizMetaData[idx].cats.length){
        nodeIdx++;

        let catResults = [...history.filter(f=>f.quizCat == quizMetaData[idx].cats[catIdx])];
        let score =0;


        if(catResults.length >0)  {

           score = catResults.map(m=> m.score).reduce((total,num)=>{
             if(total < num)
               return num;
             else
               return total;
           });

       //  console.log("catResults object holds: " +score);
        }

        let catNode=   mygraph.newNode({ label: quizMetaData[idx].cats[catIdx],
                              RecordLink:  {currentDescendantCount :0, Label: quizMetaData[idx].cats[catIdx], children : catResults, score :score },
                              RecordId : nodeIdx,
                              type: 'catNode' });

        mygraph.newEdge(test ,catNode, { type: 'nodelink', Label: quizMetaData[idx].cats[catIdx] });



        catIdx++;
      }

      idx++;
  }
}

function TestHistory(props) {

  const { classes, testList, userAnswersMapQuizInstance, quizMetaData} = props;

  let history = ScoreLib.MakeTestHistoryObj(testList,userAnswersMapQuizInstance);

  let historyComponent = history.map((m,index)=>{
     return (<Grid container  key = {index} >
         <Grid item xs={1} className ={classes.griditem}  >
             {m.quizName}
         </Grid>
         <Grid item xs={1} className ={classes.griditem}  >
             {m.quizCat}
         </Grid>
         <Grid item xs={2} className ={classes.griditem} >
             {m.score}
         </Grid>
         <Grid item xs={2} className ={classes.griditem}  >
             {m.started}
         </Grid>
         <Grid item xs={2} className ={classes.griditem} >
             {m.ended}
         </Grid>
     </Grid>)
   });


  const mobileView = (<Paper className={classes.answerContainer}>
      <Grid container spacing={16}>
          <Grid item xs={8}  className={classes.toprow} >
              <Typography className={classes.gridheader} >
                Test Results
              </Typography>
          </Grid>
          {historyComponent}
      </Grid>
  </Paper>)

  return (
      <VisualisationHandler populateGraph = {(myGraph)=> populateGraph(myGraph,quizMetaData,history)}/>
  );
}

TestHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  quizQuestions : PropTypes.array,
  testList : PropTypes.object,
  userAnswersMapQuizInstance : PropTypes.object,
  quizMetaData  : PropTypes.array
};

const mapStateToProps = state => {
  return {
    testList : state.db.testList,
    userAnswersMapQuizInstance: state.db.userAnswersMapQuizInstance,
    quizMetaData : state.db.quizMetaData
  };
};

export default connect(mapStateToProps, () => {return {}})(withStyles(styles)(TestHistory));
