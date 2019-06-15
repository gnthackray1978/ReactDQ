//import {Vector} from "./Vector.js";
// Vector
export function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.random = function () {
    return new Vector(10.0 * (Math.random() - 0.5), 10.0 * (Math.random() - 0.5));
};

Vector.prototype.add = function (v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
};

Vector.prototype.subtract = function (v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
};

Vector.prototype.multiply = function (n) {
    return new Vector(this.x * n, this.y * n);
};

Vector.prototype.divide = function (n) {
    return new Vector((this.x / n) || 0, (this.y / n) || 0); // Avoid divide by zero errors..
};

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.normal = function () {
    return new Vector(-this.y, this.x);
};

Vector.prototype.normalise = function () {
    return this.divide(this.magnitude());
};

Vector.prototype.distance = function (d2) {

    var x = d2.x - this.x;
    x = x * x;

    var y = d2.y - this.y;
    y = y * y;

    return Math.sqrt(x + y);
};


export function Point(position, mass) {
    this.p = position; // position
    this.m = mass; // mass
    this.v = new Vector(0, 0); // velocity
    this.a = new Vector(0, 0); // acceleration
}

Point.prototype.applyForce = function (force) {
    this.a = this.a.add(force.divide(this.m));
};


export function Spring(point1, point2, length, k) {
    this.point1 = point1;
    this.point2 = point2;
    this.length = length; // spring length at rest
    this.k = k; // spring constant (See Hooke's law) .. how stiff the spring is
}







export function Edge(id, source, target, data) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.data = typeof (data) !== 'undefined' ? data : {};
}



export function Node(id, data) {
    this.id = id;
    this.data = typeof (data) !== 'undefined' ? data : {};
    this._widthCache = [];
}



Node.prototype.getWidth = function (ctx) {
    var text = typeof (this.data.label) !== 'undefined' ? this.data.label : this.id;
    if (this._widthCache && this._widthCache[text])
        return this._widthCache[text];

    ctx.save();
    ctx.font = "16px Verdana, sans-serif";
    var width = ctx.measureText(text).width + 10;
    ctx.restore();

  //  this._width || (this._width = {});

    this._widthCache[text] = width;

    return width;
};

Node.prototype.getHeight = function (ctx) {
    return 20;
};

Node.prototype.match = function (id) {
    if(!this.data.RecordId) return false;

    return this.data.RecordId == id;
};
