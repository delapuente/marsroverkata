(function () {
  'use strict';

  var Grid = {
    init: function (sizeX, sizeY) {
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.obstacles = [];
    },
    setObstacles: function (obstacles) {
      this.obstacles = obstacles;
    },
    thereIsObstacle: function (x, y) {
      for (var i = 0; i < this.obstacles.length; i++) {
        var obstacle = this.obstacles[i];
        if (obstacle[0] === x && obstacle[1] === y) {
          return true;
        }
      }
      return false;
    }
  };

  var Rover = {
    init: function (x, y, orientation) {
      this.position = [x, y];
      this.orientation = orientation;
    },
    move: function (commands) {
      for (var i = 0; i < commands.length; i++) {
        var c = commands[i];
        switch (c) {
          case 'f':
            this.moveForward();
          break;
          case 'b':
            this.moveBackward();
          break;
          case 'r':
            this.turnRight();
          break;
          case 'l':
            this.turnLeft();
          break;
          default:
            console.log('Unrecognized command: ' + c);
          break;
        }
      }
    },
    moveForward: function () {
      var formerPosition = [
        this.position[0],
        this.position[1]
      ];
      switch (this.orientation) {
        case 'n':
          this.position[1] = (this.position[1] + 1) % Grid.sizeY;
        break;
        case 'e':
          this.position[0] = (this.position[0] + 1) % Grid.sizeX;
        break;
        case 's':
          this.position[1] = (this.position[1] - 1);
          if (this.position[1] < 0) {
            this.position[1] = Grid.sizeY + this.position[1];
          }
        break;
        case 'w':
          this.position[0] = (this.position[0] - 1);
          if (this.position[0] < 0) {
            this.position[0] = Grid.sizeX + this.position[0];
          }
        break;
      }
      if (Grid.thereIsObstacle(this.position[0], this.position[1])) {
        this.position = formerPosition;
      }
    },
    moveBackward: function () {
      var formerPosition = [
        this.position[0],
        this.position[1]
      ];
      switch (this.orientation) {
        case 's':
          this.position[1] = (this.position[1] + 1) % Grid.sizeY;
        break;
        case 'w':
          this.position[0] = (this.position[0] + 1) % Grid.sizeX;
        break;
        case 'n':
          this.position[1] = (this.position[1] - 1);
          if (this.position[1] < 0) {
            this.position[1] = Grid.sizeY + this.position[1];
          }
        break;
        case 'e':
          this.position[0] = (this.position[0] - 1);
          if (this.position[0] < 0) {
            this.position[0] = Grid.sizeX + this.position[0];
          }
        break;
      }
      if (Grid.thereIsObstacle(this.position[0], this.position[1])) {
        this.position = formerPosition;
      }
    },
    turnRight: function () {
      switch (this.orientation) {
        case 'n':
          this.orientation = 'e';
        break;
        case 'e':
          this.orientation = 's';
        break;
        case 's':
          this.orientation = 'w';
        break;
        case 'w':
          this.orientation = 'n';
        break;
      }
    },
    turnLeft: function () {
      switch (this.orientation) {
        case 'n':
          this.orientation = 'w';
        break;
        case 'w':
          this.orientation = 's';
        break;
        case 's':
          this.orientation = 'e';
        break;
        case 'e':
          this.orientation = 'n';
        break;
      }
    }
  };

  console.log('Describing the Rover:');
  console.log('It moves forward and backward when facing N:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'n');
  Rover.move('f');
  console.log('Is in 1,2: ' + (Rover.position[0] === 1 && Rover.position[1] === 2));

  Grid.init(3, 3);
  Rover.init(1, 1, 'n');
  Rover.move('b');
  console.log('Is in 1,0: ' + (Rover.position[0] === 1 && Rover.position[1] === 0));

  console.log('\nIt moves forward and backward when facing S:');
  Grid.init(3, 3);
  Rover.init(1, 1, 's');
  Rover.move('f');
  console.log('Is in 1,0: ' + (Rover.position[0] === 1 && Rover.position[1] === 0));

  Grid.init(3, 3);
  Rover.init(1, 1, 's');
  Rover.move('b');
  console.log('Is in 1,2: ' + (Rover.position[0] === 1 && Rover.position[1] === 2));

  console.log('\nIt moves forward and backward when facing E:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'e');
  Rover.move('f');
  console.log('Is in 2,1: ' + (Rover.position[0] === 2 && Rover.position[1] === 1));

  Grid.init(3, 3);
  Rover.init(1, 1, 'e');
  Rover.move('b');
  console.log('Is in 0,1: ' + (Rover.position[0] === 0 && Rover.position[1] === 1));

  console.log('\nIt moves forward and backward when facing W:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'w');
  Rover.move('f');
  console.log('Is in 0,1: ' + (Rover.position[0] === 0 && Rover.position[1] === 1));

  Grid.init(3, 3);
  Rover.init(1, 1, 'w');
  Rover.move('b');
  console.log('Is in 2,1: ' + (Rover.position[0] === 2 && Rover.position[1] === 1));

  console.log('\nIt wraps N and S:')
  Grid.init(3, 3);
  Rover.init(1, 2, 'n');
  Rover.move('f');
  console.log('Is in 1,0: ' + (Rover.position[0] === 1 && Rover.position[1] === 0));

  Grid.init(3, 3);
  Rover.init(1, 0, 'n');
  Rover.move('b');
  console.log('Is in 1,2: ' + (Rover.position[0] === 1 && Rover.position[1] === 2));

  console.log('\nIt wraps E and W:')
  Grid.init(3, 3);
  Rover.init(2, 1, 'e');
  Rover.move('f');
  console.log('Is in 0,1: ' + (Rover.position[0] === 0 && Rover.position[1] === 1));

  Grid.init(3, 3);
  Rover.init(0, 1, 'w');
  Rover.move('f');
  console.log('Is in 2,1: ' + (Rover.position[0] === 2 && Rover.position[1] === 1));

  console.log('\nIt changes its orientation from N:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'n');
  Rover.move('r');
  console.log('Is facing e: ' + (Rover.orientation === 'e'));

  Grid.init(3, 3);
  Rover.init(1, 1, 'n');
  Rover.move('l');
  console.log('Is facing w: ' + (Rover.orientation === 'w'));

  console.log('\nIt changes its orientation from E:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'e');
  Rover.move('r');
  console.log('Is facing s: ' + (Rover.orientation === 's'));

  Grid.init(3, 3);
  Rover.init(1, 1, 'e');
  Rover.move('l');
  console.log('Is facing n: ' + (Rover.orientation === 'n'));

  console.log('\nIt changes its orientation from S:');
  Grid.init(3, 3);
  Rover.init(1, 1, 's');
  Rover.move('r');
  console.log('Is facing w: ' + (Rover.orientation === 'w'));

  Grid.init(3, 3);
  Rover.init(1, 1, 's');
  Rover.move('l');
  console.log('Is facing e: ' + (Rover.orientation === 'e'));

  console.log('\nIt changes its orientation from W:');
  Grid.init(3, 3);
  Rover.init(1, 1, 'w');
  Rover.move('r');
  console.log('Is facing n: ' + (Rover.orientation === 'n'));

  Grid.init(3, 3);
  Rover.init(1, 1, 'w');
  Rover.move('l');
  console.log('Is facing s: ' + (Rover.orientation === 's'));

  console.log('\nIt collisions with obstacles preventing it from move.');
  Grid.init(3, 3);
  Grid.setObstacles([1,2]);
  Rover.init(1, 1, 'n');
  Rover.move('f');
  console.log('Is in 1,1: ' + (Rover.position[0] === 1 && Rover.position[1] === 1));

  console.log('\nIt can follow a complex route.');
  Grid.init(3, 3);
  Grid.setObstacles([1,2]);
  Rover.init(0, 0, 'n');
  Rover.move('ffrflbrfflff');
  console.log('Is in 2,0: ' + (Rover.position[0] === 2 && Rover.position[1] === 0));
}());
