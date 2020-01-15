(window.webpackJsonp = window.webpackJsonp || []).push([
  [82],
  {
    583: function(n, e, o) {
      'use strict';
      o.r(e),
        o.d(e, 'register', function() {
          return i;
        }),
        o.d(e, 'unregister', function() {
          return a;
        });
      var t = Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      );
      function i(n) {
        if ('serviceWorker' in navigator) {
          if (new URL('.', window.location.href).origin !== window.location.origin) return;
          window.addEventListener('load', function() {
            var e = ''.concat('.', '/service-worker.js');
            t
              ? (!(function(n, e) {
                  fetch(n)
                    .then(function(o) {
                      var t = o.headers.get('content-type');
                      404 === o.status || (null != t && -1 === t.indexOf('javascript'))
                        ? navigator.serviceWorker.ready.then(function(n) {
                            n.unregister().then(function() {
                              window.location.reload();
                            });
                          })
                        : r(n, e);
                    })
                    .catch(function() {
                      console.log('No internet connection found. App is running in offline mode.');
                    });
                })(e, n),
                navigator.serviceWorker.ready.then(function() {
                  console.log(
                    'This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA'
                  );
                }))
              : r(e, n);
          });
        }
      }
      function r(n, e) {
        navigator.serviceWorker
          .register(n)
          .then(function(n) {
            n.onupdatefound = function() {
              var o = n.installing;
              null != o &&
                (o.onstatechange = function() {
                  'installed' === o.state &&
                    (navigator.serviceWorker.controller
                      ? (console.log(
                          'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                        ),
                        e && e.onUpdate && e.onUpdate(n))
                      : (console.log('Content is cached for offline use.'),
                        e && e.onSuccess && e.onSuccess(n)));
                });
            };
          })
          .catch(function(n) {
            console.error('Error during service worker registration:', n);
          });
      }
      function a() {
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(n) {
            n.unregister();
          });
      }
    }
  }
]);
