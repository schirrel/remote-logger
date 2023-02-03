# Remote Logger
See `console.log` and its _siblings_ as well as exceptions throw from another place.

Initially develop to help on mobile debug of logs, mostly for Safari or iOS Browser. But you can use as you wish.

Logs may live no more than 3/4 days at our database.

![RemoteLogger](https://user-images.githubusercontent.com/6757777/216325507-650b2213-55d9-4a2d-956e-94670ef7f522.gif)


# Install

```sh 
    npm i @schirrel/remote-logger
```

```sh 
    yarn add @schirrel/remote-logger
```
## CDN
```sh
https://cdn.jsdelivr.net/gh/schirrel/remote-logger@main/lib/remote-logger.min.js
```

## How it works
Generate your logger id at https://remote-logger.web.app/  

Setup it on you app and watch the loggers at [Watcher](https://remote-logger.web.app/watch).

## Usage
## CDN
at HTML
```html
    <script src="https://cdn.jsdelivr.net/gh/schirrel/remote-logger@main/lib/remote-logger.min.js"> </script>
```

at JavaScript
```js
import "https://cdn.jsdelivr.net/gh/schirrel/remote-logger@main/lib/remote-logger.min.js"
```


Installed
```js
import "@schirrel/remote-logger"
```

Now the `DebugRemoteLogger` is global and simple use as:
```js
DebugRemoteLogger("your-generated-id")
```

