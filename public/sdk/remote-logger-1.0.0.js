function DebugRemoteLogger(e){var o=console.log,n=console.error,a=console.warn,t=console.info,r=console.dir,p=console.debug,s=o=>{!async function(e={}){var o=JSON.stringify(e),n=new XMLHttpRequest;n.withCredentials=!1,n.open("POST","https://us-central1-schirrel.cloudfunctions.net/logger"),n.setRequestHeader("Content-Type","application/json"),n.send(o)}({loggerId:e,args:o,info:{oscpu:window.navigator.oscpu,userAgent:window.navigator.userAgent,appCodeName:window.navigator.appCodeName,appName:window.navigator.appName,appVersion:window.navigator.appVersion,product:window.navigator.product,platform:window.navigator.platform,vendor:window.navigator.vendor}})};console.error=function(){s({arguments:arguments,type:"error",date:new Date}),n.apply(console,arguments)},console.log=function(){s({arguments:arguments,type:"log",date:new Date}),o.apply(console,arguments)},console.warn=function(){s({arguments:arguments,type:"warn",date:new Date}),a.apply(console,arguments)},console.info=function(){s({arguments:arguments,type:"info",date:new Date}),t.apply(console,arguments)},console.debug=function(){s({arguments:arguments,type:"debug",date:new Date}),p.apply(console,arguments)},console.dir=function(){s({arguments:arguments,type:"dir",date:new Date}),r.apply(console,arguments)}}export{DebugRemoteLogger};