// show/hide menubar drop-downs when an item is clicked
(function listenForMenuClicks() {
  // select all menu items
  var menuItems = document.querySelectorAll(".menuItem");

  // add the "selected" class to the menubar itself
  function showMenu() {
    document.getElementById('menubar').classList.toggle('selected');
  }

  // add click listeners to each element
  Array.from(menuItems).forEach(function(element) {
    element.addEventListener('click', showMenu);
  });
})();

// run the menubar clock
(function clock() {
  (function startTime() {
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var today = new Date(),
        weekday = weekdays[today.getDay()],
        hours = today.getHours(),
        ampm = hours >= 12 ? 'PM' : 'AM',
        hours = hours % 12; // hour '14' should be '2'
        hours = hours ? hours : 12; // hour '0' should be '12'
        minutes = today.getMinutes();
        minutes = minutes < 10 ? '0'+minutes : minutes; // minute '1' should be '01'
    document.getElementById('clock').innerHTML = weekday + " " + hours + ":" + minutes + " " + ampm;
    // recursively re-run this function every second
    var t = setTimeout(function () {
        startTime()
    }, 1000);
  })()
})();

// make windows draggable within the main section
$( function() {
  $( ".window" ).draggable({ containment: "main" });
} );

// center .centered windows horizontally and vertically
$.fn.center = function () {
   this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}
$('.centered').center();

// set main section height to viewport height minus navbar height
$( function() {
  $( "main" ).height($( window ).height() - $( "#menubar" ).height());
} );

// // get machine battery status
// (function () {
//
//             //#region Constants
//             var NOT_APPLICABLE = "N/A";
//             //#endregion
//
//             //#region Helper Methods
//             function setBatteryLevel(level, callback) {
//                 document.getElementById("level").innerHTML = "Battery Level: " + level;
//
//                 if (callback &amp;&amp; typeof (callback) === "function") {
//                     callback();
//                 }
//             };
//
//             function setChargingStatus(status, callback) {
//                 document.getElementById("charging").innerHTML = "Charging Status: " + (status === NOT_APPLICABLE ? NOT_APPLICABLE : (status === true ? "Charging" : "Un-plugged"));
//
//                 if (callback &amp;&amp; typeof (callback) === "function") {
//                     callback();
//                 }
//             };
//             //#endregion
//
//             try {
//
//                 navigator.getBattery().then(function (battery) {
//                     // When initial promise from navigator.getBattery() is recieved set the current statuses.
//                     setBatteryLevel(battery.level);
//                     setChargingStatus(battery.charging);
//
//                     battery.onlevelchange = function (evt) { // Event info is available as param
//                         var _level = battery.level;
//                         setBatteryLevel(_level, function () {
//                             console.log("Battery level changed: " + _level, battery);
//                         });
//                     };
//
//                     battery.onchargingchange = function (evt) { // Event info is available as param
//                         var _charging = battery.charging;
//                         setChargingStatus(_charging, function () {
//                             console.log("Battery charging status changed: " + _charging, battery);
//                         });
//                     }
//                 });
//             }
//             catch (e) {
//                 // Catch the error if navigator.getBattery isn't defined
//                 document.getElementById("error").innerHTML = "Unable to retrieve battery status. Error Message: " + e;
//
//                 // Update
//                 setBatteryLevel(NOT_APPLICABLE);
//                 setChargingStatus(NOT_APPLICABLE);
//
//             }
//         })();
