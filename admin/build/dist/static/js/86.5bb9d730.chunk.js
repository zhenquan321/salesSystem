(window.webpackJsonp = window.webpackJsonp || []).push([
  [86],
  {
    534: function(t, e, i) {
      'use strict';
      i.r(e);
      i(510);
      var n,
        o,
        s,
        a,
        r,
        c,
        l,
        u = i(345),
        b = i(32),
        d = i(51),
        f = i(21),
        p = (i(166), i(7));
      Object(p.g)({ enforceActions: 'always' });
      var w = new ((n = function t() {
        Object(d.a)(this, t),
          Object(b.a)(this, 'goodsList', o, this),
          Object(b.a)(this, 'settlementNow', s, this),
          Object(b.a)(this, 'settlementFun', a, this),
          Object(b.a)(this, 'addGoods', r, this),
          Object(b.a)(this, 'delGoods', c, this),
          Object(b.a)(this, 'clearGoods', l, this);
      }),
      (o = Object(f.a)(n.prototype, 'goodsList', [p.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return [];
        }
      })),
      (s = Object(f.a)(n.prototype, 'settlementNow', [p.m], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          return !1;
        }
      })),
      (a = Object(f.a)(n.prototype, 'settlementFun', [p.d], {
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
      (r = Object(f.a)(n.prototype, 'addGoods', [p.d], {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        initializer: function() {
          var t = this;
          return function(e) {
            e.sales_num_now = 1;
            for (var i = JSON.parse(JSON.stringify(t.goodsList)), n = !1, o = 0; o < i.length; o++)
              e.id == i[o].id &&
                (i[o].sales_num_now >= i[o].stock_num
                  ? u.a.error({
                      message: '\u5e93\u5b58\u4e0d\u8db3',
                      duration: 5,
                      description: '\u5e93\u5b58\u4ec5\u5269\u4f59'
                        .concat(i[o].stock_num)
                        .concat(i[o].spec)
                    })
                  : (i[o].sales_num_now = i[o].sales_num_now + 1),
                (n = !0));
            n || i.push(e), (t.goodsList = i);
          };
        }
      })),
      (c = Object(f.a)(n.prototype, 'delGoods', [p.d], {
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
      (l = Object(f.a)(n.prototype, 'clearGoods', [p.d], {
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
