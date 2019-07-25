import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {setContext,toggleGraphRunning} from "../store/actions/graphActions.jsx";
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

     this._graphEventConnnector = new GraphEventConnector();

   }



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


    validTree(){
      if(this._tree== undefined || this._tree == null) return false;

      return true;
    }

    contextCreated (ctx){
     this.props.setContext(ctx);
    }

    render() {
      return <GraphContainer drawFrame = {(ctx)=>{}}  contextCreated = {this.contextCreated.bind(this)}/>
    }

}


const mapStateToProps = state => {

  return {
    graphActive :state.graph.graphActive,
    graphActiveLayout: state.graph.graphActiveLayout,
    graphActiveSelection : state.graph.graphActiveSelection,
    persons: state.graph.persons,
    families: state.graph.families,
    context :state.graph.context,
    zoomin : state.graph.zoomin,
    zoomout: state.graph.zoomout,
    mapleft: state.graph.mapleft,
    mapright: state.graph.mapright,
    mapup: state.graph.mapup,
    mapdown:state.graph.mapdown,
    status: state.graph.status,
    graphRunning : state.graph.graphRunning,
    staticSettings :state.graph.staticSettings,
    fdSettings: state.graph.fdSettings
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
