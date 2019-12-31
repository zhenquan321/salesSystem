(window.webpackJsonp = window.webpackJsonp || []).push([
  [63, 66],
  {
    500: function(t, e, n) {
      'use strict';
      n.r(e),
        n.d(e, 'createGoods', function() {
          return o;
        }),
        n.d(e, 'deleteGoods', function() {
          return r;
        }),
        n.d(e, 'updateGoods', function() {
          return a;
        }),
        n.d(e, 'goodsList', function() {
          return u;
        }),
        n.d(e, 'goodsDetail', function() {
          return c;
        }),
        n.d(e, 'goodsAnalysis', function() {
          return s;
        });
      var i = n(141);
      function o(t) {
        return i.default.sendRequest('post', { path: '/api/v1/goods', params: t });
      }
      function r(t) {
        return i.default.sendRequest('delete', { path: '/api/v1/goods/' + t });
      }
      function a(t, e) {
        return i.default.sendRequest('put', { path: '/api/v1/goods/' + t, params: e });
      }
      function u(t) {
        return i.default.get('/api/v1/goods', { params: t });
      }
      function c(t) {
        return i.default.sendRequest('get', { path: '/api/v1/goods/' + t });
      }
      function s() {
        return i.default.sendRequest('get', { path: '/api/v1/goodsAnalysis' });
      }
    },
    506: function(t, e, n) {
      'use strict';
      n.r(e);
      var i,
        o,
        r,
        a,
        u,
        c,
        s,
        p,
        d,
        l = n(32),
        b = n(51),
        f = n(52),
        h = n(21),
        g = (n(175), n(7)),
        m = n(0),
        O = n.n(m),
        j = n(500);
      Object(g.g)({ enforceActions: 'always' });
      var y = new ((i = (function() {
        function t() {
          var e = this;
          Object(b.a)(this, t),
            Object(l.a)(this, 'current', o, this),
            Object(l.a)(this, 'submitting', r, this),
            Object(l.a)(this, 'updateGoods', a, this),
            Object(l.a)(this, 'data', u, this),
            (this.steps = void 0),
            (this.getStepChild = function() {
              return e.steps[e.current].component;
            }),
            Object(l.a)(this, 'initStep', c, this),
            Object(l.a)(this, 'onPrev', s, this),
            Object(l.a)(this, 'onSubmit', p, this),
            Object(l.a)(this, 'changeUpdateGoods', d, this),
            (this.steps = [
              {
                id: 'form.stepTitle1',
                title: '\u8fdb\u8d27\u4fe1\u606f',
                component: O.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(103)]).then(
                    n.bind(null, 518)
                  );
                })
              },
              {
                id: 'form.stepTitle2',
                title: '\u9500\u552e\u4fe1\u606f',
                component: O.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(104)]).then(
                    n.bind(null, 519)
                  );
                })
              },
              {
                id: 'form.stepTitle3',
                title: '\u5b8c\u6210',
                component: O.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(105)]).then(n.bind(null, 520));
                })
              }
            ]);
        }
        return (
          Object(f.a)(t, [
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
      (o = Object(h.a)(i.prototype, 'current', [g.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return 0;
        }
      })),
      (r = Object(h.a)(i.prototype, 'submitting', [g.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (a = Object(h.a)(i.prototype, 'updateGoods', [g.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (u = Object(h.a)(i.prototype, 'data', [g.m], {
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
            dec: '',
            id: 0
          };
        }
      })),
      (c = Object(h.a)(i.prototype, 'initStep', [g.d], {
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
      Object(h.a)(
        i.prototype,
        'nextStep',
        [g.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'nextStep'),
        i.prototype
      ),
      Object(h.a)(
        i.prototype,
        'setValue',
        [g.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'setValue'),
        i.prototype
      ),
      (s = Object(h.a)(i.prototype, 'onPrev', [g.d], {
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
      (p = Object(h.a)(i.prototype, 'onSubmit', [g.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.submitting = !0;
            var e = JSON.parse(JSON.stringify(t.data));
            t.updateGoods
              ? Object(j.updateGoods)(e.id, e)
                  .then(function(e) {
                    200 == e.data.code && (t.changeUpdateGoods(!1), t.nextStep());
                  })
                  .catch(function(e) {
                    t.initStep();
                  })
              : Object(j.createGoods)(e)
                  .then(function(e) {
                    console.log(e.data);
                    var n = e.data,
                      i = n.code;
                    n.data;
                    200 == i && t.nextStep();
                  })
                  .catch(function() {
                    t.initStep();
                  });
          };
        }
      })),
      (d = Object(h.a)(i.prototype, 'changeUpdateGoods', [g.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            t.updateGoods = e;
          };
        }
      })),
      i)();
      e.default = y;
    }
  }
]);
