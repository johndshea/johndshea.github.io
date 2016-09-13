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
