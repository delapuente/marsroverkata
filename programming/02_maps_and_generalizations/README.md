
# Maps & Generalizations

Our `rover.js` module has a lot of code repetition. You can appreciate it in `moveForward()` and `moveBackward()` methods or in `turnRight()` and `turnLeft()`. Of course it is not the same code but you will probably noticed some pattern. Furthermore, the use of _switch_ statements is always a little bit dangerous for the ease whith which we can make mistakes when forgetting `break` or `default` statements.

## Maps to replace switch statements

An alternative for certain _switch statements_ in which there are not fall-throughs and we are comparing with Numbers or Strings are maps. A map is no more than an Object we **use to transform a value into another**. In this case we want to transform the value resulting from the `switch` expression into a function. Let's see how to convert one form into the other:

```javascript
switch (<expression>) {
  case <value1>:
    <instructions>
  break

  case <value2>:
    <instructions>
  break

  ...

  default:
    <instructions>
  break
}
```

This is almost the same as preparing the map:

```javascript
var map = {
  value1: function () {
    <instructions>
  },
  value2: function () {
    <instructions>
  },
  ...
};
```

And now use the `<expression>` to select the proper function and call it immediately:

```javascript
map[<expression>]();
```

The only thin it remains is to implement the `default` behaviour for the `default` clause? For this end, we can use the method `hasOwnProperty()` method from Objects to check if the parameter is the name for a key inside the Object. So:

```javascript
var key = <expression>;
if (!map.hasOwnProperty(key) {
  // Default clause instructions
}
else {
  map[key]();
}
```

### Applied to the Mars Rover Kata

The first switch to remove is that from the `move()` method:

```javascript
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
```

A trivial transformation could be:

```javascript
move: function (commands) {
  var self = this;

  var actions = {
    f: function () { self.moveForward(); },
    b: function () { self.moveBackward(); },
    r: function () { self.turnRight(); },
    l: function () { self.turnLeft(); }
  };

  for (var i = 0; i < commands.length; i++) {
    var c = commands[i];
    if (!actions.hasOwnProperty(c)) {
      console.log('Unrecognized command: ' + c);
    }
    else {
      actions[c]();
    }
  }
},
```

The only difference from what was explained before is that `this.moveForward()` wont work as `this` wont be pointing to the _rover_ Object but to the map `actions` so we need to copy the reference to the rover and then force to use it instead of `this` that is automatically set.

Although this solution is valid, we can do better by adding an intermediate map to translate the short command names `f`, `b`, `r` and `l` to their complete method names `moveForward`, `moveBackward`, `turnRight` and `turnLeft`.

```javascript
move: function (commands) {
  var actions = {
    f: 'moveForward',
    b: 'moveBackward',
    r: 'turnRight',
    l: 'turnLeft'
  };

  for (var i = 0; i < commands.length; i++) {
    var c = commands[i];
    if (!actions.hasOwnProperty(c)) {
      console.log('Unrecognized command: ' + c);
    }
    else {
      var methodName = actions[c];
      this[methodName]();
    }
  }
},
```

This way we can forget about using the `self` variable as the method is called from the `rover` Object so the future `this` variable will be pointing the `rover` object too.

## Sequence of states

Some programs pass through a sequence of stages called **states**. Upon certain events, the state is changed (or advanced) to the **next state**. When in a state, the program performs some operations related to that state according to the received input. These programs are usually called _state machines_. A common pattern to advance the state of a state machine is by using a _switch_ statement. Another is to use a map where keys are the current state and values are the next state. When one state has, at most, only one previous state we can simply use a counter starting at some number `n` and where the next state is `n+1`, the next `n+2` and so on. The set of states can be circular so the _last_ state can transition to the first one.

### Applied to the Mars Rover Kata

We found this kind of behaviour in `turnRight()` and `turnLeft()` methods which are almost the same, one advancing the state clockwise and the other counter-clockwise. Indeed, first thing we are doing is to refactor both of them to use a unique common method `_turn()`:

