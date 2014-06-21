
# Modularization

Current version of JavaScript has not the concept of module. It has only a global namespace where the developer can put all it want to share among the whole program. Several solutions have been developed to ease the dependency problem. Some of them are libraries such as [RequireJS](http://requirejs.org/) or [Browserify](http://browserify.org/). [Next iteration of JavaScript incorporates the module concept](http://wiki.ecmascript.org/doku.php?id=harmony:modules) and we could get rid of these libraries or techniques but until then, it is convenient to know how to manually modularize and isolate our code.

## The module pattern

The module pattern uses a _function literal_ to create a new scope and keep all the implementation details inside the scope without allowing other modules to access its internals. The pattern calls the function immadiately using a technique called _autofunction_ so the function code expose a unique global variable with all the module definitions. Let's see the general form:

```javascript
(function () {

  /* Private variables and definitions */

  var Module = {
    /* Module definition */
  };

  /* Expose in a global variable */
  window.ModuleName = Module;

}());
```

### Autofunctions

Autofunctions are special JavaScript constructions to define and immediately call a function. Remember that in JavaScript, calling a function is not very different to use an operator. So, in the same way this is valid JavaScript:

```javascript
( 5+1 );
```

This is valid JavaScript as well:

```javascript
( function(){}() );
```

We could be tempted to remove the wrapping pair of brackets but then JavaScript would believe we were defining a function without name (as the line would start by the keyword `function`) instead of using a _function literal_, so, in this case, the pair of additional parenthesis is mandatory. Providing a name does not solves anything as a function definition can not be called.

The use of autofunctions should be avoided for other uses rather than this as it decreas de readability and could lead to confussion:

```javascript
// Is this code assigning a function that returns "Hi!" or assigning "Hi!"?
var a = (function () {
  return "Hi!";
}());
```

### Sharing with third parties

When we are modularizing our code, the risk of providing the same name for two different modules is almost none but if we are sharing our code with third parties the chance increases. To prevent the user from changing our code (the global variable name), we can add a method `restore()` to the module for _restoring_ the former content to the global variable and return the our Module Object to be used by the third-party code:

```javascript
(function () {

  /* Private variables and definitions */

  var Module = {
    /* Module definition */
  };

  /* Save the former content for ModuleName  */
  var formerContent = window.ModuleName;

  /* Expose in a global variable */
  window.ModuleName = Module;

  /* Add the restore method */
  Module.restore = function () {
    window.ModuleName = formerContent;
    return this;
  };

}());
```

### Use strict

Modules have another advantage. We can add a unique `'use strict'` directive at the beginning of the autofunction and all our code will be affected without adding the pragma once for each module function.

## Applied to the Mars Rover Kata

Modularize your code into three modules. One for the grid, another for the rover and one more for the tests. Notice the grid and rover modules will export two objects while the test is in charge only for executing the suite. Remember to add the new modules in the proper order to the `index.html` file.
