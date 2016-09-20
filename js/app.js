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
(function updateBattery() {
  navigator.getBattery().then(function (battery) {
    setBatteryStatus(battery);

    battery.addEventListener('chargingchange', function(){
      setBatteryStatus(battery);
    });

    battery.addEventListener('levelchange', function(){
      setBatteryStatus(battery);
    });
  });

  function setBatteryStatus(battery) {
    document.getElementById('bolt').setAttribute("style",("display:" + (battery.charging === true ? "block" : "none")));
    if (battery.charging) {
      document.getElementById('battery-bar').setAttribute("style","width: 100%");
    } else {
      document.getElementById('battery-bar').setAttribute("style",("width:" + (battery.level * 100) + "%"));
    }
  }
})();


// WebRTC lookup code courtesy of @diafygi at https://github.com/diafygi/webrtc-ips

//get the IP addresses associated with an account
function getIPs(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

//Test: Print the IP addresses into the console
getIPs(function(ip){console.log(ip);});
