
# OOP & Classes

**O**bject **O**riented **P**rogramming is a technique for programming in which the problem is split into entities called Objects. These Objects include their own data structures and operations and can communicate among them by sending messages. For achieving OOP, the only mandatory requirement is to provide some way to produce Objects.

One way you already know for providing objects is a _factory function_:

```javascript
function newStartFighter(model, pilot) {
  var startFighter = {
    model: model,
    pilot: pilot,
    shoot: function (target) {
      console.log(this.pilot + ' is shooting ' + target.pilot);
    }
  };
  return startFighter;
}

var xwing = newStartFighter('X-Wing', 'Luke Skywalker');
var tie = newStartFighter('TIE Fighter', 'Darth Vader');
tie.shoot(xwing);
```

Classes are a mechanism to organize objects' hierarchies and share behaviour. When using classes, some properties are said to be part of the class and not the object itself and different objects can access same properties and are marked as instances of the same class. In some languages, classes are the only way to produce Objects while in JavaScript they are only a feature.

```javascript
function StartFighter(model, pilot) {
  this.model = model;
  this.pilot = pilot;
}

StartFighter.prototype.shoot = function (target) {
  console.log(this.pilot + ' is shooting ' + target.pilot);
};

var xwing = new StartFighter('X-Wing', 'Luke Skywalker');
var tie = new StartFighter('TIE Fighter', 'Darth Vader');
tie.shoot(xwing);
tie instanceof StartFighter; // will print true
xwing instanceof StartFighter; // will print true
tie.shoot === xwing.shoot; // it's true
tie.shoot === StartFighter.prototype.shoot; // it's true
tie.constructor === StartFighter; // it's true
xwing.constructor === StartFighter; // it's true too
```

## Constructor functions

A constructor function for a class act like a _factory function_: it initialize objects and mark them as instances of the class. Actually in JavaScript you don't have constructor functions, instead you can use any function as a constructor when calling it preceeded by the keyword `new`. The `new` operator takes the function, apply it on the new object (will be `this` inside the function) and return the object. This way, inside a constructor function you will be using `this` to initialize the object.

```javascript
function StartFighter(model, pilot) {
  this.model = model;
  this.pilot = pilot;
}

var xwing = StartFighter('X-Wing', 'Luke Skywalker') // will fail
var xwing = new StartFighter('X-Wing', 'Luke Skywalker'); // will work

// The following will work but it is not the same as using new
var xwing = StartFighter.apply({}, ['X-Wing', 'Luke Skywalker']);
xwing instanceof StartFighter; will be false
```

## Prototypes

Any object in JavaScript has a prototype chain. The prototype is another Object which hold common functionality for a variety of Objects. When accessing a property for an object, if the object itself does not have a key with the provided name, the key is search inside its prototype. If not found, then the prototype of the prototype is search and so on... When creating a new object using the literal notation `{}` the object property points to `Object.prototype` object. This is the reason you can check:

```javascript
var o = {};
var p = {};
o.hasOwnProperty === p.hasOwnProperty;
o.hasOwnProperty === Object.prototype.hasOwnProperty;
```

When using the `new` operator, the new object's prototype is set to the `prototype` property of the constructor function. This prototype is automatically created by JavaScript for **every function**:

```javascript
function f() {
}
f.prototype !== undefined;
```

The `prototype` object has only one property inside: `constructor` pointing to the constructor function itself:

```javascript
f.prototype.constructor === f;
```

As JavaScript will set the prototype for the new object to the constructor's `prototype` property, all we can add to this object **will be shared between all the objects constructed by the function**. As the special variable `this` is set depending on how the function is called, it is normal to add the behaviour to the prototype relying into `this` to access instance properties.

Accessing the property `constructor` for any object allow us to get the constructor function for that object. Using the special operator `instanceof` is another way.

```javascript
xwing.constructor === StartFighter;
xwing instanceof StartFighter;
```

## Inheritance

Another powerful feature of classes is inheritance. Inheritance allow to provide more specific classes based on other ones. Any function implements inheritance of the Object constructor. Check this:

```javascript
xwing instanceof Object; // despite you did not make this explictly
xwing.hasOwnProperty === Object.hasOwnProperty;
```

This is thanks to the prototype chain as well. When creating a function, JavaScript will set the `prototype` property to a bare object `{}` with a `constructor` property. The prototype for a bare object is already `Object.prototype`. This mean if a key is not found in the object itselg, it will be look for in its prototype and if not found neither, it will be looked for in the **prototype of the prototype** which is `Object.prototype`. So it is a chain.

The operator `<object> instanceof <function>` actually check if `function.prototype` is in the prototype chain of `object` (you can access the next link in the prototype chain of an object with [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) method. Consider the following example:

```javascript
function XWing(pilot) {
  StartFighter.apply(this, ['X-Wing', pilot])
  this.shields = 100;
}
XWing.prototype = Object.create(StartFighter.prototype);
XWing.prototype.constructor = XWing;

XWing.prototype.useShields = function () {
  this.shields -= 10;
  console.log(this.pilot + ' enabled shields.');
  console.log('Shield power: ' + this.shields);
};

var luke = new XWing('Luke Skywalker');
var biggs = new XWing('Biggs Darklighter');
luke.useShields();
biggs.useShields();
biggs.useShields();

luke instanceof XWing;
luke instanceof StartFighter;
```

Here we provide a specialization for `StartFighter` that allow us to create only `X-Wings`. Inside the function, we need to call StartFighter in a special way: by allowing StartFighter to construct a new StartFighter, with the model fixed, then enriching the new object with the specific features for _X-Wing_ startfighters.

To implement inheritance, the `XWing.prototype` is set to an object we forced its prototype to be `StartFighter.prototype` property through the use of [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). This new object has its prototype chain pointing to the parameter we specified but it's totally empty so we need to restore the `constructor` property to point to the `XWing` function.

Now you can enrich the methods for `XWing` instances by adding new properties to the prototype.

## Applies to the Mars Rover Kata

For the Kata, we are converting the modules `Rover` and `Kata` into classes. I recommend you to take a look at the tests to realize how the objects are used now:

```javascript
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
```

The `grid` is passed to the `rover` instance because it must to check the `grid` for obstacles.

When converting the Module into a class, you will start by creating a constructor function:

```javascript
var Rover = window.Rover = function Rover(x, y, orientation, map) {
  this.position = [x, y];
  this.orientation = orientation;
  this.map = map;
};
```

As we are not using inheritance, we can leave the `prototype` property as is.

Now move all the former module objects to be properties inside the `prototype` object.

```javascript
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

  if (!Grid.thereIsObstacle(x1, y1)) {
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
```

Finally change every `Grid` appearance by the property holding the grid for the rover (`this.map`).

```javascript
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
```
