(window.webpackJsonp = window.webpackJsonp || []).push([
  [67],
  {
    570: function(t, n, o) {
      'use strict';
      o.r(n),
        o.d(n, 'default', function() {
          return r;
        });
      var e = o(144),
        d = o(175),
        u = o.n(d),
        a = u.a.mock({ 'data|70-100': ['@word'] });
      function r() {
        return e.default.sendRequest('get', { path: '/get/wordCloud' });
      }
      u.a.mock('/get/wordCloud', a);
    }
  }
]);
