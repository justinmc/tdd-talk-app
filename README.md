# tdd-talk-app
Example app for my talk, [Practical TDD in JavaScript](https://github.com/justinmc/tdd-talk).  View it live at [https://justinmc.github.io/tdd-talk-app/](https://justinmc.github.io/tdd-talk-app/).

## Development
To get started developing on this app, first check out the proper branch.  You probably want to start at the first example:

    git checkout example1

Then start the app by running the following:

    npm install
    npm start

A development server will start at port 8080 and any changes will automatically update.

Then to run the tests in TDD mode, run this in a separate terminal:

    npm run tdd

Now open up a text editor and open the `src/svg.js` and `test/svg_spec.js` files, and look for TODOs where you need to complete the code.

### Branch Details

There are two examples in the [slides](https://justinmc.github.io/tdd-talk), and this project contains branches for the start and completion of each of them.  For the first example, which deals with `toViewBoxCoords`, check out the branch `example1`, or `example1-complete` for the solution.  The second example is just the same, so check out `example2` or `example2-complete` for the example that deals with `isColliding`.
