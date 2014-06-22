
# The Art of Debugging

To debug is to trace failing programs in order to detect problems in the source code that lead to misbehaviours. To detect a bug we need a test case, i.e. a repetitive failing case with specific steps to reproduce. Once we have a failing case, with controlled initial conditions, we can run the program instruction by instruction and inspect how the state changes.

Modern browsers provide us with tools for **inspecting memory** and **running programs step by step**. These tools are called **debuggers**. Across this course we will use the Chrome debugger to find some [bugs](http://en.wikipedia.org/wiki/Software_bug#Etymology).

## The Chrome debugger

Start bby opening the `index_e1.html` file, press `ctrl+shift+i` and see in the console how some tests are failing. At the open panel, choose the `Sources` tab.

![Chrome developer tools](images/developer-tools.png?raw=true)


In these examples, both tests and code are in the same file, press `ctrl+o` and select `kata_e1.js`. Locate the test that's failing in the code explorer bu looking for the test title (press `ctrl+f` to search inside files and look for `It changes its orientation from N`) and make click in the margin of the line 213 (you can navigate to a line by pressing `ctrl+g` and entering the line number):

![A breakpoint in line 213](images/breakpoint.png?raw=true)

Congratulations, you have put your first breakpoint and you will start to debug shortly.

### Breakpoints

A breakpoint is a mark for a line in the source code telling the debugger to stop before executing the instructions where the breakpoint is placed. Once placed the breakpoint, refresh the page by pressing `F5`. Next time the program run it will stop just before executing line 213. After placing a breakpoint we can use debugger controls to advance the execution step by step (`F10`), resume execution (`F11`) or entering a function call (`F11`). Let's enter into `Rover.move()`: click on the source view and press `F11`.

![Execution controls are in the bottom-left corner](images/execution-control.png?raw=true)

You will be transported to line 30, before entering the loop for the first time.

### The Callstack View

When calling a function from another, the new called function is added to a function stack. When the function ends its execution, the function is removed from the stack. This stack can be inspected and used to revisit any of the functions at any time in the debugging session. The topmost entry in the callstack view represents the current execution cursor. Descending through the stack is going back to the calling functions.

![Callstack view shows the current line where execution is stalled](images/callstack.png?raw=true)

Notice how the lowest item in the stack is the _autofunction_ for the module itself.

### Variable inspector

Just to the right of the callstack and closely related, there is the _variable inspector_ when you can control the content of variables or custom expressions. The _Scope variable_ tab shows the variables that can be accessed from the current execution point. They are classified into _locals_ for variables declared inside the present function, _Closure_ for those in the _closure function_ and _Global_ for those in the `window` object.

![Variables available from current execution point](images/variable-inspector.png?raw=true)

Notice how `i` and `c` are both `undefined` while parameter `commands` and the special variable `this` have been properly set by JavaScript during the function call. If advancing one step (press `F10`), `i` will be initialized with `0` and another step (again, `F10`) will assign `c` to the first (and solely) command.

Continue advancing until you reach line 110, entering into new functions when proceeds.

### Watch expressions

Now you're paused before entering the _Switch statement_. For debugging you should able to foresee what the code will do in order to check if the current behaviour matches your expectation. Now, it should select the case for current orientation (north, `n` as you can see if clicking on the breakpoint to quickly go there). We know current orientation is kept in `this.orientation` so, after clicking in the topmost function in the callstack to return to the present context, we can click the plus symbol in the _Watch Expression_ tab and write `this.orientation`. Another form is to simply open the `this` variable in the _Scope Variables_ tab. Anyway, it should display `"n"`.

![Expression inspector](images/expression-inspector.png?raw=true)

You can go one step further by pressing `F10`. You will notice something weird: it did not select any value. What happen here?

### In-code inspector

Resume the execution (press `F8`) and refresh the page (`F5`). When stopping in line 110 again, put the cursor over the expression of the _Switch Statement_ and Chrome will show you the contents for that expression:

![In-code inspector](images/in-code-inspector.png?raw=true)

Whats happening is for some reason the switch expression is `undefined` and `undefined` is not an option. Proably you already know why the expression is `undefined` but if not, take a closer look and see what's is written and not what you think is written. Do you realize it? Fix the problem and rerun the program. All test should be passing now.

### The `debugger` command

JavaScript allow to enter programatic breakpoints by using the `debugger` statement. Open the file `index_e2.html` in a browser and see one of the tests that is failing. Now open `kata_e2.js` in a code editor and look for that test. Write `debugger;` in the line before.

```javascript
Grid.init(3, 3);
Rover.init(0, 1, 'w');
debugger;
Rover.move('f');
console.log('Is in 2,1: ' + (Rover.position[0] === 2 && Rover.position[1] === 1));
```

For `debugger` to work it is **very important the debugger is already open**.

Now refresh the page to run the tests again and the execution will stop just when reaching  the `debugger` instruction. This command is very useful for those bugs that can prevent you from stopping the execution when desired. They can be put inside a _if statement_ for make them conditionals.

Try to debug this example by your own.

Clue: _copy and paste_ is evil.

## Exercises

Test your debugging skills by trying to solve all the `kata_n.js` exercises. Open the proper `index_n.html` and look at the test to see what is failing. Then debug the code until locating the solution. You can see the solutions in the file `solutions.md`.
