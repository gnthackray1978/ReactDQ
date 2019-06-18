import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {setLayout,setContext,toggleGraphRunning} from "../actions/creators.jsx";
import {GraphEventConnector} from "../ForceDirected/GraphEventConnector.js";
import {ForceDirect} from "../ForceDirected/ForceDirect.js";
import GraphContainer from "./Canvas/GraphContainer.jsx";



const styles = {

  label: {

    textAlign: 'center',

  },

};

class VisualisationHandler extends Component {

  constructor(props) {
     super(props);

     this._tree =undefined;
     this._forceDirect = undefined;

    // this.updateAnimationState = this.updateAnimationState.bind(this);

     this._graphEventConnnector = new GraphEventConnector();

   }

   validTree(){
     if(this._tree== undefined || this._tree == null) return false;

     return true;
   }
   // validTree(){
   //   if(this._tree== undefined || this._tree == null) return false;
   //
   //   return true;
   // }

   // updateAnimationState(_point) {
   //
   //
   //   if(_point!=undefined)
   //    this._tree.SetCentrePoint(_point.x, _point.y);
   //   else
   //    this._tree.SetCentrePoint();
   //
   //   this._tree.DrawTree();
   // }

   componentDidUpdate(){


      this._graphEventConnnector.Connect(this.props.context,this.props,  (actionName, data)=>{
        switch (actionName) {
          case 'canvas_mousedown':
            if(this._forceDirect )
              this._forceDirect.mouseDown(data);
          break;
          case 'canvas_mouseup':
          if(this._forceDirect )
            this._forceDirect.mouseUp(data);
          break;
          case 'canvas_mousemove':
              if(this._forceDirect)
                this._forceDirect.mouseMove(data.evt);
          break;
          case 'canvas_dblclick':
            if(this._forceDirect )
              this._forceDirect.mouseDoubleClick(data);
          break;
          case 'canvas_click':
              if(this._forceDirect )
                this._forceDirect.mouseMove(data.evt);
          break;



        }
      });

  //    console.log('VisualisationHandler this.props.graphActiveLayout' );


      this.props.toggleGraphRunning(true);
      this.props.context.canvas.style.top=0;
      this.props.context.canvas.style.left=0;

      this.props.context.canvas.width = window.innerWidth;
      this.props.context.canvas.height = window.innerHeight;

      let settings = {...this.props.fdSettings};
      settings.stiffness = 50.00;
      settings.repulsion =0.5;
      settings.damping =0.955;

      settings.width = window.innerWidth;
      settings.height = window.innerHeight;

      let dataSource =this.props.dataSource;

      this._forceDirect = new ForceDirect(settings,dataSource,this.props.context,(name,value)=>{ });

      this._forceDirect.run(this.props.populateGraph, dataSource);

    }

    contextCreated (ctx){
     console.log('context created');
     this.props.setContext(ctx);
    }

    render() {
      return <GraphContainer drawFrame = {(ctx)=>{}}  contextCreated = {this.contextCreated.bind(this)}/>
    }

}


const mapStateToProps = state => {

  return {
    graphActive :state.graphActive,
    graphActiveLayout: state.graphActiveLayout,
    graphActiveSelection : state.graphActiveSelection,
    persons: state.persons,
    families: state.families,
    context :state.context,
    zoomin : state.zoomin,
    zoomout: state.zoomout,
    mapleft: state.mapleft,
    mapright: state.mapright,
    mapup: state.mapup,
    mapdown:state.mapdown,
    status: state.status,
    graphRunning : state.graphRunning,
    staticSettings :state.staticSettings,
    fdSettings: state.fdSettings
  };
};

const mapDispatchToProps = dispatch => {

  return {
    setContext: context => {
      dispatch(setContext(context));
    },
    toggleGraphRunning : isSet =>{
      dispatch(toggleGraphRunning(isSet))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VisualisationHandler));
