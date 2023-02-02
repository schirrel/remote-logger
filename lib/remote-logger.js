function DebugRemoteLogger(loggerId) {
  function postData(data = {}) {
    var body = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.open("POST", "https://us-central1-schirrel.cloudfunctions.net/logger");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(body);
  }

  var communicate = (args) => {
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

  addEventListener("error", (evt) => {
    communicate({
      arguments: {
        error: evt.error,
        filename: evt.filename,
        line: evt.lineno,
        message: evt.message,
      },
      type: "exception",
      date: new Date(),
    });
  });

  Object.keys(console).forEach(logType => {
    var sourceLog = console[logType]

    console[logType] = function () {
      communicate({ arguments, type: logType, date: new Date() });
      sourceLog.apply(console, arguments);
    };
  })
}

window.DebugRemoteLogger = DebugRemoteLogger;
