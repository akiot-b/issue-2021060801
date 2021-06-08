
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
