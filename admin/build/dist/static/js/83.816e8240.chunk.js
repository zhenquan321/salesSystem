(window.webpackJsonp = window.webpackJsonp || []).push([
  [83],
  {
    546: function(t, r, n) {
      'use strict';
      function o(t) {
        var r,
          n = 'undefined' === typeof t ? localStorage.getItem('ra-authority') : t;
        try {
          r = JSON.parse(n);
        } catch (o) {
          r = n;
        }
        return 'string' === typeof r ? [r] : r;
      }
      function e(t) {
        var r = 'string' === typeof t ? [t] : t;
        localStorage.setItem('ra-authority', JSON.stringify(r));
      }
      function u() {
        localStorage.removeItem('ra-authority');
      }
      function i(t, r) {
        var n = null;
        return (function t(r, o) {
          return (
            o.forEach(function(o) {
              r === o.path ? (n = o.authority) : o.routes && (n = t(r, o.routes));
            }),
            n
          );
        })(t, r);
      }
      n.r(r),
        n.d(r, 'getAuthority', function() {
          return o;
        }),
        n.d(r, 'setAuthority', function() {
          return e;
        }),
        n.d(r, 'clearAuthority', function() {
          return u;
        }),
        n.d(r, 'getRouteAuthority', function() {
          return i;
        });
    }
  }
]);
