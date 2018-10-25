/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "df5807fee79e349175f10d12b998fdb6"
  },
  {
    "url": "about/index.html",
    "revision": "ab01bf7b856f7889fe640a3a35d5fb1d"
  },
  {
    "url": "assets/css/1.styles.777d109f.css",
    "revision": "93812a269611b84a4bf0b604fb25523e"
  },
  {
    "url": "assets/css/2.styles.edb37d43.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/styles.4d1475fc.css",
    "revision": "e6d2c79ad846338edaface4ce4283ccd"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.777d109f.js",
    "revision": "f460efd1a02f6e5dfc2782cceb8d06ba"
  },
  {
    "url": "assets/js/2.edb37d43.js",
    "revision": "f3f2258e27822314bbd55bf46748bdae"
  },
  {
    "url": "assets/js/3.bf874884.js",
    "revision": "1fb0e0a210997b547a9bf8d20db94b5c"
  },
  {
    "url": "assets/js/4.f08ff2d4.js",
    "revision": "69ec2a847474711247be2122fd88b0a4"
  },
  {
    "url": "assets/js/5.37adf730.js",
    "revision": "9d584726e8de4b1c361547e66baf0a63"
  },
  {
    "url": "assets/js/6.236448fd.js",
    "revision": "247917e90d251cffb5367d5a1ae1c1ad"
  },
  {
    "url": "assets/js/7.fc093776.js",
    "revision": "38e1a1bf8fce33e98d1bc79740158aab"
  },
  {
    "url": "assets/js/8.d6c0a0f0.js",
    "revision": "f00059f67840a007cd6ac13a93aac820"
  },
  {
    "url": "assets/js/9.8e91bec7.js",
    "revision": "4e8ec8a1cf6f03afd1a596e3480cd1fa"
  },
  {
    "url": "assets/js/app.4d1475fc.js",
    "revision": "15773467ab917bf0d974b7374cd3cb58"
  },
  {
    "url": "blog/index.html",
    "revision": "036f5d1831b0c6473a5f2d606f358348"
  },
  {
    "url": "blog/one.html",
    "revision": "3c46c3dc3e800c38d4035e615d7562ca"
  },
  {
    "url": "blog/two.html",
    "revision": "5c476caa0dbcb4ebe34543de555356f7"
  },
  {
    "url": "img/home.jpg",
    "revision": "b8ed2d7d95d5c4da37c7fe241f1c8919"
  },
  {
    "url": "index.html",
    "revision": "2d55aa6169fab1162c48a61fdf762bba"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
