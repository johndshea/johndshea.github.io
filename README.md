Personal website for full-stack web developer John Shea

Todo:
* Set up "about" window to display by default and showcase basic resume info in the style of the macOS "about this mac" window
* use AngularJS 1.0 as a window management system
* get at least partial faux menus working on the menubar
* add battery status indicator (default to "plugged in" symbol), set to refresh every five minutes, also change icon on plug/unplug
* Test the site in Firefox and IE, particularly the battery indicator and the fonts

Bugs:
* traffic lights are too close to top and left of window, don't adjust to header bar size

References:
* Faux-desktop UI webapp inspiration: https://www.whoismrrobot.com/
* OSX-style window styles: http://photonkit.com/
* OSX-style traffic light buttons: https://codepen.io/atdrago/pen/yezrBR
* Other OSX-style visuals: http://www.bypeople.com/osx-yosemite-sketch-ui-kit/

Future design considerations:
* Does the clock have to update every second? We can probably scale that back for performance gains. Maybe ever 15 seconds?
* Update the app from AngularJS 1 with Javascript to AngularJS 2 with TypeScript and NPM
* test the battery meter on other browsers, consider using a polyfill if if doesn't work: https://gist.github.com/strings28/667320
