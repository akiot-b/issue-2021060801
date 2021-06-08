
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded `)
} else {
  console.log(`Boo! Workbox didn't load `)
}

const cacheName = workbox.core.cacheNames.precache
caches.open(cacheName).then((cache) => {
  console.log(cache)

  // キャッシュされたもの一覧
    cache.keys().then((alreadyCachedRequests) => {
      console.log(alreadyCachedRequests)

      // キャッシュされたもののURL一覧
      const alreadyCachedURLs = new Set(
        alreadyCachedRequests.map((request) => request.url)
      )

      // キャッシュからコントローラーを復元する？
      console.log(alreadyCachedURLs)
      const urls = alreadyCachedRequests.map((request) => request.url)
      precacheController.addToCacheList(urls)
    })
})


const precacheController = new workbox.precaching.PrecacheController()


const files = ['/v.png']

const precacheManifest = files.map((element) => {
  return { url: element, revision: '1234' }
})
precacheController.addToCacheList(precacheManifest)

addEventListener('install', (event) => {
  event.waitUntil(precacheController.install(event))
})

addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate(event))
})
