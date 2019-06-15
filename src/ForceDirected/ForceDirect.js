
/**
Copyright (c) 2010 Dennis Hotson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

import {FDLayout} from "./FDLayout.js";
import {CameraView} from "./CameraView.js";
import {Graph} from "./Graph.js";
import {RenderLib} from "./RenderLib.js";
import {RenderingHandler} from "./RenderingHandler.js";
import mitt from 'mitt';

//test
export function ForceDirect(settings, dataSource, context, callback) {

    this._context = context;

    this.channel  = mitt();

  //  this._layoutList =null;

    this.settings = settings;

    this.renderingHandler = null;

    this.dataSource = dataSource;




    this.channel.on("nodeHighlighted", function(data, envelope) {
  //    console.log("nodeHighlighted");
      callback("nodeHighlighted", data.value);
    });

    this.channel.on("nodeSelected", function(data, envelope) {
  //    console.log("nodeSelected");
      callback("nodeSelected", data.value);
    });

    this.channel.on("mapyear", function(data, envelope) {
  //    console.log("mapyear: " +data.value);
      callback("mapyear", data.value);
    });

    this.channel.on("graphChanged", function(data, envelope) {
//      console.log("graphChanged");
      callback("graphChanged", data.value);
    });

    // this.channel.on("mapyear", function(data, envelope) {
    //   console.log("mapyear: " +data.value);
    //   callback("mapyear", data.value);
    // });

    this.channel.on("graphChanged", function(data, envelope) {
    //  console.log("graphChanged");
      callback("graphChanged", data.value);
    });
//
    this.channel.on("cameradebug", function(data, envelope) {
    //  console.log("cameradebug");
      callback("cameradebug", data.value);
    });

}

ForceDirect.prototype = {

    stop: function() {

        this.graph = null;
        this.treeLinker = null;
        this.renderingHandler = null;
        this.layout = null;

        if(this.yearTimer)
            clearInterval(this.yearTimer);
    },

    populateGraph: function (graph) {

        var mygraph = graph;



        let user=  mygraph.newNode({ label: 'George',
                               RecordLink: {currentDescendantCount :0, Label: 'George'},
                               RecordId : 1,
                               type: 'normal' });

        let oop=   mygraph.newNode({ label: 'OOP',
                              RecordLink:  {currentDescendantCount :0, Label: 'OOP'},
                              RecordId : 2,
                              type: 'normal' });

        let soa =   mygraph.newNode({ label: 'SOA',
                               RecordLink: {currentDescendantCount :0, Label: 'SOA'},
                               RecordId : 3,
                               type: 'normal' });

       let patterns =   mygraph.newNode({ label: 'Patterns',
                              RecordLink: {currentDescendantCount :0, Label: 'Patterns'},
                              RecordId : 4,
                              type: 'normal' });

       let a =   mygraph.newNode({ label: 'r1', RecordLink: {currentDescendantCount :0, Label: '13%'}, RecordId : 5, type: 'score' });
       let b =   mygraph.newNode({ label: 'r2', RecordLink: {currentDescendantCount :0, Label: '23%'}, RecordId : 6, type: 'score' });
       let c =   mygraph.newNode({ label: 'r3', RecordLink: {currentDescendantCount :0, Label: '45%'}, RecordId : 6, type: 'score' });
       let d =   mygraph.newNode({ label: 'r4', RecordLink: {currentDescendantCount :0, Label: '56%'}, RecordId : 6, type: 'score' });
       let e =   mygraph.newNode({ label: 'r5', RecordLink: {currentDescendantCount :0, Label: '100%'}, RecordId : 6, type: 'score' });


       mygraph.newEdge(user ,oop, { type: 'userlink' });

        mygraph.newEdge(user,soa, { type: 'userlink' });

      mygraph.newEdge(user,patterns, { type: 'userlink' });

      mygraph.newEdge(patterns,a, { type: 'scorelink' });
      mygraph.newEdge(patterns,b, { type: 'scorelink' });
      mygraph.newEdge(patterns,c, { type: 'scorelink' });

      mygraph.newEdge(soa,d, { type: 'scorelink' });
      mygraph.newEdge(soa,e, { type: 'scorelink' });

    },

    run: function(data) {


        var that = this;

        let graph = new Graph(that.channel);

        this.layout = new FDLayout(that.context, that.channel, graph,
            new CameraView(that.channel, that.settings.colourScheme, that.settings.width, that.settings.height),
            that.settings);

        this.populateGraph(graph);

        that.renderingHandler = new RenderingHandler(that.channel, this.layout, new RenderLib(graph, that._context));

        that.renderingHandler.start();

        return this;
    },


    mouseDoubleClick: function(evt){
      if(this.layout){
        this.layout.resetDragListNodeMass(evt);
      }
    },

    mouseDown: function(evt){
      if(this.layout){
        this.layout.processNewSelections(evt);
      }
      if(this.renderingHandler) // hack until i can be bothered add bus in for the events
          this.renderingHandler.start();
    },

    mouseUp: function(evt){
      if(this.layout){
        this.layout.handlermouseUp(evt);
      }
    },

    buttondown: function(evt){
      if(this.layout){
        this.layout.buttondown(evt);
      }
    },

    buttonup: function(evt){
      if(this.layout){
        this.layout.buttonup(evt);
      }
    },

    mouseMove: function(evt){
      if(this.layout){
        this.layout.checkForHighLights(evt);
      }
      if(this.renderingHandler) // hack until i can be bothered add bus in for the events
          this.renderingHandler.start();
    },

};
