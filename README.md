# sw-chrome-debug

## environment
```
vscode 1.56.2
Debugger for Chrome 4.12.12
```

## Project setup
```
yarn install
```

## run
```
vscode run 'vuejs' and 'vuejs: chrome'
->exception 'Uncaught (in promise) DOMException: Entry already exists.'
```

## memo
```
yarn add @vue/cli
yarn vue create sw-chrome-debug
? Please pick a preset
? Default ([Vue 2] babel, eslint) 
? Pick the package manager to use when installing dependencies
? Use Yarn 

$ cd sw-chrome-debug
$ mkdir config
$ touch config/index.js

devtool: 'source-map',

$ mkdir .vscode
$ touch .vscode/launch.json

{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "vuejs",
        "runtimeExecutable": "npm",
        "runtimeArgs": [
          "run",
          "serve"
        ],
        "console": "integratedTerminal",
        "trace": true,
      },
      {
          "type": "chrome",
          "request": "launch",
          "name": "vuejs: chrome",
          "url": "http://localhost:8080",
          "webRoot": "${workspaceFolder}/src",
          "breakOnLoad": true,
          "sourceMapPathOverrides": {
            "webpack:///src/*": "${webRoot}/*"
          },
          "trace": true,
      },
    ]
  }


src/main.js
add

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}


touch public/service-worker.js

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded `)
} else {
  console.log(`Boo! Workbox didn't load `)
}

const precacheController = new workbox.precaching.PrecacheController()

const files = ['/v.jpg']
const precacheManifest = files.map((element) => {
  return { url: element, revision: '1234' }
})
precacheController.addToCacheList(precacheManifest)

addEventListener('install', (event) => {
  // Uncaught (in promise) DOMException: Entry already exists.
  event.waitUntil(precacheController.install(event))
})

addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate(event))
})


↓

Uncaught (in promise) DOMException: Entry already exists.
```