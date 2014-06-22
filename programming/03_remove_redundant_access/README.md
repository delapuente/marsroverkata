
# Caching values

Caching values into variables to avoid reduntant access is a simple and effective technique for speeding JavaScript.

This time is short, here there are simple advices to you.

## Cache the length of the Array while iterating

A lot of lists in JavaScript seems to be Arrays but they are not (I'm talking about living DOM lists, of course) and the length is recalculated each time we access it.

```javascript
var liveList = document.getElementsByTagName('p');
for (var i = 0, l = array.length; i < l; i++) {
  console.log(array[i]);
}
```

## Cache Object properties if accessing more than once

Accesing objects is more expensive than accessing variables and a tedious task when working with deeply nested properties. If you are accessing the same Object property more than once, cache the value into a local variable. This is the actual reason we apply the former technique to the length of true Arrays as well:

```javascript
function distance(pointA, pointB) {
  var aX, aY, bX, bY

  aX = pointA.x;
  aY = pointA.y;

  bX = pointB.x;
  bY = pointB.y;

  var xDistance = aX - bX;
  var yDistance = aY - bY;
  
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
```

## Use parameters instead of accessing closure variables

When you nest a function into another and access one of the outer function's variable from the inner one JavaScript first search inside the inner function, then jumps to the outer one and continue jumping until reaching the global object. If you find yourself with a nesting level greater than 2, instead of accessing variables in the closure, pass them as parameters:

```javascript
function outer() {
  var outerVariable;

  // For deeply nested functions, it is preferible this:
  inner(outerVariable);
  function inner(localParameter) {
    console.log(localParameter);
  }

  // Rather than this:
  inner();
  function inner() {
    // Do things with outerVariable
  }
}
```

## A note about optimization

Don't get mad with optimization. It is better to add a variable to introduce a new name and clarify something rather than adding a variable because _we think_ it will perform better. **Measure first!** Notice that optimization only makes sense if the task you are optimizing is a bottle neck. Modern browsers include special tools called **profilers** to get statistics and to measure times for functions. If you detect a very used function with long execution time, focus on optimizing that function. This is a result of the [Amdahl's law](http://en.wikipedia.org/wiki/Amdahl's_law).

## Applied to the Mars Rover Kata

In our project, we are only caching the values in `_advance()` function.

```javascript
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
```

Notice we have altered the last check. Since we are not modifying the `position` property any longer, now we simple check if there is an object in the new position. If not, we simply change the whole position Array.
