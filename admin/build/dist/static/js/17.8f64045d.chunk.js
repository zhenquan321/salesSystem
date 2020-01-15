(window.webpackJsonp = window.webpackJsonp || []).push([
  [17],
  {
    245: function(e, a, t) {
      'use strict';
      t.r(a);
      t(1121);
      var c = t(351),
        s = t(0),
        l = t.n(s),
        i = t(1201),
        n = t.n(i);
      a.default = function(e) {
        var a = e.title,
          t = e.subtitle,
          s = e.extra,
          i = e.actions,
          r = e.type,
          m = Object(c.a)(e, ['title', 'subtitle', 'extra', 'actions', 'type']),
          o = {
            failed: l.a.createElement(o, {
              className: ''.concat(n.a.icon, ' ').concat(n.a.failed),
              type: 'close-circle',
              theme: 'filled'
            }),
            successed: l.a.createElement(o, {
              className: n.a.icon,
              type: 'check-circle',
              theme: 'filled'
            })
          };
        return l.a.createElement(
          'div',
          Object.assign({ className: n.a.result }, m),
          o[r],
          l.a.createElement('p', { className: n.a.title }, a),
          l.a.createElement('p', { className: n.a.subTitle }, t),
          s && l.a.createElement('div', { className: n.a.extra }, s),
          i && l.a.createElement('div', { className: n.a.actions }, i)
        );
      };
    }
  }
]);
