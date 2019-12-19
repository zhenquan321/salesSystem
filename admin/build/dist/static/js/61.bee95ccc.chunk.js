(window.webpackJsonp = window.webpackJsonp || []).push([
  [61],
  {
    556: function(t, n, o) {
      'use strict';
      o.r(n),
        o.d(n, 'default', function() {
          return r;
        });
      var e = o(139),
        d = o(170),
        u = o.n(d),
        a = u.a.mock({ 'data|70-100': ['@word'] });
      function r() {
        return e.default.sendRequest('get', { path: '/get/wordCloud' });
      }
      u.a.mock('/get/wordCloud', a);
    }
  }
]);
