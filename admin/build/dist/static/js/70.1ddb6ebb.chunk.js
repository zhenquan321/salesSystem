(window.webpackJsonp = window.webpackJsonp || []).push([
  [70],
  {
    1306: function(e, t, n) {
      'use strict';
      function i(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
              return n;
            }
          })(e) ||
          (function(e) {
            if (
              Symbol.iterator in Object(e) ||
              '[object Arguments]' === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
          })()
        );
      }
      n.d(t, 'a', function() {
        return i;
      });
    },
    537: function(e, t, n) {
      'use strict';
      n.r(t);
      var i = n(1306),
        a = n(51),
        r = n(52),
        s = n(177),
        o = n.n(s),
        c = n(178),
        u = new ((function() {
          function e() {
            Object(a.a)(this, e), (this.displayChart = new Map());
          }
          return (
            Object(r.a)(e, [
              {
                key: 'initChart',
                value: function(e) {
                  if (e && e.id && e.option) {
                    var t = e.id,
                      n = e.option,
                      i = e.otherOption,
                      a = this.getInstance(t);
                    return (
                      void 0 === a && (a = o.a.init(document.getElementById(t))),
                      a.setOption(n),
                      this.addResize(a),
                      this.cacheDisplayChart(t),
                      i && a.setOption(i),
                      a
                    );
                  }
                }
              },
              {
                key: 'getInstance',
                value: function(e) {
                  return o.a.getInstanceByDom(document.getElementById(e));
                }
              },
              {
                key: 'registerMap',
                value: function(e, t) {
                  o.a.registerMap(e, t);
                }
              },
              {
                key: 'addResize',
                value: function(e) {
                  (e._windowResizeEvent = function() {
                    Object(c.default)(e.resize());
                  }),
                    window.addEventListener('resize', e._windowResizeEvent);
                }
              },
              {
                key: 'cacheDisplayChart',
                value: function(e) {
                  this.displayChart.set(e, '');
                }
              },
              {
                key: 'resizeAllDisplayChart',
                value: function() {
                  var e = this,
                    t = Object(i.a)(this.displayChart.keys());
                  setTimeout(function() {
                    t.forEach(function(t) {
                      e.getInstance(t)._windowResizeEvent();
                    });
                  }, 700);
                }
              },
              {
                key: 'dispose',
                value: function(e) {
                  this.removeDisplayChart(e),
                    this.removeResize(e),
                    o.a.dispose(this.getInstance(e));
                }
              },
              {
                key: 'removeDisplayChart',
                value: function(e) {
                  this.displayChart.has(e) && this.displayChart.delete(e);
                }
              },
              {
                key: 'removeResize',
                value: function(e) {
                  var t = this.getInstance(e);
                  window.removeEventListener('resize', t._windowResizeEvent);
                }
              }
            ]),
            e
          );
        })())();
      t.default = u;
    }
  }
]);
