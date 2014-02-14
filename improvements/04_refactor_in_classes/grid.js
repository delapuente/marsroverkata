'use strict';

function Grid(sizeX, sizeY) {
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.obstacles = [];
}

Grid.prototype.setObstacles = function (obstacles) {
  this.obstacles = obstacles;
};

Grid.prototype.thereIsObstacle = function (x, y) {
  for (var i = 0; i < this.obstacles.length; i++) {
    var obstacle = this.obstacles[i];
    if (obstacle[0] === x && obstacle[1] === y) {
      return true;
    }
  }
  return false;
};
