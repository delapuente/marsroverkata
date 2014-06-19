
# JavaScript Programming and Debugging Techniques

This repository is intended to demonstrate some programming techniques beyond the [introductory JavaScript course hosted in codepen.io](http://codepen.io/collection/JKfzm/). We will start by implementing a version of the [Mars Rover Kata](http://dallashackclub.com/rover), a pure console JavaScript exercise for practicing elementary programming concepts. The Mars Rover Kata is stated as follows:

  * Develop an api that moves a rover around on a grid.
  * You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
  * The rover receives a character array of commands.
  * Implement commands that move the rover forward/backward (f,b).
  * Implement commands that turn the rover left/right (l,r).
  * Implement wrapping from one edge of the grid to another. (planets are spheres after all)
  * Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.

## A simple test-suite

For developing to be a little bit easier I wrote some tests. As long as you respect the API, your program should pass all the tests (it should show `true` for all the logs). You can put them after your program or in a different script file. It's up to you:

```javascript
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
Grid.setObstacles([[1,2]]);
Rover.init(1, 1, 'n');
Rover.move('f');
console.log('Is in 1,1: ' + (Rover.position[0] === 1 && Rover.position[1] === 1));

console.log('\nIt can follow a complex route.');
Grid.init(3, 3);
Grid.setObstacles([[1,2]]);
Rover.init(0, 0, 'n');
Rover.move('ffrflbrfflff');
console.log('Is in 2,0: ' + (Rover.position[0] === 2 && Rover.position[1] === 0));
```

## Programming techniques

The folder `programming` includes four techniques and optimizations for advanced development. Each technique includes a `README.md` file that can be read online explaining the technique and providing some examples. Techniques are sorted and each one is based on the former one.

## Debugging techniques

The folder `debugging` includes a `README.md` explaining the Chrome debugger and a set of 7 bugged versions of the kata. They are not guided at all but inside the folder `resolution` you can find a `README.md` file with the solution for all of them.
