(window.webpackJsonp = window.webpackJsonp || []).push([
  [63, 66],
  {
    502: function(t, e, n) {
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
          return s;
        }),
        n.d(e, 'goodsAnalysis', function() {
          return c;
        });
      var i = n(141);
      function r(t) {
        return i.default.sendRequest('post', { path: '/api/v1/goods', params: t });
      }
      function o(t) {
        return i.default.sendRequest('post', { path: '/api/v1/goods/' + t });
      }
      function a(t, e) {
        return i.default.sendRequest('post', { path: '/api/v1/goods/' + t, params: e });
      }
      function u(t) {
        return i.default.get('/api/v1/goods', { params: t });
      }
      function s(t) {
        return i.default.sendRequest('get', { path: '/api/v1/goods/' + t });
      }
      function c() {
        return i.default.sendRequest('get', { path: '/v1/goodsAnalysis' });
      }
    },
    511: function(t, e, n) {
      'use strict';
      n.r(e);
      var i,
        r,
        o,
        a,
        u,
        s,
        c,
        p = n(32),
        l = n(51),
        d = n(52),
        f = n(21),
        b = (n(176), n(7)),
        h = n(0),
        g = n.n(h),
        m = n(502);
      Object(b.g)({ enforceActions: 'always' });
      var O = new ((i = (function() {
        function t() {
          var e = this;
          Object(l.a)(this, t),
            Object(p.a)(this, 'current', r, this),
            Object(p.a)(this, 'submitting', o, this),
            Object(p.a)(this, 'data', a, this),
            (this.steps = void 0),
            (this.getStepChild = function() {
              return e.steps[e.current].component;
            }),
            Object(p.a)(this, 'initStep', u, this),
            Object(p.a)(this, 'onPrev', s, this),
            Object(p.a)(this, 'onSubmit', c, this),
            (this.steps = [
              {
                id: 'form.stepTitle1',
                title: '\u8fdb\u8d27\u4fe1\u606f',
                component: g.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(103)]).then(
                    n.bind(null, 546)
                  );
                })
              },
              {
                id: 'form.stepTitle2',
                title: '\u9500\u552e\u4fe1\u606f',
                component: g.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(1), n.e(2), n.e(4), n.e(104)]).then(
                    n.bind(null, 547)
                  );
                })
              },
              {
                id: 'form.stepTitle3',
                title: '\u5b8c\u6210',
                component: g.a.lazy(function() {
                  return Promise.all([n.e(0), n.e(105)]).then(n.bind(null, 548));
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
      (r = Object(f.a)(i.prototype, 'current', [b.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return 0;
        }
      })),
      (o = Object(f.a)(i.prototype, 'submitting', [b.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (a = Object(f.a)(i.prototype, 'data', [b.m], {
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
      (u = Object(f.a)(i.prototype, 'initStep', [b.d], {
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
      Object(f.a)(
        i.prototype,
        'nextStep',
        [b.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'nextStep'),
        i.prototype
      ),
      Object(f.a)(
        i.prototype,
        'setValue',
        [b.d],
        Object.getOwnPropertyDescriptor(i.prototype, 'setValue'),
        i.prototype
      ),
      (s = Object(f.a)(i.prototype, 'onPrev', [b.d], {
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
      (c = Object(f.a)(i.prototype, 'onSubmit', [b.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.submitting = !0;
            var e = JSON.parse(JSON.stringify(t.data));
            Object(m.createGoods)(e)
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
    }
  }
]);
