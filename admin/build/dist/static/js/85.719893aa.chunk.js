(window.webpackJsonp = window.webpackJsonp || []).push([
  [85],
  {
    515: function(t, e, i) {
      'use strict';
      i.r(e);
      var n,
        r,
        o,
        s,
        a,
        l,
        u,
        c,
        b,
        h,
        p,
        d,
        m,
        f = i(32),
        O = i(51),
        g = i(21),
        w = (i(166), i(7));
      Object(w.g)({ enforceActions: 'always' });
      var j = new ((n = function t() {
        Object(O.a)(this, t),
          Object(f.a)(this, 'goodsList', r, this),
          Object(f.a)(this, 'settlementNow', o, this),
          Object(f.a)(this, 'replenishmentStatus', s, this),
          Object(f.a)(this, 'replenishmentId', a, this),
          Object(f.a)(this, 'setReplenishmentStatus', l, this),
          Object(f.a)(this, 'setGoodsList', u, this),
          Object(f.a)(this, 'settlementFun', c, this),
          Object(f.a)(this, 'setReplenishmentId', b, this),
          Object(f.a)(this, 'addGoods', h, this),
          Object(f.a)(this, 'updateGoods', p, this),
          Object(f.a)(this, 'delGoods', d, this),
          Object(f.a)(this, 'clearGoods', m, this);
      }),
      (r = Object(g.a)(n.prototype, 'goodsList', [w.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return [];
        }
      })),
      (o = Object(g.a)(n.prototype, 'settlementNow', [w.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (s = Object(g.a)(n.prototype, 'replenishmentStatus', [w.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return 0;
        }
      })),
      (a = Object(g.a)(n.prototype, 'replenishmentId', [w.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return 0;
        }
      })),
      (l = Object(g.a)(n.prototype, 'setReplenishmentStatus', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            t.replenishmentStatus = e;
          };
        }
      })),
      (u = Object(g.a)(n.prototype, 'setGoodsList', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            t.goodsList = e;
          };
        }
      })),
      (c = Object(g.a)(n.prototype, 'settlementFun', [w.d], {
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
      (b = Object(g.a)(n.prototype, 'setReplenishmentId', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            t.replenishmentId = e;
          };
        }
      })),
      (h = Object(g.a)(n.prototype, 'addGoods', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            var i = 2 * e.replenishment_num - e.stock_num;
            e.replenishment_num_now = i > 0 ? i : 10;
            for (var n = JSON.parse(JSON.stringify(t.goodsList)), r = !1, o = 0; o < n.length; o++)
              e.id == n[o].id &&
                ((n[o].replenishment_num_now = n[o].replenishment_num_now + 1), (r = !0));
            r || n.push(e), (t.goodsList = n);
          };
        }
      })),
      (p = Object(g.a)(n.prototype, 'updateGoods', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            for (var i = JSON.parse(JSON.stringify(t.goodsList)), n = 0; n < i.length; n++)
              e.id == i[n].id && (i[n] = e);
            t.goodsList = i;
          };
        }
      })),
      (d = Object(g.a)(n.prototype, 'delGoods', [w.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e, i) {
            for (var n = JSON.parse(JSON.stringify(t.goodsList)), r = 0; r < n.length; r++)
              e.id == n[r].id &&
                ((!i || 'all' != i) && n[r].replenishment_num_now > 1
                  ? n[r].replenishment_num_now--
                  : n.splice(r, 1));
            t.goodsList = n;
          };
        }
      })),
      (m = Object(g.a)(n.prototype, 'clearGoods', [w.d], {
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
      e.default = j;
    }
  }
]);
