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

## Instalation

## Usage

If installed with npm you need to import
```js
import '@schirrel/remote-logger/lib/remote-logger';
```


The `DebugRemoteLogger` function is available globally.

```js
DebugRemoteLogger(id: string , options?: {only: []})
```
- `id` string is required
- `options` object is options, and currenty has only a single option:
    - `only` array of string that should match console levels from `Object.keys(console)`:
        -  'debug', 'error', 'info', 'log', 'warn', 'dir', 'dirxml', 'table', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp', 'context', 'createTask', 'memory']


```js
DebugRemoteLogger("your-generated-id")
// with options
DebugRemoteLogger("your-generated-id", { only: ['info'])
DebugRemoteLogger("your-generated-id", { only: ['warn', 'error'])
DebugRemoteLogger("your-generated-id", { only: ['debug'])
DebugRemoteLogger("your-generated-id", { only: ['error'])
```

