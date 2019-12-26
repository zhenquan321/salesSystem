(window.webpackJsonp = window.webpackJsonp || []).push([
  [65, 68],
  {
    501: function(t, e, n) {
      'use strict';
      n.r(e),
        n.d(e, 'createGoods', function() {
          return a;
        }),
        n.d(e, 'deleteGoods', function() {
          return i;
        }),
        n.d(e, 'updateGoods', function() {
          return s;
        }),
        n.d(e, 'goodsList', function() {
          return r;
        }),
        n.d(e, 'goodsDetail', function() {
          return u;
        }),
        n.d(e, 'goodsAnalysis', function() {
          return c;
        });
      var o = n(141);
      function a(t) {
        return o.default.sendRequest('post', { path: '/v1/goods', params: t });
      }
      function i(t) {
        return o.default.sendRequest('post', { path: '/v1/goods/' + t });
      }
      function s(t, e) {
        return o.default.sendRequest('post', { path: '/v1/goods/' + t, params: e });
      }
      function r(t) {
        return o.default.get('/v1/goods', { params: t });
      }
      function u(t) {
        return o.default.sendRequest('get', { path: '/v1/goods/' + t });
      }
      function c() {
        return o.default.sendRequest('get', { path: '/v1/goodsAnalysis' });
      }
    },
    697: function(t, e, n) {
      'use strict';
      n.r(e);
      var o,
        a,
        i,
        s = n(32),
        r = n(51),
        u = n(21),
        c = (n(177), n(7)),
        d = n(501);
      Object(c.g)({ enforceActions: 'always' });
      var f = new ((o = function t() {
        Object(r.a)(this, t),
          Object(s.a)(this, 'data', a, this),
          (this.steps = void 0),
          Object(s.a)(this, 'onSubmit', i, this),
          (this.steps = []);
      }),
      (a = Object(u.a)(o.prototype, 'data', [c.m], {
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
      (i = Object(u.a)(o.prototype, 'onSubmit', [c.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            var e = JSON.parse(JSON.stringify(t.data));
            Object(d.createGoods)(e)
              .then(function(t) {
                console.log(t.data);
                var e = t.data;
                e.code, e.data;
              })
              .catch(function() {});
          };
        }
      })),
      o)();
      e.default = f;
    }
  }
]);
