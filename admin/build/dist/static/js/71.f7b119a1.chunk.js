(window.webpackJsonp = window.webpackJsonp || []).push([
  [71],
  {
    676: function(n, t, e) {
      'use strict';
      e.r(t),
        e.d(t, 'debounce', function() {
          return r;
        }),
        e.d(t, 'scientificNotation', function() {
          return u;
        }),
        e.d(t, 'halfAdjust', function() {
          return i;
        });
      var o = e(97);
      function r(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300,
          e = null;
        return function() {
          var o = arguments,
            r = this;
          e && clearTimeout(e),
            (e = setTimeout(function() {
              n.apply(r, o);
            }, t));
        };
      }
      function u(n) {
        if ('undefined' === typeof n || null === n || isNaN(n)) return n;
        var t = n.toString(),
          e = t.split('.'),
          r = Object(o.a)(e, 2),
          u = r[0],
          i = r[1];
        if (u.length <= 3) return t;
        for (var c = '', a = u.length - 1, f = 1; a > -1; a--, f++) {
          c = (f % 3 === 0 ? ','.concat(u[a]) : u[a]) + c;
        }
        return (c = c.replace(/^,/, '') + (i ? '.'.concat(i) : ''));
      }
      function i(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        if (!n || !t) return console.log('you should provide a num and fixed length'), !1;
        var e = Math.pow(10, t),
          o = n * e;
        return Math.round(o) / e;
      }
    }
  }
]);
