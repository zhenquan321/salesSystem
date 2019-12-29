(window.webpackJsonp = window.webpackJsonp || []).push([
  [16],
  {
    1251: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      (t.SizeSensorId = 'size-sensor-id'),
        (t.SensorStyle =
          'display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;opacity:0'),
        (t.SensorClassName = 'size-sensor-object'),
        (t.SensorTabIndex = '-1');
    },
    1255: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.removeSensor = t.getSensor = void 0);
      var o,
        r = n(1256),
        i = (o = r) && o.__esModule ? o : { default: o },
        s = n(1257),
        u = n(1251);
      var a = {};
      (t.getSensor = function(e) {
        var t = e.getAttribute(u.SizeSensorId);
        if (t && a[t]) return a[t];
        var n = (0, i.default)();
        e.setAttribute(u.SizeSensorId, n);
        var o = (0, s.createSensor)(e);
        return (a[n] = o), o;
      }),
        (t.removeSensor = function(e) {
          var t = e.element.getAttribute(u.SizeSensorId);
          e.element.removeAttribute(u.SizeSensorId), e.destroy(), t && a[t] && delete a[t];
        });
    },
    1256: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o = 1;
      (t.default = function() {
        return '' + o++;
      }),
        (e.exports = t.default);
    },
    1257: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.createSensor = void 0);
      var o = n(1258);
      t.createSensor = o.createSensor;
    },
    1258: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.createSensor = void 0);
      var o,
        r = n(1259),
        i = (o = r) && o.__esModule ? o : { default: o },
        s = n(1251);
      t.createSensor = function(e) {
        var t = void 0,
          n = [],
          o = (0, i.default)(function() {
            n.forEach(function(t) {
              t(e);
            });
          }),
          r = function() {
            t &&
              t.parentNode &&
              (t.contentDocument && t.contentDocument.defaultView.removeEventListener('resize', o),
              t.parentNode.removeChild(t),
              (t = void 0),
              (n = []));
          };
        return {
          element: e,
          bind: function(r) {
            t ||
              (t = (function() {
                'static' === getComputedStyle(e).position && (e.style.position = 'relative');
                var t = document.createElement('object');
                return (
                  (t.onload = function() {
                    t.contentDocument.defaultView.addEventListener('resize', o), o();
                  }),
                  t.setAttribute('style', s.SensorStyle),
                  t.setAttribute('class', s.SensorClassName),
                  t.setAttribute('tabindex', s.SensorTabIndex),
                  (t.type = 'text/html'),
                  e.appendChild(t),
                  (t.data = 'about:blank'),
                  t
                );
              })()),
              -1 === n.indexOf(r) && n.push(r);
          },
          destroy: r,
          unbind: function(e) {
            var o = n.indexOf(e);
            -1 !== o && n.splice(o, 1), 0 === n.length && t && r();
          }
        };
      };
    },
    1259: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 60,
            n = null;
          return function() {
            for (var o = this, r = arguments.length, i = Array(r), s = 0; s < r; s++)
              i[s] = arguments[s];
            clearTimeout(n),
              (n = setTimeout(function() {
                e.apply(o, i);
              }, t));
          };
        }),
        (e.exports = t.default);
    },
    1300: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.ver = t.clear = t.bind = void 0);
      var o = n(1255);
      (t.bind = function(e, t) {
        var n = (0, o.getSensor)(e);
        return (
          n.bind(t),
          function() {
            n.unbind(t);
          }
        );
      }),
        (t.clear = function(e) {
          var t = (0, o.getSensor)(e);
          (0, o.removeSensor)(t);
        }),
        (t.ver = '0.2.4');
    }
  }
]);
