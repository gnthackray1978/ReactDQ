import {Utils} from "./Utils.js";

//renderer

export function RenderingHandler(channel, layout, renderer) {
    this._channel = channel;

    this.layout = layout;

    this.renderer = renderer;

    var that = this;

    this._channel.on("graphChanged", function(data, envelope) {
        that.start();
    });

}

RenderingHandler.prototype = {
    start: function() {

        if (this._started) return;
        this._started = true;

        var that = this;

        requestAnimationFrame(function step() {


            var energyCount = 0;


            that.renderer.clear(that.layout._cameraView);

            that._channel.emit( "nodecount", { value: that.layout._cameraView.countOnscreenNodes() } );


            that.layout.applyCoulombsLaw();
            that.layout.applyHookesLaw();
            that.layout.attractToCentre();
            that.layout.updateVelocity(0.1);
            that.layout.updatePosition(0.01);


            let map = that.layout._cameraView;

            // render
            that.layout.eachEdge(function(edge, spring) {
               that.renderer.drawEdges(map, edge, spring.point1.p, spring.point2.p);
            });

            that.layout.eachNode(function(node, point) {
                that.renderer.drawNodes(that.layout, map, node, point.p);
            });

            energyCount += that.layout.totalEnergy();

            that._channel.emit( "energy",  {value: energyCount.toFixed(2) });


            // stop simulation when energy of the system goes below a threshold
            if (energyCount < 0.01) {
                let xBound =[];
                let yBound =[];


                that.layout.eachNode(function(node, point) {
                    let tp = that.renderer.nodeInfo(that.layout, map, node, point.p);
                    xBound.push(tp.x);
                    yBound.push(tp.y);
                });

          //      console.log(Math.min(...xBound) + ' ' + Math.max(...xBound));
          //      console.log(Math.min(...yBound) + ' ' + Math.max(...yBound));




              //console.log(endbounds.bottomleft.x + ',' + endbounds.bottomleft.x + '  '  + endbounds.topright.x + ',' + endbounds.topright.x )
                that._started = false;
                if (typeof(done) !== 'undefined') {
                    that.done();
                }
            } else {

                requestAnimationFrame(step);

            }
        });

    },
    done: function() {

    }

};
