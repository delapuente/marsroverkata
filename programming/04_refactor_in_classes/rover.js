(function () {
  'use strict';

  var Rover = window.Rover = function Rover(x, y, orientation, map) {
    this.position = [x, y];
    this.orientation = orientation;
    this.map = map;
  };

  Rover.prototype.move = function (commands) {
    for (var i = 0; i < commands.length; i++) {
      var c = commands[i];
      if (!(c in this._actionsByCommand)) {
        console.log('Unrecognized command: ' + c);
        continue;
      }

      var actionName = this._actionsByCommand[c];
      this[actionName]();
    }
  };

  Rover.prototype._actionsByCommand = {
    f: 'moveForward',
    b: 'moveBackward',
    r: 'turnRight',
    l: 'turnLeft'
  };

  Rover.prototype.moveForward = function () {
    this._advance(1);
  };

  Rover.prototype.moveBackward = function () {
    this._advance(-1);
  };

  Rover.prototype._advance = function (steps) {
    var x0 = this.position[0];
    var y0 = this.position[1];

    var increment = this._increments[this.orientation];
    var realIncrementX = increment[0] * steps;
    var realIncrementY = increment[1] * steps;

    var x1 = (x0 + realIncrementX + this.map.sizeX) % this.map.sizeX;
    var y1 = (y0 + realIncrementY + this.map.sizeY) % this.map.sizeY;

    if (!this.map.thereIsObstacle(x1, y1)) {
      this.position = [x1, y1];
    }
  };

  Rover.prototype._increments = {
    n: [0, 1],
    e: [1, 0],
    s: [0, -1],
    w: [-1, 0]
  };

  Rover.prototype.turnRight = function () {
    this._turn('right');
  };

  Rover.prototype.turnLeft = function () {
    this._turn('left');
  };

  Rover.prototype._turn = function (direction) {
    var orientationCount = this._orientations.length;
    var currentIndex = this._orientations.indexOf(this.orientation);
    var step = direction === 'left' ? -1 : 1;
    var nextIndex = (currentIndex + step + orientationCount) % orientationCount;
    this.orientation = this._orientations.charAt(nextIndex);
  };

  Rover.prototype._orientations = 'nesw';
}());
