## Introduction

Here you have a (hopefully) fully-functional game of blackjack, based on eight decks and a single player. All functionality is included for a single player, except the ability to "split" a pair hand. Have fun! It's got some bugs, but it should be, for the most part, playable. 

Please note: I moved this project into the github.io folder at the end of construction - to see the full revision history, please see my repo "projects/unit_01/blackjack" folder itself.

## Technologies used:
* Javascript
* jQuery
* HTML
* CSS
* Twitter Bootstrap

## the approach taken

I tried to build this game as modularly as possible. The entire game is contained within an object, and each function is, if possible, within the player or dealer who that object affects. All player-linked game states possible are stored within the player object, and the DOM elements are created and removed in the same functions in which their corresponding objects in memory are created or removed. 

## installation instructions(which may just be a link to your hosted game)

Visit my game at johndshea.github.io

## wireframe images

![](workflow/DOM_Wireframe.jpg)

## user stories

![](workflow/user_story.jpg)

## To-Do list:
* add settimeouts so that hitting, etc. isn't instantaneous.

## Outstanding bug list:

No remaining major bugs.

## Fixed Bug List:
1. every now and then, I get a really weird error: Uncaught RangeError: Maximum call stack size exceeded(…) game.js:58. This seems to happen whenever I do a recursive function call. SOLUTION: don't use recursion as the default in a switch statment.
2. .slice() keeps creating a new nested array every time it is used. This is making things very complicated. SOLUTION: slice returns an array, so use .slice()[0] instead.
3. The function to empty the player hand and dealer hand isn't removing the first card. SOLUTION: set pop() loop to decrement, not increment.
4. Intermittently, "hit" dispenses two cards at once. Seems to often be after a bust. SOLUTION: isolate event listeners so they don't get run concurrently more than once. 
5. Game doesn't correctly recognize Aces as optionally 11 points. SOLUTION: implemented "if" function that treates Aces as 11 if total + 11 <= 21.
6. The first ace is always counted as 11, regardless of whether it would be more advantageous for the user if that ace was eventually counted as a 1. SOLUTION: added logic that tests for the presence of an ace, and if an ace is present and the score is over 21, subtracts 10 from the score. 

## Feature wish list:
* Build animations
* make multiple player objects. Perhaps an array of players? Need constructor function.
* create constructor to generate a deck rather than using a giant object?
* move a bunch of Player/Dealer functions (hit, bust, score, blackjack, etc) into a constructor?
* add "split" functionality