function DebugRemoteLogger(loggerId) {
    async function postData(data = {}) {
      var body = JSON.stringify(data);
  
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
  
      xhr.open("POST", "https://us-central1-schirrel.cloudfunctions.net/logger");
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.send(body);
    }
  
    var _log = console.log;
    var _error = console.error;
    var _warn = console.warn;
    var _info = console.info;
    var _dir = console.dir;
    var _debug = console.debug;
  
    var comunicate = (args) => {
      var data = {
        loggerId: loggerId,
        args: args,
        info: {
          oscpu: window.navigator.oscpu,
          userAgent: window.navigator.userAgent,
          appCodeName: window.navigator.appCodeName,
          appName: window.navigator.appName,
          appVersion: window.navigator.appVersion,
          product: window.navigator.product,
          platform: window.navigator.platform,
          vendor: window.navigator.vendor,
        },
      };
      postData(data);
    };
  
    document.addEventListener("error", (evt) => {
      comunicate(JSON.stringify(evt));
    });
  
    console.error = function () {
      comunicate({ arguments, type: "error", date: new Date() }); // Send a mail with the error description
      _error.apply(console, arguments);
    };
  
    console.log = function () {
      comunicate({ arguments, type: "log", date: new Date() }); // Send a mail with the error description
      _log.apply(console, arguments);
    };
  
    console.warn = function () {
      comunicate({ arguments, type: "warn", date: new Date() }); // Send a mail with the error description
      _warn.apply(console, arguments);
    };
  
    console.info = function () {
      comunicate({ arguments, type: "info", date: new Date() }); // Send a mail with the error description
      _info.apply(console, arguments);
    };
  
    console.debug = function () {
      comunicate({ arguments, type: "debug", date: new Date() }); // Send a mail with the error description
      _debug.apply(console, arguments);
    };
    console.dir = function () {
      comunicate({ arguments, type: "dir", date: new Date() }); // Send a mail with the error description
      _dir.apply(console, arguments);
    };
  }
  
  export { DebugRemoteLogger };
  