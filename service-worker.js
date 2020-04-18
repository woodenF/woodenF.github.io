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
    "revision": "45549baed6e17da4925b9b2ff0d30057"
  },
  {
    "url": "about/index.html",
    "revision": "2f7c1895ad4731952623efff0c76184a"
  },
  {
    "url": "about/记录.html",
    "revision": "a3c932c3beceaf029e4640ac4145b0a9"
  },
  {
    "url": "assets/css/1.styles.c02e4caa.css",
    "revision": "93812a269611b84a4bf0b604fb25523e"
  },
  {
    "url": "assets/css/2.styles.d29c1530.css",
    "revision": "a44975ce8c738d73004ee8293aca798b"
  },
  {
    "url": "assets/css/6.styles.32927020.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/styles.29e5e05d.css",
    "revision": "cdbcfbd9a0654e6beec824fcc18d54a3"
  },
  {
    "url": "assets/img/maze.c2a8b096.gif",
    "revision": "c2a8b09652f02b9fce96ee2ddc0d2b2b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.c02e4caa.js",
    "revision": "7327aa92b96bafa161bc5592bb94fec7"
  },
  {
    "url": "assets/js/10.90901edc.js",
    "revision": "a1c4dbe33aa1202e3a230c6933986dcd"
  },
  {
    "url": "assets/js/11.2758416f.js",
    "revision": "0d070834a124a229129fff68bcb17dc1"
  },
  {
    "url": "assets/js/12.801e72e2.js",
    "revision": "e96c36fcaf77ba44fe9820c0da6e9247"
  },
  {
    "url": "assets/js/13.21e35677.js",
    "revision": "be6d48170ee734e64293685002686217"
  },
  {
    "url": "assets/js/14.165d4bbd.js",
    "revision": "e4e13c782d716a6d9fd2b2661c5d80fb"
  },
  {
    "url": "assets/js/15.e3293457.js",
    "revision": "32021492417a662259fde1244a70bce6"
  },
  {
    "url": "assets/js/16.1fd8df9b.js",
    "revision": "ade7ff4fd716e477ae9aba34631b42d0"
  },
  {
    "url": "assets/js/17.11421986.js",
    "revision": "03f61f697c111f07f90e7ef18a512cb1"
  },
  {
    "url": "assets/js/2.d29c1530.js",
    "revision": "490daa78a347dcd774b532d25f9b1f5c"
  },
  {
    "url": "assets/js/3.56fa4c88.js",
    "revision": "1fb0c23d758315cea3f0696bd7455cc5"
  },
  {
    "url": "assets/js/4.e5161400.js",
    "revision": "591e134a5bd8675c5012222de5334190"
  },
  {
    "url": "assets/js/5.6c8240da.js",
    "revision": "02c7f783763145af59e357dca1444350"
  },
  {
    "url": "assets/js/6.32927020.js",
    "revision": "0ea21e10f94ce67ec1d7bfae90b5bdc5"
  },
  {
    "url": "assets/js/7.850cfbff.js",
    "revision": "dc6c1ea283b6f998abc51f6f8ccd667f"
  },
  {
    "url": "assets/js/8.99d38b57.js",
    "revision": "bd928d76b416a663530e2d0e25954090"
  },
  {
    "url": "assets/js/9.dbeb849f.js",
    "revision": "e196db200af0aa317531c642590fa6ea"
  },
  {
    "url": "assets/js/app.29e5e05d.js",
    "revision": "2322a97e87083344863dd9b168cd9098"
  },
  {
    "url": "blog/JavaScript/design.html",
    "revision": "4e691f9fca2c51e438cd5fb7a888fb0c"
  },
  {
    "url": "blog/JavaScript/judge.html",
    "revision": "d28ae51fdd6e33d28c602470b738107e"
  },
  {
    "url": "blog/JavaScript/maze.html",
    "revision": "c99ef0fdf3151f05940648e255cae62f"
  },
  {
    "url": "blog/JavaScript/sudoku.html",
    "revision": "a512a8d7fddb6d9e727cc4882dcccf60"
  },
  {
    "url": "blog/JavaScript/VSCodePlugin.html",
    "revision": "39b2b89ace8a1f7a01aad477efa412e1"
  },
  {
    "url": "blog/JavaScript/Webpack4.x.html",
    "revision": "3dee64d74121d5d6c77812904ac31ac8"
  },
  {
    "url": "blog/JavaScript深入/call和apply的模拟实现.html",
    "revision": "22d1546f1cec0c2dfa1afde9536945f1"
  },
  {
    "url": "blog/JavaScript深入/JavaScript的事件循环.html",
    "revision": "19fe7d9e76db3b99d1ca0851270c32a3"
  },
  {
    "url": "blog/JavaScript深入/从原型到原型链.html",
    "revision": "b6b45dc1fa11e4354f3883b230d43d54"
  },
  {
    "url": "eventLoop/1.png",
    "revision": "dc074aa399755c2736d209aaf7623291"
  },
  {
    "url": "eventLoop/2.jpg",
    "revision": "c3f5952213111548535cf1db3233137a"
  },
  {
    "url": "eventLoop/3.png",
    "revision": "c304aa048e4f34a4cf1f3ff82716ced9"
  },
  {
    "url": "eventLoop/4.png",
    "revision": "9b3f638e8f65ef42b9d281d83142e58e"
  },
  {
    "url": "eventLoop/5.png",
    "revision": "d48a1030834b0eb091444922850db87b"
  },
  {
    "url": "img/home.jpg",
    "revision": "b8ed2d7d95d5c4da37c7fe241f1c8919"
  },
  {
    "url": "img/home2.jpg",
    "revision": "631fa05646154aa383d0535bad9ee96a"
  },
  {
    "url": "index.html",
    "revision": "4ed7c598f9c5b47aa376d6eee859a4d9"
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
