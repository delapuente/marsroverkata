(function () {
  'use strict';

  var Rover = window.Rover = {
    init: function (x, y, orientation) {
      this.position = [x, y];
      this.orientation = orientation;
    },
    move: function (commands) {
      for (var i = 0; i < commands.length; i++) {
        var c = commands[i];
        if (!(c in this._actionsByCommand)) {
          console.log('Unrecognized command: ' + c);
          continue;
        }

        var actionName = this._actionsByCommand[c];
        var action = this[actionName].bind(this);
        action();
      }
    },
    _actionsByCommand: {
      f: 'moveForward',
      b: 'moveBackward',
      r: 'turnRight',
      l: 'turnLeft'
    },
    moveForward: function () {
      this._advance(1);
    },
    moveBackward: function () {
      this._advance(-1);
    },
    _advance: function (steps) {
      var x0 = this.position[0];
      var y0 = this.position[1];

      var increment = this._increments[this.orientation];
      var realIncrementX = increment[0] * steps;
      var realIncrementY = increment[1] * steps;

      var x1 = (x0 + realIncrementX + Grid.sizeX) % Grid.sizeX;
      var y1 = (y0 + realIncrementY + Grid.sizeY) % Grid.sizeY;

      if (!Grid.thereIsObstacle(x1, y1)) {
        this.position = [x1, y1];
      }
    },
    _increments: {
      n: [0, 1],
      e: [1, 0],
      s: [0, -1],
      w: [-1, 0]
    },
    turnRight: function () {
      this._turn('right');
    },
    turnLeft: function () {
      this._turn('left');
    },
    _turn: function (direction) {
      var orientationCount = this._orientations.length;
      var currentIndex = this._orientations.indexOf(this.orientation);
      var step = direction === 'left' ? -1 : 1;
      var nextIndex = (currentIndex + step + orientationCount) % orientationCount;
      this.orientation = this._orientations.charAt(nextIndex);
    },
    _orientations: 'nesw'
  };
}());
