(window.webpackJsonp = window.webpackJsonp || []).push([
  [65],
  {
    498: function(t, n, e) {
      'use strict';
      e.r(n),
        e.d(n, 'randomNumber', function() {
          return u;
        }),
        e.d(n, 'getProjectList', function() {
          return c;
        }),
        e.d(n, 'getContact', function() {
          return d;
        });
      var r = e(139),
        a = e(170),
        o = e.n(a);
      function u(t, n) {
        return Math.floor(Math.random() * (n - t) + t);
      }
      var i = o.a.mock({
        'data|6-6': [
          { name: '@first', detail: '@paragraph(1)', domain: '@domain', time: '@boolean' }
        ]
      });
      function c() {
        return r.default.sendRequest('get', { path: '/get/projectList' });
      }
      function d() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 15;
        return r.default.sendRequest('get', {
          path: 'https://randomuser.me/api/?inc=picture,name&results='.concat(t)
        });
      }
      o.a.mock('/get/projectList', i);
    }
  }
]);
