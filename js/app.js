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

// get machine battery status
(function () {
  function setChargingStatus(status, callback) {
    document.getElementById("charging").innerHTML = "Charging Status: " + (status === true ? "Charging" : "Un-plugged");
    if (callback && typeof (callback) === "function") {
      callback();
    }
  };

  navigator.getBattery().then(function (battery) {
    // When initial promise from navigator.getBattery() is recieved set the current statuses.
    document.getElementById('battery-bar').setAttribute("style",("width:" + (battery.level * 100) + "%"));
    setChargingStatus(battery.charging);
  });
})();
