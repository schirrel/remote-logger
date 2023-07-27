function DebugRemoteLogger(loggerId, options = {}) {
  var optionsDefined = options.only && options.only.length;

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

  var consoleKeys = Object.keys(console);

  if (optionsDefined) {
    consoleKeys = consoleKeys.filter((key) =>
      options.only.some((only) => only == key)
    );
  }

  consoleKeys.forEach((logType) => {
    var sourceLog = console[logType];

    console[logType] = function () {
      communicate({ arguments, type: logType, date: new Date() });
      sourceLog.apply(console, arguments);
    };
  });

  if (optionsDefined && !options.only.some((option) => option == "error"))
    return;

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
}

window.DebugRemoteLogger = DebugRemoteLogger;
