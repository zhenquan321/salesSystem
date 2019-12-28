(window.webpackJsonp = window.webpackJsonp || []).push([
  [80],
  {
    566: function(t, e, i) {
      'use strict';
      i.r(e);
      var n,
        o,
        s,
        a,
        r,
        l,
        u,
        c = i(31),
        b = i(53),
        d = i(21),
        f = (i(179), i(7));
      Object(f.g)({ enforceActions: 'always' });
      var w = new ((n = function t() {
        Object(b.a)(this, t),
          Object(c.a)(this, 'goodsList', o, this),
          Object(c.a)(this, 'settlementNow', s, this),
          Object(c.a)(this, 'settlementFun', a, this),
          Object(c.a)(this, 'addGoods', r, this),
          Object(c.a)(this, 'delGoods', l, this),
          Object(c.a)(this, 'clearGoods', u, this);
      }),
      (o = Object(d.a)(n.prototype, 'goodsList', [f.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return [];
        }
      })),
      (s = Object(d.a)(n.prototype, 'settlementNow', [f.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (a = Object(d.a)(n.prototype, 'settlementFun', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            t.settlementNow = e;
          };
        }
      })),
      (r = Object(d.a)(n.prototype, 'addGoods', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            e.sales_num_now = 1;
            for (var i = JSON.parse(JSON.stringify(t.goodsList)), n = !1, o = 0; o < i.length; o++)
              e.id == i[o].id && ((i[o].sales_num_now = i[o].sales_num_now + 1), (n = !0));
            n || i.push(e), (t.goodsList = i);
          };
        }
      })),
      (l = Object(d.a)(n.prototype, 'delGoods', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e, i) {
            for (var n = JSON.parse(JSON.stringify(t.goodsList)), o = 0; o < n.length; o++)
              e.id == n[o].id &&
                ((!i || 'all' != i) && n[o].sales_num_now > 1
                  ? n[o].sales_num_now--
                  : n.splice(o, 1));
            t.goodsList = n;
          };
        }
      })),
      (u = Object(d.a)(n.prototype, 'clearGoods', [f.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function() {
            t.goodsList = [];
          };
        }
      })),
      n)();
      e.default = w;
    }
  }
]);
