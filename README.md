# Project-Tic-Tac-Toe
A Tic Tac Toe game you can play in your browser!

Assignment:
I'm going to store the gameboard as an array inside of a Gameboard object.

The players are also going to be stored in objects, and I'll want an object to control the flow of the game itself.

My main goal here is to have as little global code as possible. I'll tuck as much as I can inside factories. 
If I only need a single instance of something (e.g. the gameboard, the displayController etc.) then I'll wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

I'll include logic that checks for when the game is over.
I'll check for all winning 3-in-a-rows and ties. 

(The DOM and HTML/CSS is a secondary priority until the game is working.) 

I'll call your functions and pass arguments to them to play the game myself and check if everything is working as intended.
(I'll then be able to add user input later on.) 

After I have a working console game:

Create an object that will handle the display/DOM logic. 

Write a function that will render the contents of the gameboard array to the webpage 
(for now, I can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken.

Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end.