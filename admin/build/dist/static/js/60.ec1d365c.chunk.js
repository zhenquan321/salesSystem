(window.webpackJsonp = window.webpackJsonp || []).push([
  [60, 63],
  {
    503: function(t, e, n) {
      'use strict';
      n.r(e);
      var i,
        r,
        o,
        a,
        u,
        c,
        s,
        l = n(32),
        p = n(50),
        d = n(51),
        b = n(21),
        f = (n(174), n(7)),
        h = n(0),
        m = n.n(h),
        g = n(505);
      Object(f.g)({ enforceActions: 'always' });
      var O = new ((i = (function() {
        function t() {
          var e = this;
          Object(p.a)(this, t),
            Object(l.a)(this, 'current', r, this),
            Object(l.a)(this, 'submitting', o, this),
            Object(l.a)(this, 'data', a, this),
            (this.steps = void 0),
            (this.getStepChild = function() {
              return e.steps[e.current].component;
            }),
            Object(l.a)(this, 'initStep', u, this),
            Object(l.a)(this, 'onPrev', c, this),
            Object(l.a)(this, 'onSubmit', s, this),
            (this.steps = [
              {
                id: 'form.stepTitle1',
                title: '\u8fdb\u8d27\u4fe1\u606f',
                component: m.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(2), n.e(3), n.e(4), n.e(99)]).then(
                    n.bind(null, 511)
                  );
                })
              },
              {
                id: 'form.stepTitle2',
                title: '\u9500\u552e\u4fe1\u606f',
                component: m.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(2), n.e(3), n.e(4), n.e(100)]).then(
                    n.bind(null, 512)
                  );
                })
              },
              {
                id: 'form.stepTitle3',
                title: '\u5b8c\u6210',
                component: m.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(1), n.e(101)]).then(n.bind(null, 513));
                })
              }
            ]);
        }
        return (
          Object(d.a)(t, [
            {
              key: 'nextStep',
              value: function() {
                this.current++, (this.submitting = !1);
              }
            },
            {
              key: 'setValue',
              value: function(t) {
                this.data = t;
              }
            }
          ]),
          t
        );
      })()),
      (r = Object(b.a)(i.prototype, 'current', [f.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return 0;
        }
      })),
      (o = Object(b.a)(i.prototype, 'submitting', [f.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (a = Object(b.a)(i.prototype, 'data', [f.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return {
            goodName: '',
            imageFile: '',
            price: 0,
            originalPrice: 0,
            stockNum: 0,
            spec: '',
            dec: ''
          };
        }
      })),
      (u = Object(b.a)(i.prototype, 'initStep', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.current = 0;
          };
        }
      })),
      Object(b.a)(
        i.prototype,
        'nextStep',
        [f.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'nextStep'),
        i.prototype
      ),
      Object(b.a)(
        i.prototype,
        'setValue',
        [f.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'setValue'),
        i.prototype
      ),
      (c = Object(b.a)(i.prototype, 'onPrev', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.current--;
          };
        }
      })),
      (s = Object(b.a)(i.prototype, 'onSubmit', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.submitting = !0;
            var e = JSON.parse(JSON.stringify(t.data));
            Object(g.createGoods)(e)
              .then(function(e) {
                console.log(e.data);
                var n = e.data,
                  i = n.code;
                n.data;
                200 === i && t.nextStep();
              })
              .catch(function() {
                t.initStep();
              });
          };
        }
      })),
      i)();
      e.default = O;
    },
    505: function(t, e, n) {
      'use strict';
      n.r(e),
        n.d(e, 'createGoods', function() {
          return r;
        }),
        n.d(e, 'deleteGoods', function() {
          return o;
        }),
        n.d(e, 'updateGoods', function() {
          return a;
        }),
        n.d(e, 'goodsList', function() {
          return u;
        }),
        n.d(e, 'goodsDetail', function() {
          return c;
        });
      var i = n(139);
      function r(t) {
        return i.default.sendRequest('post', { path: '/v1/goods', params: t });
      }
      function o(t) {
        return i.default.sendRequest('delete', { path: '/v1/goods/' + t });
      }
      function a(t, e) {
        return i.default.sendRequest('put', { path: '/v1/goods/' + t, params: e });
      }
      function u() {
        return i.default.sendRequest('get', { path: '/v1/goods' });
      }
      function c(t) {
        return i.default.sendRequest('get', { path: '/v1/goods/' + t });
      }
    }
  }
]);