```javascript
turnRight: function () {
  this._turn('right');
},
turnLeft: function () {
  this._turn('left');
},
```

To not alter orientation representation and keep it being a character instead of a number we will take a workaround. We are going to map `n`, `e`, `s` and `w` to numbers `0`, `1`, `2` and `3` through a String (which is no more than a sequence of characters). You have the complete code here:

```javascript
_turn: function (direction) {
  var orientationCount = this._orientations.length;
  var currentIndex = this._orientations.indexOf(this.orientation);
  var step = direction === 'left' ? -1 : 1;
  var nextIndex = (currentIndex + step + orientationCount) % orientationCount;
  this.orientation = this._orientations.charAt(nextIndex);
},
_orientations: 'nesw'
```

## Generalization

Generalization is not always obvious. From time to time, recoginzing patterns consists first into adding some superflual code not affecting the behaviour then looking for patterns again. It is an abstraction process and it requires a lot of practice.

For instance, look at this function and you probably think we are doing things completely different from case to case:

```javascript
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
```

For north and south we are incrementing / decrementing the Y component while for east and west we are incrementing / decrementing the X component.

But let's rewrite it as follows:

```javascript
moveForward: function () {
  var formerPosition = [
    this.position[0],
    this.position[1]
  ];
  switch (this.orientation) {
    case 'n':
      this.position[1] = (this.position[1] + 1 + Grid.sizeY) % Grid.sizeY;
      this.position[0] = (this.position[0] + 0 + Grid.sizeX) % Grid.sizeX;
    break;
    case 'e':
      this.position[1] = (this.position[1] + 0 + Grid.sizeY) % Grid.sizeY;
      this.position[0] = (this.position[0] + 1 + Grid.sizeX) % Grid.sizeX;
    break;
    case 's':
      this.position[1] = (this.position[1] + (-1) + Grid.sizeY) % Grid.sizeY;
      this.position[0] = (this.position[0] +   0 + Grid.sizeX) % Grid.sizeX;
    break;
    case 'w':
      this.position[1] = (this.position[1] +   0 + Grid.sizeY) % Grid.sizeY;
      this.position[0] = (this.position[0] + (-1) + Grid.sizeX) % Grid.sizeX;
    break;
  }
  if (Grid.thereIsObstacle(this.position[0], this.position[1])) {
    this.position = formerPosition;
  }
},
```

Interesting, isn't it? Now it is clear we are making exactly the same with the exception of the amounts we add to Y and X components for each direction. A map again: this time to translate from a direction to a pair of increments for Y and X.

### Applied to the Mars Rover Kata

If you perform the same transformation to the code in `moveBackward()` you will end substracting amounts instead of incrementing them. The amounts for each direction will be the same but the operator will be the substraction in `moveBackward()` (did I tell you to substract is like adding but mutiplied by `-1`?). So, in reality, you are simply advancing:  `moveForward()` advances you to the front while `moveBackward()` advances you to the rear. Let's rewrite these methods as:

```javascript
moveForward: function () {
  this._advance(1);
},
moveBackward: function () {
  this._advance(-1);
},
```

And the remaining method `_advance()` looks like:

```javascript
_advance: function (steps) {
  var formerPosition = [
    this.position[0],
    this.position[1]
  ];
  var increment = this._increments[this.orientation];
  var realIncrement = [
    increment[0] * steps,
    increment[1] * steps
  ];
  this.position = [
    (this.position[0] + realIncrement[0] + Grid.sizeX) % Grid.sizeX,
    (this.position[1] + realIncrement[1] + Grid.sizeY) % Grid.sizeY
  ];
  if (Grid.thereIsObstacle(this.position[0], this.position[1])) {
    this.position = formerPosition;
  }
},
_increments: {
  n: [0, 1],
  e: [1, 0],
  s: [0, -1],
  w: [-1, 0]
},
```

Now all the switches has been removed and replaced by maps and methods look more simple and there is less code repetition. Congratulations! Congratulations!
