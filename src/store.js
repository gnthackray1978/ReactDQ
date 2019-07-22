import {combineReducers, createStore, applyMiddleware,compose  } from "redux";
import thunk from "redux-thunk";
import applicationStateReducers from "./reducers/applicationStateReducers.js";
import dbReducers from "./reducers/dbReducers.js";
import googleReducers from "./reducers/googleReducers.js";
import graphReducers from "./reducers/graphReducers.js";
import uxReducers from "./reducers/uxReducers.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  applicationState : applicationStateReducers, // key name same as the carefully renamed default export
  db : dbReducers,
  google : googleReducers,
  graph : graphReducers,
  uxState: uxReducers
});

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
     applyMiddleware(thunk)
   )
);


const unsubscribe = store.subscribe((arg) => {

const roughSizeOfObject = function( object ) {

      var objectList = [];
      var stack = [ object ];
      var bytes = 0;

      while ( stack.length ) {
          var value = stack.pop();

          if ( typeof value === 'boolean' ) {
              bytes += 4;
          }
          else if ( typeof value === 'string' ) {
              bytes += value.length * 2;
          }
          else if ( typeof value === 'number' ) {
              bytes += 8;
          }
          else if
          (
              typeof value === 'object'
              && objectList.indexOf( value ) === -1
          )
          {
              objectList.push( value );

              for( var i in value ) {
                  stack.push( value[ i ] );
              }
          }
      }
      return bytes;
  }

//  console.log("store size: " + roughSizeOfObject(store.getState()));
});

export default store;
