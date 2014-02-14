'use strict';

var grid, rover;

console.log('Describing the rover:');
console.log('It moves forward and backward when facing N:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'n', grid);
rover.move('f');
console.log('Is in 1,2: ' + (rover.position[0] === 1 && rover.position[1] === 2));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'n', grid);
rover.move('b');
console.log('Is in 1,0: ' + (rover.position[0] === 1 && rover.position[1] === 0));

console.log('\nIt moves forward and backward when facing S:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 's', grid);
rover.move('f');
console.log('Is in 1,0: ' + (rover.position[0] === 1 && rover.position[1] === 0));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 's', grid);
rover.move('b');
console.log('Is in 1,2: ' + (rover.position[0] === 1 && rover.position[1] === 2));

console.log('\nIt moves forward and backward when facing E:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'e', grid);
rover.move('f');
console.log('Is in 2,1: ' + (rover.position[0] === 2 && rover.position[1] === 1));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'e', grid);
rover.move('b');
console.log('Is in 0,1: ' + (rover.position[0] === 0 && rover.position[1] === 1));

console.log('\nIt moves forward and backward when facing W:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'w', grid);
rover.move('f');
console.log('Is in 0,1: ' + (rover.position[0] === 0 && rover.position[1] === 1));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'w', grid);
rover.move('b');
console.log('Is in 2,1: ' + (rover.position[0] === 2 && rover.position[1] === 1));

console.log('\nIt wraps N and S:')
grid = new Grid(3, 3);
rover = new Rover(1, 2, 'n', grid);
rover.move('f');
console.log('Is in 1,0: ' + (rover.position[0] === 1 && rover.position[1] === 0));

grid = new Grid(3, 3);
rover = new Rover(1, 0, 'n', grid);
rover.move('b');
console.log('Is in 1,2: ' + (rover.position[0] === 1 && rover.position[1] === 2));

console.log('\nIt wraps E and W:')
grid = new Grid(3, 3);
rover = new Rover(2, 1, 'e', grid);
rover.move('f');
console.log('Is in 0,1: ' + (rover.position[0] === 0 && rover.position[1] === 1));

grid = new Grid(3, 3);
rover = new Rover(0, 1, 'w', grid);
rover.move('f');
console.log('Is in 2,1: ' + (rover.position[0] === 2 && rover.position[1] === 1));

console.log('\nIt changes its orientation from N:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'n', grid);
rover.move('r');
console.log('Is facing e: ' + (rover.orientation === 'e'));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'n', grid);
rover.move('l');
console.log('Is facing w: ' + (rover.orientation === 'w'));

console.log('\nIt changes its orientation from E:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'e', grid);
rover.move('r');
console.log('Is facing s: ' + (rover.orientation === 's'));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'e', grid);
rover.move('l');
console.log('Is facing n: ' + (rover.orientation === 'n'));

console.log('\nIt changes its orientation from S:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 's', grid);
rover.move('r');
console.log('Is facing w: ' + (rover.orientation === 'w'));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 's', grid);
rover.move('l');
console.log('Is facing e: ' + (rover.orientation === 'e'));

console.log('\nIt changes its orientation from W:');
grid = new Grid(3, 3);
rover = new Rover(1, 1, 'w', grid);
rover.move('r');
console.log('Is facing n: ' + (rover.orientation === 'n'));

grid = new Grid(3, 3);
rover = new Rover(1, 1, 'w', grid);
rover.move('l');
console.log('Is facing s: ' + (rover.orientation === 's'));

console.log('\nIt collisions with obstacles preventing it from move.');
grid = new Grid(3, 3);
grid.setObstacles([[1,2]]);
rover = new Rover(1, 1, 'n', grid);
rover.move('f');
console.log('Is in 1,1: ' + (rover.position[0] === 1 && rover.position[1] === 1));

console.log('\nIt can follow a complex route.');
grid = new Grid(3, 3);
grid.setObstacles([[1,2]]);
rover = new Rover(0, 0, 'n', grid);
rover.move('ffrflbrfflff');
console.log('Is in 2,0: ' + (rover.position[0] === 2 && rover.position[1] === 0));
