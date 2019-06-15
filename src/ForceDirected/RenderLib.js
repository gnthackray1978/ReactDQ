import {Vector} from "./MiscTypes.js";
import {Utils} from "./Utils.js";

export class RenderLib{

  constructor(graph, ctx){
    this.graph = graph;
    this.ctx = ctx;
  }
  clear(cameraView) {
      this.ctx.clearRect(0, 0, cameraView.graph_width, cameraView.graph_height);
  }

  drawEdges(map, edge, p1, p2) {

      var _utils = new Utils(map.currentBB, map.graph_width, map.graph_height);
      var x1 = map.mapOffset(_utils.toScreen(p1)).x;
      var y1 = map.mapOffset(_utils.toScreen(p1)).y;

      var x2 = map.mapOffset(_utils.toScreen(p2)).x;
      var y2 = map.mapOffset(_utils.toScreen(p2)).y;


      if (!map.validToDraw(x1, y1) && !map.validToDraw(x2, y2)) return;

      if (edge.data.type == 'data' && map.colourScheme.infoLineColour == map.colourScheme.mapbackgroundColour) {
          return;
      }


      var direction = new Vector(x2 - x1, y2 - y1);

      // negate y
      var normal = direction.normal().normalise();


      var from = this.graph.getEdges(edge.source, edge.target);
      var to = this.graph.getEdges(edge.target, edge.source);

      var total = from.length + to.length;

      // Figure out edge's position in relation to other edges between the same nodes
      var n = 0;
      for (var i = 0; i < from.length; i++) {
          if (from[i].id === edge.id) {
              n = i;
          }
      }

      var spacing = 6.0;

      // Figure out how far off center the line should be drawn
      var offset = normal.multiply(-((total - 1) * spacing) / 2.0 + (n * spacing));


      var s1 = map.mapOffset(_utils.toScreen(p1).add(offset));
      var s2 = map.mapOffset(_utils.toScreen(p2).add(offset));


      var boxWidth = edge.target.getWidth(this.ctx);
      var boxHeight = edge.target.getHeight(this.ctx);

      var intersection = _utils.intersect_line_box(s1, s2, { x: x2 - boxWidth / 2.0, y: y2 - boxHeight / 2.0 }, boxWidth, boxHeight);

      if (!intersection) {
          intersection = s2;
      }

      var arrowWidth;
      var arrowLength;

      var weight = typeof(edge.data.weight) !== 'undefined' ? edge.data.weight : 1.0;

      this.ctx.lineWidth = Math.max(weight * 2, 0.1);
      arrowWidth = 10 + this.ctx.lineWidth;
      arrowLength = 10;


      var stroke = '';
      if (edge.data.type == 'data') {
          stroke = map.colourScheme.infoLineColour;
      } else {
          var averagedesc = (edge.source.data.RecordLink.currentDescendantCount + edge.target.data.RecordLink.currentDescendantCount) / 2;
          stroke = _utils.getLevel(300, averagedesc, map.colourScheme.normalLineGradient);
      }

      this.ctx.strokeStyle = stroke;
      this.ctx.beginPath();
      this.ctx.moveTo(s1.x, s1.y);
      this.ctx.lineTo(s2.x, s2.y);
      this.ctx.stroke();

      // arrow
      var distance = s1.distance(s2);
      var directional = typeof(edge.data.directional) !== 'undefined' ? edge.data.directional : true;
      if (directional && distance > 75) {
          this.ctx.save();
          this.ctx.fillStyle = stroke;

          this.ctx.translate((intersection.x + s1.x) / 2, (intersection.y + s1.y) / 2);

          this.ctx.rotate(Math.atan2(y2 - y1, x2 - x1));
          this.ctx.beginPath();
          this.ctx.moveTo(-arrowLength, arrowWidth);
          this.ctx.lineTo(0, 0);
          this.ctx.lineTo(-arrowLength, -arrowWidth);
          this.ctx.lineTo(-arrowLength * 0.8, -0);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.restore();
      }


  }

  nodeInfo(layout, map, node, p) {
    let _utils = new Utils(map.currentBB, map.graph_width, map.graph_height);

    let x = map.mapOffset(_utils.toScreen(p)).x;
    let y = map.mapOffset(_utils.toScreen(p)).y;

    return {
      x,y
    };
  }

  drawNodes(layout, map, node, p) {
      var _utils = new Utils(map.currentBB, map.graph_width, map.graph_height);

      var x1 = map.mapOffset(_utils.toScreen(p)).x;
      var y1 = map.mapOffset(_utils.toScreen(p)).y;

    //  console.log('map offset: ' + x1 + ' ' + y1);

    //  if (!map.validToDraw(x1, y1)) return;

      var s = map.mapOffset(_utils.toScreen(p));


      this.ctx.save();
      //2 = nearest
      var selectionId = layout.getSelection(node);

          if (map.layout.nodePoints[node.id].m==1)
              _utils.star(map, this.ctx, s.x, s.y, 12, 5, 0.4, false, node.data.type, selectionId);
          else
              _utils.star(map, this.ctx, s.x, s.y, 12, 3, 0.4, false, node.data.type, selectionId);


          if (node.data.RecordLink != undefined) {
              var name = node.data.RecordLink.Label;

              var m = map.layout.nodePoints[node.id].m;
              _utils.drawText(map, this.ctx, s.x, s.y, name + ' ' + m , node.data.type, selectionId);


          }

  //    }

      this.ctx.restore();
  }

}
