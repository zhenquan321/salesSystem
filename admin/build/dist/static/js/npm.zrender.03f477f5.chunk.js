(window.webpackJsonp = window.webpackJsonp || []).push([
  [125],
  {
    100: function(t, e, i) {
      var r = i(150),
        n = i(2),
        a = i(53),
        o = i(189),
        s = i(188).ContextCachedBy,
        h = function(t) {
          r.call(this, t);
        };
      (h.prototype = {
        constructor: h,
        type: 'text',
        brush: function(t, e) {
          var i = this.style;
          this.__dirty && o.normalizeTextStyle(i, !0),
            (i.fill = i.stroke = i.shadowBlur = i.shadowColor = i.shadowOffsetX = i.shadowOffsetY = null);
          var r = i.text;
          null != r && (r += ''),
            o.needDrawText(r, i)
              ? (this.setTransform(t),
                o.renderText(this, t, r, i, null, e),
                this.restoreTransform(t))
              : (t.__attrCachedBy = s.NONE);
        },
        getBoundingRect: function() {
          var t = this.style;
          if ((this.__dirty && o.normalizeTextStyle(t, !0), !this._rect)) {
            var e = t.text;
            null != e ? (e += '') : (e = '');
            var i = a.getBoundingRect(
              t.text + '',
              t.font,
              t.textAlign,
              t.textVerticalAlign,
              t.textPadding,
              t.textLineHeight,
              t.rich
            );
            if (
              ((i.x += t.x || 0), (i.y += t.y || 0), o.getStroke(t.textStroke, t.textStrokeWidth))
            ) {
              var r = t.textStrokeWidth;
              (i.x -= r / 2), (i.y -= r / 2), (i.width += r), (i.height += r);
            }
            this._rect = i;
          }
          return this._rect;
        }
      }),
        n.inherits(h, r);
      var l = h;
      t.exports = l;
    },
    119: function(t, e, i) {
      var r = i(2),
        n = i(376),
        a = i(29),
        o = function(t) {
          for (var e in ((t = t || {}), n.call(this, t), t))
            t.hasOwnProperty(e) && (this[e] = t[e]);
          (this._children = []), (this.__storage = null), (this.__dirty = !0);
        };
      (o.prototype = {
        constructor: o,
        isGroup: !0,
        type: 'group',
        silent: !1,
        children: function() {
          return this._children.slice();
        },
        childAt: function(t) {
          return this._children[t];
        },
        childOfName: function(t) {
          for (var e = this._children, i = 0; i < e.length; i++) if (e[i].name === t) return e[i];
        },
        childCount: function() {
          return this._children.length;
        },
        add: function(t) {
          return (
            t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
          );
        },
        addBefore: function(t, e) {
          if (t && t !== this && t.parent !== this && e && e.parent === this) {
            var i = this._children,
              r = i.indexOf(e);
            r >= 0 && (i.splice(r, 0, t), this._doAdd(t));
          }
          return this;
        },
        _doAdd: function(t) {
          t.parent && t.parent.remove(t), (t.parent = this);
          var e = this.__storage,
            i = this.__zr;
          e &&
            e !== t.__storage &&
            (e.addToStorage(t), t instanceof o && t.addChildrenToStorage(e)),
            i && i.refresh();
        },
        remove: function(t) {
          var e = this.__zr,
            i = this.__storage,
            n = this._children,
            a = r.indexOf(n, t);
          return a < 0
            ? this
            : (n.splice(a, 1),
              (t.parent = null),
              i && (i.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(i)),
              e && e.refresh(),
              this);
        },
        removeAll: function() {
          var t,
            e,
            i = this._children,
            r = this.__storage;
          for (e = 0; e < i.length; e++)
            (t = i[e]),
              r && (r.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(r)),
              (t.parent = null);
          return (i.length = 0), this;
        },
        eachChild: function(t, e) {
          for (var i = this._children, r = 0; r < i.length; r++) {
            var n = i[r];
            t.call(e, n, r);
          }
          return this;
        },
        traverse: function(t, e) {
          for (var i = 0; i < this._children.length; i++) {
            var r = this._children[i];
            t.call(e, r), 'group' === r.type && r.traverse(t, e);
          }
          return this;
        },
        addChildrenToStorage: function(t) {
          for (var e = 0; e < this._children.length; e++) {
            var i = this._children[e];
            t.addToStorage(i), i instanceof o && i.addChildrenToStorage(t);
          }
        },
        delChildrenFromStorage: function(t) {
          for (var e = 0; e < this._children.length; e++) {
            var i = this._children[e];
            t.delFromStorage(i), i instanceof o && i.delChildrenFromStorage(t);
          }
        },
        dirty: function() {
          return (this.__dirty = !0), this.__zr && this.__zr.refresh(), this;
        },
        getBoundingRect: function(t) {
          for (
            var e = null, i = new a(0, 0, 0, 0), r = t || this._children, n = [], o = 0;
            o < r.length;
            o++
          ) {
            var s = r[o];
            if (!s.ignore && !s.invisible) {
              var h = s.getBoundingRect(),
                l = s.getLocalTransform(n);
              l
                ? (i.copy(h), i.applyTransform(l), (e = e || i.clone()).union(i))
                : (e = e || h.clone()).union(h);
            }
          }
          return e || i;
        }
      }),
        r.inherits(o, n);
      var s = o;
      t.exports = s;
    },
    120: function(t, e, i) {
      var r = i(150),
        n = i(29),
        a = i(2),
        o = i(275);
      function s(t) {
        r.call(this, t);
      }
      (s.prototype = {
        constructor: s,
        type: 'image',
        brush: function(t, e) {
          var i = this.style,
            r = i.image;
          i.bind(t, this, e);
          var n = (this._image = o.createOrUpdateImage(r, this._image, this, this.onload));
          if (n && o.isImageReady(n)) {
            var a = i.x || 0,
              s = i.y || 0,
              h = i.width,
              l = i.height,
              u = n.width / n.height;
            if (
              (null == h && null != l
                ? (h = l * u)
                : null == l && null != h
                ? (l = h / u)
                : null == h && null == l && ((h = n.width), (l = n.height)),
              this.setTransform(t),
              i.sWidth && i.sHeight)
            ) {
              var c = i.sx || 0,
                f = i.sy || 0;
              t.drawImage(n, c, f, i.sWidth, i.sHeight, a, s, h, l);
            } else if (i.sx && i.sy) {
              var d = h - (c = i.sx),
                p = l - (f = i.sy);
              t.drawImage(n, c, f, d, p, a, s, h, l);
            } else t.drawImage(n, a, s, h, l);
            null != i.text &&
              (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
          }
        },
        getBoundingRect: function() {
          var t = this.style;
          return (
            this._rect || (this._rect = new n(t.x || 0, t.y || 0, t.width || 0, t.height || 0)),
            this._rect
          );
        }
      }),
        a.inherits(s, r);
      var h = s;
      t.exports = h;
    },
    122: function(t, e, i) {
      var r = i(85),
        n = i(28),
        a = i(190),
        o = i(29),
        s = i(187).devicePixelRatio,
        h = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
        l = [],
        u = [],
        c = [],
        f = [],
        d = Math.min,
        p = Math.max,
        v = Math.cos,
        g = Math.sin,
        _ = Math.sqrt,
        m = Math.abs,
        y = 'undefined' !== typeof Float32Array,
        x = function(t) {
          (this._saveData = !t), this._saveData && (this.data = []), (this._ctx = null);
        };
      (x.prototype = {
        constructor: x,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function(t, e, i) {
          (i = i || 0), (this._ux = m(i / s / t) || 0), (this._uy = m(i / s / e) || 0);
        },
        getContext: function() {
          return this._ctx;
        },
        beginPath: function(t) {
          return (
            (this._ctx = t),
            t && t.beginPath(),
            t && (this.dpr = t.dpr),
            this._saveData && (this._len = 0),
            this._lineDash && ((this._lineDash = null), (this._dashOffset = 0)),
            this
          );
        },
        moveTo: function(t, e) {
          return (
            this.addData(h.M, t, e),
            this._ctx && this._ctx.moveTo(t, e),
            (this._x0 = t),
            (this._y0 = e),
            (this._xi = t),
            (this._yi = e),
            this
          );
        },
        lineTo: function(t, e) {
          var i = m(t - this._xi) > this._ux || m(e - this._yi) > this._uy || this._len < 5;
          return (
            this.addData(h.L, t, e),
            this._ctx &&
              i &&
              (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)),
            i && ((this._xi = t), (this._yi = e)),
            this
          );
        },
        bezierCurveTo: function(t, e, i, r, n, a) {
          return (
            this.addData(h.C, t, e, i, r, n, a),
            this._ctx &&
              (this._needsDash()
                ? this._dashedBezierTo(t, e, i, r, n, a)
                : this._ctx.bezierCurveTo(t, e, i, r, n, a)),
            (this._xi = n),
            (this._yi = a),
            this
          );
        },
        quadraticCurveTo: function(t, e, i, r) {
          return (
            this.addData(h.Q, t, e, i, r),
            this._ctx &&
              (this._needsDash()
                ? this._dashedQuadraticTo(t, e, i, r)
                : this._ctx.quadraticCurveTo(t, e, i, r)),
            (this._xi = i),
            (this._yi = r),
            this
          );
        },
        arc: function(t, e, i, r, n, a) {
          return (
            this.addData(h.A, t, e, i, i, r, n - r, 0, a ? 0 : 1),
            this._ctx && this._ctx.arc(t, e, i, r, n, a),
            (this._xi = v(n) * i + t),
            (this._yi = g(n) * i + e),
            this
          );
        },
        arcTo: function(t, e, i, r, n) {
          return this._ctx && this._ctx.arcTo(t, e, i, r, n), this;
        },
        rect: function(t, e, i, r) {
          return this._ctx && this._ctx.rect(t, e, i, r), this.addData(h.R, t, e, i, r), this;
        },
        closePath: function() {
          this.addData(h.Z);
          var t = this._ctx,
            e = this._x0,
            i = this._y0;
          return (
            t && (this._needsDash() && this._dashedLineTo(e, i), t.closePath()),
            (this._xi = e),
            (this._yi = i),
            this
          );
        },
        fill: function(t) {
          t && t.fill(), this.toStatic();
        },
        stroke: function(t) {
          t && t.stroke(), this.toStatic();
        },
        setLineDash: function(t) {
          if (t instanceof Array) {
            (this._lineDash = t), (this._dashIdx = 0);
            for (var e = 0, i = 0; i < t.length; i++) e += t[i];
            this._dashSum = e;
          }
          return this;
        },
        setLineDashOffset: function(t) {
          return (this._dashOffset = t), this;
        },
        len: function() {
          return this._len;
        },
        setData: function(t) {
          var e = t.length;
          (this.data && this.data.length === e) || !y || (this.data = new Float32Array(e));
          for (var i = 0; i < e; i++) this.data[i] = t[i];
          this._len = e;
        },
        appendPath: function(t) {
          t instanceof Array || (t = [t]);
          for (var e = t.length, i = 0, r = this._len, n = 0; n < e; n++) i += t[n].len();
          y && this.data instanceof Float32Array && (this.data = new Float32Array(r + i));
          for (n = 0; n < e; n++)
            for (var a = t[n].data, o = 0; o < a.length; o++) this.data[r++] = a[o];
          this._len = r;
        },
        addData: function(t) {
          if (this._saveData) {
            var e = this.data;
            this._len + arguments.length > e.length && (this._expandData(), (e = this.data));
            for (var i = 0; i < arguments.length; i++) e[this._len++] = arguments[i];
            this._prevCmd = t;
          }
        },
        _expandData: function() {
          if (!(this.data instanceof Array)) {
            for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
            this.data = t;
          }
        },
        _needsDash: function() {
          return this._lineDash;
        },
        _dashedLineTo: function(t, e) {
          var i,
            r,
            n = this._dashSum,
            a = this._dashOffset,
            o = this._lineDash,
            s = this._ctx,
            h = this._xi,
            l = this._yi,
            u = t - h,
            c = e - l,
            f = _(u * u + c * c),
            v = h,
            g = l,
            m = o.length;
          for (
            a < 0 && (a = n + a), v -= (a %= n) * (u /= f), g -= a * (c /= f);
            (u > 0 && v <= t) ||
            (u < 0 && v >= t) ||
            (0 === u && ((c > 0 && g <= e) || (c < 0 && g >= e)));

          )
            (v += u * (i = o[(r = this._dashIdx)])),
              (g += c * i),
              (this._dashIdx = (r + 1) % m),
              (u > 0 && v < h) ||
                (u < 0 && v > h) ||
                (c > 0 && g < l) ||
                (c < 0 && g > l) ||
                s[r % 2 ? 'moveTo' : 'lineTo'](
                  u >= 0 ? d(v, t) : p(v, t),
                  c >= 0 ? d(g, e) : p(g, e)
                );
          (u = v - t), (c = g - e), (this._dashOffset = -_(u * u + c * c));
        },
        _dashedBezierTo: function(t, e, i, n, a, o) {
          var s,
            h,
            l,
            u,
            c,
            f = this._dashSum,
            d = this._dashOffset,
            p = this._lineDash,
            v = this._ctx,
            g = this._xi,
            m = this._yi,
            y = r.cubicAt,
            x = 0,
            w = this._dashIdx,
            b = p.length,
            T = 0;
          for (d < 0 && (d = f + d), d %= f, s = 0; s < 1; s += 0.1)
            (h = y(g, t, i, a, s + 0.1) - y(g, t, i, a, s)),
              (l = y(m, e, n, o, s + 0.1) - y(m, e, n, o, s)),
              (x += _(h * h + l * l));
          for (; w < b && !((T += p[w]) > d); w++);
          for (s = (T - d) / x; s <= 1; )
            (u = y(g, t, i, a, s)),
              (c = y(m, e, n, o, s)),
              w % 2 ? v.moveTo(u, c) : v.lineTo(u, c),
              (s += p[w] / x),
              (w = (w + 1) % b);
          w % 2 !== 0 && v.lineTo(a, o),
            (h = a - u),
            (l = o - c),
            (this._dashOffset = -_(h * h + l * l));
        },
        _dashedQuadraticTo: function(t, e, i, r) {
          var n = i,
            a = r;
          (i = (i + 2 * t) / 3),
            (r = (r + 2 * e) / 3),
            (t = (this._xi + 2 * t) / 3),
            (e = (this._yi + 2 * e) / 3),
            this._dashedBezierTo(t, e, i, r, n, a);
        },
        toStatic: function() {
          var t = this.data;
          t instanceof Array && ((t.length = this._len), y && (this.data = new Float32Array(t)));
        },
        getBoundingRect: function() {
          (l[0] = l[1] = c[0] = c[1] = Number.MAX_VALUE),
            (u[0] = u[1] = f[0] = f[1] = -Number.MAX_VALUE);
          for (var t = this.data, e = 0, i = 0, r = 0, s = 0, d = 0; d < t.length; ) {
            var p = t[d++];
            switch ((1 === d && ((r = e = t[d]), (s = i = t[d + 1])), p)) {
              case h.M:
                (e = r = t[d++]), (i = s = t[d++]), (c[0] = r), (c[1] = s), (f[0] = r), (f[1] = s);
                break;
              case h.L:
                a.fromLine(e, i, t[d], t[d + 1], c, f), (e = t[d++]), (i = t[d++]);
                break;
              case h.C:
                a.fromCubic(e, i, t[d++], t[d++], t[d++], t[d++], t[d], t[d + 1], c, f),
                  (e = t[d++]),
                  (i = t[d++]);
                break;
              case h.Q:
                a.fromQuadratic(e, i, t[d++], t[d++], t[d], t[d + 1], c, f),
                  (e = t[d++]),
                  (i = t[d++]);
                break;
              case h.A:
                var _ = t[d++],
                  m = t[d++],
                  y = t[d++],
                  x = t[d++],
                  w = t[d++],
                  b = t[d++] + w;
                d += 1;
                var T = 1 - t[d++];
                1 === d && ((r = v(w) * y + _), (s = g(w) * x + m)),
                  a.fromArc(_, m, y, x, w, b, T, c, f),
                  (e = v(b) * y + _),
                  (i = g(b) * x + m);
                break;
              case h.R:
                (r = e = t[d++]), (s = i = t[d++]);
                var k = t[d++],
                  S = t[d++];
                a.fromLine(r, s, r + k, s + S, c, f);
                break;
              case h.Z:
                (e = r), (i = s);
            }
            n.min(l, l, c), n.max(u, u, f);
          }
          return (
            0 === d && (l[0] = l[1] = u[0] = u[1] = 0), new o(l[0], l[1], u[0] - l[0], u[1] - l[1])
          );
        },
        rebuildPath: function(t) {
          for (
            var e, i, r, n, a, o, s = this.data, l = this._ux, u = this._uy, c = this._len, f = 0;
            f < c;

          ) {
            var d = s[f++];
            switch ((1 === f && ((e = r = s[f]), (i = n = s[f + 1])), d)) {
              case h.M:
                (e = r = s[f++]), (i = n = s[f++]), t.moveTo(r, n);
                break;
              case h.L:
                (a = s[f++]),
                  (o = s[f++]),
                  (m(a - r) > l || m(o - n) > u || f === c - 1) &&
                    (t.lineTo(a, o), (r = a), (n = o));
                break;
              case h.C:
                t.bezierCurveTo(s[f++], s[f++], s[f++], s[f++], s[f++], s[f++]),
                  (r = s[f - 2]),
                  (n = s[f - 1]);
                break;
              case h.Q:
                t.quadraticCurveTo(s[f++], s[f++], s[f++], s[f++]), (r = s[f - 2]), (n = s[f - 1]);
                break;
              case h.A:
                var p = s[f++],
                  _ = s[f++],
                  y = s[f++],
                  x = s[f++],
                  w = s[f++],
                  b = s[f++],
                  T = s[f++],
                  k = s[f++],
                  S = y > x ? y : x,
                  A = y > x ? 1 : y / x,
                  C = y > x ? x / y : 1,
                  P = w + b;
                Math.abs(y - x) > 0.001
                  ? (t.translate(p, _),
                    t.rotate(T),
                    t.scale(A, C),
                    t.arc(0, 0, S, w, P, 1 - k),
                    t.scale(1 / A, 1 / C),
                    t.rotate(-T),
                    t.translate(-p, -_))
                  : t.arc(p, _, S, w, P, 1 - k),
                  1 === f && ((e = v(w) * y + p), (i = g(w) * x + _)),
                  (r = v(P) * y + p),
                  (n = g(P) * x + _);
                break;
              case h.R:
                (e = r = s[f]), (i = n = s[f + 1]), t.rect(s[f++], s[f++], s[f++], s[f++]);
                break;
              case h.Z:
                t.closePath(), (r = e), (n = i);
            }
          }
        }
      }),
        (x.CMD = h);
      var w = x;
      t.exports = w;
    },
    149: function(t, e, i) {
      var r = function() {};
      1 === i(187).debugMode && (r = console.error);
      var n = r;
      t.exports = n;
    },
    150: function(t, e, i) {
      var r = i(2),
        n = i(274),
        a = i(376),
        o = i(382);
      function s(t) {
        for (var e in ((t = t || {}), a.call(this, t), t))
          t.hasOwnProperty(e) && 'style' !== e && (this[e] = t[e]);
        (this.style = new n(t.style, this)), (this._rect = null), (this.__clipPaths = null);
      }
      (s.prototype = {
        constructor: s,
        type: 'displayable',
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: 'pointer',
        rectHover: !1,
        progressive: !1,
        incremental: !1,
        globalScaleRatio: 1,
        beforeBrush: function(t) {},
        afterBrush: function(t) {},
        brush: function(t, e) {},
        getBoundingRect: function() {},
        contain: function(t, e) {
          return this.rectContain(t, e);
        },
        traverse: function(t, e) {
          t.call(e, this);
        },
        rectContain: function(t, e) {
          var i = this.transformCoordToLocal(t, e);
          return this.getBoundingRect().contain(i[0], i[1]);
        },
        dirty: function() {
          (this.__dirty = this.__dirtyText = !0),
            (this._rect = null),
            this.__zr && this.__zr.refresh();
        },
        animateStyle: function(t) {
          return this.animate('style', t);
        },
        attrKV: function(t, e) {
          'style' !== t ? a.prototype.attrKV.call(this, t, e) : this.style.set(e);
        },
        setStyle: function(t, e) {
          return this.style.set(t, e), this.dirty(!1), this;
        },
        useStyle: function(t) {
          return (this.style = new n(t, this)), this.dirty(!1), this;
        },
        calculateTextPosition: null
      }),
        r.inherits(s, a),
        r.mixin(s, o);
      var h = s;
      t.exports = h;
    },
    186: function(t, e, i) {
      var r = i(375),
        n = i(35),
        a = i(2),
        o = i(655),
        s = i(659),
        h = i(663),
        l = i(665),
        u = i(666),
        c = !n.canvasSupported,
        f = { canvas: h },
        d = {};
      var p = function(t, e, i) {
        (i = i || {}), (this.dom = e), (this.id = t);
        var r = this,
          h = new s(),
          d = i.renderer;
        if (c) {
          if (!f.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
          d = 'vml';
        } else (d && f[d]) || (d = 'canvas');
        var p = new f[d](e, h, i, t);
        (this.storage = h), (this.painter = p);
        var v = n.node || n.worker ? null : new u(p.getViewportRoot());
        (this.handler = new o(h, p, v, p.root)),
          (this.animation = new l({ stage: { update: a.bind(this.flush, this) } })),
          this.animation.start(),
          this._needsRefresh;
        var g = h.delFromStorage,
          _ = h.addToStorage;
        (h.delFromStorage = function(t) {
          g.call(h, t), t && t.removeSelfFromZr(r);
        }),
          (h.addToStorage = function(t) {
            _.call(h, t), t.addSelfToZr(r);
          });
      };
      (p.prototype = {
        constructor: p,
        getId: function() {
          return this.id;
        },
        add: function(t) {
          this.storage.addRoot(t), (this._needsRefresh = !0);
        },
        remove: function(t) {
          this.storage.delRoot(t), (this._needsRefresh = !0);
        },
        configLayer: function(t, e) {
          this.painter.configLayer && this.painter.configLayer(t, e), (this._needsRefresh = !0);
        },
        setBackgroundColor: function(t) {
          this.painter.setBackgroundColor && this.painter.setBackgroundColor(t),
            (this._needsRefresh = !0);
        },
        refreshImmediately: function() {
          (this._needsRefresh = this._needsRefreshHover = !1),
            this.painter.refresh(),
            (this._needsRefresh = this._needsRefreshHover = !1);
        },
        refresh: function() {
          this._needsRefresh = !0;
        },
        flush: function() {
          var t;
          this._needsRefresh && ((t = !0), this.refreshImmediately()),
            this._needsRefreshHover && ((t = !0), this.refreshHoverImmediately()),
            t && this.trigger('rendered');
        },
        addHover: function(t, e) {
          if (this.painter.addHover) {
            var i = this.painter.addHover(t, e);
            return this.refreshHover(), i;
          }
        },
        removeHover: function(t) {
          this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());
        },
        clearHover: function() {
          this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());
        },
        refreshHover: function() {
          this._needsRefreshHover = !0;
        },
        refreshHoverImmediately: function() {
          (this._needsRefreshHover = !1), this.painter.refreshHover && this.painter.refreshHover();
        },
        resize: function(t) {
          (t = t || {}), this.painter.resize(t.width, t.height), this.handler.resize();
        },
        clearAnimation: function() {
          this.animation.clear();
        },
        getWidth: function() {
          return this.painter.getWidth();
        },
        getHeight: function() {
          return this.painter.getHeight();
        },
        pathToImage: function(t, e) {
          return this.painter.pathToImage(t, e);
        },
        setCursorStyle: function(t) {
          this.handler.setCursorStyle(t);
        },
        findHover: function(t, e) {
          return this.handler.findHover(t, e);
        },
        on: function(t, e, i) {
          this.handler.on(t, e, i);
        },
        off: function(t, e) {
          this.handler.off(t, e);
        },
        trigger: function(t, e) {
          this.handler.trigger(t, e);
        },
        clear: function() {
          this.storage.delRoot(), this.painter.clear();
        },
        dispose: function() {
          var t;
          this.animation.stop(),
            this.clear(),
            this.storage.dispose(),
            this.painter.dispose(),
            this.handler.dispose(),
            (this.animation = this.storage = this.painter = this.handler = null),
            (t = this.id),
            delete d[t];
        }
      }),
        (e.version = '4.1.2'),
        (e.init = function(t, e) {
          var i = new p(r(), t, e);
          return (d[i.id] = i), i;
        }),
        (e.dispose = function(t) {
          if (t) t.dispose();
          else {
            for (var e in d) d.hasOwnProperty(e) && d[e].dispose();
            d = {};
          }
          return this;
        }),
        (e.getInstance = function(t) {
          return d[t];
        }),
        (e.registerPainter = function(t, e) {
          f[t] = e;
        });
    },
    187: function(t, e) {
      var i = 1;
      'undefined' !== typeof window && (i = Math.max(window.devicePixelRatio || 1, 1));
      var r = i;
      (e.debugMode = 0), (e.devicePixelRatio = r);
    },
    188: function(t, e) {
      (e.ContextCachedBy = { NONE: 0, STYLE_BIND: 1, PLAIN_TEXT: 2 }), (e.WILL_BE_RESTORED = 9);
    },
    189: function(t, e, i) {
      var r = i(2),
        n = r.retrieve2,
        a = r.retrieve3,
        o = r.each,
        s = r.normalizeCssArray,
        h = r.isString,
        l = r.isObject,
        u = i(53),
        c = i(383),
        f = i(275),
        d = i(379),
        p = i(188),
        v = p.ContextCachedBy,
        g = p.WILL_BE_RESTORED,
        _ = u.DEFAULT_FONT,
        m = { left: 1, right: 1, center: 1 },
        y = { top: 1, bottom: 1, middle: 1 },
        x = [
          ['textShadowBlur', 'shadowBlur', 0],
          ['textShadowOffsetX', 'shadowOffsetX', 0],
          ['textShadowOffsetY', 'shadowOffsetY', 0],
          ['textShadowColor', 'shadowColor', 'transparent']
        ],
        w = {},
        b = {};
      function T(t) {
        if (t) {
          t.font = u.makeFont(t);
          var e = t.textAlign;
          'middle' === e && (e = 'center'), (t.textAlign = null == e || m[e] ? e : 'left');
          var i = t.textVerticalAlign || t.textBaseline;
          'center' === i && (i = 'middle'),
            (t.textVerticalAlign = null == i || y[i] ? i : 'top'),
            t.textPadding && (t.textPadding = s(t.textPadding));
        }
      }
      function k(t, e, i, r, n) {
        if (i && e.textRotation) {
          var a = e.textOrigin;
          'center' === a
            ? ((r = i.width / 2 + i.x), (n = i.height / 2 + i.y))
            : a && ((r = a[0] + i.x), (n = a[1] + i.y)),
            t.translate(r, n),
            t.rotate(-e.textRotation),
            t.translate(-r, -n);
        }
      }
      function S(t, e, i, r, o, s, h, l) {
        var u = r.rich[i.styleName] || {};
        u.text = i.text;
        var c = i.textVerticalAlign,
          f = s + o / 2;
        'top' === c ? (f = s + i.height / 2) : 'bottom' === c && (f = s + o - i.height / 2),
          !i.isLineHolder &&
            A(u) &&
            C(
              t,
              e,
              u,
              'right' === l ? h - i.width : 'center' === l ? h - i.width / 2 : h,
              f - i.height / 2,
              i.width,
              i.height
            );
        var d = i.textPadding;
        d && ((h = R(h, l, d)), (f -= i.height / 2 - d[2] - i.textHeight / 2)),
          L(e, 'shadowBlur', a(u.textShadowBlur, r.textShadowBlur, 0)),
          L(e, 'shadowColor', u.textShadowColor || r.textShadowColor || 'transparent'),
          L(e, 'shadowOffsetX', a(u.textShadowOffsetX, r.textShadowOffsetX, 0)),
          L(e, 'shadowOffsetY', a(u.textShadowOffsetY, r.textShadowOffsetY, 0)),
          L(e, 'textAlign', l),
          L(e, 'textBaseline', 'middle'),
          L(e, 'font', i.font || _);
        var p = z(u.textStroke || r.textStroke, g),
          v = D(u.textFill || r.textFill),
          g = n(u.textStrokeWidth, r.textStrokeWidth);
        p && (L(e, 'lineWidth', g), L(e, 'strokeStyle', p), e.strokeText(i.text, h, f)),
          v && (L(e, 'fillStyle', v), e.fillText(i.text, h, f));
      }
      function A(t) {
        return !!(t.textBackgroundColor || (t.textBorderWidth && t.textBorderColor));
      }
      function C(t, e, i, r, n, a, o) {
        var s = i.textBackgroundColor,
          u = i.textBorderWidth,
          d = i.textBorderColor,
          p = h(s);
        if (
          (L(e, 'shadowBlur', i.textBoxShadowBlur || 0),
          L(e, 'shadowColor', i.textBoxShadowColor || 'transparent'),
          L(e, 'shadowOffsetX', i.textBoxShadowOffsetX || 0),
          L(e, 'shadowOffsetY', i.textBoxShadowOffsetY || 0),
          p || (u && d))
        ) {
          e.beginPath();
          var v = i.textBorderRadius;
          v ? c.buildPath(e, { x: r, y: n, width: a, height: o, r: v }) : e.rect(r, n, a, o),
            e.closePath();
        }
        if (p)
          if ((L(e, 'fillStyle', s), null != i.fillOpacity)) {
            var g = e.globalAlpha;
            (e.globalAlpha = i.fillOpacity * i.opacity), e.fill(), (e.globalAlpha = g);
          } else e.fill();
        else if (l(s)) {
          var _ = s.image;
          (_ = f.createOrUpdateImage(_, null, t, P, s)) &&
            f.isImageReady(_) &&
            e.drawImage(_, r, n, a, o);
        }
        if (u && d)
          if ((L(e, 'lineWidth', u), L(e, 'strokeStyle', d), null != i.strokeOpacity)) {
            g = e.globalAlpha;
            (e.globalAlpha = i.strokeOpacity * i.opacity), e.stroke(), (e.globalAlpha = g);
          } else e.stroke();
      }
      function P(t, e) {
        e.image = t;
      }
      function M(t, e, i, r) {
        var n = i.x || 0,
          a = i.y || 0,
          o = i.textAlign,
          s = i.textVerticalAlign;
        if (r) {
          var h = i.textPosition;
          if (h instanceof Array) (n = r.x + B(h[0], r.width)), (a = r.y + B(h[1], r.height));
          else {
            var l =
              e && e.calculateTextPosition
                ? e.calculateTextPosition(w, i, r)
                : u.calculateTextPosition(w, i, r);
            (n = l.x), (a = l.y), (o = o || l.textAlign), (s = s || l.textVerticalAlign);
          }
          var c = i.textOffset;
          c && ((n += c[0]), (a += c[1]));
        }
        return (
          ((t = t || {}).baseX = n), (t.baseY = a), (t.textAlign = o), (t.textVerticalAlign = s), t
        );
      }
      function L(t, e, i) {
        return (t[e] = d(t, e, i)), t[e];
      }
      function z(t, e) {
        return null == t || e <= 0 || 'transparent' === t || 'none' === t
          ? null
          : t.image || t.colorStops
          ? '#000'
          : t;
      }
      function D(t) {
        return null == t || 'none' === t ? null : t.image || t.colorStops ? '#000' : t;
      }
      function B(t, e) {
        return 'string' === typeof t
          ? t.lastIndexOf('%') >= 0
            ? (parseFloat(t) / 100) * e
            : parseFloat(t)
          : t;
      }
      function R(t, e, i) {
        return 'right' === e ? t - i[1] : 'center' === e ? t + i[3] / 2 - i[1] / 2 : t + i[3];
      }
      (e.normalizeTextStyle = function(t) {
        return T(t), o(t.rich, T), t;
      }),
        (e.renderText = function(t, e, i, r, n, a) {
          r.rich
            ? (function(t, e, i, r, n, a) {
                a !== g && (e.__attrCachedBy = v.NONE);
                var o = t.__textCotentBlock;
                (o && !t.__dirtyText) || (o = t.__textCotentBlock = u.parseRichText(i, r));
                !(function(t, e, i, r, n) {
                  var a = i.width,
                    o = i.outerWidth,
                    s = i.outerHeight,
                    h = r.textPadding,
                    l = M(b, t, r, n),
                    c = l.baseX,
                    f = l.baseY,
                    d = l.textAlign,
                    p = l.textVerticalAlign;
                  k(e, r, n, c, f);
                  var v = u.adjustTextX(c, o, d),
                    g = u.adjustTextY(f, s, p),
                    _ = v,
                    m = g;
                  h && ((_ += h[3]), (m += h[0]));
                  var y = _ + a;
                  A(r) && C(t, e, r, v, g, o, s);
                  for (var x = 0; x < i.lines.length; x++) {
                    for (
                      var w,
                        T = i.lines[x],
                        P = T.tokens,
                        L = P.length,
                        z = T.lineHeight,
                        D = T.width,
                        B = 0,
                        R = _,
                        O = y,
                        E = L - 1;
                      B < L && (!(w = P[B]).textAlign || 'left' === w.textAlign);

                    )
                      S(t, e, w, r, z, m, R, 'left'), (D -= w.width), (R += w.width), B++;
                    for (; E >= 0 && 'right' === (w = P[E]).textAlign; )
                      S(t, e, w, r, z, m, O, 'right'), (D -= w.width), (O -= w.width), E--;
                    for (R += (a - (R - _) - (y - O) - D) / 2; B <= E; )
                      (w = P[B]),
                        S(t, e, w, r, z, m, R + w.width / 2, 'center'),
                        (R += w.width),
                        B++;
                    m += z;
                  }
                })(t, e, o, r, n);
              })(t, e, i, r, n, a)
            : (function(t, e, i, r, n, a) {
                'use strict';
                var o,
                  s = A(r),
                  h = !1,
                  l = e.__attrCachedBy === v.PLAIN_TEXT;
                a !== g
                  ? (a && ((o = a.style), (h = !s && l && o)),
                    (e.__attrCachedBy = s ? v.NONE : v.PLAIN_TEXT))
                  : l && (e.__attrCachedBy = v.NONE);
                var c = r.font || _;
                (h && c === (o.font || _)) || (e.font = c);
                var f = t.__computedFont;
                t.__styleFont !== c && ((t.__styleFont = c), (f = t.__computedFont = e.font));
                var p = r.textPadding,
                  m = r.textLineHeight,
                  y = t.__textCotentBlock;
                (y && !t.__dirtyText) ||
                  (y = t.__textCotentBlock = u.parsePlainText(i, f, p, m, r.truncate));
                var w = y.outerHeight,
                  T = y.lines,
                  S = y.lineHeight,
                  P = M(b, t, r, n),
                  L = P.baseX,
                  B = P.baseY,
                  O = P.textAlign || 'left',
                  E = P.textVerticalAlign;
                k(e, r, n, L, B);
                var I = u.adjustTextY(B, w, E),
                  F = L,
                  H = I;
                if (s || p) {
                  var N = u.getWidth(i, f);
                  p && (N += p[1] + p[3]);
                  var W = u.adjustTextX(L, N, O);
                  s && C(t, e, r, W, I, N, w), p && ((F = R(L, O, p)), (H += p[0]));
                }
                (e.textAlign = O), (e.textBaseline = 'middle'), (e.globalAlpha = r.opacity || 1);
                for (var q = 0; q < x.length; q++) {
                  var V = x[q],
                    X = V[0],
                    j = V[1],
                    Y = r[X];
                  (h && Y === o[X]) || (e[j] = d(e, j, Y || V[2]));
                }
                H += S / 2;
                var U = r.textStrokeWidth,
                  G = h ? o.textStrokeWidth : null,
                  Q = !h || U !== G,
                  Z = !h || Q || r.textStroke !== o.textStroke,
                  $ = z(r.textStroke, U),
                  K = D(r.textFill);
                $ && (Q && (e.lineWidth = U), Z && (e.strokeStyle = $));
                K && ((h && r.textFill === o.textFill) || (e.fillStyle = K));
                if (1 === T.length) $ && e.strokeText(T[0], F, H), K && e.fillText(T[0], F, H);
                else
                  for (q = 0; q < T.length; q++)
                    $ && e.strokeText(T[q], F, H), K && e.fillText(T[q], F, H), (H += S);
              })(t, e, i, r, n, a);
        }),
        (e.getBoxPosition = M),
        (e.getStroke = z),
        (e.getFill = D),
        (e.parsePercent = B),
        (e.needDrawText = function(t, e) {
          return (
            null != t &&
            (t ||
              e.textBackgroundColor ||
              (e.textBorderWidth && e.textBorderColor) ||
              e.textPadding)
          );
        });
    },
    190: function(t, e, i) {
      var r = i(28),
        n = i(85),
        a = Math.min,
        o = Math.max,
        s = Math.sin,
        h = Math.cos,
        l = 2 * Math.PI,
        u = r.create(),
        c = r.create(),
        f = r.create();
      var d = [],
        p = [];
      (e.fromPoints = function(t, e, i) {
        if (0 !== t.length) {
          var r,
            n = t[0],
            s = n[0],
            h = n[0],
            l = n[1],
            u = n[1];
          for (r = 1; r < t.length; r++)
            (n = t[r]), (s = a(s, n[0])), (h = o(h, n[0])), (l = a(l, n[1])), (u = o(u, n[1]));
          (e[0] = s), (e[1] = l), (i[0] = h), (i[1] = u);
        }
      }),
        (e.fromLine = function(t, e, i, r, n, s) {
          (n[0] = a(t, i)), (n[1] = a(e, r)), (s[0] = o(t, i)), (s[1] = o(e, r));
        }),
        (e.fromCubic = function(t, e, i, r, s, h, l, u, c, f) {
          var v,
            g = n.cubicExtrema,
            _ = n.cubicAt,
            m = g(t, i, s, l, d);
          for (c[0] = 1 / 0, c[1] = 1 / 0, f[0] = -1 / 0, f[1] = -1 / 0, v = 0; v < m; v++) {
            var y = _(t, i, s, l, d[v]);
            (c[0] = a(y, c[0])), (f[0] = o(y, f[0]));
          }
          for (m = g(e, r, h, u, p), v = 0; v < m; v++) {
            var x = _(e, r, h, u, p[v]);
            (c[1] = a(x, c[1])), (f[1] = o(x, f[1]));
          }
          (c[0] = a(t, c[0])),
            (f[0] = o(t, f[0])),
            (c[0] = a(l, c[0])),
            (f[0] = o(l, f[0])),
            (c[1] = a(e, c[1])),
            (f[1] = o(e, f[1])),
            (c[1] = a(u, c[1])),
            (f[1] = o(u, f[1]));
        }),
        (e.fromQuadratic = function(t, e, i, r, s, h, l, u) {
          var c = n.quadraticExtremum,
            f = n.quadraticAt,
            d = o(a(c(t, i, s), 1), 0),
            p = o(a(c(e, r, h), 1), 0),
            v = f(t, i, s, d),
            g = f(e, r, h, p);
          (l[0] = a(t, s, v)), (l[1] = a(e, h, g)), (u[0] = o(t, s, v)), (u[1] = o(e, h, g));
        }),
        (e.fromArc = function(t, e, i, n, a, o, d, p, v) {
          var g = r.min,
            _ = r.max,
            m = Math.abs(a - o);
          if (m % l < 1e-4 && m > 1e-4)
            return (p[0] = t - i), (p[1] = e - n), (v[0] = t + i), void (v[1] = e + n);
          if (
            ((u[0] = h(a) * i + t),
            (u[1] = s(a) * n + e),
            (c[0] = h(o) * i + t),
            (c[1] = s(o) * n + e),
            g(p, u, c),
            _(v, u, c),
            (a %= l) < 0 && (a += l),
            (o %= l) < 0 && (o += l),
            a > o && !d ? (o += l) : a < o && d && (a += l),
            d)
          ) {
            var y = o;
            (o = a), (a = y);
          }
          for (var x = 0; x < o; x += Math.PI / 2)
            x > a && ((f[0] = h(x) * i + t), (f[1] = s(x) * n + e), g(p, f, p), _(v, f, v));
        });
    },
    191: function(t, e) {
      var i = function(t) {
        this.colorStops = t || [];
      };
      i.prototype = {
        constructor: i,
        addColorStop: function(t, e) {
          this.colorStops.push({ offset: t, color: e });
        }
      };
      var r = i;
      t.exports = r;
    },
    2: function(t, e) {
      var i = {
          '[object Function]': 1,
          '[object RegExp]': 1,
          '[object Date]': 1,
          '[object Error]': 1,
          '[object CanvasGradient]': 1,
          '[object CanvasPattern]': 1,
          '[object Image]': 1,
          '[object Canvas]': 1
        },
        r = {
          '[object Int8Array]': 1,
          '[object Uint8Array]': 1,
          '[object Uint8ClampedArray]': 1,
          '[object Int16Array]': 1,
          '[object Uint16Array]': 1,
          '[object Int32Array]': 1,
          '[object Uint32Array]': 1,
          '[object Float32Array]': 1,
          '[object Float64Array]': 1
        },
        n = Object.prototype.toString,
        a = Array.prototype,
        o = a.forEach,
        s = a.filter,
        h = a.slice,
        l = a.map,
        u = a.reduce,
        c = {};
      function f(t) {
        if (null == t || 'object' !== typeof t) return t;
        var e = t,
          a = n.call(t);
        if ('[object Array]' === a) {
          if (!k(t)) {
            e = [];
            for (var o = 0, s = t.length; o < s; o++) e[o] = f(t[o]);
          }
        } else if (r[a]) {
          if (!k(t)) {
            var h = t.constructor;
            if (t.constructor.from) e = h.from(t);
            else {
              e = new h(t.length);
              for (o = 0, s = t.length; o < s; o++) e[o] = f(t[o]);
            }
          }
        } else if (!i[a] && !k(t) && !b(t))
          for (var l in ((e = {}), t)) t.hasOwnProperty(l) && (e[l] = f(t[l]));
        return e;
      }
      function d(t, e, i) {
        if (!x(e) || !x(t)) return i ? f(e) : t;
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var n = t[r],
              a = e[r];
            !x(a) || !x(n) || y(a) || y(n) || b(a) || b(n) || w(a) || w(n) || k(a) || k(n)
              ? (!i && r in t) || (t[r] = f(e[r]))
              : d(n, a, i);
          }
        return t;
      }
      function p(t, e, i) {
        for (var r in e) e.hasOwnProperty(r) && (i ? null != e[r] : null == t[r]) && (t[r] = e[r]);
        return t;
      }
      var v,
        g = function() {
          return c.createCanvas();
        };
      function _(t, e, i) {
        if (t && e)
          if (t.forEach && t.forEach === o) t.forEach(e, i);
          else if (t.length === +t.length)
            for (var r = 0, n = t.length; r < n; r++) e.call(i, t[r], r, t);
          else for (var a in t) t.hasOwnProperty(a) && e.call(i, t[a], a, t);
      }
      function m(t, e) {
        var i = h.call(arguments, 2);
        return function() {
          return t.apply(e, i.concat(h.call(arguments)));
        };
      }
      function y(t) {
        return '[object Array]' === n.call(t);
      }
      function x(t) {
        var e = typeof t;
        return 'function' === e || (!!t && 'object' === e);
      }
      function w(t) {
        return !!i[n.call(t)];
      }
      function b(t) {
        return (
          'object' === typeof t &&
          'number' === typeof t.nodeType &&
          'object' === typeof t.ownerDocument
        );
      }
      c.createCanvas = function() {
        return document.createElement('canvas');
      };
      var T = '__ec_primitive__';
      function k(t) {
        return t[T];
      }
      function S(t) {
        var e = y(t);
        this.data = {};
        var i = this;
        function r(t, r) {
          e ? i.set(t, r) : i.set(r, t);
        }
        t instanceof S ? t.each(r) : t && _(t, r);
      }
      (S.prototype = {
        constructor: S,
        get: function(t) {
          return this.data.hasOwnProperty(t) ? this.data[t] : null;
        },
        set: function(t, e) {
          return (this.data[t] = e);
        },
        each: function(t, e) {
          for (var i in (void 0 !== e && (t = m(t, e)), this.data))
            this.data.hasOwnProperty(i) && t(this.data[i], i);
        },
        removeKey: function(t) {
          delete this.data[t];
        }
      }),
        (e.$override = function(t, e) {
          'createCanvas' === t && (v = null), (c[t] = e);
        }),
        (e.clone = f),
        (e.merge = d),
        (e.mergeAll = function(t, e) {
          for (var i = t[0], r = 1, n = t.length; r < n; r++) i = d(i, t[r], e);
          return i;
        }),
        (e.extend = function(t, e) {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          return t;
        }),
        (e.defaults = p),
        (e.createCanvas = g),
        (e.getContext = function() {
          return v || (v = g().getContext('2d')), v;
        }),
        (e.indexOf = function(t, e) {
          if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var i = 0, r = t.length; i < r; i++) if (t[i] === e) return i;
          }
          return -1;
        }),
        (e.inherits = function(t, e) {
          var i = t.prototype;
          function r() {}
          for (var n in ((r.prototype = e.prototype), (t.prototype = new r()), i))
            i.hasOwnProperty(n) && (t.prototype[n] = i[n]);
          (t.prototype.constructor = t), (t.superClass = e);
        }),
        (e.mixin = function(t, e, i) {
          p((t = 'prototype' in t ? t.prototype : t), (e = 'prototype' in e ? e.prototype : e), i);
        }),
        (e.isArrayLike = function(t) {
          if (t) return 'string' !== typeof t && 'number' === typeof t.length;
        }),
        (e.each = _),
        (e.map = function(t, e, i) {
          if (t && e) {
            if (t.map && t.map === l) return t.map(e, i);
            for (var r = [], n = 0, a = t.length; n < a; n++) r.push(e.call(i, t[n], n, t));
            return r;
          }
        }),
        (e.reduce = function(t, e, i, r) {
          if (t && e) {
            if (t.reduce && t.reduce === u) return t.reduce(e, i, r);
            for (var n = 0, a = t.length; n < a; n++) i = e.call(r, i, t[n], n, t);
            return i;
          }
        }),
        (e.filter = function(t, e, i) {
          if (t && e) {
            if (t.filter && t.filter === s) return t.filter(e, i);
            for (var r = [], n = 0, a = t.length; n < a; n++) e.call(i, t[n], n, t) && r.push(t[n]);
            return r;
          }
        }),
        (e.find = function(t, e, i) {
          if (t && e)
            for (var r = 0, n = t.length; r < n; r++) if (e.call(i, t[r], r, t)) return t[r];
        }),
        (e.bind = m),
        (e.curry = function(t) {
          var e = h.call(arguments, 1);
          return function() {
            return t.apply(this, e.concat(h.call(arguments)));
          };
        }),
        (e.isArray = y),
        (e.isFunction = function(t) {
          return 'function' === typeof t;
        }),
        (e.isString = function(t) {
          return '[object String]' === n.call(t);
        }),
        (e.isObject = x),
        (e.isBuiltInObject = w),
        (e.isTypedArray = function(t) {
          return !!r[n.call(t)];
        }),
        (e.isDom = b),
        (e.eqNaN = function(t) {
          return t !== t;
        }),
        (e.retrieve = function(t) {
          for (var e = 0, i = arguments.length; e < i; e++)
            if (null != arguments[e]) return arguments[e];
        }),
        (e.retrieve2 = function(t, e) {
          return null != t ? t : e;
        }),
        (e.retrieve3 = function(t, e, i) {
          return null != t ? t : null != e ? e : i;
        }),
        (e.slice = function() {
          return Function.call.apply(h, arguments);
        }),
        (e.normalizeCssArray = function(t) {
          if ('number' === typeof t) return [t, t, t, t];
          var e = t.length;
          return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;
        }),
        (e.assert = function(t, e) {
          if (!t) throw new Error(e);
        }),
        (e.trim = function(t) {
          return null == t
            ? null
            : 'function' === typeof t.trim
            ? t.trim()
            : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }),
        (e.setAsPrimitive = function(t) {
          t[T] = !0;
        }),
        (e.isPrimitive = k),
        (e.createHashMap = function(t) {
          return new S(t);
        }),
        (e.concatArray = function(t, e) {
          for (var i = new t.constructor(t.length + e.length), r = 0; r < t.length; r++)
            i[r] = t[r];
          var n = t.length;
          for (r = 0; r < e.length; r++) i[r + n] = e[r];
          return i;
        }),
        (e.noop = function() {});
    },
    272: function(t, e, i) {
      var r = i(44),
        n = i(28),
        a = r.identity,
        o = 5e-5;
      function s(t) {
        return t > o || t < -o;
      }
      var h = function(t) {
          (t = t || {}).position || (this.position = [0, 0]),
            null == t.rotation && (this.rotation = 0),
            t.scale || (this.scale = [1, 1]),
            (this.origin = this.origin || null);
        },
        l = h.prototype;
      (l.transform = null),
        (l.needLocalTransform = function() {
          return (
            s(this.rotation) ||
            s(this.position[0]) ||
            s(this.position[1]) ||
            s(this.scale[0] - 1) ||
            s(this.scale[1] - 1)
          );
        });
      var u = [];
      (l.updateTransform = function() {
        var t = this.parent,
          e = t && t.transform,
          i = this.needLocalTransform(),
          n = this.transform;
        if (i || e) {
          (n = n || r.create()),
            i ? this.getLocalTransform(n) : a(n),
            e && (i ? r.mul(n, t.transform, n) : r.copy(n, t.transform)),
            (this.transform = n);
          var o = this.globalScaleRatio;
          if (null != o && 1 !== o) {
            this.getGlobalScale(u);
            var s = u[0] < 0 ? -1 : 1,
              h = u[1] < 0 ? -1 : 1,
              l = ((u[0] - s) * o + s) / u[0] || 0,
              c = ((u[1] - h) * o + h) / u[1] || 0;
            (n[0] *= l), (n[1] *= l), (n[2] *= c), (n[3] *= c);
          }
          (this.invTransform = this.invTransform || r.create()), r.invert(this.invTransform, n);
        } else n && a(n);
      }),
        (l.getLocalTransform = function(t) {
          return h.getLocalTransform(this, t);
        }),
        (l.setTransform = function(t) {
          var e = this.transform,
            i = t.dpr || 1;
          e
            ? t.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5])
            : t.setTransform(i, 0, 0, i, 0, 0);
        }),
        (l.restoreTransform = function(t) {
          var e = t.dpr || 1;
          t.setTransform(e, 0, 0, e, 0, 0);
        });
      var c = [],
        f = r.create();
      (l.setLocalTransform = function(t) {
        if (t) {
          var e = t[0] * t[0] + t[1] * t[1],
            i = t[2] * t[2] + t[3] * t[3],
            r = this.position,
            n = this.scale;
          s(e - 1) && (e = Math.sqrt(e)),
            s(i - 1) && (i = Math.sqrt(i)),
            t[0] < 0 && (e = -e),
            t[3] < 0 && (i = -i),
            (r[0] = t[4]),
            (r[1] = t[5]),
            (n[0] = e),
            (n[1] = i),
            (this.rotation = Math.atan2(-t[1] / i, t[0] / e));
        }
      }),
        (l.decomposeTransform = function() {
          if (this.transform) {
            var t = this.parent,
              e = this.transform;
            t && t.transform && (r.mul(c, t.invTransform, e), (e = c));
            var i = this.origin;
            i &&
              (i[0] || i[1]) &&
              ((f[4] = i[0]),
              (f[5] = i[1]),
              r.mul(c, e, f),
              (c[4] -= i[0]),
              (c[5] -= i[1]),
              (e = c)),
              this.setLocalTransform(e);
          }
        }),
        (l.getGlobalScale = function(t) {
          var e = this.transform;
          return (
            (t = t || []),
            e
              ? ((t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1])),
                (t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3])),
                e[0] < 0 && (t[0] = -t[0]),
                e[3] < 0 && (t[1] = -t[1]),
                t)
              : ((t[0] = 1), (t[1] = 1), t)
          );
        }),
        (l.transformCoordToLocal = function(t, e) {
          var i = [t, e],
            r = this.invTransform;
          return r && n.applyTransform(i, i, r), i;
        }),
        (l.transformCoordToGlobal = function(t, e) {
          var i = [t, e],
            r = this.transform;
          return r && n.applyTransform(i, i, r), i;
        }),
        (h.getLocalTransform = function(t, e) {
          a((e = e || []));
          var i = t.origin,
            n = t.scale || [1, 1],
            o = t.rotation || 0,
            s = t.position || [0, 0];
          return (
            i && ((e[4] -= i[0]), (e[5] -= i[1])),
            r.scale(e, e, n),
            o && r.rotate(e, e, o),
            i && ((e[4] += i[0]), (e[5] += i[1])),
            (e[4] += s[0]),
            (e[5] += s[1]),
            e
          );
        });
      var d = h;
      t.exports = d;
    },
    273: function(t, e) {
      var i = 32,
        r = 7;
      function n(t, e, i, r) {
        var n = e + 1;
        if (n === i) return 1;
        if (r(t[n++], t[e]) < 0) {
          for (; n < i && r(t[n], t[n - 1]) < 0; ) n++;
          !(function(t, e, i) {
            i--;
            for (; e < i; ) {
              var r = t[e];
              (t[e++] = t[i]), (t[i--] = r);
            }
          })(t, e, n);
        } else for (; n < i && r(t[n], t[n - 1]) >= 0; ) n++;
        return n - e;
      }
      function a(t, e, i, r, n) {
        for (r === e && r++; r < i; r++) {
          for (var a, o = t[r], s = e, h = r; s < h; )
            n(o, t[(a = (s + h) >>> 1)]) < 0 ? (h = a) : (s = a + 1);
          var l = r - s;
          switch (l) {
            case 3:
              t[s + 3] = t[s + 2];
            case 2:
              t[s + 2] = t[s + 1];
            case 1:
              t[s + 1] = t[s];
              break;
            default:
              for (; l > 0; ) (t[s + l] = t[s + l - 1]), l--;
          }
          t[s] = o;
        }
      }
      function o(t, e, i, r, n, a) {
        var o = 0,
          s = 0,
          h = 1;
        if (a(t, e[i + n]) > 0) {
          for (s = r - n; h < s && a(t, e[i + n + h]) > 0; )
            (o = h), (h = 1 + (h << 1)) <= 0 && (h = s);
          h > s && (h = s), (o += n), (h += n);
        } else {
          for (s = n + 1; h < s && a(t, e[i + n - h]) <= 0; )
            (o = h), (h = 1 + (h << 1)) <= 0 && (h = s);
          h > s && (h = s);
          var l = o;
          (o = n - h), (h = n - l);
        }
        for (o++; o < h; ) {
          var u = o + ((h - o) >>> 1);
          a(t, e[i + u]) > 0 ? (o = u + 1) : (h = u);
        }
        return h;
      }
      function s(t, e, i, r, n, a) {
        var o = 0,
          s = 0,
          h = 1;
        if (a(t, e[i + n]) < 0) {
          for (s = n + 1; h < s && a(t, e[i + n - h]) < 0; )
            (o = h), (h = 1 + (h << 1)) <= 0 && (h = s);
          h > s && (h = s);
          var l = o;
          (o = n - h), (h = n - l);
        } else {
          for (s = r - n; h < s && a(t, e[i + n + h]) >= 0; )
            (o = h), (h = 1 + (h << 1)) <= 0 && (h = s);
          h > s && (h = s), (o += n), (h += n);
        }
        for (o++; o < h; ) {
          var u = o + ((h - o) >>> 1);
          a(t, e[i + u]) < 0 ? (h = u) : (o = u + 1);
        }
        return h;
      }
      function h(t, e) {
        var i,
          n,
          a,
          h = r,
          l = 0;
        i = t.length;
        var u = [];
        function c(i) {
          var c = n[i],
            f = a[i],
            d = n[i + 1],
            p = a[i + 1];
          (a[i] = f + p), i === l - 3 && ((n[i + 1] = n[i + 2]), (a[i + 1] = a[i + 2])), l--;
          var v = s(t[d], t, c, f, 0, e);
          (c += v),
            0 !== (f -= v) &&
              0 !== (p = o(t[c + f - 1], t, d, p, p - 1, e)) &&
              (f <= p
                ? (function(i, n, a, l) {
                    var c = 0;
                    for (c = 0; c < n; c++) u[c] = t[i + c];
                    var f = 0,
                      d = a,
                      p = i;
                    if (((t[p++] = t[d++]), 0 === --l)) {
                      for (c = 0; c < n; c++) t[p + c] = u[f + c];
                      return;
                    }
                    if (1 === n) {
                      for (c = 0; c < l; c++) t[p + c] = t[d + c];
                      return void (t[p + l] = u[f]);
                    }
                    var v,
                      g,
                      _,
                      m = h;
                    for (;;) {
                      (v = 0), (g = 0), (_ = !1);
                      do {
                        if (e(t[d], u[f]) < 0) {
                          if (((t[p++] = t[d++]), g++, (v = 0), 0 === --l)) {
                            _ = !0;
                            break;
                          }
                        } else if (((t[p++] = u[f++]), v++, (g = 0), 1 === --n)) {
                          _ = !0;
                          break;
                        }
                      } while ((v | g) < m);
                      if (_) break;
                      do {
                        if (0 !== (v = s(t[d], u, f, n, 0, e))) {
                          for (c = 0; c < v; c++) t[p + c] = u[f + c];
                          if (((p += v), (f += v), (n -= v) <= 1)) {
                            _ = !0;
                            break;
                          }
                        }
                        if (((t[p++] = t[d++]), 0 === --l)) {
                          _ = !0;
                          break;
                        }
                        if (0 !== (g = o(u[f], t, d, l, 0, e))) {
                          for (c = 0; c < g; c++) t[p + c] = t[d + c];
                          if (((p += g), (d += g), 0 === (l -= g))) {
                            _ = !0;
                            break;
                          }
                        }
                        if (((t[p++] = u[f++]), 1 === --n)) {
                          _ = !0;
                          break;
                        }
                        m--;
                      } while (v >= r || g >= r);
                      if (_) break;
                      m < 0 && (m = 0), (m += 2);
                    }
                    if (((h = m) < 1 && (h = 1), 1 === n)) {
                      for (c = 0; c < l; c++) t[p + c] = t[d + c];
                      t[p + l] = u[f];
                    } else {
                      if (0 === n) throw new Error();
                      for (c = 0; c < n; c++) t[p + c] = u[f + c];
                    }
                  })(c, f, d, p)
                : (function(i, n, a, l) {
                    var c = 0;
                    for (c = 0; c < l; c++) u[c] = t[a + c];
                    var f = i + n - 1,
                      d = l - 1,
                      p = a + l - 1,
                      v = 0,
                      g = 0;
                    if (((t[p--] = t[f--]), 0 === --n)) {
                      for (v = p - (l - 1), c = 0; c < l; c++) t[v + c] = u[c];
                      return;
                    }
                    if (1 === l) {
                      for (g = (p -= n) + 1, v = (f -= n) + 1, c = n - 1; c >= 0; c--)
                        t[g + c] = t[v + c];
                      return void (t[p] = u[d]);
                    }
                    var _ = h;
                    for (;;) {
                      var m = 0,
                        y = 0,
                        x = !1;
                      do {
                        if (e(u[d], t[f]) < 0) {
                          if (((t[p--] = t[f--]), m++, (y = 0), 0 === --n)) {
                            x = !0;
                            break;
                          }
                        } else if (((t[p--] = u[d--]), y++, (m = 0), 1 === --l)) {
                          x = !0;
                          break;
                        }
                      } while ((m | y) < _);
                      if (x) break;
                      do {
                        if (0 !== (m = n - s(u[d], t, i, n, n - 1, e))) {
                          for (n -= m, g = (p -= m) + 1, v = (f -= m) + 1, c = m - 1; c >= 0; c--)
                            t[g + c] = t[v + c];
                          if (0 === n) {
                            x = !0;
                            break;
                          }
                        }
                        if (((t[p--] = u[d--]), 1 === --l)) {
                          x = !0;
                          break;
                        }
                        if (0 !== (y = l - o(t[f], u, 0, l, l - 1, e))) {
                          for (l -= y, g = (p -= y) + 1, v = (d -= y) + 1, c = 0; c < y; c++)
                            t[g + c] = u[v + c];
                          if (l <= 1) {
                            x = !0;
                            break;
                          }
                        }
                        if (((t[p--] = t[f--]), 0 === --n)) {
                          x = !0;
                          break;
                        }
                        _--;
                      } while (m >= r || y >= r);
                      if (x) break;
                      _ < 0 && (_ = 0), (_ += 2);
                    }
                    (h = _) < 1 && (h = 1);
                    if (1 === l) {
                      for (g = (p -= n) + 1, v = (f -= n) + 1, c = n - 1; c >= 0; c--)
                        t[g + c] = t[v + c];
                      t[p] = u[d];
                    } else {
                      if (0 === l) throw new Error();
                      for (v = p - (l - 1), c = 0; c < l; c++) t[v + c] = u[c];
                    }
                  })(c, f, d, p));
        }
        (n = []),
          (a = []),
          (this.mergeRuns = function() {
            for (; l > 1; ) {
              var t = l - 2;
              if (
                (t >= 1 && a[t - 1] <= a[t] + a[t + 1]) ||
                (t >= 2 && a[t - 2] <= a[t] + a[t - 1])
              )
                a[t - 1] < a[t + 1] && t--;
              else if (a[t] > a[t + 1]) break;
              c(t);
            }
          }),
          (this.forceMergeRuns = function() {
            for (; l > 1; ) {
              var t = l - 2;
              t > 0 && a[t - 1] < a[t + 1] && t--, c(t);
            }
          }),
          (this.pushRun = function(t, e) {
            (n[l] = t), (a[l] = e), (l += 1);
          });
      }
      t.exports = function(t, e, r, o) {
        r || (r = 0), o || (o = t.length);
        var s = o - r;
        if (!(s < 2)) {
          var l = 0;
          if (s < i) a(t, r, o, r + (l = n(t, r, o, e)), e);
          else {
            var u = new h(t, e),
              c = (function(t) {
                for (var e = 0; t >= i; ) (e |= 1 & t), (t >>= 1);
                return t + e;
              })(s);
            do {
              if ((l = n(t, r, o, e)) < c) {
                var f = s;
                f > c && (f = c), a(t, r, r + f, r + l, e), (l = f);
              }
              u.pushRun(r, l), u.mergeRuns(), (s -= l), (r += l);
            } while (0 !== s);
            u.forceMergeRuns();
          }
        }
      };
    },
    274: function(t, e, i) {
      var r = i(379),
        n = i(188).ContextCachedBy,
        a = [
          ['shadowBlur', 0],
          ['shadowOffsetX', 0],
          ['shadowOffsetY', 0],
          ['shadowColor', '#000'],
          ['lineCap', 'butt'],
          ['lineJoin', 'miter'],
          ['miterLimit', 10]
        ],
        o = function(t) {
          this.extendFrom(t, !1);
        };
      function s(t, e, i) {
        var r = null == e.x ? 0 : e.x,
          n = null == e.x2 ? 1 : e.x2,
          a = null == e.y ? 0 : e.y,
          o = null == e.y2 ? 0 : e.y2;
        return (
          e.global ||
            ((r = r * i.width + i.x),
            (n = n * i.width + i.x),
            (a = a * i.height + i.y),
            (o = o * i.height + i.y)),
          (r = isNaN(r) ? 0 : r),
          (n = isNaN(n) ? 1 : n),
          (a = isNaN(a) ? 0 : a),
          (o = isNaN(o) ? 0 : o),
          t.createLinearGradient(r, a, n, o)
        );
      }
      function h(t, e, i) {
        var r = i.width,
          n = i.height,
          a = Math.min(r, n),
          o = null == e.x ? 0.5 : e.x,
          s = null == e.y ? 0.5 : e.y,
          h = null == e.r ? 0.5 : e.r;
        return (
          e.global || ((o = o * r + i.x), (s = s * n + i.y), (h *= a)),
          t.createRadialGradient(o, s, 0, o, s, h)
        );
      }
      for (
        var l = (o.prototype = {
            constructor: o,
            fill: '#000',
            stroke: null,
            opacity: 1,
            fillOpacity: null,
            strokeOpacity: null,
            lineDash: null,
            lineDashOffset: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            lineWidth: 1,
            strokeNoScale: !1,
            text: null,
            font: null,
            textFont: null,
            fontStyle: null,
            fontWeight: null,
            fontSize: null,
            fontFamily: null,
            textTag: null,
            textFill: '#000',
            textStroke: null,
            textWidth: null,
            textHeight: null,
            textStrokeWidth: 0,
            textLineHeight: null,
            textPosition: 'inside',
            textRect: null,
            textOffset: null,
            textAlign: null,
            textVerticalAlign: null,
            textDistance: 5,
            textShadowColor: 'transparent',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textBoxShadowColor: 'transparent',
            textBoxShadowBlur: 0,
            textBoxShadowOffsetX: 0,
            textBoxShadowOffsetY: 0,
            transformText: !1,
            textRotation: 0,
            textOrigin: null,
            textBackgroundColor: null,
            textBorderColor: null,
            textBorderWidth: 0,
            textBorderRadius: 0,
            textPadding: null,
            rich: null,
            truncate: null,
            blend: null,
            bind: function(t, e, i) {
              var o = i && i.style,
                s = !o || t.__attrCachedBy !== n.STYLE_BIND;
              t.__attrCachedBy = n.STYLE_BIND;
              for (var h = 0; h < a.length; h++) {
                var l = a[h],
                  u = l[0];
                (s || this[u] !== o[u]) && (t[u] = r(t, u, this[u] || l[1]));
              }
              if (
                ((s || this.fill !== o.fill) && (t.fillStyle = this.fill),
                (s || this.stroke !== o.stroke) && (t.strokeStyle = this.stroke),
                (s || this.opacity !== o.opacity) &&
                  (t.globalAlpha = null == this.opacity ? 1 : this.opacity),
                (s || this.blend !== o.blend) &&
                  (t.globalCompositeOperation = this.blend || 'source-over'),
                this.hasStroke())
              ) {
                var c = this.lineWidth;
                t.lineWidth =
                  c / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
              }
            },
            hasFill: function() {
              var t = this.fill;
              return null != t && 'none' !== t;
            },
            hasStroke: function() {
              var t = this.stroke;
              return null != t && 'none' !== t && this.lineWidth > 0;
            },
            extendFrom: function(t, e) {
              if (t)
                for (var i in t)
                  !t.hasOwnProperty(i) ||
                    (!0 !== e && (!1 === e ? this.hasOwnProperty(i) : null == t[i])) ||
                    (this[i] = t[i]);
            },
            set: function(t, e) {
              'string' === typeof t ? (this[t] = e) : this.extendFrom(t, !0);
            },
            clone: function() {
              var t = new this.constructor();
              return t.extendFrom(this, !0), t;
            },
            getGradient: function(t, e, i) {
              for (
                var r = ('radial' === e.type ? h : s)(t, e, i), n = e.colorStops, a = 0;
                a < n.length;
                a++
              )
                r.addColorStop(n[a].offset, n[a].color);
              return r;
            }
          }),
          u = 0;
        u < a.length;
        u++
      ) {
        var c = a[u];
        c[0] in l || (l[c[0]] = c[1]);
      }
      o.getGradient = l.getGradient;
      var f = o;
      t.exports = f;
    },
    275: function(t, e, i) {
      var r = new (i(378))(50);
      function n() {
        var t = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
          var i = t.pending[e],
            r = i.cb;
          r && r(this, i.cbPayload), i.hostEl.dirty();
        }
        t.pending.length = 0;
      }
      function a(t) {
        return t && t.width && t.height;
      }
      (e.findExistImage = function(t) {
        if ('string' === typeof t) {
          var e = r.get(t);
          return e && e.image;
        }
        return t;
      }),
        (e.createOrUpdateImage = function(t, e, i, o, s) {
          if (t) {
            if ('string' === typeof t) {
              if ((e && e.__zrImageSrc === t) || !i) return e;
              var h = r.get(t),
                l = { hostEl: i, cb: o, cbPayload: s };
              return (
                h
                  ? !a((e = h.image)) && h.pending.push(l)
                  : (((e = new Image()).onload = e.onerror = n),
                    r.put(t, (e.__cachedImgObj = { image: e, pending: [l] })),
                    (e.src = e.__zrImageSrc = t)),
                e
              );
            }
            return t;
          }
          return e;
        }),
        (e.isImageReady = a);
    },
    276: function(t, e, i) {
      var r = i(33),
        n = i(383),
        a = i(277).subPixelOptimizeRect,
        o = {},
        s = r.extend({
          type: 'rect',
          shape: { r: 0, x: 0, y: 0, width: 0, height: 0 },
          buildPath: function(t, e) {
            var i, r, s, h;
            this.subPixelOptimize
              ? (a(o, e, this.style),
                (i = o.x),
                (r = o.y),
                (s = o.width),
                (h = o.height),
                (o.r = e.r),
                (e = o))
              : ((i = e.x), (r = e.y), (s = e.width), (h = e.height)),
              e.r ? n.buildPath(t, e) : t.rect(i, r, s, h),
              t.closePath();
          }
        });
      t.exports = s;
    },
    277: function(t, e) {
      var i = Math.round;
      function r(t, e, r) {
        var n = i(2 * t);
        return (n + i(e)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
      }
      (e.subPixelOptimizeLine = function(t, e, n) {
        var a = n && n.lineWidth;
        if (e && a) {
          var o = e.x1,
            s = e.x2,
            h = e.y1,
            l = e.y2;
          i(2 * o) === i(2 * s) ? (t.x1 = t.x2 = r(o, a, !0)) : ((t.x1 = o), (t.x2 = s)),
            i(2 * h) === i(2 * l) ? (t.y1 = t.y2 = r(h, a, !0)) : ((t.y1 = h), (t.y2 = l));
        }
      }),
        (e.subPixelOptimizeRect = function(t, e, i) {
          var n = i && i.lineWidth;
          if (e && n) {
            var a = e.x,
              o = e.y,
              s = e.width,
              h = e.height;
            (t.x = r(a, n, !0)),
              (t.y = r(o, n, !0)),
              (t.width = Math.max(r(a + s, n, !1) - t.x, 0 === s ? 0 : 1)),
              (t.height = Math.max(r(o + h, n, !1) - t.y, 0 === h ? 0 : 1));
          }
        }),
        (e.subPixelOptimize = r);
    },
    278: function(t, e, i) {
      var r = i(2),
        n = i(191),
        a = function(t, e, i, r, a, o) {
          (this.x = null == t ? 0 : t),
            (this.y = null == e ? 0 : e),
            (this.x2 = null == i ? 1 : i),
            (this.y2 = null == r ? 0 : r),
            (this.type = 'linear'),
            (this.global = o || !1),
            n.call(this, a);
        };
      (a.prototype = { constructor: a }), r.inherits(a, n);
      var o = a;
      t.exports = o;
    },
    279: function(t, e, i) {
      var r = i(2).inherits,
        n = i(150),
        a = i(29);
      function o(t) {
        n.call(this, t),
          (this._displayables = []),
          (this._temporaryDisplayables = []),
          (this._cursor = 0),
          (this.notClear = !0);
      }
      (o.prototype.incremental = !0),
        (o.prototype.clearDisplaybles = function() {
          (this._displayables = []),
            (this._temporaryDisplayables = []),
            (this._cursor = 0),
            this.dirty(),
            (this.notClear = !1);
        }),
        (o.prototype.addDisplayable = function(t, e) {
          e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();
        }),
        (o.prototype.addDisplayables = function(t, e) {
          e = e || !1;
          for (var i = 0; i < t.length; i++) this.addDisplayable(t[i], e);
        }),
        (o.prototype.eachPendingDisplayable = function(t) {
          for (var e = this._cursor; e < this._displayables.length; e++)
            t && t(this._displayables[e]);
          for (e = 0; e < this._temporaryDisplayables.length; e++)
            t && t(this._temporaryDisplayables[e]);
        }),
        (o.prototype.update = function() {
          this.updateTransform();
          for (var t = this._cursor; t < this._displayables.length; t++) {
            ((e = this._displayables[t]).parent = this), e.update(), (e.parent = null);
          }
          for (t = 0; t < this._temporaryDisplayables.length; t++) {
            var e;
            ((e = this._temporaryDisplayables[t]).parent = this), e.update(), (e.parent = null);
          }
        }),
        (o.prototype.brush = function(t, e) {
          for (var i = this._cursor; i < this._displayables.length; i++) {
            (r = this._displayables[i]).beforeBrush && r.beforeBrush(t),
              r.brush(t, i === this._cursor ? null : this._displayables[i - 1]),
              r.afterBrush && r.afterBrush(t);
          }
          this._cursor = i;
          for (i = 0; i < this._temporaryDisplayables.length; i++) {
            var r;
            (r = this._temporaryDisplayables[i]).beforeBrush && r.beforeBrush(t),
              r.brush(t, 0 === i ? null : this._temporaryDisplayables[i - 1]),
              r.afterBrush && r.afterBrush(t);
          }
          (this._temporaryDisplayables = []), (this.notClear = !0);
        });
      var s = [];
      (o.prototype.getBoundingRect = function() {
        if (!this._rect) {
          for (
            var t = new a(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0;
            e < this._displayables.length;
            e++
          ) {
            var i = this._displayables[e],
              r = i.getBoundingRect().clone();
            i.needLocalTransform() && r.applyTransform(i.getLocalTransform(s)), t.union(r);
          }
          this._rect = t;
        }
        return this._rect;
      }),
        (o.prototype.contain = function(t, e) {
          var i = this.transformCoordToLocal(t, e);
          if (this.getBoundingRect().contain(i[0], i[1]))
            for (var r = 0; r < this._displayables.length; r++) {
              if (this._displayables[r].contain(t, e)) return !0;
            }
          return !1;
        }),
        r(o, n);
      var h = o;
      t.exports = h;
    },
    28: function(t, e) {
      var i = 'undefined' === typeof Float32Array ? Array : Float32Array;
      function r(t) {
        return Math.sqrt(a(t));
      }
      var n = r;
      function a(t) {
        return t[0] * t[0] + t[1] * t[1];
      }
      var o = a;
      function s(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
      }
      var h = s;
      function l(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
      }
      var u = l;
      (e.create = function(t, e) {
        var r = new i(2);
        return null == t && (t = 0), null == e && (e = 0), (r[0] = t), (r[1] = e), r;
      }),
        (e.copy = function(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), t;
        }),
        (e.clone = function(t) {
          var e = new i(2);
          return (e[0] = t[0]), (e[1] = t[1]), e;
        }),
        (e.set = function(t, e, i) {
          return (t[0] = e), (t[1] = i), t;
        }),
        (e.add = function(t, e, i) {
          return (t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), t;
        }),
        (e.scaleAndAdd = function(t, e, i, r) {
          return (t[0] = e[0] + i[0] * r), (t[1] = e[1] + i[1] * r), t;
        }),
        (e.sub = function(t, e, i) {
          return (t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), t;
        }),
        (e.len = r),
        (e.length = n),
        (e.lenSquare = a),
        (e.lengthSquare = o),
        (e.mul = function(t, e, i) {
          return (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t;
        }),
        (e.div = function(t, e, i) {
          return (t[0] = e[0] / i[0]), (t[1] = e[1] / i[1]), t;
        }),
        (e.dot = function(t, e) {
          return t[0] * e[0] + t[1] * e[1];
        }),
        (e.scale = function(t, e, i) {
          return (t[0] = e[0] * i), (t[1] = e[1] * i), t;
        }),
        (e.normalize = function(t, e) {
          var i = r(e);
          return 0 === i ? ((t[0] = 0), (t[1] = 0)) : ((t[0] = e[0] / i), (t[1] = e[1] / i)), t;
        }),
        (e.distance = s),
        (e.dist = h),
        (e.distanceSquare = l),
        (e.distSquare = u),
        (e.negate = function(t, e) {
          return (t[0] = -e[0]), (t[1] = -e[1]), t;
        }),
        (e.lerp = function(t, e, i, r) {
          return (t[0] = e[0] + r * (i[0] - e[0])), (t[1] = e[1] + r * (i[1] - e[1])), t;
        }),
        (e.applyTransform = function(t, e, i) {
          var r = e[0],
            n = e[1];
          return (t[0] = i[0] * r + i[2] * n + i[4]), (t[1] = i[1] * r + i[3] * n + i[5]), t;
        }),
        (e.min = function(t, e, i) {
          return (t[0] = Math.min(e[0], i[0])), (t[1] = Math.min(e[1], i[1])), t;
        }),
        (e.max = function(t, e, i) {
          return (t[0] = Math.max(e[0], i[0])), (t[1] = Math.max(e[1], i[1])), t;
        });
    },
    29: function(t, e, i) {
      var r = i(28),
        n = i(44),
        a = r.applyTransform,
        o = Math.min,
        s = Math.max;
      function h(t, e, i, r) {
        i < 0 && ((t += i), (i = -i)),
          r < 0 && ((e += r), (r = -r)),
          (this.x = t),
          (this.y = e),
          (this.width = i),
          (this.height = r);
      }
      (h.prototype = {
        constructor: h,
        union: function(t) {
          var e = o(t.x, this.x),
            i = o(t.y, this.y);
          (this.width = s(t.x + t.width, this.x + this.width) - e),
            (this.height = s(t.y + t.height, this.y + this.height) - i),
            (this.x = e),
            (this.y = i);
        },
        applyTransform: (function() {
          var t = [],
            e = [],
            i = [],
            r = [];
          return function(n) {
            if (n) {
              (t[0] = i[0] = this.x),
                (t[1] = r[1] = this.y),
                (e[0] = r[0] = this.x + this.width),
                (e[1] = i[1] = this.y + this.height),
                a(t, t, n),
                a(e, e, n),
                a(i, i, n),
                a(r, r, n),
                (this.x = o(t[0], e[0], i[0], r[0])),
                (this.y = o(t[1], e[1], i[1], r[1]));
              var h = s(t[0], e[0], i[0], r[0]),
                l = s(t[1], e[1], i[1], r[1]);
              (this.width = h - this.x), (this.height = l - this.y);
            }
          };
        })(),
        calculateTransform: function(t) {
          var e = this,
            i = t.width / e.width,
            r = t.height / e.height,
            a = n.create();
          return (
            n.translate(a, a, [-e.x, -e.y]), n.scale(a, a, [i, r]), n.translate(a, a, [t.x, t.y]), a
          );
        },
        intersect: function(t) {
          if (!t) return !1;
          t instanceof h || (t = h.create(t));
          var e = this,
            i = e.x,
            r = e.x + e.width,
            n = e.y,
            a = e.y + e.height,
            o = t.x,
            s = t.x + t.width,
            l = t.y,
            u = t.y + t.height;
          return !(r < o || s < i || a < l || u < n);
        },
        contain: function(t, e) {
          return (
            t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
          );
        },
        clone: function() {
          return new h(this.x, this.y, this.width, this.height);
        },
        copy: function(t) {
          (this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height);
        },
        plain: function() {
          return { x: this.x, y: this.y, width: this.width, height: this.height };
        }
      }),
        (h.create = function(t) {
          return new h(t.x, t.y, t.width, t.height);
        });
      var l = h;
      t.exports = l;
    },
    305: function(t, e, i) {
      var r = i(306).createElement,
        n = i(122),
        a = i(29),
        o = i(44),
        s = i(53),
        h = i(189),
        l = i(100),
        u = n.CMD,
        c = Array.prototype.join,
        f = 'none',
        d = Math.round,
        p = Math.sin,
        v = Math.cos,
        g = Math.PI,
        _ = 2 * Math.PI,
        m = 180 / g,
        y = 1e-4;
      function x(t) {
        return d(1e4 * t) / 1e4;
      }
      function w(t) {
        return t < y && t > -y;
      }
      function b(t, e) {
        e && T(t, 'transform', 'matrix(' + c.call(e, ',') + ')');
      }
      function T(t, e, i) {
        (!i || ('linear' !== i.type && 'radial' !== i.type)) && t.setAttribute(e, i);
      }
      function k(t, e, i, r) {
        if (
          (function(t, e) {
            var i = e ? t.textFill : t.fill;
            return null != i && i !== f;
          })(e, i)
        ) {
          var n = i ? e.textFill : e.fill;
          T(t, 'fill', (n = 'transparent' === n ? f : n)),
            T(t, 'fill-opacity', null != e.fillOpacity ? e.fillOpacity * e.opacity : e.opacity);
        } else T(t, 'fill', f);
        if (
          (function(t, e) {
            var i = e ? t.textStroke : t.stroke;
            return null != i && i !== f;
          })(e, i)
        ) {
          var a = i ? e.textStroke : e.stroke;
          T(t, 'stroke', (a = 'transparent' === a ? f : a)),
            T(
              t,
              'stroke-width',
              (i ? e.textStrokeWidth : e.lineWidth) / (!i && e.strokeNoScale ? r.getLineScale() : 1)
            ),
            T(t, 'paint-order', i ? 'stroke' : 'fill'),
            T(t, 'stroke-opacity', null != e.strokeOpacity ? e.strokeOpacity : e.opacity),
            e.lineDash
              ? (T(t, 'stroke-dasharray', e.lineDash.join(',')),
                T(t, 'stroke-dashoffset', d(e.lineDashOffset || 0)))
              : T(t, 'stroke-dasharray', ''),
            e.lineCap && T(t, 'stroke-linecap', e.lineCap),
            e.lineJoin && T(t, 'stroke-linejoin', e.lineJoin),
            e.miterLimit && T(t, 'stroke-miterlimit', e.miterLimit);
        } else T(t, 'stroke', f);
      }
      var S = {};
      S.brush = function(t) {
        var e = t.style,
          i = t.__svgEl;
        i || ((i = r('path')), (t.__svgEl = i)), t.path || t.createPathProxy();
        var n = t.path;
        if (t.__dirtyPath) {
          n.beginPath(), (n.subPixelOptimize = !1), t.buildPath(n, t.shape), (t.__dirtyPath = !1);
          var a = (function(t) {
            for (var e = [], i = t.data, r = t.len(), n = 0; n < r; ) {
              var a = '',
                o = 0;
              switch (i[n++]) {
                case u.M:
                  (a = 'M'), (o = 2);
                  break;
                case u.L:
                  (a = 'L'), (o = 2);
                  break;
                case u.Q:
                  (a = 'Q'), (o = 4);
                  break;
                case u.C:
                  (a = 'C'), (o = 6);
                  break;
                case u.A:
                  var s = i[n++],
                    h = i[n++],
                    l = i[n++],
                    c = i[n++],
                    f = i[n++],
                    y = i[n++],
                    b = i[n++],
                    T = i[n++],
                    k = Math.abs(y),
                    S = w(k - _) || (T ? y >= _ : -y >= _),
                    A = y > 0 ? y % _ : (y % _) + _,
                    C = !1;
                  C = !!S || (!w(k) && A >= g === !!T);
                  var P = x(s + l * v(f)),
                    M = x(h + c * p(f));
                  S && ((y = T ? _ - 1e-4 : 1e-4 - _), (C = !0), 9 === n && e.push('M', P, M));
                  var L = x(s + l * v(f + y)),
                    z = x(h + c * p(f + y));
                  e.push('A', x(l), x(c), d(b * m), +C, +T, L, z);
                  break;
                case u.Z:
                  a = 'Z';
                  break;
                case u.R:
                  (L = x(i[n++])), (z = x(i[n++]));
                  var D = x(i[n++]),
                    B = x(i[n++]);
                  e.push('M', L, z, 'L', L + D, z, 'L', L + D, z + B, 'L', L, z + B, 'L', L, z);
              }
              a && e.push(a);
              for (var R = 0; R < o; R++) e.push(x(i[n++]));
            }
            return e.join(' ');
          })(n);
          a.indexOf('NaN') < 0 && T(i, 'd', a);
        }
        k(i, e, !1, t), b(i, t.transform), null != e.text && D(t, t.getBoundingRect());
      };
      var A = {
          brush: function(t) {
            var e = t.style,
              i = e.image;
            i instanceof HTMLImageElement && (i = i.src);
            if (i) {
              var n = e.x || 0,
                a = e.y || 0,
                o = e.width,
                s = e.height,
                h = t.__svgEl;
              h || ((h = r('image')), (t.__svgEl = h)),
                i !== t.__imageSrc &&
                  (!(function(t, e, i) {
                    t.setAttributeNS('http://www.w3.org/1999/xlink', e, i);
                  })(h, 'href', i),
                  (t.__imageSrc = i)),
                T(h, 'width', o),
                T(h, 'height', s),
                T(h, 'x', n),
                T(h, 'y', a),
                b(h, t.transform),
                null != e.text && D(t, t.getBoundingRect());
            }
          }
        },
        C = {},
        P = new a(),
        M = {},
        L = [],
        z = { left: 'start', right: 'end', center: 'middle', middle: 'middle' },
        D = function(t, e) {
          var i = t.style,
            n = t.transform,
            a = t instanceof l || i.transformText;
          t.__dirty && h.normalizeTextStyle(i, !0);
          var u = i.text;
          if ((null != u && (u += ''), h.needDrawText(u, i))) {
            null == u && (u = ''), !a && n && (P.copy(e), P.applyTransform(n), (e = P));
            var c = t.__textSvgEl;
            c || ((c = r('text')), (t.__textSvgEl = c));
            var f = c.style,
              d = i.font || s.DEFAULT_FONT,
              p = c.__computedFont;
            d !== c.__styleFont && ((f.font = c.__styleFont = d), (p = c.__computedFont = f.font));
            var v = i.textPadding,
              g = i.textLineHeight,
              _ = t.__textCotentBlock;
            (_ && !t.__dirtyText) ||
              (_ = t.__textCotentBlock = s.parsePlainText(u, p, v, g, i.truncate));
            var m = _.outerHeight,
              y = _.lineHeight;
            h.getBoxPosition(M, t, i, e);
            var x = M.baseX,
              w = M.baseY,
              T = M.textAlign || 'left',
              S = M.textVerticalAlign;
            !(function(t, e, i, r, n, a, s) {
              o.identity(L), e && i && o.copy(L, i);
              var h = r.textRotation;
              if (n && h) {
                var l = r.textOrigin;
                'center' === l
                  ? ((a = n.width / 2 + n.x), (s = n.height / 2 + n.y))
                  : l && ((a = l[0] + n.x), (s = l[1] + n.y)),
                  (L[4] -= a),
                  (L[5] -= s),
                  o.rotate(L, L, h),
                  (L[4] += a),
                  (L[5] += s);
              }
              b(t, L);
            })(c, a, n, i, e, x, w);
            var A = x,
              C = s.adjustTextY(w, m, S);
            v &&
              ((A = (function(t, e, i) {
                return 'right' === e
                  ? t - i[1]
                  : 'center' === e
                  ? t + i[3] / 2 - i[1] / 2
                  : t + i[3];
              })(x, T, v)),
              (C += v[0])),
              (C += y / 2),
              k(c, i, !0, t);
            var z = _.canCacheByTextString,
              D = t.__tspanList || (t.__tspanList = []),
              R = D.length;
            if (z && t.__canCacheByTextString && t.__text === u) {
              if (t.__dirtyText && R) for (var O = 0; O < R; ++O) B(D[O], T, A, C + O * y);
            } else {
              (t.__text = u), (t.__canCacheByTextString = z);
              var E = _.lines,
                I = E.length;
              for (O = 0; O < I; O++) {
                var F = D[O],
                  H = E[O];
                F
                  ? F.__zrText !== H &&
                    ((F.innerHTML = ''), F.appendChild(document.createTextNode(H)))
                  : ((F = D[O] = r('tspan')),
                    c.appendChild(F),
                    F.appendChild(document.createTextNode(H))),
                  B(F, T, A, C + O * y);
              }
              if (R > I) {
                for (; O < R; O++) c.removeChild(D[O]);
                D.length = I;
              }
            }
          }
        };
      function B(t, e, i, r) {
        T(t, 'dominant-baseline', 'middle'), T(t, 'text-anchor', z[e]), T(t, 'x', i), T(t, 'y', r);
      }
      (C.drawRectText = D),
        (C.brush = function(t) {
          null != t.style.text && D(t, !1);
        }),
        (e.path = S),
        (e.image = A),
        (e.text = C);
    },
    306: function(t, e) {
      var i = 'http://www.w3.org/2000/svg';
      e.createElement = function(t) {
        return document.createElementNS(i, t);
      };
    },
    307: function(t, e, i) {
      var r = i(306).createElement,
        n = i(2),
        a = i(33),
        o = i(120),
        s = i(100),
        h = i(305),
        l = h.path,
        u = h.image,
        c = h.text;
      function f(t, e, i, r, n) {
        (this._zrId = t),
          (this._svgRoot = e),
          (this._tagNames = 'string' === typeof i ? [i] : i),
          (this._markLabel = r),
          (this._domName = n || '_dom'),
          (this.nextId = 0);
      }
      (f.prototype.createElement = r),
        (f.prototype.getDefs = function(t) {
          var e = this._svgRoot,
            i = this._svgRoot.getElementsByTagName('defs');
          return 0 === i.length
            ? t
              ? ((i = e.insertBefore(this.createElement('defs'), e.firstChild)).contains ||
                  (i.contains = function(t) {
                    var e = i.children;
                    if (!e) return !1;
                    for (var r = e.length - 1; r >= 0; --r) if (e[r] === t) return !0;
                    return !1;
                  }),
                i)
              : null
            : i[0];
        }),
        (f.prototype.update = function(t, e) {
          if (t) {
            var i = this.getDefs(!1);
            if (t[this._domName] && i.contains(t[this._domName])) 'function' === typeof e && e(t);
            else {
              var r = this.add(t);
              r && (t[this._domName] = r);
            }
          }
        }),
        (f.prototype.addDom = function(t) {
          this.getDefs(!0).appendChild(t);
        }),
        (f.prototype.removeDom = function(t) {
          var e = this.getDefs(!1);
          e && t[this._domName] && (e.removeChild(t[this._domName]), (t[this._domName] = null));
        }),
        (f.prototype.getDoms = function() {
          var t = this.getDefs(!1);
          if (!t) return [];
          var e = [];
          return (
            n.each(this._tagNames, function(i) {
              var r = t.getElementsByTagName(i);
              e = e.concat([].slice.call(r));
            }),
            e
          );
        }),
        (f.prototype.markAllUnused = function() {
          var t = this.getDoms(),
            e = this;
          n.each(t, function(t) {
            t[e._markLabel] = '0';
          });
        }),
        (f.prototype.markUsed = function(t) {
          t && (t[this._markLabel] = '1');
        }),
        (f.prototype.removeUnused = function() {
          var t = this.getDefs(!1);
          if (t) {
            var e = this.getDoms(),
              i = this;
            n.each(e, function(e) {
              '1' !== e[i._markLabel] && t.removeChild(e);
            });
          }
        }),
        (f.prototype.getSvgProxy = function(t) {
          return t instanceof a ? l : t instanceof o ? u : t instanceof s ? c : l;
        }),
        (f.prototype.getTextSvgElement = function(t) {
          return t.__textSvgEl;
        }),
        (f.prototype.getSvgElement = function(t) {
          return t.__svgEl;
        });
      var d = f;
      t.exports = d;
    },
    33: function(t, e, i) {
      var r = i(150),
        n = i(2),
        a = i(122),
        o = i(670),
        s = i(380).prototype.getCanvasPattern,
        h = Math.abs,
        l = new a(!0);
      function u(t) {
        r.call(this, t), (this.path = null);
      }
      (u.prototype = {
        constructor: u,
        type: 'path',
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        segmentIgnoreThreshold: 0,
        subPixelOptimize: !1,
        brush: function(t, e) {
          var i,
            r = this.style,
            n = this.path || l,
            a = r.hasStroke(),
            o = r.hasFill(),
            h = r.fill,
            u = r.stroke,
            c = o && !!h.colorStops,
            f = a && !!u.colorStops,
            d = o && !!h.image,
            p = a && !!u.image;
          (r.bind(t, this, e), this.setTransform(t), this.__dirty) &&
            (c &&
              ((i = i || this.getBoundingRect()), (this._fillGradient = r.getGradient(t, h, i))),
            f &&
              ((i = i || this.getBoundingRect()), (this._strokeGradient = r.getGradient(t, u, i))));
          c ? (t.fillStyle = this._fillGradient) : d && (t.fillStyle = s.call(h, t)),
            f ? (t.strokeStyle = this._strokeGradient) : p && (t.strokeStyle = s.call(u, t));
          var v = r.lineDash,
            g = r.lineDashOffset,
            _ = !!t.setLineDash,
            m = this.getGlobalScale();
          if (
            (n.setScale(m[0], m[1], this.segmentIgnoreThreshold),
            this.__dirtyPath || (v && !_ && a)
              ? (n.beginPath(t),
                v && !_ && (n.setLineDash(v), n.setLineDashOffset(g)),
                this.buildPath(n, this.shape, !1),
                this.path && (this.__dirtyPath = !1))
              : (t.beginPath(), this.path.rebuildPath(t)),
            o)
          )
            if (null != r.fillOpacity) {
              var y = t.globalAlpha;
              (t.globalAlpha = r.fillOpacity * r.opacity), n.fill(t), (t.globalAlpha = y);
            } else n.fill(t);
          if ((v && _ && (t.setLineDash(v), (t.lineDashOffset = g)), a))
            if (null != r.strokeOpacity) {
              y = t.globalAlpha;
              (t.globalAlpha = r.strokeOpacity * r.opacity), n.stroke(t), (t.globalAlpha = y);
            } else n.stroke(t);
          v && _ && t.setLineDash([]),
            null != r.text &&
              (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
        },
        buildPath: function(t, e, i) {},
        createPathProxy: function() {
          this.path = new a();
        },
        getBoundingRect: function() {
          var t = this._rect,
            e = this.style,
            i = !t;
          if (i) {
            var r = this.path;
            r || (r = this.path = new a()),
              this.__dirtyPath && (r.beginPath(), this.buildPath(r, this.shape, !1)),
              (t = r.getBoundingRect());
          }
          if (((this._rect = t), e.hasStroke())) {
            var n = this._rectWithStroke || (this._rectWithStroke = t.clone());
            if (this.__dirty || i) {
              n.copy(t);
              var o = e.lineWidth,
                s = e.strokeNoScale ? this.getLineScale() : 1;
              e.hasFill() || (o = Math.max(o, this.strokeContainThreshold || 4)),
                s > 1e-10 &&
                  ((n.width += o / s), (n.height += o / s), (n.x -= o / s / 2), (n.y -= o / s / 2));
            }
            return n;
          }
          return t;
        },
        contain: function(t, e) {
          var i = this.transformCoordToLocal(t, e),
            r = this.getBoundingRect(),
            n = this.style;
          if (((t = i[0]), (e = i[1]), r.contain(t, e))) {
            var a = this.path.data;
            if (n.hasStroke()) {
              var s = n.lineWidth,
                h = n.strokeNoScale ? this.getLineScale() : 1;
              if (
                h > 1e-10 &&
                (n.hasFill() || (s = Math.max(s, this.strokeContainThreshold)),
                o.containStroke(a, s / h, t, e))
              )
                return !0;
            }
            if (n.hasFill()) return o.contain(a, t, e);
          }
          return !1;
        },
        dirty: function(t) {
          null == t && (t = !0),
            t && ((this.__dirtyPath = t), (this._rect = null)),
            (this.__dirty = this.__dirtyText = !0),
            this.__zr && this.__zr.refresh(),
            this.__clipTarget && this.__clipTarget.dirty();
        },
        animateShape: function(t) {
          return this.animate('shape', t);
        },
        attrKV: function(t, e) {
          'shape' === t
            ? (this.setShape(e), (this.__dirtyPath = !0), (this._rect = null))
            : r.prototype.attrKV.call(this, t, e);
        },
        setShape: function(t, e) {
          var i = this.shape;
          if (i) {
            if (n.isObject(t)) for (var r in t) t.hasOwnProperty(r) && (i[r] = t[r]);
            else i[t] = e;
            this.dirty(!0);
          }
          return this;
        },
        getLineScale: function() {
          var t = this.transform;
          return t && h(t[0] - 1) > 1e-10 && h(t[3] - 1) > 1e-10
            ? Math.sqrt(h(t[0] * t[3] - t[2] * t[1]))
            : 1;
        }
      }),
        (u.extend = function(t) {
          var e = function(e) {
            u.call(this, e), t.style && this.style.extendFrom(t.style, !1);
            var i = t.shape;
            if (i) {
              this.shape = this.shape || {};
              var r = this.shape;
              for (var n in i) !r.hasOwnProperty(n) && i.hasOwnProperty(n) && (r[n] = i[n]);
            }
            t.init && t.init.call(this, e);
          };
          for (var i in (n.inherits(e, u), t))
            'style' !== i && 'shape' !== i && (e.prototype[i] = t[i]);
          return e;
        }),
        n.inherits(u, r);
      var c = u;
      t.exports = c;
    },
    35: function(t, e) {
      var i =
        'object' === typeof wx && 'function' === typeof wx.getSystemInfoSync
          ? {
              browser: {},
              os: {},
              node: !1,
              wxa: !0,
              canvasSupported: !0,
              svgSupported: !1,
              touchEventsSupported: !0,
              domSupported: !1
            }
          : 'undefined' === typeof document && 'undefined' !== typeof self
          ? { browser: {}, os: {}, node: !1, worker: !0, canvasSupported: !0, domSupported: !1 }
          : 'undefined' === typeof navigator
          ? {
              browser: {},
              os: {},
              node: !0,
              worker: !1,
              canvasSupported: !0,
              svgSupported: !0,
              domSupported: !1
            }
          : (function(t) {
              var e = {},
                i = t.match(/Firefox\/([\d.]+)/),
                r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
                n = t.match(/Edge\/([\d.]+)/),
                a = /micromessenger/i.test(t);
              i && ((e.firefox = !0), (e.version = i[1]));
              r && ((e.ie = !0), (e.version = r[1]));
              n && ((e.edge = !0), (e.version = n[1]));
              a && (e.weChat = !0);
              return {
                browser: e,
                os: {},
                node: !1,
                canvasSupported: !!document.createElement('canvas').getContext,
                svgSupported: 'undefined' !== typeof SVGRect,
                touchEventsSupported: 'ontouchstart' in window && !e.ie && !e.edge,
                pointerEventsSupported:
                  'onpointerdown' in window && (e.edge || (e.ie && e.version >= 11)),
                domSupported: 'undefined' !== typeof document
              };
            })(navigator.userAgent);
      t.exports = i;
    },
    375: function(t, e) {
      var i = 2311;
      t.exports = function() {
        return i++;
      };
    },
    376: function(t, e, i) {
      var r = i(375),
        n = i(99),
        a = i(272),
        o = i(660),
        s = i(2),
        h = function(t) {
          a.call(this, t), n.call(this, t), o.call(this, t), (this.id = t.id || r());
        };
      (h.prototype = {
        type: 'element',
        name: '',
        __zr: null,
        ignore: !1,
        clipPath: null,
        isGroup: !1,
        drift: function(t, e) {
          switch (this.draggable) {
            case 'horizontal':
              e = 0;
              break;
            case 'vertical':
              t = 0;
          }
          var i = this.transform;
          i || (i = this.transform = [1, 0, 0, 1, 0, 0]),
            (i[4] += t),
            (i[5] += e),
            this.decomposeTransform(),
            this.dirty(!1);
        },
        beforeUpdate: function() {},
        afterUpdate: function() {},
        update: function() {
          this.updateTransform();
        },
        traverse: function(t, e) {},
        attrKV: function(t, e) {
          if ('position' === t || 'scale' === t || 'origin' === t) {
            if (e) {
              var i = this[t];
              i || (i = this[t] = []), (i[0] = e[0]), (i[1] = e[1]);
            }
          } else this[t] = e;
        },
        hide: function() {
          (this.ignore = !0), this.__zr && this.__zr.refresh();
        },
        show: function() {
          (this.ignore = !1), this.__zr && this.__zr.refresh();
        },
        attr: function(t, e) {
          if ('string' === typeof t) this.attrKV(t, e);
          else if (s.isObject(t)) for (var i in t) t.hasOwnProperty(i) && this.attrKV(i, t[i]);
          return this.dirty(!1), this;
        },
        setClipPath: function(t) {
          var e = this.__zr;
          e && t.addSelfToZr(e),
            this.clipPath && this.clipPath !== t && this.removeClipPath(),
            (this.clipPath = t),
            (t.__zr = e),
            (t.__clipTarget = this),
            this.dirty(!1);
        },
        removeClipPath: function() {
          var t = this.clipPath;
          t &&
            (t.__zr && t.removeSelfFromZr(t.__zr),
            (t.__zr = null),
            (t.__clipTarget = null),
            (this.clipPath = null),
            this.dirty(!1));
        },
        addSelfToZr: function(t) {
          this.__zr = t;
          var e = this.animators;
          if (e) for (var i = 0; i < e.length; i++) t.animation.addAnimator(e[i]);
          this.clipPath && this.clipPath.addSelfToZr(t);
        },
        removeSelfFromZr: function(t) {
          this.__zr = null;
          var e = this.animators;
          if (e) for (var i = 0; i < e.length; i++) t.animation.removeAnimator(e[i]);
          this.clipPath && this.clipPath.removeSelfFromZr(t);
        }
      }),
        s.mixin(h, o),
        s.mixin(h, a),
        s.mixin(h, n);
      var l = h;
      t.exports = l;
    },
    377: function(t, e, i) {
      var r = i(661),
        n = i(71),
        a = i(2).isArrayLike,
        o = Array.prototype.slice;
      function s(t, e) {
        return t[e];
      }
      function h(t, e, i) {
        t[e] = i;
      }
      function l(t, e, i) {
        return (e - t) * i + t;
      }
      function u(t, e, i) {
        return i > 0.5 ? e : t;
      }
      function c(t, e, i, r, n) {
        var a = t.length;
        if (1 === n) for (var o = 0; o < a; o++) r[o] = l(t[o], e[o], i);
        else {
          var s = a && t[0].length;
          for (o = 0; o < a; o++) for (var h = 0; h < s; h++) r[o][h] = l(t[o][h], e[o][h], i);
        }
      }
      function f(t, e, i) {
        var r = t.length,
          n = e.length;
        if (r !== n)
          if (r > n) t.length = n;
          else for (var a = r; a < n; a++) t.push(1 === i ? e[a] : o.call(e[a]));
        var s = t[0] && t[0].length;
        for (a = 0; a < t.length; a++)
          if (1 === i) isNaN(t[a]) && (t[a] = e[a]);
          else for (var h = 0; h < s; h++) isNaN(t[a][h]) && (t[a][h] = e[a][h]);
      }
      function d(t, e, i) {
        if (t === e) return !0;
        var r = t.length;
        if (r !== e.length) return !1;
        if (1 === i) {
          for (var n = 0; n < r; n++) if (t[n] !== e[n]) return !1;
        } else {
          var a = t[0].length;
          for (n = 0; n < r; n++) for (var o = 0; o < a; o++) if (t[n][o] !== e[n][o]) return !1;
        }
        return !0;
      }
      function p(t, e, i, r, n, a, o, s, h) {
        var l = t.length;
        if (1 === h) for (var u = 0; u < l; u++) s[u] = v(t[u], e[u], i[u], r[u], n, a, o);
        else {
          var c = t[0].length;
          for (u = 0; u < l; u++)
            for (var f = 0; f < c; f++) s[u][f] = v(t[u][f], e[u][f], i[u][f], r[u][f], n, a, o);
        }
      }
      function v(t, e, i, r, n, a, o) {
        var s = 0.5 * (i - t),
          h = 0.5 * (r - e);
        return (2 * (e - i) + s + h) * o + (-3 * (e - i) - 2 * s - h) * a + s * n + e;
      }
      function g(t) {
        if (a(t)) {
          var e = t.length;
          if (a(t[0])) {
            for (var i = [], r = 0; r < e; r++) i.push(o.call(t[r]));
            return i;
          }
          return o.call(t);
        }
        return t;
      }
      function _(t) {
        return (
          (t[0] = Math.floor(t[0])),
          (t[1] = Math.floor(t[1])),
          (t[2] = Math.floor(t[2])),
          'rgba(' + t.join(',') + ')'
        );
      }
      function m(t, e, i, o, s, h) {
        var g = t._getter,
          m = t._setter,
          y = 'spline' === e,
          x = o.length;
        if (x) {
          var w,
            b = o[0].value,
            T = a(b),
            k = !1,
            S = !1,
            A = T
              ? (function(t) {
                  var e = t[t.length - 1].value;
                  return a(e && e[0]) ? 2 : 1;
                })(o)
              : 0;
          o.sort(function(t, e) {
            return t.time - e.time;
          }),
            (w = o[x - 1].time);
          for (var C = [], P = [], M = o[0].value, L = !0, z = 0; z < x; z++) {
            C.push(o[z].time / w);
            var D = o[z].value;
            if (
              ((T && d(D, M, A)) || (!T && D === M) || (L = !1), (M = D), 'string' === typeof D)
            ) {
              var B = n.parse(D);
              B ? ((D = B), (k = !0)) : (S = !0);
            }
            P.push(D);
          }
          if (h || !L) {
            var R = P[x - 1];
            for (z = 0; z < x - 1; z++)
              T ? f(P[z], R, A) : !isNaN(P[z]) || isNaN(R) || S || k || (P[z] = R);
            T && f(g(t._target, s), R, A);
            var O,
              E,
              I,
              F,
              H,
              N = 0,
              W = 0;
            if (k) var q = [0, 0, 0, 0];
            var V = new r({
              target: t._target,
              life: w,
              loop: t._loop,
              delay: t._delay,
              onframe: function(t, e) {
                var i;
                if (e < 0) i = 0;
                else if (e < W) {
                  for (i = Math.min(N + 1, x - 1); i >= 0 && !(C[i] <= e); i--);
                  i = Math.min(i, x - 2);
                } else {
                  for (i = N; i < x && !(C[i] > e); i++);
                  i = Math.min(i - 1, x - 2);
                }
                (N = i), (W = e);
                var r = C[i + 1] - C[i];
                if (0 !== r)
                  if (((O = (e - C[i]) / r), y))
                    if (
                      ((I = P[i]),
                      (E = P[0 === i ? i : i - 1]),
                      (F = P[i > x - 2 ? x - 1 : i + 1]),
                      (H = P[i > x - 3 ? x - 1 : i + 2]),
                      T)
                    )
                      p(E, I, F, H, O, O * O, O * O * O, g(t, s), A);
                    else {
                      if (k) (n = p(E, I, F, H, O, O * O, O * O * O, q, 1)), (n = _(q));
                      else {
                        if (S) return u(I, F, O);
                        n = v(E, I, F, H, O, O * O, O * O * O);
                      }
                      m(t, s, n);
                    }
                  else if (T) c(P[i], P[i + 1], O, g(t, s), A);
                  else {
                    var n;
                    if (k) c(P[i], P[i + 1], O, q, 1), (n = _(q));
                    else {
                      if (S) return u(P[i], P[i + 1], O);
                      n = l(P[i], P[i + 1], O);
                    }
                    m(t, s, n);
                  }
              },
              ondestroy: i
            });
            return e && 'spline' !== e && (V.easing = e), V;
          }
        }
      }
      var y = function(t, e, i, r) {
        (this._tracks = {}),
          (this._target = t),
          (this._loop = e || !1),
          (this._getter = i || s),
          (this._setter = r || h),
          (this._clipCount = 0),
          (this._delay = 0),
          (this._doneList = []),
          (this._onframeList = []),
          (this._clipList = []);
      };
      y.prototype = {
        when: function(t, e) {
          var i = this._tracks;
          for (var r in e)
            if (e.hasOwnProperty(r)) {
              if (!i[r]) {
                i[r] = [];
                var n = this._getter(this._target, r);
                if (null == n) continue;
                0 !== t && i[r].push({ time: 0, value: g(n) });
              }
              i[r].push({ time: t, value: e[r] });
            }
          return this;
        },
        during: function(t) {
          return this._onframeList.push(t), this;
        },
        pause: function() {
          for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
          this._paused = !0;
        },
        resume: function() {
          for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
          this._paused = !1;
        },
        isPaused: function() {
          return !!this._paused;
        },
        _doneCallback: function() {
          (this._tracks = {}), (this._clipList.length = 0);
          for (var t = this._doneList, e = t.length, i = 0; i < e; i++) t[i].call(this);
        },
        start: function(t, e) {
          var i,
            r = this,
            n = 0,
            a = function() {
              --n || r._doneCallback();
            };
          for (var o in this._tracks)
            if (this._tracks.hasOwnProperty(o)) {
              var s = m(this, t, a, this._tracks[o], o, e);
              s &&
                (this._clipList.push(s), n++, this.animation && this.animation.addClip(s), (i = s));
            }
          if (i) {
            var h = i.onframe;
            i.onframe = function(t, e) {
              h(t, e);
              for (var i = 0; i < r._onframeList.length; i++) r._onframeList[i](t, e);
            };
          }
          return n || this._doneCallback(), this;
        },
        stop: function(t) {
          for (var e = this._clipList, i = this.animation, r = 0; r < e.length; r++) {
            var n = e[r];
            t && n.onframe(this._target, 1), i && i.removeClip(n);
          }
          e.length = 0;
        },
        delay: function(t) {
          return (this._delay = t), this;
        },
        done: function(t) {
          return t && this._doneList.push(t), this;
        },
        getClips: function() {
          return this._clipList;
        }
      };
      var x = y;
      t.exports = x;
    },
    378: function(t, e) {
      var i = function() {
          (this.head = null), (this.tail = null), (this._len = 0);
        },
        r = i.prototype;
      (r.insert = function(t) {
        var e = new n(t);
        return this.insertEntry(e), e;
      }),
        (r.insertEntry = function(t) {
          this.head
            ? ((this.tail.next = t), (t.prev = this.tail), (t.next = null), (this.tail = t))
            : (this.head = this.tail = t),
            this._len++;
        }),
        (r.remove = function(t) {
          var e = t.prev,
            i = t.next;
          e ? (e.next = i) : (this.head = i),
            i ? (i.prev = e) : (this.tail = e),
            (t.next = t.prev = null),
            this._len--;
        }),
        (r.len = function() {
          return this._len;
        }),
        (r.clear = function() {
          (this.head = this.tail = null), (this._len = 0);
        });
      var n = function(t) {
          (this.value = t), this.next, this.prev;
        },
        a = function(t) {
          (this._list = new i()),
            (this._map = {}),
            (this._maxSize = t || 10),
            (this._lastRemovedEntry = null);
        },
        o = a.prototype;
      (o.put = function(t, e) {
        var i = this._list,
          r = this._map,
          a = null;
        if (null == r[t]) {
          var o = i.len(),
            s = this._lastRemovedEntry;
          if (o >= this._maxSize && o > 0) {
            var h = i.head;
            i.remove(h), delete r[h.key], (a = h.value), (this._lastRemovedEntry = h);
          }
          s ? (s.value = e) : (s = new n(e)), (s.key = t), i.insertEntry(s), (r[t] = s);
        }
        return a;
      }),
        (o.get = function(t) {
          var e = this._map[t],
            i = this._list;
          if (null != e) return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
        }),
        (o.clear = function() {
          this._list.clear(), (this._map = {});
        });
      var s = a;
      t.exports = s;
    },
    379: function(t, e) {
      var i = {
        shadowBlur: 1,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        textShadowBlur: 1,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
        textBoxShadowBlur: 1,
        textBoxShadowOffsetX: 1,
        textBoxShadowOffsetY: 1
      };
      t.exports = function(t, e, r) {
        return i.hasOwnProperty(e) ? r * t.dpr : r;
      };
    },
    380: function(t, e) {
      var i = function(t, e) {
        (this.image = t), (this.repeat = e), (this.type = 'pattern');
      };
      i.prototype.getCanvasPattern = function(t) {
        return t.createPattern(this.image, this.repeat || 'repeat');
      };
      var r = i;
      t.exports = r;
    },
    381: function(t, e) {
      var i =
        ('undefined' !== typeof window &&
          ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window)) ||
            (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window)) ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame)) ||
        function(t) {
          setTimeout(t, 16);
        };
      t.exports = i;
    },
    382: function(t, e, i) {
      var r = i(189),
        n = i(29),
        a = i(188).WILL_BE_RESTORED,
        o = new n(),
        s = function() {};
      s.prototype = {
        constructor: s,
        drawRectText: function(t, e) {
          var i = this.style;
          (e = i.textRect || e), this.__dirty && r.normalizeTextStyle(i, !0);
          var n = i.text;
          if ((null != n && (n += ''), r.needDrawText(n, i))) {
            t.save();
            var s = this.transform;
            i.transformText ? this.setTransform(t) : s && (o.copy(e), o.applyTransform(s), (e = o)),
              r.renderText(this, t, n, i, e, a),
              t.restore();
          }
        }
      };
      var h = s;
      t.exports = h;
    },
    383: function(t, e) {
      e.buildPath = function(t, e) {
        var i,
          r,
          n,
          a,
          o,
          s = e.x,
          h = e.y,
          l = e.width,
          u = e.height,
          c = e.r;
        l < 0 && ((s += l), (l = -l)),
          u < 0 && ((h += u), (u = -u)),
          'number' === typeof c
            ? (i = r = n = a = c)
            : c instanceof Array
            ? 1 === c.length
              ? (i = r = n = a = c[0])
              : 2 === c.length
              ? ((i = n = c[0]), (r = a = c[1]))
              : 3 === c.length
              ? ((i = c[0]), (r = a = c[1]), (n = c[2]))
              : ((i = c[0]), (r = c[1]), (n = c[2]), (a = c[3]))
            : (i = r = n = a = 0),
          i + r > l && ((i *= l / (o = i + r)), (r *= l / o)),
          n + a > l && ((n *= l / (o = n + a)), (a *= l / o)),
          r + n > u && ((r *= u / (o = r + n)), (n *= u / o)),
          i + a > u && ((i *= u / (o = i + a)), (a *= u / o)),
          t.moveTo(s + i, h),
          t.lineTo(s + l - r, h),
          0 !== r && t.arc(s + l - r, h + r, r, -Math.PI / 2, 0),
          t.lineTo(s + l, h + u - n),
          0 !== n && t.arc(s + l - n, h + u - n, n, 0, Math.PI / 2),
          t.lineTo(s + a, h + u),
          0 !== a && t.arc(s + a, h + u - a, a, Math.PI / 2, Math.PI),
          t.lineTo(s, h + i),
          0 !== i && t.arc(s + i, h + i, i, Math.PI, 1.5 * Math.PI);
      };
    },
    385: function(t, e, i) {
      var r = i(33),
        n = i(122),
        a = i(673),
        o = Math.sqrt,
        s = Math.sin,
        h = Math.cos,
        l = Math.PI,
        u = function(t) {
          return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
        },
        c = function(t, e) {
          return (t[0] * e[0] + t[1] * e[1]) / (u(t) * u(e));
        },
        f = function(t, e) {
          return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(c(t, e));
        };
      function d(t, e, i, r, n, a, u, d, p, v, g) {
        var _ = p * (l / 180),
          m = (h(_) * (t - i)) / 2 + (s(_) * (e - r)) / 2,
          y = (-1 * s(_) * (t - i)) / 2 + (h(_) * (e - r)) / 2,
          x = (m * m) / (u * u) + (y * y) / (d * d);
        x > 1 && ((u *= o(x)), (d *= o(x)));
        var w =
            (n === a ? -1 : 1) *
              o(
                (u * u * (d * d) - u * u * (y * y) - d * d * (m * m)) /
                  (u * u * (y * y) + d * d * (m * m))
              ) || 0,
          b = (w * u * y) / d,
          T = (w * -d * m) / u,
          k = (t + i) / 2 + h(_) * b - s(_) * T,
          S = (e + r) / 2 + s(_) * b + h(_) * T,
          A = f([1, 0], [(m - b) / u, (y - T) / d]),
          C = [(m - b) / u, (y - T) / d],
          P = [(-1 * m - b) / u, (-1 * y - T) / d],
          M = f(C, P);
        c(C, P) <= -1 && (M = l),
          c(C, P) >= 1 && (M = 0),
          0 === a && M > 0 && (M -= 2 * l),
          1 === a && M < 0 && (M += 2 * l),
          g.addData(v, k, S, u, d, A, M, _, a);
      }
      var p = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
        v = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
      function g(t, e) {
        var i = (function(t) {
          if (!t) return new n();
          for (
            var e, i = 0, r = 0, a = i, o = r, s = new n(), h = n.CMD, l = t.match(p), u = 0;
            u < l.length;
            u++
          ) {
            for (
              var c, f = l[u], g = f.charAt(0), _ = f.match(v) || [], m = _.length, y = 0;
              y < m;
              y++
            )
              _[y] = parseFloat(_[y]);
            for (var x = 0; x < m; ) {
              var w,
                b,
                T,
                k,
                S,
                A,
                C,
                P = i,
                M = r;
              switch (g) {
                case 'l':
                  (i += _[x++]), (r += _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'L':
                  (i = _[x++]), (r = _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'm':
                  (i += _[x++]),
                    (r += _[x++]),
                    (c = h.M),
                    s.addData(c, i, r),
                    (a = i),
                    (o = r),
                    (g = 'l');
                  break;
                case 'M':
                  (i = _[x++]),
                    (r = _[x++]),
                    (c = h.M),
                    s.addData(c, i, r),
                    (a = i),
                    (o = r),
                    (g = 'L');
                  break;
                case 'h':
                  (i += _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'H':
                  (i = _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'v':
                  (r += _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'V':
                  (r = _[x++]), (c = h.L), s.addData(c, i, r);
                  break;
                case 'C':
                  (c = h.C),
                    s.addData(c, _[x++], _[x++], _[x++], _[x++], _[x++], _[x++]),
                    (i = _[x - 2]),
                    (r = _[x - 1]);
                  break;
                case 'c':
                  (c = h.C),
                    s.addData(
                      c,
                      _[x++] + i,
                      _[x++] + r,
                      _[x++] + i,
                      _[x++] + r,
                      _[x++] + i,
                      _[x++] + r
                    ),
                    (i += _[x - 2]),
                    (r += _[x - 1]);
                  break;
                case 'S':
                  (w = i), (b = r);
                  var L = s.len(),
                    z = s.data;
                  e === h.C && ((w += i - z[L - 4]), (b += r - z[L - 3])),
                    (c = h.C),
                    (P = _[x++]),
                    (M = _[x++]),
                    (i = _[x++]),
                    (r = _[x++]),
                    s.addData(c, w, b, P, M, i, r);
                  break;
                case 's':
                  (w = i), (b = r);
                  (L = s.len()), (z = s.data);
                  e === h.C && ((w += i - z[L - 4]), (b += r - z[L - 3])),
                    (c = h.C),
                    (P = i + _[x++]),
                    (M = r + _[x++]),
                    (i += _[x++]),
                    (r += _[x++]),
                    s.addData(c, w, b, P, M, i, r);
                  break;
                case 'Q':
                  (P = _[x++]),
                    (M = _[x++]),
                    (i = _[x++]),
                    (r = _[x++]),
                    (c = h.Q),
                    s.addData(c, P, M, i, r);
                  break;
                case 'q':
                  (P = _[x++] + i),
                    (M = _[x++] + r),
                    (i += _[x++]),
                    (r += _[x++]),
                    (c = h.Q),
                    s.addData(c, P, M, i, r);
                  break;
                case 'T':
                  (w = i), (b = r);
                  (L = s.len()), (z = s.data);
                  e === h.Q && ((w += i - z[L - 4]), (b += r - z[L - 3])),
                    (i = _[x++]),
                    (r = _[x++]),
                    (c = h.Q),
                    s.addData(c, w, b, i, r);
                  break;
                case 't':
                  (w = i), (b = r);
                  (L = s.len()), (z = s.data);
                  e === h.Q && ((w += i - z[L - 4]), (b += r - z[L - 3])),
                    (i += _[x++]),
                    (r += _[x++]),
                    (c = h.Q),
                    s.addData(c, w, b, i, r);
                  break;
                case 'A':
                  (T = _[x++]),
                    (k = _[x++]),
                    (S = _[x++]),
                    (A = _[x++]),
                    (C = _[x++]),
                    d((P = i), (M = r), (i = _[x++]), (r = _[x++]), A, C, T, k, S, (c = h.A), s);
                  break;
                case 'a':
                  (T = _[x++]),
                    (k = _[x++]),
                    (S = _[x++]),
                    (A = _[x++]),
                    (C = _[x++]),
                    d((P = i), (M = r), (i += _[x++]), (r += _[x++]), A, C, T, k, S, (c = h.A), s);
              }
            }
            ('z' !== g && 'Z' !== g) || ((c = h.Z), s.addData(c), (i = a), (r = o)), (e = c);
          }
          return s.toStatic(), s;
        })(t);
        return (
          ((e = e || {}).buildPath = function(t) {
            if (t.setData) {
              t.setData(i.data), (e = t.getContext()) && t.rebuildPath(e);
            } else {
              var e = t;
              i.rebuildPath(e);
            }
          }),
          (e.applyTransform = function(t) {
            a(i, t), this.dirty(!0);
          }),
          e
        );
      }
      (e.createFromString = function(t, e) {
        return new r(g(t, e));
      }),
        (e.extendFromString = function(t, e) {
          return r.extend(g(t, e));
        }),
        (e.mergePath = function(t, e) {
          for (var i = [], n = t.length, a = 0; a < n; a++) {
            var o = t[a];
            o.path || o.createPathProxy(),
              o.__dirtyPath && o.buildPath(o.path, o.shape, !0),
              i.push(o.path);
          }
          var s = new r(e);
          return (
            s.createPathProxy(),
            (s.buildPath = function(t) {
              t.appendPath(i);
              var e = t.getContext();
              e && t.rebuildPath(e);
            }),
            s
          );
        });
    },
    386: function(t, e) {
      e.containStroke = function(t, e, i, r, n, a, o) {
        if (0 === n) return !1;
        var s = n,
          h = 0;
        if (
          (o > e + s && o > r + s) ||
          (o < e - s && o < r - s) ||
          (a > t + s && a > i + s) ||
          (a < t - s && a < i - s)
        )
          return !1;
        if (t === i) return Math.abs(a - t) <= s / 2;
        var l = (h = (e - r) / (t - i)) * a - o + (t * r - i * e) / (t - i);
        return (l * l) / (h * h + 1) <= ((s / 2) * s) / 2;
      };
    },
    387: function(t, e, i) {
      var r = i(85).quadraticProjectPoint;
      e.containStroke = function(t, e, i, n, a, o, s, h, l) {
        if (0 === s) return !1;
        var u = s;
        return (
          !(
            (l > e + u && l > n + u && l > o + u) ||
            (l < e - u && l < n - u && l < o - u) ||
            (h > t + u && h > i + u && h > a + u) ||
            (h < t - u && h < i - u && h < a - u)
          ) && r(t, e, i, n, a, o, h, l, null) <= u / 2
        );
      };
    },
    388: function(t, e) {
      var i = 2 * Math.PI;
      e.normalizeRadian = function(t) {
        return (t %= i) < 0 && (t += i), t;
      };
    },
    389: function(t, e) {
      t.exports = function(t, e, i, r, n, a) {
        if ((a > e && a > r) || (a < e && a < r)) return 0;
        if (r === e) return 0;
        var o = r < e ? 1 : -1,
          s = (a - e) / (r - e);
        (1 !== s && 0 !== s) || (o = r < e ? 0.5 : -0.5);
        var h = s * (i - t) + t;
        return h === n ? 1 / 0 : h > n ? o : 0;
      };
    },
    390: function(t, e, i) {
      var r = i(33).extend({
        type: 'circle',
        shape: { cx: 0, cy: 0, r: 0 },
        buildPath: function(t, e, i) {
          i && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
        }
      });
      t.exports = r;
    },
    391: function(t, e, i) {
      var r = i(35),
        n = [
          ['shadowBlur', 0],
          ['shadowColor', '#000'],
          ['shadowOffsetX', 0],
          ['shadowOffsetY', 0]
        ];
      t.exports = function(t) {
        return r.browser.ie && r.browser.version >= 11
          ? function() {
              var e,
                i = this.__clipPaths,
                r = this.style;
              if (i)
                for (var a = 0; a < i.length; a++) {
                  var o = i[a],
                    s = o && o.shape,
                    h = o && o.type;
                  if (
                    s &&
                    (('sector' === h && s.startAngle === s.endAngle) ||
                      ('rect' === h && (!s.width || !s.height)))
                  ) {
                    for (var l = 0; l < n.length; l++)
                      (n[l][2] = r[n[l][0]]), (r[n[l][0]] = n[l][1]);
                    e = !0;
                    break;
                  }
                }
              if ((t.apply(this, arguments), e))
                for (l = 0; l < n.length; l++) r[n[l][0]] = n[l][2];
            }
          : t;
      };
    },
    392: function(t, e, i) {
      var r = i(33),
        n = i(393),
        a = r.extend({
          type: 'polygon',
          shape: { points: null, smooth: !1, smoothConstraint: null },
          buildPath: function(t, e) {
            n.buildPath(t, e, !0);
          }
        });
      t.exports = a;
    },
    393: function(t, e, i) {
      var r = i(676),
        n = i(677);
      e.buildPath = function(t, e, i) {
        var a = e.points,
          o = e.smooth;
        if (a && a.length >= 2) {
          if (o && 'spline' !== o) {
            var s = n(a, o, i, e.smoothConstraint);
            t.moveTo(a[0][0], a[0][1]);
            for (var h = a.length, l = 0; l < (i ? h : h - 1); l++) {
              var u = s[2 * l],
                c = s[2 * l + 1],
                f = a[(l + 1) % h];
              t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1]);
            }
          } else {
            'spline' === o && (a = r(a, i)), t.moveTo(a[0][0], a[0][1]);
            l = 1;
            for (var d = a.length; l < d; l++) t.lineTo(a[l][0], a[l][1]);
          }
          i && t.closePath();
        }
      };
    },
    394: function(t, e, i) {
      var r = i(33),
        n = i(393),
        a = r.extend({
          type: 'polyline',
          shape: { points: null, smooth: !1, smoothConstraint: null },
          style: { stroke: '#000', fill: null },
          buildPath: function(t, e) {
            n.buildPath(t, e, !1);
          }
        });
      t.exports = a;
    },
    395: function(t, e, i) {
      var r = i(33),
        n = i(277).subPixelOptimizeLine,
        a = {},
        o = r.extend({
          type: 'line',
          shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1 },
          style: { stroke: '#000', fill: null },
          buildPath: function(t, e) {
            var i, r, o, s;
            this.subPixelOptimize
              ? (n(a, e, this.style), (i = a.x1), (r = a.y1), (o = a.x2), (s = a.y2))
              : ((i = e.x1), (r = e.y1), (o = e.x2), (s = e.y2));
            var h = e.percent;
            0 !== h &&
              (t.moveTo(i, r),
              h < 1 && ((o = i * (1 - h) + o * h), (s = r * (1 - h) + s * h)),
              t.lineTo(o, s));
          },
          pointAt: function(t) {
            var e = this.shape;
            return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];
          }
        });
      t.exports = o;
    },
    399: function(t, e, i) {
      var r = i(119),
        n = i(120),
        a = i(100),
        o = i(390),
        s = i(276),
        h = i(695),
        l = i(395),
        u = i(33),
        c = i(392),
        f = i(394),
        d = i(278),
        p = i(274),
        v = i(44),
        g = i(385).createFromString,
        _ = i(2),
        m = _.isString,
        y = _.extend,
        x = _.defaults,
        w = _.trim,
        b = _.each,
        T = /[\s,]+/;
      function k(t) {
        m(t) && (t = new DOMParser().parseFromString(t, 'text/xml'));
        for (
          9 === t.nodeType && (t = t.firstChild);
          'svg' !== t.nodeName.toLowerCase() || 1 !== t.nodeType;

        )
          t = t.nextSibling;
        return t;
      }
      function S() {
        (this._defs = {}), (this._root = null), (this._isDefine = !1), (this._isText = !1);
      }
      (S.prototype.parse = function(t, e) {
        e = e || {};
        var i = k(t);
        if (!i) throw new Error('Illegal svg');
        var n = new r();
        this._root = n;
        var a = i.getAttribute('viewBox') || '',
          o = parseFloat(i.getAttribute('width') || e.width),
          h = parseFloat(i.getAttribute('height') || e.height);
        isNaN(o) && (o = null), isNaN(h) && (h = null), z(i, n, null, !0);
        for (var l, u, c = i.firstChild; c; ) this._parseNode(c, n), (c = c.nextSibling);
        if (a) {
          var f = w(a).split(T);
          f.length >= 4 &&
            (l = {
              x: parseFloat(f[0] || 0),
              y: parseFloat(f[1] || 0),
              width: parseFloat(f[2]),
              height: parseFloat(f[3])
            });
        }
        if (l && null != o && null != h && ((u = E(l, o, h)), !e.ignoreViewBox)) {
          var d = n;
          (n = new r()).add(d), (d.scale = u.scale.slice()), (d.position = u.position.slice());
        }
        return (
          e.ignoreRootClip ||
            null == o ||
            null == h ||
            n.setClipPath(new s({ shape: { x: 0, y: 0, width: o, height: h } })),
          { root: n, width: o, height: h, viewBoxRect: l, viewBoxTransform: u }
        );
      }),
        (S.prototype._parseNode = function(t, e) {
          var i,
            r,
            n = t.nodeName.toLowerCase();
          if (
            ('defs' === n ? (this._isDefine = !0) : 'text' === n && (this._isText = !0),
            this._isDefine)
          ) {
            if ((r = C[n])) {
              var a = r.call(this, t),
                o = t.getAttribute('id');
              o && (this._defs[o] = a);
            }
          } else (r = A[n]) && ((i = r.call(this, t, e)), e.add(i));
          for (var s = t.firstChild; s; )
            1 === s.nodeType && this._parseNode(s, i),
              3 === s.nodeType && this._isText && this._parseText(s, i),
              (s = s.nextSibling);
          'defs' === n ? (this._isDefine = !1) : 'text' === n && (this._isText = !1);
        }),
        (S.prototype._parseText = function(t, e) {
          if (1 === t.nodeType) {
            var i = t.getAttribute('dx') || 0,
              r = t.getAttribute('dy') || 0;
            (this._textX += parseFloat(i)), (this._textY += parseFloat(r));
          }
          var n = new a({
            style: { text: t.textContent, transformText: !0 },
            position: [this._textX || 0, this._textY || 0]
          });
          P(e, n), z(t, n, this._defs);
          var o = n.style.fontSize;
          o &&
            o < 9 &&
            ((n.style.fontSize = 9),
            (n.scale = n.scale || [1, 1]),
            (n.scale[0] *= o / 9),
            (n.scale[1] *= o / 9));
          var s = n.getBoundingRect();
          return (this._textX += s.width), e.add(n), n;
        });
      var A = {
          g: function(t, e) {
            var i = new r();
            return P(e, i), z(t, i, this._defs), i;
          },
          rect: function(t, e) {
            var i = new s();
            return (
              P(e, i),
              z(t, i, this._defs),
              i.setShape({
                x: parseFloat(t.getAttribute('x') || 0),
                y: parseFloat(t.getAttribute('y') || 0),
                width: parseFloat(t.getAttribute('width') || 0),
                height: parseFloat(t.getAttribute('height') || 0)
              }),
              i
            );
          },
          circle: function(t, e) {
            var i = new o();
            return (
              P(e, i),
              z(t, i, this._defs),
              i.setShape({
                cx: parseFloat(t.getAttribute('cx') || 0),
                cy: parseFloat(t.getAttribute('cy') || 0),
                r: parseFloat(t.getAttribute('r') || 0)
              }),
              i
            );
          },
          line: function(t, e) {
            var i = new l();
            return (
              P(e, i),
              z(t, i, this._defs),
              i.setShape({
                x1: parseFloat(t.getAttribute('x1') || 0),
                y1: parseFloat(t.getAttribute('y1') || 0),
                x2: parseFloat(t.getAttribute('x2') || 0),
                y2: parseFloat(t.getAttribute('y2') || 0)
              }),
              i
            );
          },
          ellipse: function(t, e) {
            var i = new h();
            return (
              P(e, i),
              z(t, i, this._defs),
              i.setShape({
                cx: parseFloat(t.getAttribute('cx') || 0),
                cy: parseFloat(t.getAttribute('cy') || 0),
                rx: parseFloat(t.getAttribute('rx') || 0),
                ry: parseFloat(t.getAttribute('ry') || 0)
              }),
              i
            );
          },
          polygon: function(t, e) {
            var i = t.getAttribute('points');
            i && (i = M(i));
            var r = new c({ shape: { points: i || [] } });
            return P(e, r), z(t, r, this._defs), r;
          },
          polyline: function(t, e) {
            var i = new u();
            P(e, i), z(t, i, this._defs);
            var r = t.getAttribute('points');
            r && (r = M(r));
            var n = new f({ shape: { points: r || [] } });
            return n;
          },
          image: function(t, e) {
            var i = new n();
            return (
              P(e, i),
              z(t, i, this._defs),
              i.setStyle({
                image: t.getAttribute('xlink:href'),
                x: t.getAttribute('x'),
                y: t.getAttribute('y'),
                width: t.getAttribute('width'),
                height: t.getAttribute('height')
              }),
              i
            );
          },
          text: function(t, e) {
            var i = t.getAttribute('x') || 0,
              n = t.getAttribute('y') || 0,
              a = t.getAttribute('dx') || 0,
              o = t.getAttribute('dy') || 0;
            (this._textX = parseFloat(i) + parseFloat(a)),
              (this._textY = parseFloat(n) + parseFloat(o));
            var s = new r();
            return P(e, s), z(t, s, this._defs), s;
          },
          tspan: function(t, e) {
            var i = t.getAttribute('x'),
              n = t.getAttribute('y');
            null != i && (this._textX = parseFloat(i)), null != n && (this._textY = parseFloat(n));
            var a = t.getAttribute('dx') || 0,
              o = t.getAttribute('dy') || 0,
              s = new r();
            return P(e, s), z(t, s, this._defs), (this._textX += a), (this._textY += o), s;
          },
          path: function(t, e) {
            var i = t.getAttribute('d') || '',
              r = g(i);
            return P(e, r), z(t, r, this._defs), r;
          }
        },
        C = {
          lineargradient: function(t) {
            var e = parseInt(t.getAttribute('x1') || 0, 10),
              i = parseInt(t.getAttribute('y1') || 0, 10),
              r = parseInt(t.getAttribute('x2') || 10, 10),
              n = parseInt(t.getAttribute('y2') || 0, 10),
              a = new d(e, i, r, n);
            return (
              (function(t, e) {
                var i = t.firstChild;
                for (; i; ) {
                  if (1 === i.nodeType) {
                    var r = i.getAttribute('offset');
                    r = r.indexOf('%') > 0 ? parseInt(r, 10) / 100 : r ? parseFloat(r) : 0;
                    var n = i.getAttribute('stop-color') || '#000000';
                    e.addColorStop(r, n);
                  }
                  i = i.nextSibling;
                }
              })(t, a),
              a
            );
          },
          radialgradient: function(t) {}
        };
      function P(t, e) {
        t &&
          t.__inheritedStyle &&
          (e.__inheritedStyle || (e.__inheritedStyle = {}),
          x(e.__inheritedStyle, t.__inheritedStyle));
      }
      function M(t) {
        for (var e = w(t).split(T), i = [], r = 0; r < e.length; r += 2) {
          var n = parseFloat(e[r]),
            a = parseFloat(e[r + 1]);
          i.push([n, a]);
        }
        return i;
      }
      var L = {
        fill: 'fill',
        stroke: 'stroke',
        'stroke-width': 'lineWidth',
        opacity: 'opacity',
        'fill-opacity': 'fillOpacity',
        'stroke-opacity': 'strokeOpacity',
        'stroke-dasharray': 'lineDash',
        'stroke-dashoffset': 'lineDashOffset',
        'stroke-linecap': 'lineCap',
        'stroke-linejoin': 'lineJoin',
        'stroke-miterlimit': 'miterLimit',
        'font-family': 'fontFamily',
        'font-size': 'fontSize',
        'font-style': 'fontStyle',
        'font-weight': 'fontWeight',
        'text-align': 'textAlign',
        'alignment-baseline': 'textBaseline'
      };
      function z(t, e, i, r) {
        var n = e.__inheritedStyle || {},
          a = 'text' === e.type;
        if (
          1 === t.nodeType &&
          ((function(t, e) {
            var i = t.getAttribute('transform');
            if (i) {
              i = i.replace(/,/g, ' ');
              var r = null,
                n = [];
              i.replace(R, function(t, e, i) {
                n.push(e, i);
              });
              for (var a = n.length - 1; a > 0; a -= 2) {
                var o = n[a],
                  s = n[a - 1];
                switch (((r = r || v.create()), s)) {
                  case 'translate':
                    (o = w(o).split(T)),
                      v.translate(r, r, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
                    break;
                  case 'scale':
                    (o = w(o).split(T)),
                      v.scale(r, r, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
                    break;
                  case 'rotate':
                    (o = w(o).split(T)), v.rotate(r, r, parseFloat(o[0]));
                    break;
                  case 'skew':
                    (o = w(o).split(T)), console.warn('Skew transform is not supported yet');
                    break;
                  case 'matrix':
                    o = w(o).split(T);
                    (r[0] = parseFloat(o[0])),
                      (r[1] = parseFloat(o[1])),
                      (r[2] = parseFloat(o[2])),
                      (r[3] = parseFloat(o[3])),
                      (r[4] = parseFloat(o[4])),
                      (r[5] = parseFloat(o[5]));
                }
              }
              e.setLocalTransform(r);
            }
          })(t, e),
          y(
            n,
            (function(t) {
              var e = t.getAttribute('style'),
                i = {};
              if (!e) return i;
              var r,
                n = {};
              O.lastIndex = 0;
              for (; null != (r = O.exec(e)); ) n[r[1]] = r[2];
              for (var a in L) L.hasOwnProperty(a) && null != n[a] && (i[L[a]] = n[a]);
              return i;
            })(t)
          ),
          !r)
        )
          for (var o in L)
            if (L.hasOwnProperty(o)) {
              var s = t.getAttribute(o);
              null != s && (n[L[o]] = s);
            }
        var h = a ? 'textFill' : 'fill',
          l = a ? 'textStroke' : 'stroke';
        e.style = e.style || new p();
        var u = e.style;
        null != n.fill && u.set(h, B(n.fill, i)),
          null != n.stroke && u.set(l, B(n.stroke, i)),
          b(
            ['lineWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'miterLimit', 'fontSize'],
            function(t) {
              var e = 'lineWidth' === t && a ? 'textStrokeWidth' : t;
              null != n[t] && u.set(e, parseFloat(n[t]));
            }
          ),
          (n.textBaseline && 'auto' !== n.textBaseline) || (n.textBaseline = 'alphabetic'),
          'alphabetic' === n.textBaseline && (n.textBaseline = 'bottom'),
          'start' === n.textAlign && (n.textAlign = 'left'),
          'end' === n.textAlign && (n.textAlign = 'right'),
          b(
            [
              'lineDashOffset',
              'lineCap',
              'lineJoin',
              'fontWeight',
              'fontFamily',
              'fontStyle',
              'textAlign',
              'textBaseline'
            ],
            function(t) {
              null != n[t] && u.set(t, n[t]);
            }
          ),
          n.lineDash && (e.style.lineDash = w(n.lineDash).split(T)),
          u[l] && 'none' !== u[l] && (e[l] = !0),
          (e.__inheritedStyle = n);
      }
      var D = /url\(\s*#(.*?)\)/;
      function B(t, e) {
        var i = e && t && t.match(D);
        return i ? e[w(i[1])] : t;
      }
      var R = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;
      var O = /([^\s:;]+)\s*:\s*([^:;]+)/g;
      function E(t, e, i) {
        var r = e / t.width,
          n = i / t.height,
          a = Math.min(r, n);
        return {
          scale: [a, a],
          position: [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + i / 2]
        };
      }
      (e.parseXML = k),
        (e.makeViewBoxTransform = E),
        (e.parseSVG = function(t, e) {
          return new S().parse(t, e);
        });
    },
    406: function(t, e, i) {
      var r = i(389),
        n = 1e-8;
      function a(t, e) {
        return Math.abs(t - e) < n;
      }
      e.contain = function(t, e, i) {
        var n = 0,
          o = t[0];
        if (!o) return !1;
        for (var s = 1; s < t.length; s++) {
          var h = t[s];
          (n += r(o[0], o[1], h[0], h[1], e, i)), (o = h);
        }
        var l = t[0];
        return (a(o[0], l[0]) && a(o[1], l[1])) || (n += r(o[0], o[1], l[0], l[1], e, i)), 0 !== n;
      };
    },
    44: function(t, e) {
      var i = 'undefined' === typeof Float32Array ? Array : Float32Array;
      function r() {
        var t = new i(6);
        return n(t), t;
      }
      function n(t) {
        return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 1), (t[4] = 0), (t[5] = 0), t;
      }
      function a(t, e) {
        return (
          (t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[4] = e[4]),
          (t[5] = e[5]),
          t
        );
      }
      (e.create = r),
        (e.identity = n),
        (e.copy = a),
        (e.mul = function(t, e, i) {
          var r = e[0] * i[0] + e[2] * i[1],
            n = e[1] * i[0] + e[3] * i[1],
            a = e[0] * i[2] + e[2] * i[3],
            o = e[1] * i[2] + e[3] * i[3],
            s = e[0] * i[4] + e[2] * i[5] + e[4],
            h = e[1] * i[4] + e[3] * i[5] + e[5];
          return (t[0] = r), (t[1] = n), (t[2] = a), (t[3] = o), (t[4] = s), (t[5] = h), t;
        }),
        (e.translate = function(t, e, i) {
          return (
            (t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4] + i[0]),
            (t[5] = e[5] + i[1]),
            t
          );
        }),
        (e.rotate = function(t, e, i) {
          var r = e[0],
            n = e[2],
            a = e[4],
            o = e[1],
            s = e[3],
            h = e[5],
            l = Math.sin(i),
            u = Math.cos(i);
          return (
            (t[0] = r * u + o * l),
            (t[1] = -r * l + o * u),
            (t[2] = n * u + s * l),
            (t[3] = -n * l + u * s),
            (t[4] = u * a + l * h),
            (t[5] = u * h - l * a),
            t
          );
        }),
        (e.scale = function(t, e, i) {
          var r = i[0],
            n = i[1];
          return (
            (t[0] = e[0] * r),
            (t[1] = e[1] * n),
            (t[2] = e[2] * r),
            (t[3] = e[3] * n),
            (t[4] = e[4] * r),
            (t[5] = e[5] * n),
            t
          );
        }),
        (e.invert = function(t, e) {
          var i = e[0],
            r = e[2],
            n = e[4],
            a = e[1],
            o = e[3],
            s = e[5],
            h = i * o - a * r;
          return h
            ? ((h = 1 / h),
              (t[0] = o * h),
              (t[1] = -a * h),
              (t[2] = -r * h),
              (t[3] = i * h),
              (t[4] = (r * s - o * n) * h),
              (t[5] = (a * n - i * s) * h),
              t)
            : null;
        }),
        (e.clone = function(t) {
          var e = r();
          return a(e, t), e;
        });
    },
    453: function(t, e, i) {
      var r,
        n = i(35),
        a = 'urn:schemas-microsoft-com:vml',
        o = 'undefined' === typeof window ? null : window,
        s = !1,
        h = o && o.document;
      if (h && !n.canvasSupported)
        try {
          !h.namespaces.zrvml && h.namespaces.add('zrvml', a),
            (r = function(t) {
              return h.createElement('<zrvml:' + t + ' class="zrvml">');
            });
        } catch (l) {
          r = function(t) {
            return h.createElement('<' + t + ' xmlns="' + a + '" class="zrvml">');
          };
        }
      (e.doc = h),
        (e.createNode = function(t) {
          return r(t);
        }),
        (e.initVML = function() {
          if (!s && h) {
            s = !0;
            var t = h.styleSheets;
            t.length < 31
              ? h.createStyleSheet().addRule('.zrvml', 'behavior:url(#default#VML)')
              : t[0].addRule('.zrvml', 'behavior:url(#default#VML)');
          }
        });
    },
    53: function(t, e, i) {
      var r = i(29),
        n = i(275),
        a = i(2),
        o = a.getContext,
        s = a.extend,
        h = a.retrieve2,
        l = a.retrieve3,
        u = a.trim,
        c = {},
        f = 0,
        d = 5e3,
        p = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
        v = '12px sans-serif',
        g = {};
      function _(t, e) {
        var i = t + ':' + (e = e || v);
        if (c[i]) return c[i];
        for (var r = (t + '').split('\n'), n = 0, a = 0, o = r.length; a < o; a++)
          n = Math.max(A(r[a], e).width, n);
        return f > d && ((f = 0), (c = {})), f++, (c[i] = n), n;
      }
      function m(t, e, i) {
        return 'right' === i ? (t -= e) : 'center' === i && (t -= e / 2), t;
      }
      function y(t, e, i) {
        return 'middle' === i ? (t -= e / 2) : 'bottom' === i && (t -= e), t;
      }
      function x(t, e, i) {
        var r = e.textPosition,
          n = e.textDistance,
          a = i.x,
          o = i.y;
        n = n || 0;
        var s = i.height,
          h = i.width,
          l = s / 2,
          u = 'left',
          c = 'top';
        switch (r) {
          case 'left':
            (a -= n), (o += l), (u = 'right'), (c = 'middle');
            break;
          case 'right':
            (a += n + h), (o += l), (c = 'middle');
            break;
          case 'top':
            (a += h / 2), (o -= n), (u = 'center'), (c = 'bottom');
            break;
          case 'bottom':
            (a += h / 2), (o += s + n), (u = 'center');
            break;
          case 'inside':
            (a += h / 2), (o += l), (u = 'center'), (c = 'middle');
            break;
          case 'insideLeft':
            (a += n), (o += l), (c = 'middle');
            break;
          case 'insideRight':
            (a += h - n), (o += l), (u = 'right'), (c = 'middle');
            break;
          case 'insideTop':
            (a += h / 2), (o += n), (u = 'center');
            break;
          case 'insideBottom':
            (a += h / 2), (o += s - n), (u = 'center'), (c = 'bottom');
            break;
          case 'insideTopLeft':
            (a += n), (o += n);
            break;
          case 'insideTopRight':
            (a += h - n), (o += n), (u = 'right');
            break;
          case 'insideBottomLeft':
            (a += n), (o += s - n), (c = 'bottom');
            break;
          case 'insideBottomRight':
            (a += h - n), (o += s - n), (u = 'right'), (c = 'bottom');
        }
        return ((t = t || {}).x = a), (t.y = o), (t.textAlign = u), (t.textVerticalAlign = c), t;
      }
      function w(t, e, i, r, n) {
        if (!e) return '';
        var a = (t + '').split('\n');
        n = b(e, i, r, n);
        for (var o = 0, s = a.length; o < s; o++) a[o] = T(a[o], n);
        return a.join('\n');
      }
      function b(t, e, i, r) {
        (r = s({}, r)).font = e;
        i = h(i, '...');
        r.maxIterations = h(r.maxIterations, 2);
        var n = (r.minChar = h(r.minChar, 0));
        r.cnCharWidth = _('\u56fd', e);
        var a = (r.ascCharWidth = _('a', e));
        r.placeholder = h(r.placeholder, '');
        for (var o = (t = Math.max(0, t - 1)), l = 0; l < n && o >= a; l++) o -= a;
        var u = _(i, e);
        return (
          u > o && ((i = ''), (u = 0)),
          (o = t - u),
          (r.ellipsis = i),
          (r.ellipsisWidth = u),
          (r.contentWidth = o),
          (r.containerWidth = t),
          r
        );
      }
      function T(t, e) {
        var i = e.containerWidth,
          r = e.font,
          n = e.contentWidth;
        if (!i) return '';
        var a = _(t, r);
        if (a <= i) return t;
        for (var o = 0; ; o++) {
          if (a <= n || o >= e.maxIterations) {
            t += e.ellipsis;
            break;
          }
          var s =
            0 === o
              ? k(t, n, e.ascCharWidth, e.cnCharWidth)
              : a > 0
              ? Math.floor((t.length * n) / a)
              : 0;
          a = _((t = t.substr(0, s)), r);
        }
        return '' === t && (t = e.placeholder), t;
      }
      function k(t, e, i, r) {
        for (var n = 0, a = 0, o = t.length; a < o && n < e; a++) {
          var s = t.charCodeAt(a);
          n += 0 <= s && s <= 127 ? i : r;
        }
        return a;
      }
      function S(t) {
        return _('\u56fd', t);
      }
      function A(t, e) {
        return g.measureText(t, e);
      }
      function C(t, e, i, r, n) {
        null != t && (t += '');
        var a = h(r, S(e)),
          o = t ? t.split('\n') : [],
          s = o.length * a,
          l = s,
          u = !0;
        if ((i && (l += i[0] + i[2]), t && n)) {
          u = !1;
          var c = n.outerHeight,
            f = n.outerWidth;
          if (null != c && l > c) (t = ''), (o = []);
          else if (null != f)
            for (
              var d = b(f - (i ? i[1] + i[3] : 0), e, n.ellipsis, {
                  minChar: n.minChar,
                  placeholder: n.placeholder
                }),
                p = 0,
                v = o.length;
              p < v;
              p++
            )
              o[p] = T(o[p], d);
        }
        return { lines: o, height: s, outerHeight: l, lineHeight: a, canCacheByTextString: u };
      }
      function P(t, e) {
        var i = { lines: [], width: 0, height: 0 };
        if ((null != t && (t += ''), !t)) return i;
        for (var r, a = (p.lastIndex = 0); null != (r = p.exec(t)); ) {
          var o = r.index;
          o > a && M(i, t.substring(a, o)), M(i, r[2], r[1]), (a = p.lastIndex);
        }
        a < t.length && M(i, t.substring(a, t.length));
        var s = i.lines,
          u = 0,
          c = 0,
          f = [],
          d = e.textPadding,
          v = e.truncate,
          g = v && v.outerWidth,
          m = v && v.outerHeight;
        d && (null != g && (g -= d[1] + d[3]), null != m && (m -= d[0] + d[2]));
        for (var y = 0; y < s.length; y++) {
          for (var x = s[y], b = 0, T = 0, k = 0; k < x.tokens.length; k++) {
            var A = ((I = x.tokens[k]).styleName && e.rich[I.styleName]) || {},
              C = (I.textPadding = A.textPadding),
              P = (I.font = A.font || e.font),
              L = (I.textHeight = h(A.textHeight, S(P)));
            if (
              (C && (L += C[0] + C[2]),
              (I.height = L),
              (I.lineHeight = l(A.textLineHeight, e.textLineHeight, L)),
              (I.textAlign = (A && A.textAlign) || e.textAlign),
              (I.textVerticalAlign = (A && A.textVerticalAlign) || 'middle'),
              null != m && u + I.lineHeight > m)
            )
              return { lines: [], width: 0, height: 0 };
            I.textWidth = _(I.text, P);
            var z = A.textWidth,
              D = null == z || 'auto' === z;
            if ('string' === typeof z && '%' === z.charAt(z.length - 1))
              (I.percentWidth = z), f.push(I), (z = 0);
            else {
              if (D) {
                z = I.textWidth;
                var B = A.textBackgroundColor,
                  R = B && B.image;
                R &&
                  ((R = n.findExistImage(R)),
                  n.isImageReady(R) && (z = Math.max(z, (R.width * L) / R.height)));
              }
              var O = C ? C[1] + C[3] : 0;
              z += O;
              var E = null != g ? g - T : null;
              null != E &&
                E < z &&
                (!D || E < O
                  ? ((I.text = ''), (I.textWidth = z = 0))
                  : ((I.text = w(I.text, E - O, P, v.ellipsis, { minChar: v.minChar })),
                    (I.textWidth = _(I.text, P)),
                    (z = I.textWidth + O)));
            }
            (T += I.width = z), A && (b = Math.max(b, I.lineHeight));
          }
          (x.width = T), (x.lineHeight = b), (u += b), (c = Math.max(c, T));
        }
        (i.outerWidth = i.width = h(e.textWidth, c)),
          (i.outerHeight = i.height = h(e.textHeight, u)),
          d && ((i.outerWidth += d[1] + d[3]), (i.outerHeight += d[0] + d[2]));
        for (y = 0; y < f.length; y++) {
          var I,
            F = (I = f[y]).percentWidth;
          I.width = (parseInt(F, 10) / 100) * c;
        }
        return i;
      }
      function M(t, e, i) {
        for (var r = '' === e, n = e.split('\n'), a = t.lines, o = 0; o < n.length; o++) {
          var s = n[o],
            h = { styleName: i, text: s, isLineHolder: !s && !r };
          if (o) a.push({ tokens: [h] });
          else {
            var l = (a[a.length - 1] || (a[0] = { tokens: [] })).tokens,
              u = l.length;
            1 === u && l[0].isLineHolder ? (l[0] = h) : (s || !u || r) && l.push(h);
          }
        }
      }
      (g.measureText = function(t, e) {
        var i = o();
        return (i.font = e || v), i.measureText(t);
      }),
        (e.DEFAULT_FONT = v),
        (e.$override = function(t, e) {
          g[t] = e;
        }),
        (e.getWidth = _),
        (e.getBoundingRect = function(t, e, i, n, a, o, s, h) {
          return s
            ? (function(t, e, i, n, a, o, s, h) {
                var l = P(t, {
                    rich: s,
                    truncate: h,
                    font: e,
                    textAlign: i,
                    textPadding: a,
                    textLineHeight: o
                  }),
                  u = l.outerWidth,
                  c = l.outerHeight,
                  f = m(0, u, i),
                  d = y(0, c, n);
                return new r(f, d, u, c);
              })(t, e, i, n, a, o, s, h)
            : (function(t, e, i, n, a, o, s) {
                var h = C(t, e, a, o, s),
                  l = _(t, e);
                a && (l += a[1] + a[3]);
                var u = h.outerHeight,
                  c = m(0, l, i),
                  f = y(0, u, n),
                  d = new r(c, f, l, u);
                return (d.lineHeight = h.lineHeight), d;
              })(t, e, i, n, a, o, h);
        }),
        (e.adjustTextX = m),
        (e.adjustTextY = y),
        (e.calculateTextPosition = x),
        (e.adjustTextPositionOnRect = function(t, e, i) {
          return x({}, { textPosition: t, textDistance: i }, e);
        }),
        (e.truncateText = w),
        (e.getLineHeight = S),
        (e.measureText = A),
        (e.parsePlainText = C),
        (e.parseRichText = P),
        (e.makeFont = function(t) {
          var e =
            (t.fontSize || t.fontFamily) &&
            [
              t.fontStyle,
              t.fontWeight,
              (t.fontSize || 12) + 'px',
              t.fontFamily || 'sans-serif'
            ].join(' ');
          return (e && u(e)) || t.textFont || t.font;
        });
    },
    655: function(t, e, i) {
      var r = i(2),
        n = i(28),
        a = i(656),
        o = i(99),
        s = i(70),
        h = i(658),
        l = 'silent';
      function u(t) {
        s.stop(this.event);
      }
      function c() {}
      c.prototype.dispose = function() {};
      var f = [
          'click',
          'dblclick',
          'mousewheel',
          'mouseout',
          'mouseup',
          'mousedown',
          'mousemove',
          'contextmenu'
        ],
        d = function(t, e, i, r) {
          o.call(this),
            (this.storage = t),
            (this.painter = e),
            (this.painterRoot = r),
            (i = i || new c()),
            (this.proxy = null),
            (this._hovered = {}),
            this._lastTouchMoment,
            this._lastX,
            this._lastY,
            this._gestureMgr,
            a.call(this),
            this.setHandlerProxy(i);
        };
      function p(t, e, i) {
        if (t[t.rectHover ? 'rectContain' : 'contain'](e, i)) {
          for (var r, n = t; n; ) {
            if (n.clipPath && !n.clipPath.contain(e, i)) return !1;
            n.silent && (r = !0), (n = n.parent);
          }
          return !r || l;
        }
        return !1;
      }
      (d.prototype = {
        constructor: d,
        setHandlerProxy: function(t) {
          this.proxy && this.proxy.dispose(),
            t &&
              (r.each(
                f,
                function(e) {
                  t.on && t.on(e, this[e], this);
                },
                this
              ),
              (t.handler = this)),
            (this.proxy = t);
        },
        mousemove: function(t) {
          var e = t.zrX,
            i = t.zrY,
            r = this._hovered,
            n = r.target;
          n && !n.__zr && (n = (r = this.findHover(r.x, r.y)).target);
          var a = (this._hovered = this.findHover(e, i)),
            o = a.target,
            s = this.proxy;
          s.setCursor && s.setCursor(o ? o.cursor : 'default'),
            n && o !== n && this.dispatchToElement(r, 'mouseout', t),
            this.dispatchToElement(a, 'mousemove', t),
            o && o !== n && this.dispatchToElement(a, 'mouseover', t);
        },
        mouseout: function(t) {
          this.dispatchToElement(this._hovered, 'mouseout', t);
          var e,
            i = t.toElement || t.relatedTarget;
          do {
            i = i && i.parentNode;
          } while (i && 9 !== i.nodeType && !(e = i === this.painterRoot));
          !e && this.trigger('globalout', { event: t });
        },
        resize: function(t) {
          this._hovered = {};
        },
        dispatch: function(t, e) {
          var i = this[t];
          i && i.call(this, e);
        },
        dispose: function() {
          this.proxy.dispose(), (this.storage = this.proxy = this.painter = null);
        },
        setCursorStyle: function(t) {
          var e = this.proxy;
          e.setCursor && e.setCursor(t);
        },
        dispatchToElement: function(t, e, i) {
          var r = (t = t || {}).target;
          if (!r || !r.silent) {
            for (
              var n = 'on' + e,
                a = (function(t, e, i) {
                  return {
                    type: t,
                    event: i,
                    target: e.target,
                    topTarget: e.topTarget,
                    cancelBubble: !1,
                    offsetX: i.zrX,
                    offsetY: i.zrY,
                    gestureEvent: i.gestureEvent,
                    pinchX: i.pinchX,
                    pinchY: i.pinchY,
                    pinchScale: i.pinchScale,
                    wheelDelta: i.zrDelta,
                    zrByTouch: i.zrByTouch,
                    which: i.which,
                    stop: u
                  };
                })(e, t, i);
              r &&
              (r[n] && (a.cancelBubble = r[n].call(r, a)),
              r.trigger(e, a),
              (r = r.parent),
              !a.cancelBubble);

            );
            a.cancelBubble ||
              (this.trigger(e, a),
              this.painter &&
                this.painter.eachOtherLayer(function(t) {
                  'function' === typeof t[n] && t[n].call(t, a), t.trigger && t.trigger(e, a);
                }));
          }
        },
        findHover: function(t, e, i) {
          for (
            var r = this.storage.getDisplayList(), n = { x: t, y: e }, a = r.length - 1;
            a >= 0;
            a--
          ) {
            var o;
            if (
              r[a] !== i &&
              !r[a].ignore &&
              (o = p(r[a], t, e)) &&
              (!n.topTarget && (n.topTarget = r[a]), o !== l)
            ) {
              n.target = r[a];
              break;
            }
          }
          return n;
        },
        processGesture: function(t, e) {
          this._gestureMgr || (this._gestureMgr = new h());
          var i = this._gestureMgr;
          'start' === e && i.clear();
          var r = i.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
          if (('end' === e && i.clear(), r)) {
            var n = r.type;
            (t.gestureEvent = n), this.dispatchToElement({ target: r.target }, n, r.event);
          }
        }
      }),
        r.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function(
          t
        ) {
          d.prototype[t] = function(e) {
            var i = this.findHover(e.zrX, e.zrY),
              r = i.target;
            if ('mousedown' === t)
              (this._downEl = r), (this._downPoint = [e.zrX, e.zrY]), (this._upEl = r);
            else if ('mouseup' === t) this._upEl = r;
            else if ('click' === t) {
              if (
                this._downEl !== this._upEl ||
                !this._downPoint ||
                n.dist(this._downPoint, [e.zrX, e.zrY]) > 4
              )
                return;
              this._downPoint = null;
            }
            this.dispatchToElement(i, t, e);
          };
        }),
        r.mixin(d, o),
        r.mixin(d, a);
      var v = d;
      t.exports = v;
    },
    656: function(t, e) {
      function i() {
        this.on('mousedown', this._dragStart, this),
          this.on('mousemove', this._drag, this),
          this.on('mouseup', this._dragEnd, this),
          this.on('globalout', this._dragEnd, this);
      }
      function r(t, e) {
        return { target: t, topTarget: e && e.topTarget };
      }
      i.prototype = {
        constructor: i,
        _dragStart: function(t) {
          var e = t.target;
          e &&
            e.draggable &&
            ((this._draggingTarget = e),
            (e.dragging = !0),
            (this._x = t.offsetX),
            (this._y = t.offsetY),
            this.dispatchToElement(r(e, t), 'dragstart', t.event));
        },
        _drag: function(t) {
          var e = this._draggingTarget;
          if (e) {
            var i = t.offsetX,
              n = t.offsetY,
              a = i - this._x,
              o = n - this._y;
            (this._x = i),
              (this._y = n),
              e.drift(a, o, t),
              this.dispatchToElement(r(e, t), 'drag', t.event);
            var s = this.findHover(i, n, e).target,
              h = this._dropTarget;
            (this._dropTarget = s),
              e !== s &&
                (h && s !== h && this.dispatchToElement(r(h, t), 'dragleave', t.event),
                s && s !== h && this.dispatchToElement(r(s, t), 'dragenter', t.event));
          }
        },
        _dragEnd: function(t) {
          var e = this._draggingTarget;
          e && (e.dragging = !1),
            this.dispatchToElement(r(e, t), 'dragend', t.event),
            this._dropTarget && this.dispatchToElement(r(this._dropTarget, t), 'drop', t.event),
            (this._draggingTarget = null),
            (this._dropTarget = null);
        }
      };
      var n = i;
      t.exports = n;
    },
    657: function(t, e) {
      var i = Math.log(2);
      function r(t, e, n, a, o, s) {
        var h = a + '-' + o,
          l = t.length;
        if (s.hasOwnProperty(h)) return s[h];
        if (1 === e) {
          var u = Math.round(Math.log(((1 << l) - 1) & ~o) / i);
          return t[n][u];
        }
        for (var c = a | (1 << n), f = n + 1; a & (1 << f); ) f++;
        for (var d = 0, p = 0, v = 0; p < l; p++) {
          var g = 1 << p;
          g & o || ((d += (v % 2 ? -1 : 1) * t[n][p] * r(t, e - 1, f, c, o | g, s)), v++);
        }
        return (s[h] = d), d;
      }
      e.buildTransformer = function(t, e) {
        var i = [
            [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
            [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
            [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
            [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
            [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
            [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
            [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
            [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
          ],
          n = {},
          a = r(i, 8, 0, 0, 0, n);
        if (0 !== a) {
          for (var o = [], s = 0; s < 8; s++)
            for (var h = 0; h < 8; h++)
              null == o[h] && (o[h] = 0),
                (o[h] +=
                  ((((s + h) % 2 ? -1 : 1) * r(i, 7, 0 === s ? 1 : 0, 1 << s, 1 << h, n)) / a) *
                  e[s]);
          return function(t, e, i) {
            var r = e * o[6] + i * o[7] + 1;
            (t[0] = (e * o[0] + i * o[1] + o[2]) / r), (t[1] = (e * o[3] + i * o[4] + o[5]) / r);
          };
        }
      };
    },
    658: function(t, e, i) {
      var r = i(70),
        n = function() {
          this._track = [];
        };
      function a(t) {
        var e = t[1][0] - t[0][0],
          i = t[1][1] - t[0][1];
        return Math.sqrt(e * e + i * i);
      }
      n.prototype = {
        constructor: n,
        recognize: function(t, e, i) {
          return this._doTrack(t, e, i), this._recognize(t);
        },
        clear: function() {
          return (this._track.length = 0), this;
        },
        _doTrack: function(t, e, i) {
          var n = t.touches;
          if (n) {
            for (
              var a = { points: [], touches: [], target: e, event: t }, o = 0, s = n.length;
              o < s;
              o++
            ) {
              var h = n[o],
                l = r.clientToLocal(i, h, {});
              a.points.push([l.zrX, l.zrY]), a.touches.push(h);
            }
            this._track.push(a);
          }
        },
        _recognize: function(t) {
          for (var e in o)
            if (o.hasOwnProperty(e)) {
              var i = o[e](this._track, t);
              if (i) return i;
            }
        }
      };
      var o = {
          pinch: function(t, e) {
            var i = t.length;
            if (i) {
              var r,
                n = (t[i - 1] || {}).points,
                o = (t[i - 2] || {}).points || n;
              if (o && o.length > 1 && n && n.length > 1) {
                var s = a(n) / a(o);
                !isFinite(s) && (s = 1), (e.pinchScale = s);
                var h = [((r = n)[0][0] + r[1][0]) / 2, (r[0][1] + r[1][1]) / 2];
                return (
                  (e.pinchX = h[0]),
                  (e.pinchY = h[1]),
                  { type: 'pinch', target: t[0].target, event: e }
                );
              }
            }
          }
        },
        s = n;
      t.exports = s;
    },
    659: function(t, e, i) {
      var r = i(2),
        n = i(35),
        a = i(119),
        o = i(273);
      function s(t, e) {
        return t.zlevel === e.zlevel
          ? t.z === e.z
            ? t.z2 - e.z2
            : t.z - e.z
          : t.zlevel - e.zlevel;
      }
      var h = function() {
        (this._roots = []), (this._displayList = []), (this._displayListLen = 0);
      };
      h.prototype = {
        constructor: h,
        traverse: function(t, e) {
          for (var i = 0; i < this._roots.length; i++) this._roots[i].traverse(t, e);
        },
        getDisplayList: function(t, e) {
          return (e = e || !1), t && this.updateDisplayList(e), this._displayList;
        },
        updateDisplayList: function(t) {
          this._displayListLen = 0;
          for (var e = this._roots, i = this._displayList, r = 0, a = e.length; r < a; r++)
            this._updateAndAddDisplayable(e[r], null, t);
          (i.length = this._displayListLen), n.canvasSupported && o(i, s);
        },
        _updateAndAddDisplayable: function(t, e, i) {
          if (!t.ignore || i) {
            t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
            var r = t.clipPath;
            if (r) {
              e = e ? e.slice() : [];
              for (var n = r, a = t; n; )
                (n.parent = a), n.updateTransform(), e.push(n), (a = n), (n = n.clipPath);
            }
            if (t.isGroup) {
              for (var o = t._children, s = 0; s < o.length; s++) {
                var h = o[s];
                t.__dirty && (h.__dirty = !0), this._updateAndAddDisplayable(h, e, i);
              }
              t.__dirty = !1;
            } else (t.__clipPaths = e), (this._displayList[this._displayListLen++] = t);
          }
        },
        addRoot: function(t) {
          t.__storage !== this &&
            (t instanceof a && t.addChildrenToStorage(this),
            this.addToStorage(t),
            this._roots.push(t));
        },
        delRoot: function(t) {
          if (null == t) {
            for (var e = 0; e < this._roots.length; e++) {
              var i = this._roots[e];
              i instanceof a && i.delChildrenFromStorage(this);
            }
            return (this._roots = []), (this._displayList = []), void (this._displayListLen = 0);
          }
          if (t instanceof Array) {
            e = 0;
            for (var n = t.length; e < n; e++) this.delRoot(t[e]);
          } else {
            var o = r.indexOf(this._roots, t);
            o >= 0 &&
              (this.delFromStorage(t),
              this._roots.splice(o, 1),
              t instanceof a && t.delChildrenFromStorage(this));
          }
        },
        addToStorage: function(t) {
          return t && ((t.__storage = this), t.dirty(!1)), this;
        },
        delFromStorage: function(t) {
          return t && (t.__storage = null), this;
        },
        dispose: function() {
          this._renderList = this._roots = null;
        },
        displayableSortFunc: s
      };
      var l = h;
      t.exports = l;
    },
    660: function(t, e, i) {
      var r = i(377),
        n = i(149),
        a = i(2),
        o = a.isString,
        s = a.isFunction,
        h = a.isObject,
        l = a.isArrayLike,
        u = a.indexOf,
        c = function() {
          this.animators = [];
        };
      function f(t, e, i, r, n, a, u, c) {
        o(r)
          ? ((a = n), (n = r), (r = 0))
          : s(n)
          ? ((a = n), (n = 'linear'), (r = 0))
          : s(r)
          ? ((a = r), (r = 0))
          : s(i)
          ? ((a = i), (i = 500))
          : i || (i = 500),
          t.stopAnimation(),
          (function t(e, i, r, n, a, o, s) {
            var u = {},
              c = 0;
            for (var f in n)
              n.hasOwnProperty(f) &&
                (null != r[f]
                  ? h(n[f]) && !l(n[f])
                    ? t(e, i ? i + '.' + f : f, r[f], n[f], a, o, s)
                    : (s ? ((u[f] = r[f]), d(e, i, f, n[f])) : (u[f] = n[f]), c++)
                  : null == n[f] || s || d(e, i, f, n[f]));
            c > 0 &&
              e
                .animate(i, !1)
                .when(null == a ? 500 : a, u)
                .delay(o || 0);
          })(t, '', t, e, i, r, c);
        var f = t.animators.slice(),
          p = f.length;
        function v() {
          --p || (a && a());
        }
        p || (a && a());
        for (var g = 0; g < f.length; g++) f[g].done(v).start(n, u);
      }
      function d(t, e, i, r) {
        if (e) {
          var n = {};
          (n[e] = {}), (n[e][i] = r), t.attr(n);
        } else t.attr(i, r);
      }
      c.prototype = {
        constructor: c,
        animate: function(t, e) {
          var i,
            a = !1,
            o = this,
            s = this.__zr;
          if (t) {
            var h = t.split('.'),
              l = o;
            a = 'shape' === h[0];
            for (var c = 0, f = h.length; c < f; c++) l && (l = l[h[c]]);
            l && (i = l);
          } else i = o;
          if (i) {
            var d = o.animators,
              p = new r(i, e);
            return (
              p
                .during(function(t) {
                  o.dirty(a);
                })
                .done(function() {
                  d.splice(u(d, p), 1);
                }),
              d.push(p),
              s && s.animation.addAnimator(p),
              p
            );
          }
          n('Property "' + t + '" is not existed in element ' + o.id);
        },
        stopAnimation: function(t) {
          for (var e = this.animators, i = e.length, r = 0; r < i; r++) e[r].stop(t);
          return (e.length = 0), this;
        },
        animateTo: function(t, e, i, r, n, a) {
          f(this, t, e, i, r, n, a);
        },
        animateFrom: function(t, e, i, r, n, a) {
          f(this, t, e, i, r, n, a, !0);
        }
      };
      var p = c;
      t.exports = p;
    },
    661: function(t, e, i) {
      var r = i(662);
      function n(t) {
        (this._target = t.target),
          (this._life = t.life || 1e3),
          (this._delay = t.delay || 0),
          (this._initialized = !1),
          (this.loop = null != t.loop && t.loop),
          (this.gap = t.gap || 0),
          (this.easing = t.easing || 'Linear'),
          (this.onframe = t.onframe),
          (this.ondestroy = t.ondestroy),
          (this.onrestart = t.onrestart),
          (this._pausedTime = 0),
          (this._paused = !1);
      }
      n.prototype = {
        constructor: n,
        step: function(t, e) {
          if (
            (this._initialized || ((this._startTime = t + this._delay), (this._initialized = !0)),
            this._paused)
          )
            this._pausedTime += e;
          else {
            var i = (t - this._startTime - this._pausedTime) / this._life;
            if (!(i < 0)) {
              i = Math.min(i, 1);
              var n = this.easing,
                a = 'string' === typeof n ? r[n] : n,
                o = 'function' === typeof a ? a(i) : i;
              return (
                this.fire('frame', o),
                1 === i
                  ? this.loop
                    ? (this.restart(t), 'restart')
                    : ((this._needsRemove = !0), 'destroy')
                  : null
              );
            }
          }
        },
        restart: function(t) {
          var e = (t - this._startTime - this._pausedTime) % this._life;
          (this._startTime = t - e + this.gap), (this._pausedTime = 0), (this._needsRemove = !1);
        },
        fire: function(t, e) {
          this[(t = 'on' + t)] && this[t](this._target, e);
        },
        pause: function() {
          this._paused = !0;
        },
        resume: function() {
          this._paused = !1;
        }
      };
      var a = n;
      t.exports = a;
    },
    662: function(t, e) {
      var i = {
          linear: function(t) {
            return t;
          },
          quadraticIn: function(t) {
            return t * t;
          },
          quadraticOut: function(t) {
            return t * (2 - t);
          },
          quadraticInOut: function(t) {
            return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
          },
          cubicIn: function(t) {
            return t * t * t;
          },
          cubicOut: function(t) {
            return --t * t * t + 1;
          },
          cubicInOut: function(t) {
            return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
          },
          quarticIn: function(t) {
            return t * t * t * t;
          },
          quarticOut: function(t) {
            return 1 - --t * t * t * t;
          },
          quarticInOut: function(t) {
            return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
          },
          quinticIn: function(t) {
            return t * t * t * t * t;
          },
          quinticOut: function(t) {
            return --t * t * t * t * t + 1;
          },
          quinticInOut: function(t) {
            return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
          },
          sinusoidalIn: function(t) {
            return 1 - Math.cos((t * Math.PI) / 2);
          },
          sinusoidalOut: function(t) {
            return Math.sin((t * Math.PI) / 2);
          },
          sinusoidalInOut: function(t) {
            return 0.5 * (1 - Math.cos(Math.PI * t));
          },
          exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1);
          },
          exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
          },
          exponentialInOut: function(t) {
            return 0 === t
              ? 0
              : 1 === t
              ? 1
              : (t *= 2) < 1
              ? 0.5 * Math.pow(1024, t - 1)
              : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
          },
          circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t);
          },
          circularOut: function(t) {
            return Math.sqrt(1 - --t * t);
          },
          circularInOut: function(t) {
            return (t *= 2) < 1
              ? -0.5 * (Math.sqrt(1 - t * t) - 1)
              : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          },
          elasticIn: function(t) {
            var e,
              i = 0.1;
            return 0 === t
              ? 0
              : 1 === t
              ? 1
              : (!i || i < 1
                  ? ((i = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / i)) / (2 * Math.PI)),
                -i * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * (2 * Math.PI)) / 0.4));
          },
          elasticOut: function(t) {
            var e,
              i = 0.1;
            return 0 === t
              ? 0
              : 1 === t
              ? 1
              : (!i || i < 1
                  ? ((i = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / i)) / (2 * Math.PI)),
                i * Math.pow(2, -10 * t) * Math.sin(((t - e) * (2 * Math.PI)) / 0.4) + 1);
          },
          elasticInOut: function(t) {
            var e,
              i = 0.1;
            return 0 === t
              ? 0
              : 1 === t
              ? 1
              : (!i || i < 1
                  ? ((i = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / i)) / (2 * Math.PI)),
                (t *= 2) < 1
                  ? i *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t - e) * (2 * Math.PI)) / 0.4) *
                    -0.5
                  : i *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin(((t - e) * (2 * Math.PI)) / 0.4) *
                      0.5 +
                    1);
          },
          backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e);
          },
          backOut: function(t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1;
          },
          backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1
              ? t * t * ((e + 1) * t - e) * 0.5
              : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
          },
          bounceIn: function(t) {
            return 1 - i.bounceOut(1 - t);
          },
          bounceOut: function(t) {
            return t < 1 / 2.75
              ? 7.5625 * t * t
              : t < 2 / 2.75
              ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
              : t < 2.5 / 2.75
              ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
              : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
          },
          bounceInOut: function(t) {
            return t < 0.5 ? 0.5 * i.bounceIn(2 * t) : 0.5 * i.bounceOut(2 * t - 1) + 0.5;
          }
        },
        r = i;
      t.exports = r;
    },
    663: function(t, e, i) {
      var r = i(187).devicePixelRatio,
        n = i(2),
        a = i(149),
        o = i(29),
        s = i(273),
        h = i(664),
        l = i(381),
        u = i(120),
        c = i(35);
      function f(t) {
        return parseInt(t, 10);
      }
      var d = new o(0, 0, 0, 0),
        p = new o(0, 0, 0, 0);
      var v = function(t, e, i) {
        this.type = 'canvas';
        var a = !t.nodeName || 'CANVAS' === t.nodeName.toUpperCase();
        (this._opts = i = n.extend({}, i || {})),
          (this.dpr = i.devicePixelRatio || r),
          (this._singleCanvas = a),
          (this.root = t);
        var o = t.style;
        o &&
          ((o['-webkit-tap-highlight-color'] = 'transparent'),
          (o['-webkit-user-select'] = o['user-select'] = o['-webkit-touch-callout'] = 'none'),
          (t.innerHTML = '')),
          (this.storage = e);
        var s = (this._zlevelList = []),
          l = (this._layers = {});
        if (((this._layerConfig = {}), (this._needsManuallyCompositing = !1), a)) {
          var u = t.width,
            c = t.height;
          null != i.width && (u = i.width),
            null != i.height && (c = i.height),
            (this.dpr = i.devicePixelRatio || 1),
            (t.width = u * this.dpr),
            (t.height = c * this.dpr),
            (this._width = u),
            (this._height = c);
          var f = new h(t, this, this.dpr);
          (f.__builtin__ = !0),
            f.initContext(),
            (l[314159] = f),
            (f.zlevel = 314159),
            s.push(314159),
            (this._domRoot = t);
        } else {
          (this._width = this._getSize(0)), (this._height = this._getSize(1));
          var d = (this._domRoot = (function(t, e) {
            var i = document.createElement('div');
            return (
              (i.style.cssText =
                [
                  'position:relative',
                  'width:' + t + 'px',
                  'height:' + e + 'px',
                  'padding:0',
                  'margin:0',
                  'border-width:0'
                ].join(';') + ';'),
              i
            );
          })(this._width, this._height));
          t.appendChild(d);
        }
        (this._hoverlayer = null), (this._hoverElements = []);
      };
      v.prototype = {
        constructor: v,
        getType: function() {
          return 'canvas';
        },
        isSingleCanvas: function() {
          return this._singleCanvas;
        },
        getViewportRoot: function() {
          return this._domRoot;
        },
        getViewportRootOffset: function() {
          var t = this.getViewportRoot();
          if (t) return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
        },
        refresh: function(t) {
          var e = this.storage.getDisplayList(!0),
            i = this._zlevelList;
          (this._redrawId = Math.random()), this._paintList(e, t, this._redrawId);
          for (var r = 0; r < i.length; r++) {
            var n = i[r],
              a = this._layers[n];
            if (!a.__builtin__ && a.refresh) {
              var o = 0 === r ? this._backgroundColor : null;
              a.refresh(o);
            }
          }
          return this.refreshHover(), this;
        },
        addHover: function(t, e) {
          if (!t.__hoverMir) {
            var i = new t.constructor({
              style: t.style,
              shape: t.shape,
              z: t.z,
              z2: t.z2,
              silent: t.silent
            });
            return (
              (i.__from = t), (t.__hoverMir = i), e && i.setStyle(e), this._hoverElements.push(i), i
            );
          }
        },
        removeHover: function(t) {
          var e = t.__hoverMir,
            i = this._hoverElements,
            r = n.indexOf(i, e);
          r >= 0 && i.splice(r, 1), (t.__hoverMir = null);
        },
        clearHover: function(t) {
          for (var e = this._hoverElements, i = 0; i < e.length; i++) {
            var r = e[i].__from;
            r && (r.__hoverMir = null);
          }
          e.length = 0;
        },
        refreshHover: function() {
          var t = this._hoverElements,
            e = t.length,
            i = this._hoverlayer;
          if ((i && i.clear(), e)) {
            s(t, this.storage.displayableSortFunc),
              i || (i = this._hoverlayer = this.getLayer(1e5));
            var r = {};
            i.ctx.save();
            for (var n = 0; n < e; ) {
              var a = t[n],
                o = a.__from;
              o && o.__zr
                ? (n++,
                  o.invisible ||
                    ((a.transform = o.transform),
                    (a.invTransform = o.invTransform),
                    (a.__clipPaths = o.__clipPaths),
                    this._doPaintEl(a, i, !0, r)))
                : (t.splice(n, 1), (o.__hoverMir = null), e--);
            }
            i.ctx.restore();
          }
        },
        getHoverLayer: function() {
          return this.getLayer(1e5);
        },
        _paintList: function(t, e, i) {
          if (this._redrawId === i) {
            (e = e || !1), this._updateLayerStatus(t);
            var r = this._doPaintList(t, e);
            if ((this._needsManuallyCompositing && this._compositeManually(), !r)) {
              var n = this;
              l(function() {
                n._paintList(t, e, i);
              });
            }
          }
        },
        _compositeManually: function() {
          var t = this.getLayer(314159).ctx,
            e = this._domRoot.width,
            i = this._domRoot.height;
          t.clearRect(0, 0, e, i),
            this.eachBuiltinLayer(function(r) {
              r.virtual && t.drawImage(r.dom, 0, 0, e, i);
            });
        },
        _doPaintList: function(t, e) {
          for (var i = [], r = 0; r < this._zlevelList.length; r++) {
            var a = this._zlevelList[r];
            (h = this._layers[a]).__builtin__ &&
              h !== this._hoverlayer &&
              (h.__dirty || e) &&
              i.push(h);
          }
          for (var o = !0, s = 0; s < i.length; s++) {
            var h,
              l = (h = i[s]).ctx,
              u = {};
            l.save();
            var f = e ? h.__startIndex : h.__drawIndex,
              d = !e && h.incremental && Date.now,
              p = d && Date.now(),
              v = h.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
            if (h.__startIndex === h.__endIndex) h.clear(!1, v);
            else if (f === h.__startIndex) {
              var g = t[f];
              (g.incremental && g.notClear && !e) || h.clear(!1, v);
            }
            -1 === f &&
              (console.error('For some unknown reason. drawIndex is -1'), (f = h.__startIndex));
            for (var _ = f; _ < h.__endIndex; _++) {
              var m = t[_];
              if ((this._doPaintEl(m, h, e, u), (m.__dirty = m.__dirtyText = !1), d))
                if (Date.now() - p > 15) break;
            }
            (h.__drawIndex = _),
              h.__drawIndex < h.__endIndex && (o = !1),
              u.prevElClipPaths && l.restore(),
              l.restore();
          }
          return (
            c.wxa &&
              n.each(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
              }),
            o
          );
        },
        _doPaintEl: function(t, e, i, r) {
          var n = e.ctx,
            a = t.transform;
          if (
            (e.__dirty || i) &&
            !t.invisible &&
            0 !== t.style.opacity &&
            (!a || a[0] || a[3]) &&
            (!t.culling ||
              !(function(t, e, i) {
                return (
                  d.copy(t.getBoundingRect()),
                  t.transform && d.applyTransform(t.transform),
                  (p.width = e),
                  (p.height = i),
                  !d.intersect(p)
                );
              })(t, this._width, this._height))
          ) {
            var o = t.__clipPaths,
              s = r.prevElClipPaths;
            (s &&
              !(function(t, e) {
                if (t === e) return !1;
                if (!t || !e || t.length !== e.length) return !0;
                for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !0;
                return !1;
              })(o, s)) ||
              (s && (n.restore(), (r.prevElClipPaths = null), (r.prevEl = null)),
              o &&
                (n.save(),
                (function(t, e) {
                  for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    r.setTransform(e),
                      e.beginPath(),
                      r.buildPath(e, r.shape),
                      e.clip(),
                      r.restoreTransform(e);
                  }
                })(o, n),
                (r.prevElClipPaths = o))),
              t.beforeBrush && t.beforeBrush(n),
              t.brush(n, r.prevEl || null),
              (r.prevEl = t),
              t.afterBrush && t.afterBrush(n);
          }
        },
        getLayer: function(t, e) {
          this._singleCanvas && !this._needsManuallyCompositing && (t = 314159);
          var i = this._layers[t];
          return (
            i ||
              (((i = new h('zr_' + t, this, this.dpr)).zlevel = t),
              (i.__builtin__ = !0),
              this._layerConfig[t] && n.merge(i, this._layerConfig[t], !0),
              e && (i.virtual = e),
              this.insertLayer(t, i),
              i.initContext()),
            i
          );
        },
        insertLayer: function(t, e) {
          var i = this._layers,
            r = this._zlevelList,
            n = r.length,
            o = null,
            s = -1,
            h = this._domRoot;
          if (i[t]) a('ZLevel ' + t + ' has been used already');
          else if (
            (function(t) {
              return (
                !!t &&
                (!!t.__builtin__ ||
                  ('function' === typeof t.resize && 'function' === typeof t.refresh))
              );
            })(e)
          ) {
            if (n > 0 && t > r[0]) {
              for (s = 0; s < n - 1 && !(r[s] < t && r[s + 1] > t); s++);
              o = i[r[s]];
            }
            if ((r.splice(s + 1, 0, t), (i[t] = e), !e.virtual))
              if (o) {
                var l = o.dom;
                l.nextSibling ? h.insertBefore(e.dom, l.nextSibling) : h.appendChild(e.dom);
              } else h.firstChild ? h.insertBefore(e.dom, h.firstChild) : h.appendChild(e.dom);
          } else a('Layer of zlevel ' + t + ' is not valid');
        },
        eachLayer: function(t, e) {
          var i,
            r,
            n = this._zlevelList;
          for (r = 0; r < n.length; r++) (i = n[r]), t.call(e, this._layers[i], i);
        },
        eachBuiltinLayer: function(t, e) {
          var i,
            r,
            n,
            a = this._zlevelList;
          for (n = 0; n < a.length; n++)
            (r = a[n]), (i = this._layers[r]).__builtin__ && t.call(e, i, r);
        },
        eachOtherLayer: function(t, e) {
          var i,
            r,
            n,
            a = this._zlevelList;
          for (n = 0; n < a.length; n++)
            (r = a[n]), (i = this._layers[r]).__builtin__ || t.call(e, i, r);
        },
        getLayers: function() {
          return this._layers;
        },
        _updateLayerStatus: function(t) {
          function e(t) {
            r && (r.__endIndex !== t && (r.__dirty = !0), (r.__endIndex = t));
          }
          if (
            (this.eachBuiltinLayer(function(t, e) {
              t.__dirty = t.__used = !1;
            }),
            this._singleCanvas)
          )
            for (var i = 1; i < t.length; i++) {
              if ((o = t[i]).zlevel !== t[i - 1].zlevel || o.incremental) {
                this._needsManuallyCompositing = !0;
                break;
              }
            }
          var r = null,
            n = 0;
          for (i = 0; i < t.length; i++) {
            var o,
              s,
              h = (o = t[i]).zlevel;
            o.incremental
              ? (((s = this.getLayer(h + 0.001, this._needsManuallyCompositing)).incremental = !0),
                (n = 1))
              : (s = this.getLayer(h + (n > 0 ? 0.01 : 0), this._needsManuallyCompositing)),
              s.__builtin__ || a('ZLevel ' + h + ' has been used by unkown layer ' + s.id),
              s !== r &&
                ((s.__used = !0),
                s.__startIndex !== i && (s.__dirty = !0),
                (s.__startIndex = i),
                s.incremental ? (s.__drawIndex = -1) : (s.__drawIndex = i),
                e(i),
                (r = s)),
              o.__dirty &&
                ((s.__dirty = !0), s.incremental && s.__drawIndex < 0 && (s.__drawIndex = i));
          }
          e(i),
            this.eachBuiltinLayer(function(t, e) {
              !t.__used &&
                t.getElementCount() > 0 &&
                ((t.__dirty = !0), (t.__startIndex = t.__endIndex = t.__drawIndex = 0)),
                t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
            });
        },
        clear: function() {
          return this.eachBuiltinLayer(this._clearLayer), this;
        },
        _clearLayer: function(t) {
          t.clear();
        },
        setBackgroundColor: function(t) {
          this._backgroundColor = t;
        },
        configLayer: function(t, e) {
          if (e) {
            var i = this._layerConfig;
            i[t] ? n.merge(i[t], e, !0) : (i[t] = e);
            for (var r = 0; r < this._zlevelList.length; r++) {
              var a = this._zlevelList[r];
              if (a === t || a === t + 0.01) {
                var o = this._layers[a];
                n.merge(o, i[t], !0);
              }
            }
          }
        },
        delLayer: function(t) {
          var e = this._layers,
            i = this._zlevelList,
            r = e[t];
          r && (r.dom.parentNode.removeChild(r.dom), delete e[t], i.splice(n.indexOf(i, t), 1));
        },
        resize: function(t, e) {
          if (this._domRoot.style) {
            var i = this._domRoot;
            i.style.display = 'none';
            var r = this._opts;
            if (
              (null != t && (r.width = t),
              null != e && (r.height = e),
              (t = this._getSize(0)),
              (e = this._getSize(1)),
              (i.style.display = ''),
              this._width !== t || e !== this._height)
            ) {
              for (var a in ((i.style.width = t + 'px'), (i.style.height = e + 'px'), this._layers))
                this._layers.hasOwnProperty(a) && this._layers[a].resize(t, e);
              n.each(this._progressiveLayers, function(i) {
                i.resize(t, e);
              }),
                this.refresh(!0);
            }
            (this._width = t), (this._height = e);
          } else {
            if (null == t || null == e) return;
            (this._width = t), (this._height = e), this.getLayer(314159).resize(t, e);
          }
          return this;
        },
        clearLayer: function(t) {
          var e = this._layers[t];
          e && e.clear();
        },
        dispose: function() {
          (this.root.innerHTML = ''),
            (this.root = this.storage = this._domRoot = this._layers = null);
        },
        getRenderedCanvas: function(t) {
          if (((t = t || {}), this._singleCanvas && !this._compositeManually))
            return this._layers[314159].dom;
          var e = new h('image', this, t.pixelRatio || this.dpr);
          if (
            (e.initContext(),
            e.clear(!1, t.backgroundColor || this._backgroundColor),
            t.pixelRatio <= this.dpr)
          ) {
            this.refresh();
            var i = e.dom.width,
              r = e.dom.height,
              n = e.ctx;
            this.eachLayer(function(t) {
              t.__builtin__
                ? n.drawImage(t.dom, 0, 0, i, r)
                : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore());
            });
          } else
            for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
              var l = o[s];
              this._doPaintEl(l, e, !0, a);
            }
          return e.dom;
        },
        getWidth: function() {
          return this._width;
        },
        getHeight: function() {
          return this._height;
        },
        _getSize: function(t) {
          var e = this._opts,
            i = ['width', 'height'][t],
            r = ['clientWidth', 'clientHeight'][t],
            n = ['paddingLeft', 'paddingTop'][t],
            a = ['paddingRight', 'paddingBottom'][t];
          if (null != e[i] && 'auto' !== e[i]) return parseFloat(e[i]);
          var o = this.root,
            s = document.defaultView.getComputedStyle(o);
          return ((o[r] || f(s[i]) || f(o.style[i])) - (f(s[n]) || 0) - (f(s[a]) || 0)) | 0;
        },
        pathToImage: function(t, e) {
          e = e || this.dpr;
          var i = document.createElement('canvas'),
            r = i.getContext('2d'),
            n = t.getBoundingRect(),
            a = t.style,
            o = a.shadowBlur * e,
            s = a.shadowOffsetX * e,
            h = a.shadowOffsetY * e,
            l = a.hasStroke() ? a.lineWidth : 0,
            c = Math.max(l / 2, -s + o),
            f = Math.max(l / 2, s + o),
            d = Math.max(l / 2, -h + o),
            p = Math.max(l / 2, h + o),
            v = n.width + c + f,
            g = n.height + d + p;
          (i.width = v * e),
            (i.height = g * e),
            r.scale(e, e),
            r.clearRect(0, 0, v, g),
            (r.dpr = e);
          var _ = { position: t.position, rotation: t.rotation, scale: t.scale };
          (t.position = [c - n.x, d - n.y]),
            (t.rotation = 0),
            (t.scale = [1, 1]),
            t.updateTransform(),
            t && t.brush(r);
          var m = new u({ style: { x: 0, y: 0, image: i } });
          return (
            null != _.position && (m.position = t.position = _.position),
            null != _.rotation && (m.rotation = t.rotation = _.rotation),
            null != _.scale && (m.scale = t.scale = _.scale),
            m
          );
        }
      };
      var g = v;
      t.exports = g;
    },
    664: function(t, e, i) {
      var r = i(2),
        n = i(187).devicePixelRatio,
        a = i(274),
        o = i(380);
      function s() {
        return !1;
      }
      function h(t, e, i) {
        var n = r.createCanvas(),
          a = e.getWidth(),
          o = e.getHeight(),
          s = n.style;
        return (
          s &&
            ((s.position = 'absolute'),
            (s.left = 0),
            (s.top = 0),
            (s.width = a + 'px'),
            (s.height = o + 'px'),
            n.setAttribute('data-zr-dom-id', t)),
          (n.width = a * i),
          (n.height = o * i),
          n
        );
      }
      var l = function(t, e, i) {
        var a;
        (i = i || n),
          'string' === typeof t ? (a = h(t, e, i)) : r.isObject(t) && (t = (a = t).id),
          (this.id = t),
          (this.dom = a);
        var o = a.style;
        o &&
          ((a.onselectstart = s),
          (o['-webkit-user-select'] = 'none'),
          (o['user-select'] = 'none'),
          (o['-webkit-touch-callout'] = 'none'),
          (o['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)'),
          (o.padding = 0),
          (o.margin = 0),
          (o['border-width'] = 0)),
          (this.domBack = null),
          (this.ctxBack = null),
          (this.painter = e),
          (this.config = null),
          (this.clearColor = 0),
          (this.motionBlur = !1),
          (this.lastFrameAlpha = 0.7),
          (this.dpr = i);
      };
      l.prototype = {
        constructor: l,
        __dirty: !0,
        __used: !1,
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
        incremental: !1,
        getElementCount: function() {
          return this.__endIndex - this.__startIndex;
        },
        initContext: function() {
          (this.ctx = this.dom.getContext('2d')), (this.ctx.dpr = this.dpr);
        },
        createBackBuffer: function() {
          var t = this.dpr;
          (this.domBack = h('back-' + this.id, this.painter, t)),
            (this.ctxBack = this.domBack.getContext('2d')),
            1 !== t && this.ctxBack.scale(t, t);
        },
        resize: function(t, e) {
          var i = this.dpr,
            r = this.dom,
            n = r.style,
            a = this.domBack;
          n && ((n.width = t + 'px'), (n.height = e + 'px')),
            (r.width = t * i),
            (r.height = e * i),
            a && ((a.width = t * i), (a.height = e * i), 1 !== i && this.ctxBack.scale(i, i));
        },
        clear: function(t, e) {
          var i,
            r = this.dom,
            n = this.ctx,
            s = r.width,
            h = r.height,
            l = ((e = e || this.clearColor), this.motionBlur && !t),
            u = this.lastFrameAlpha,
            c = this.dpr;
          (l &&
            (this.domBack || this.createBackBuffer(),
            (this.ctxBack.globalCompositeOperation = 'copy'),
            this.ctxBack.drawImage(r, 0, 0, s / c, h / c)),
          n.clearRect(0, 0, s, h),
          e && 'transparent' !== e) &&
            (e.colorStops
              ? ((i =
                  e.__canvasGradient || a.getGradient(n, e, { x: 0, y: 0, width: s, height: h })),
                (e.__canvasGradient = i))
              : e.image && (i = o.prototype.getCanvasPattern.call(e, n)),
            n.save(),
            (n.fillStyle = i || e),
            n.fillRect(0, 0, s, h),
            n.restore());
          if (l) {
            var f = this.domBack;
            n.save(), (n.globalAlpha = u), n.drawImage(f, 0, 0, s, h), n.restore();
          }
        }
      };
      var u = l;
      t.exports = u;
    },
    665: function(t, e, i) {
      var r = i(2),
        n = i(70).Dispatcher,
        a = i(381),
        o = i(377),
        s = function(t) {
          (t = t || {}),
            (this.stage = t.stage || {}),
            (this.onframe = t.onframe || function() {}),
            (this._clips = []),
            (this._running = !1),
            this._time,
            this._pausedTime,
            this._pauseStart,
            (this._paused = !1),
            n.call(this);
        };
      (s.prototype = {
        constructor: s,
        addClip: function(t) {
          this._clips.push(t);
        },
        addAnimator: function(t) {
          t.animation = this;
          for (var e = t.getClips(), i = 0; i < e.length; i++) this.addClip(e[i]);
        },
        removeClip: function(t) {
          var e = r.indexOf(this._clips, t);
          e >= 0 && this._clips.splice(e, 1);
        },
        removeAnimator: function(t) {
          for (var e = t.getClips(), i = 0; i < e.length; i++) this.removeClip(e[i]);
          t.animation = null;
        },
        _update: function() {
          for (
            var t = new Date().getTime() - this._pausedTime,
              e = t - this._time,
              i = this._clips,
              r = i.length,
              n = [],
              a = [],
              o = 0;
            o < r;
            o++
          ) {
            var s = i[o],
              h = s.step(t, e);
            h && (n.push(h), a.push(s));
          }
          for (o = 0; o < r; ) i[o]._needsRemove ? ((i[o] = i[r - 1]), i.pop(), r--) : o++;
          r = n.length;
          for (o = 0; o < r; o++) a[o].fire(n[o]);
          (this._time = t),
            this.onframe(e),
            this.trigger('frame', e),
            this.stage.update && this.stage.update();
        },
        _startLoop: function() {
          var t = this;
          (this._running = !0),
            a(function e() {
              t._running && (a(e), !t._paused && t._update());
            });
        },
        start: function() {
          (this._time = new Date().getTime()), (this._pausedTime = 0), this._startLoop();
        },
        stop: function() {
          this._running = !1;
        },
        pause: function() {
          this._paused || ((this._pauseStart = new Date().getTime()), (this._paused = !0));
        },
        resume: function() {
          this._paused &&
            ((this._pausedTime += new Date().getTime() - this._pauseStart), (this._paused = !1));
        },
        clear: function() {
          this._clips = [];
        },
        isFinished: function() {
          return !this._clips.length;
        },
        animate: function(t, e) {
          var i = new o(t, (e = e || {}).loop, e.getter, e.setter);
          return this.addAnimator(i), i;
        }
      }),
        r.mixin(s, n);
      var h = s;
      t.exports = h;
    },
    666: function(t, e, i) {
      var r = i(70),
        n = r.addEventListener,
        a = r.removeEventListener,
        o = r.normalizeEvent,
        s = i(2),
        h = i(99),
        l = i(35),
        u = [
          'click',
          'dblclick',
          'mousewheel',
          'mouseout',
          'mouseup',
          'mousedown',
          'mousemove',
          'contextmenu'
        ],
        c = ['touchstart', 'touchend', 'touchmove'],
        f = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },
        d = s.map(u, function(t) {
          var e = t.replace('mouse', 'pointer');
          return f[e] ? e : t;
        });
      function p(t) {
        return 'mousewheel' === t && l.browser.firefox ? 'DOMMouseScroll' : t;
      }
      function v(t) {
        (t._touching = !0),
          clearTimeout(t._touchTimer),
          (t._touchTimer = setTimeout(function() {
            t._touching = !1;
          }, 700));
      }
      var g = {
        mousemove: function(t) {
          (t = o(this.dom, t)), this.trigger('mousemove', t);
        },
        mouseout: function(t) {
          var e = (t = o(this.dom, t)).toElement || t.relatedTarget;
          if (e !== this.dom)
            for (; e && 9 !== e.nodeType; ) {
              if (e === this.dom) return;
              e = e.parentNode;
            }
          this.trigger('mouseout', t);
        },
        touchstart: function(t) {
          ((t = o(this.dom, t)).zrByTouch = !0),
            (this._lastTouchMoment = new Date()),
            this.handler.processGesture(t, 'start'),
            g.mousemove.call(this, t),
            g.mousedown.call(this, t),
            v(this);
        },
        touchmove: function(t) {
          ((t = o(this.dom, t)).zrByTouch = !0),
            this.handler.processGesture(t, 'change'),
            g.mousemove.call(this, t),
            v(this);
        },
        touchend: function(t) {
          ((t = o(this.dom, t)).zrByTouch = !0),
            this.handler.processGesture(t, 'end'),
            g.mouseup.call(this, t),
            +new Date() - this._lastTouchMoment < 300 && g.click.call(this, t),
            v(this);
        },
        pointerdown: function(t) {
          g.mousedown.call(this, t);
        },
        pointermove: function(t) {
          _(t) || g.mousemove.call(this, t);
        },
        pointerup: function(t) {
          g.mouseup.call(this, t);
        },
        pointerout: function(t) {
          _(t) || g.mouseout.call(this, t);
        }
      };
      function _(t) {
        var e = t.pointerType;
        return 'pen' === e || 'touch' === e;
      }
      function m(t) {
        var e;
        function i(e, i) {
          s.each(
            e,
            function(e) {
              n(t, p(e), i._handlers[e]);
            },
            i
          );
        }
        h.call(this),
          (this.dom = t),
          (this._touching = !1),
          this._touchTimer,
          (this._handlers = {}),
          (e = this),
          s.each(c, function(t) {
            e._handlers[t] = s.bind(g[t], e);
          }),
          s.each(d, function(t) {
            e._handlers[t] = s.bind(g[t], e);
          }),
          s.each(u, function(t) {
            e._handlers[t] = (function(t, e) {
              return function() {
                if (!e._touching) return t.apply(e, arguments);
              };
            })(g[t], e);
          }),
          l.pointerEventsSupported
            ? i(d, this)
            : (l.touchEventsSupported && i(c, this), i(u, this));
      }
      s.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function(
        t
      ) {
        g[t] = function(e) {
          (e = o(this.dom, e)), this.trigger(t, e);
        };
      });
      var y = m.prototype;
      (y.dispose = function() {
        for (var t = u.concat(c), e = 0; e < t.length; e++) {
          var i = t[e];
          a(this.dom, p(i), this._handlers[i]);
        }
      }),
        (y.setCursor = function(t) {
          this.dom.style && (this.dom.style.cursor = t || 'default');
        }),
        s.mixin(m, h);
      var x = m;
      t.exports = x;
    },
    670: function(t, e, i) {
      var r = i(122),
        n = i(386),
        a = i(671),
        o = i(387),
        s = i(672),
        h = i(388).normalizeRadian,
        l = i(85),
        u = i(389),
        c = r.CMD,
        f = 2 * Math.PI,
        d = 1e-4;
      var p = [-1, -1, -1],
        v = [-1, -1];
      function g() {
        var t = v[0];
        (v[0] = v[1]), (v[1] = t);
      }
      function _(t, e, i, r, n, a, o, s, h, u) {
        if ((u > e && u > r && u > a && u > s) || (u < e && u < r && u < a && u < s)) return 0;
        var c = l.cubicRootAt(e, r, a, s, u, p);
        if (0 === c) return 0;
        for (var f, d, _ = 0, m = -1, y = 0; y < c; y++) {
          var x = p[y],
            w = 0 === x || 1 === x ? 0.5 : 1;
          l.cubicAt(t, i, n, o, x) < h ||
            (m < 0 &&
              ((m = l.cubicExtrema(e, r, a, s, v)),
              v[1] < v[0] && m > 1 && g(),
              (f = l.cubicAt(e, r, a, s, v[0])),
              m > 1 && (d = l.cubicAt(e, r, a, s, v[1]))),
            2 === m
              ? x < v[0]
                ? (_ += f < e ? w : -w)
                : x < v[1]
                ? (_ += d < f ? w : -w)
                : (_ += s < d ? w : -w)
              : x < v[0]
              ? (_ += f < e ? w : -w)
              : (_ += s < f ? w : -w));
        }
        return _;
      }
      function m(t, e, i, r, n, a, o, s) {
        if ((s > e && s > r && s > a) || (s < e && s < r && s < a)) return 0;
        var h = l.quadraticRootAt(e, r, a, s, p);
        if (0 === h) return 0;
        var u = l.quadraticExtremum(e, r, a);
        if (u >= 0 && u <= 1) {
          for (var c = 0, f = l.quadraticAt(e, r, a, u), d = 0; d < h; d++) {
            var v = 0 === p[d] || 1 === p[d] ? 0.5 : 1;
            l.quadraticAt(t, i, n, p[d]) < o ||
              (p[d] < u ? (c += f < e ? v : -v) : (c += a < f ? v : -v));
          }
          return c;
        }
        v = 0 === p[0] || 1 === p[0] ? 0.5 : 1;
        return l.quadraticAt(t, i, n, p[0]) < o ? 0 : a < e ? v : -v;
      }
      function y(t, e, i, r, n, a, o, s) {
        if ((s -= e) > i || s < -i) return 0;
        var l = Math.sqrt(i * i - s * s);
        (p[0] = -l), (p[1] = l);
        var u = Math.abs(r - n);
        if (u < 1e-4) return 0;
        if (u % f < 1e-4) {
          (r = 0), (n = f);
          var c = a ? 1 : -1;
          return o >= p[0] + t && o <= p[1] + t ? c : 0;
        }
        if (a) {
          l = r;
          (r = h(n)), (n = h(l));
        } else (r = h(r)), (n = h(n));
        r > n && (n += f);
        for (var d = 0, v = 0; v < 2; v++) {
          var g = p[v];
          if (g + t > o) {
            var _ = Math.atan2(s, g);
            c = a ? 1 : -1;
            _ < 0 && (_ = f + _),
              ((_ >= r && _ <= n) || (_ + f >= r && _ + f <= n)) &&
                (_ > Math.PI / 2 && _ < 1.5 * Math.PI && (c = -c), (d += c));
          }
        }
        return d;
      }
      function x(t, e, i, r, h) {
        for (var l, f, p = 0, v = 0, g = 0, x = 0, w = 0, b = 0; b < t.length; ) {
          var T = t[b++];
          switch (
            (T === c.M && b > 1 && (i || (p += u(v, g, x, w, r, h))),
            1 === b && ((x = v = t[b]), (w = g = t[b + 1])),
            T)
          ) {
            case c.M:
              (v = x = t[b++]), (g = w = t[b++]);
              break;
            case c.L:
              if (i) {
                if (n.containStroke(v, g, t[b], t[b + 1], e, r, h)) return !0;
              } else p += u(v, g, t[b], t[b + 1], r, h) || 0;
              (v = t[b++]), (g = t[b++]);
              break;
            case c.C:
              if (i) {
                if (a.containStroke(v, g, t[b++], t[b++], t[b++], t[b++], t[b], t[b + 1], e, r, h))
                  return !0;
              } else p += _(v, g, t[b++], t[b++], t[b++], t[b++], t[b], t[b + 1], r, h) || 0;
              (v = t[b++]), (g = t[b++]);
              break;
            case c.Q:
              if (i) {
                if (o.containStroke(v, g, t[b++], t[b++], t[b], t[b + 1], e, r, h)) return !0;
              } else p += m(v, g, t[b++], t[b++], t[b], t[b + 1], r, h) || 0;
              (v = t[b++]), (g = t[b++]);
              break;
            case c.A:
              var k = t[b++],
                S = t[b++],
                A = t[b++],
                C = t[b++],
                P = t[b++],
                M = t[b++];
              b += 1;
              var L = 1 - t[b++],
                z = Math.cos(P) * A + k,
                D = Math.sin(P) * C + S;
              b > 1 ? (p += u(v, g, z, D, r, h)) : ((x = z), (w = D));
              var B = ((r - k) * C) / A + k;
              if (i) {
                if (s.containStroke(k, S, C, P, P + M, L, e, B, h)) return !0;
              } else p += y(k, S, C, P, P + M, L, B, h);
              (v = Math.cos(P + M) * A + k), (g = Math.sin(P + M) * C + S);
              break;
            case c.R:
              (x = v = t[b++]), (w = g = t[b++]);
              (z = x + t[b++]), (D = w + t[b++]);
              if (i) {
                if (
                  n.containStroke(x, w, z, w, e, r, h) ||
                  n.containStroke(z, w, z, D, e, r, h) ||
                  n.containStroke(z, D, x, D, e, r, h) ||
                  n.containStroke(x, D, x, w, e, r, h)
                )
                  return !0;
              } else (p += u(z, w, z, D, r, h)), (p += u(x, D, x, w, r, h));
              break;
            case c.Z:
              if (i) {
                if (n.containStroke(v, g, x, w, e, r, h)) return !0;
              } else p += u(v, g, x, w, r, h);
              (v = x), (g = w);
          }
        }
        return (
          i || ((l = g), (f = w), Math.abs(l - f) < d) || (p += u(v, g, x, w, r, h) || 0), 0 !== p
        );
      }
      (e.contain = function(t, e, i) {
        return x(t, 0, !1, e, i);
      }),
        (e.containStroke = function(t, e, i, r) {
          return x(t, e, !0, i, r);
        });
    },
    671: function(t, e, i) {
      var r = i(85);
      e.containStroke = function(t, e, i, n, a, o, s, h, l, u, c) {
        if (0 === l) return !1;
        var f = l;
        return (
          !(
            (c > e + f && c > n + f && c > o + f && c > h + f) ||
            (c < e - f && c < n - f && c < o - f && c < h - f) ||
            (u > t + f && u > i + f && u > a + f && u > s + f) ||
            (u < t - f && u < i - f && u < a - f && u < s - f)
          ) && r.cubicProjectPoint(t, e, i, n, a, o, s, h, u, c, null) <= f / 2
        );
      };
    },
    672: function(t, e, i) {
      var r = i(388).normalizeRadian,
        n = 2 * Math.PI;
      e.containStroke = function(t, e, i, a, o, s, h, l, u) {
        if (0 === h) return !1;
        var c = h;
        (l -= t), (u -= e);
        var f = Math.sqrt(l * l + u * u);
        if (f - c > i || f + c < i) return !1;
        if (Math.abs(a - o) % n < 1e-4) return !0;
        if (s) {
          var d = a;
          (a = r(o)), (o = r(d));
        } else (a = r(a)), (o = r(o));
        a > o && (o += n);
        var p = Math.atan2(u, l);
        return p < 0 && (p += n), (p >= a && p <= o) || (p + n >= a && p + n <= o);
      };
    },
    673: function(t, e, i) {
      var r = i(122),
        n = i(28).applyTransform,
        a = r.CMD,
        o = [[], [], []],
        s = Math.sqrt,
        h = Math.atan2;
      t.exports = function(t, e) {
        var i,
          r,
          l,
          u,
          c,
          f = t.data,
          d = a.M,
          p = a.C,
          v = a.L,
          g = a.R,
          _ = a.A,
          m = a.Q;
        for (l = 0, u = 0; l < f.length; ) {
          switch (((i = f[l++]), (u = l), (r = 0), i)) {
            case d:
            case v:
              r = 1;
              break;
            case p:
              r = 3;
              break;
            case m:
              r = 2;
              break;
            case _:
              var y = e[4],
                x = e[5],
                w = s(e[0] * e[0] + e[1] * e[1]),
                b = s(e[2] * e[2] + e[3] * e[3]),
                T = h(-e[1] / b, e[0] / w);
              (f[l] *= w),
                (f[l++] += y),
                (f[l] *= b),
                (f[l++] += x),
                (f[l++] *= w),
                (f[l++] *= b),
                (f[l++] += T),
                (f[l++] += T),
                (u = l += 2);
              break;
            case g:
              (k[0] = f[l++]),
                (k[1] = f[l++]),
                n(k, k, e),
                (f[u++] = k[0]),
                (f[u++] = k[1]),
                (k[0] += f[l++]),
                (k[1] += f[l++]),
                n(k, k, e),
                (f[u++] = k[0]),
                (f[u++] = k[1]);
          }
          for (c = 0; c < r; c++) {
            var k;
            ((k = o[c])[0] = f[l++]), (k[1] = f[l++]), n(k, k, e), (f[u++] = k[0]), (f[u++] = k[1]);
          }
        }
      };
    },
    674: function(t, e, i) {
      var r = i(33),
        n = i(391),
        a = r.extend({
          type: 'sector',
          shape: { cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 },
          brush: n(r.prototype.brush),
          buildPath: function(t, e) {
            var i = e.cx,
              r = e.cy,
              n = Math.max(e.r0 || 0, 0),
              a = Math.max(e.r, 0),
              o = e.startAngle,
              s = e.endAngle,
              h = e.clockwise,
              l = Math.cos(o),
              u = Math.sin(o);
            t.moveTo(l * n + i, u * n + r),
              t.lineTo(l * a + i, u * a + r),
              t.arc(i, r, a, o, s, !h),
              t.lineTo(Math.cos(s) * n + i, Math.sin(s) * n + r),
              0 !== n && t.arc(i, r, n, s, o, h),
              t.closePath();
          }
        });
      t.exports = a;
    },
    675: function(t, e, i) {
      var r = i(33).extend({
        type: 'ring',
        shape: { cx: 0, cy: 0, r: 0, r0: 0 },
        buildPath: function(t, e) {
          var i = e.cx,
            r = e.cy,
            n = 2 * Math.PI;
          t.moveTo(i + e.r, r),
            t.arc(i, r, e.r, 0, n, !1),
            t.moveTo(i + e.r0, r),
            t.arc(i, r, e.r0, 0, n, !0);
        }
      });
      t.exports = r;
    },
    676: function(t, e, i) {
      var r = i(28).distance;
      function n(t, e, i, r, n, a, o) {
        var s = 0.5 * (i - t),
          h = 0.5 * (r - e);
        return (2 * (e - i) + s + h) * o + (-3 * (e - i) - 2 * s - h) * a + s * n + e;
      }
      t.exports = function(t, e) {
        for (var i = t.length, a = [], o = 0, s = 1; s < i; s++) o += r(t[s - 1], t[s]);
        var h = o / 2;
        for (h = h < i ? i : h, s = 0; s < h; s++) {
          var l,
            u,
            c,
            f = (s / (h - 1)) * (e ? i : i - 1),
            d = Math.floor(f),
            p = f - d,
            v = t[d % i];
          e
            ? ((l = t[(d - 1 + i) % i]), (u = t[(d + 1) % i]), (c = t[(d + 2) % i]))
            : ((l = t[0 === d ? d : d - 1]),
              (u = t[d > i - 2 ? i - 1 : d + 1]),
              (c = t[d > i - 3 ? i - 1 : d + 2]));
          var g = p * p,
            _ = p * g;
          a.push([n(l[0], v[0], u[0], c[0], p, g, _), n(l[1], v[1], u[1], c[1], p, g, _)]);
        }
        return a;
      };
    },
    677: function(t, e, i) {
      var r = i(28),
        n = r.min,
        a = r.max,
        o = r.scale,
        s = r.distance,
        h = r.add,
        l = r.clone,
        u = r.sub;
      t.exports = function(t, e, i, r) {
        var c,
          f,
          d,
          p,
          v = [],
          g = [],
          _ = [],
          m = [];
        if (r) {
          (d = [1 / 0, 1 / 0]), (p = [-1 / 0, -1 / 0]);
          for (var y = 0, x = t.length; y < x; y++) n(d, d, t[y]), a(p, p, t[y]);
          n(d, d, r[0]), a(p, p, r[1]);
        }
        for (y = 0, x = t.length; y < x; y++) {
          var w = t[y];
          if (i) (c = t[y ? y - 1 : x - 1]), (f = t[(y + 1) % x]);
          else {
            if (0 === y || y === x - 1) {
              v.push(l(t[y]));
              continue;
            }
            (c = t[y - 1]), (f = t[y + 1]);
          }
          u(g, f, c), o(g, g, e);
          var b = s(w, c),
            T = s(w, f),
            k = b + T;
          0 !== k && ((b /= k), (T /= k)), o(_, g, -b), o(m, g, T);
          var S = h([], w, _),
            A = h([], w, m);
          r && (a(S, S, d), n(S, S, p), a(A, A, d), n(A, A, p)), v.push(S), v.push(A);
        }
        return i && v.push(v.shift()), v;
      };
    },
    678: function(t, e, i) {
      var r = i(33),
        n = i(28),
        a = i(85),
        o = a.quadraticSubdivide,
        s = a.cubicSubdivide,
        h = a.quadraticAt,
        l = a.cubicAt,
        u = a.quadraticDerivativeAt,
        c = a.cubicDerivativeAt,
        f = [];
      function d(t, e, i) {
        var r = t.cpx2,
          n = t.cpy2;
        return null === r || null === n
          ? [(i ? c : l)(t.x1, t.cpx1, t.cpx2, t.x2, e), (i ? c : l)(t.y1, t.cpy1, t.cpy2, t.y2, e)]
          : [(i ? u : h)(t.x1, t.cpx1, t.x2, e), (i ? u : h)(t.y1, t.cpy1, t.y2, e)];
      }
      var p = r.extend({
        type: 'bezier-curve',
        shape: { x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1 },
        style: { stroke: '#000', fill: null },
        buildPath: function(t, e) {
          var i = e.x1,
            r = e.y1,
            n = e.x2,
            a = e.y2,
            h = e.cpx1,
            l = e.cpy1,
            u = e.cpx2,
            c = e.cpy2,
            d = e.percent;
          0 !== d &&
            (t.moveTo(i, r),
            null == u || null == c
              ? (d < 1 &&
                  (o(i, h, n, d, f),
                  (h = f[1]),
                  (n = f[2]),
                  o(r, l, a, d, f),
                  (l = f[1]),
                  (a = f[2])),
                t.quadraticCurveTo(h, l, n, a))
              : (d < 1 &&
                  (s(i, h, u, n, d, f),
                  (h = f[1]),
                  (u = f[2]),
                  (n = f[3]),
                  s(r, l, c, a, d, f),
                  (l = f[1]),
                  (c = f[2]),
                  (a = f[3])),
                t.bezierCurveTo(h, l, u, c, n, a)));
        },
        pointAt: function(t) {
          return d(this.shape, t, !1);
        },
        tangentAt: function(t) {
          var e = d(this.shape, t, !0);
          return n.normalize(e, e);
        }
      });
      t.exports = p;
    },
    679: function(t, e, i) {
      var r = i(33).extend({
        type: 'arc',
        shape: { cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0 },
        style: { stroke: '#000', fill: null },
        buildPath: function(t, e) {
          var i = e.cx,
            r = e.cy,
            n = Math.max(e.r, 0),
            a = e.startAngle,
            o = e.endAngle,
            s = e.clockwise,
            h = Math.cos(a),
            l = Math.sin(a);
          t.moveTo(h * n + i, l * n + r), t.arc(i, r, n, a, o, !s);
        }
      });
      t.exports = r;
    },
    680: function(t, e, i) {
      var r = i(33),
        n = r.extend({
          type: 'compound',
          shape: { paths: null },
          _updatePathDirty: function() {
            for (var t = this.__dirtyPath, e = this.shape.paths, i = 0; i < e.length; i++)
              t = t || e[i].__dirtyPath;
            (this.__dirtyPath = t), (this.__dirty = this.__dirty || t);
          },
          beforeBrush: function() {
            this._updatePathDirty();
            for (
              var t = this.shape.paths || [], e = this.getGlobalScale(), i = 0;
              i < t.length;
              i++
            )
              t[i].path || t[i].createPathProxy(),
                t[i].path.setScale(e[0], e[1], t[i].segmentIgnoreThreshold);
          },
          buildPath: function(t, e) {
            for (var i = e.paths || [], r = 0; r < i.length; r++) i[r].buildPath(t, i[r].shape, !0);
          },
          afterBrush: function() {
            for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1;
          },
          getBoundingRect: function() {
            return this._updatePathDirty(), r.prototype.getBoundingRect.call(this);
          }
        });
      t.exports = n;
    },
    681: function(t, e, i) {
      var r = i(2),
        n = i(191),
        a = function(t, e, i, r, a) {
          (this.x = null == t ? 0.5 : t),
            (this.y = null == e ? 0.5 : e),
            (this.r = null == i ? 0.5 : i),
            (this.type = 'radial'),
            (this.global = a || !1),
            n.call(this, r);
        };
      (a.prototype = { constructor: a }), r.inherits(a, n);
      var o = a;
      t.exports = o;
    },
    695: function(t, e, i) {
      var r = i(33).extend({
        type: 'ellipse',
        shape: { cx: 0, cy: 0, rx: 0, ry: 0 },
        buildPath: function(t, e) {
          var i = 0.5522848,
            r = e.cx,
            n = e.cy,
            a = e.rx,
            o = e.ry,
            s = a * i,
            h = o * i;
          t.moveTo(r - a, n),
            t.bezierCurveTo(r - a, n - h, r - s, n - o, r, n - o),
            t.bezierCurveTo(r + s, n - o, r + a, n - h, r + a, n),
            t.bezierCurveTo(r + a, n + h, r + s, n + o, r, n + o),
            t.bezierCurveTo(r - s, n + o, r - a, n + h, r - a, n),
            t.closePath();
        }
      });
      t.exports = r;
    },
    70: function(t, e, i) {
      var r = i(99);
      e.Dispatcher = r;
      var n = i(35),
        a = i(657).buildTransformer,
        o = 'undefined' !== typeof window && !!window.addEventListener,
        s = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        h = '___zrEVENTSAVED',
        l = [];
      function u(t, e, i, r) {
        return (
          (i = i || {}),
          r || !n.canvasSupported
            ? c(t, e, i)
            : n.browser.firefox && null != e.layerX && e.layerX !== e.offsetX
            ? ((i.zrX = e.layerX), (i.zrY = e.layerY))
            : null != e.offsetX
            ? ((i.zrX = e.offsetX), (i.zrY = e.offsetY))
            : c(t, e, i),
          i
        );
      }
      function c(t, e, i) {
        if (t.getBoundingClientRect && n.domSupported) {
          var r = e.clientX,
            o = e.clientY;
          if ('CANVAS' === t.nodeName.toUpperCase()) {
            var s = t.getBoundingClientRect();
            return (i.zrX = r - s.left), void (i.zrY = o - s.top);
          }
          var u = t[h] || (t[h] = {}),
            c = (function(t, e) {
              for (
                var i = e.transformer, r = e.srcCoords, n = !0, o = [], s = [], h = 0;
                h < 4;
                h++
              ) {
                var l = t[h].getBoundingClientRect(),
                  u = 2 * h,
                  c = l.left,
                  f = l.top;
                o.push(c, f),
                  (n &= r && c === r[u] && f === r[u + 1]),
                  s.push(t[h].offsetLeft, t[h].offsetTop);
              }
              return n ? i : ((e.srcCoords = o), (e.transformer = a(o, s)));
            })(
              (function(t, e) {
                var i = e.markers;
                if (i) return i;
                i = e.markers = [];
                for (var r = ['left', 'right'], n = ['top', 'bottom'], a = 0; a < 4; a++) {
                  var o = document.createElement('div'),
                    s = o.style,
                    h = a % 2,
                    l = (a >> 1) % 2;
                  (s.cssText = [
                    'position:absolute',
                    'visibility: hidden',
                    'padding: 0',
                    'margin: 0',
                    'border-width: 0',
                    'width:0',
                    'height:0',
                    r[h] + ':0',
                    n[l] + ':0',
                    r[1 - h] + ':auto',
                    n[1 - l] + ':auto',
                    ''
                  ].join('!important;')),
                    t.appendChild(o),
                    i.push(o);
                }
                return i;
              })(t, u),
              u
            );
          if (c) return c(l, r, o), (i.zrX = l[0]), void (i.zrY = l[1]);
        }
        i.zrX = i.zrY = 0;
      }
      var f = o
        ? function(t) {
            t.preventDefault(), t.stopPropagation(), (t.cancelBubble = !0);
          }
        : function(t) {
            (t.returnValue = !1), (t.cancelBubble = !0);
          };
      (e.clientToLocal = u),
        (e.normalizeEvent = function(t, e, i) {
          if (null != (e = e || window.event).zrX) return e;
          var r = e.type;
          if (r && r.indexOf('touch') >= 0) {
            var n = 'touchend' !== r ? e.targetTouches[0] : e.changedTouches[0];
            n && u(t, n, e, i);
          } else
            u(t, e, e, i), (e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3);
          var a = e.button;
          return (
            null == e.which &&
              void 0 !== a &&
              s.test(e.type) &&
              (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
            e
          );
        }),
        (e.addEventListener = function(t, e, i) {
          o ? t.addEventListener(e, i) : t.attachEvent('on' + e, i);
        }),
        (e.removeEventListener = function(t, e, i) {
          o ? t.removeEventListener(e, i) : t.detachEvent('on' + e, i);
        }),
        (e.stop = f),
        (e.isMiddleOrRightButtonOnMouseUpDown = function(t) {
          return 2 === t.which || 3 === t.which;
        }),
        (e.notLeftMouse = function(t) {
          return t.which > 1;
        });
    },
    71: function(t, e, i) {
      var r = i(378),
        n = {
          transparent: [0, 0, 0, 0],
          aliceblue: [240, 248, 255, 1],
          antiquewhite: [250, 235, 215, 1],
          aqua: [0, 255, 255, 1],
          aquamarine: [127, 255, 212, 1],
          azure: [240, 255, 255, 1],
          beige: [245, 245, 220, 1],
          bisque: [255, 228, 196, 1],
          black: [0, 0, 0, 1],
          blanchedalmond: [255, 235, 205, 1],
          blue: [0, 0, 255, 1],
          blueviolet: [138, 43, 226, 1],
          brown: [165, 42, 42, 1],
          burlywood: [222, 184, 135, 1],
          cadetblue: [95, 158, 160, 1],
          chartreuse: [127, 255, 0, 1],
          chocolate: [210, 105, 30, 1],
          coral: [255, 127, 80, 1],
          cornflowerblue: [100, 149, 237, 1],
          cornsilk: [255, 248, 220, 1],
          crimson: [220, 20, 60, 1],
          cyan: [0, 255, 255, 1],
          darkblue: [0, 0, 139, 1],
          darkcyan: [0, 139, 139, 1],
          darkgoldenrod: [184, 134, 11, 1],
          darkgray: [169, 169, 169, 1],
          darkgreen: [0, 100, 0, 1],
          darkgrey: [169, 169, 169, 1],
          darkkhaki: [189, 183, 107, 1],
          darkmagenta: [139, 0, 139, 1],
          darkolivegreen: [85, 107, 47, 1],
          darkorange: [255, 140, 0, 1],
          darkorchid: [153, 50, 204, 1],
          darkred: [139, 0, 0, 1],
          darksalmon: [233, 150, 122, 1],
          darkseagreen: [143, 188, 143, 1],
          darkslateblue: [72, 61, 139, 1],
          darkslategray: [47, 79, 79, 1],
          darkslategrey: [47, 79, 79, 1],
          darkturquoise: [0, 206, 209, 1],
          darkviolet: [148, 0, 211, 1],
          deeppink: [255, 20, 147, 1],
          deepskyblue: [0, 191, 255, 1],
          dimgray: [105, 105, 105, 1],
          dimgrey: [105, 105, 105, 1],
          dodgerblue: [30, 144, 255, 1],
          firebrick: [178, 34, 34, 1],
          floralwhite: [255, 250, 240, 1],
          forestgreen: [34, 139, 34, 1],
          fuchsia: [255, 0, 255, 1],
          gainsboro: [220, 220, 220, 1],
          ghostwhite: [248, 248, 255, 1],
          gold: [255, 215, 0, 1],
          goldenrod: [218, 165, 32, 1],
          gray: [128, 128, 128, 1],
          green: [0, 128, 0, 1],
          greenyellow: [173, 255, 47, 1],
          grey: [128, 128, 128, 1],
          honeydew: [240, 255, 240, 1],
          hotpink: [255, 105, 180, 1],
          indianred: [205, 92, 92, 1],
          indigo: [75, 0, 130, 1],
          ivory: [255, 255, 240, 1],
          khaki: [240, 230, 140, 1],
          lavender: [230, 230, 250, 1],
          lavenderblush: [255, 240, 245, 1],
          lawngreen: [124, 252, 0, 1],
          lemonchiffon: [255, 250, 205, 1],
          lightblue: [173, 216, 230, 1],
          lightcoral: [240, 128, 128, 1],
          lightcyan: [224, 255, 255, 1],
          lightgoldenrodyellow: [250, 250, 210, 1],
          lightgray: [211, 211, 211, 1],
          lightgreen: [144, 238, 144, 1],
          lightgrey: [211, 211, 211, 1],
          lightpink: [255, 182, 193, 1],
          lightsalmon: [255, 160, 122, 1],
          lightseagreen: [32, 178, 170, 1],
          lightskyblue: [135, 206, 250, 1],
          lightslategray: [119, 136, 153, 1],
          lightslategrey: [119, 136, 153, 1],
          lightsteelblue: [176, 196, 222, 1],
          lightyellow: [255, 255, 224, 1],
          lime: [0, 255, 0, 1],
          limegreen: [50, 205, 50, 1],
          linen: [250, 240, 230, 1],
          magenta: [255, 0, 255, 1],
          maroon: [128, 0, 0, 1],
          mediumaquamarine: [102, 205, 170, 1],
          mediumblue: [0, 0, 205, 1],
          mediumorchid: [186, 85, 211, 1],
          mediumpurple: [147, 112, 219, 1],
          mediumseagreen: [60, 179, 113, 1],
          mediumslateblue: [123, 104, 238, 1],
          mediumspringgreen: [0, 250, 154, 1],
          mediumturquoise: [72, 209, 204, 1],
          mediumvioletred: [199, 21, 133, 1],
          midnightblue: [25, 25, 112, 1],
          mintcream: [245, 255, 250, 1],
          mistyrose: [255, 228, 225, 1],
          moccasin: [255, 228, 181, 1],
          navajowhite: [255, 222, 173, 1],
          navy: [0, 0, 128, 1],
          oldlace: [253, 245, 230, 1],
          olive: [128, 128, 0, 1],
          olivedrab: [107, 142, 35, 1],
          orange: [255, 165, 0, 1],
          orangered: [255, 69, 0, 1],
          orchid: [218, 112, 214, 1],
          palegoldenrod: [238, 232, 170, 1],
          palegreen: [152, 251, 152, 1],
          paleturquoise: [175, 238, 238, 1],
          palevioletred: [219, 112, 147, 1],
          papayawhip: [255, 239, 213, 1],
          peachpuff: [255, 218, 185, 1],
          peru: [205, 133, 63, 1],
          pink: [255, 192, 203, 1],
          plum: [221, 160, 221, 1],
          powderblue: [176, 224, 230, 1],
          purple: [128, 0, 128, 1],
          red: [255, 0, 0, 1],
          rosybrown: [188, 143, 143, 1],
          royalblue: [65, 105, 225, 1],
          saddlebrown: [139, 69, 19, 1],
          salmon: [250, 128, 114, 1],
          sandybrown: [244, 164, 96, 1],
          seagreen: [46, 139, 87, 1],
          seashell: [255, 245, 238, 1],
          sienna: [160, 82, 45, 1],
          silver: [192, 192, 192, 1],
          skyblue: [135, 206, 235, 1],
          slateblue: [106, 90, 205, 1],
          slategray: [112, 128, 144, 1],
          slategrey: [112, 128, 144, 1],
          snow: [255, 250, 250, 1],
          springgreen: [0, 255, 127, 1],
          steelblue: [70, 130, 180, 1],
          tan: [210, 180, 140, 1],
          teal: [0, 128, 128, 1],
          thistle: [216, 191, 216, 1],
          tomato: [255, 99, 71, 1],
          turquoise: [64, 224, 208, 1],
          violet: [238, 130, 238, 1],
          wheat: [245, 222, 179, 1],
          white: [255, 255, 255, 1],
          whitesmoke: [245, 245, 245, 1],
          yellow: [255, 255, 0, 1],
          yellowgreen: [154, 205, 50, 1]
        };
      function a(t) {
        return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t;
      }
      function o(t) {
        return t < 0 ? 0 : t > 1 ? 1 : t;
      }
      function s(t) {
        return t.length && '%' === t.charAt(t.length - 1)
          ? a((parseFloat(t) / 100) * 255)
          : a(parseInt(t, 10));
      }
      function h(t) {
        return t.length && '%' === t.charAt(t.length - 1)
          ? o(parseFloat(t) / 100)
          : o(parseFloat(t));
      }
      function l(t, e, i) {
        return (
          i < 0 ? (i += 1) : i > 1 && (i -= 1),
          6 * i < 1
            ? t + (e - t) * i * 6
            : 2 * i < 1
            ? e
            : 3 * i < 2
            ? t + (e - t) * (2 / 3 - i) * 6
            : t
        );
      }
      function u(t, e, i) {
        return t + (e - t) * i;
      }
      function c(t, e, i, r, n) {
        return (t[0] = e), (t[1] = i), (t[2] = r), (t[3] = n), t;
      }
      function f(t, e) {
        return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
      }
      var d = new r(20),
        p = null;
      function v(t, e) {
        p && f(p, e), (p = d.put(t, p || e.slice()));
      }
      function g(t, e) {
        if (t) {
          e = e || [];
          var i = d.get(t);
          if (i) return f(e, i);
          var r,
            a = (t += '').replace(/ /g, '').toLowerCase();
          if (a in n) return f(e, n[a]), v(t, e), e;
          if ('#' === a.charAt(0))
            return 4 === a.length
              ? (r = parseInt(a.substr(1), 16)) >= 0 && r <= 4095
                ? (c(
                    e,
                    ((3840 & r) >> 4) | ((3840 & r) >> 8),
                    (240 & r) | ((240 & r) >> 4),
                    (15 & r) | ((15 & r) << 4),
                    1
                  ),
                  v(t, e),
                  e)
                : void c(e, 0, 0, 0, 1)
              : 7 === a.length
              ? (r = parseInt(a.substr(1), 16)) >= 0 && r <= 16777215
                ? (c(e, (16711680 & r) >> 16, (65280 & r) >> 8, 255 & r, 1), v(t, e), e)
                : void c(e, 0, 0, 0, 1)
              : void 0;
          var o = a.indexOf('('),
            l = a.indexOf(')');
          if (-1 !== o && l + 1 === a.length) {
            var u = a.substr(0, o),
              p = a.substr(o + 1, l - (o + 1)).split(','),
              g = 1;
            switch (u) {
              case 'rgba':
                if (4 !== p.length) return void c(e, 0, 0, 0, 1);
                g = h(p.pop());
              case 'rgb':
                return 3 !== p.length
                  ? void c(e, 0, 0, 0, 1)
                  : (c(e, s(p[0]), s(p[1]), s(p[2]), g), v(t, e), e);
              case 'hsla':
                return 4 !== p.length
                  ? void c(e, 0, 0, 0, 1)
                  : ((p[3] = h(p[3])), _(p, e), v(t, e), e);
              case 'hsl':
                return 3 !== p.length ? void c(e, 0, 0, 0, 1) : (_(p, e), v(t, e), e);
              default:
                return;
            }
          }
          c(e, 0, 0, 0, 1);
        }
      }
      function _(t, e) {
        var i = (((parseFloat(t[0]) % 360) + 360) % 360) / 360,
          r = h(t[1]),
          n = h(t[2]),
          o = n <= 0.5 ? n * (r + 1) : n + r - n * r,
          s = 2 * n - o;
        return (
          c(
            (e = e || []),
            a(255 * l(s, o, i + 1 / 3)),
            a(255 * l(s, o, i)),
            a(255 * l(s, o, i - 1 / 3)),
            1
          ),
          4 === t.length && (e[3] = t[3]),
          e
        );
      }
      function m(t, e, i) {
        if (e && e.length && t >= 0 && t <= 1) {
          i = i || [];
          var r = t * (e.length - 1),
            n = Math.floor(r),
            s = Math.ceil(r),
            h = e[n],
            l = e[s],
            c = r - n;
          return (
            (i[0] = a(u(h[0], l[0], c))),
            (i[1] = a(u(h[1], l[1], c))),
            (i[2] = a(u(h[2], l[2], c))),
            (i[3] = o(u(h[3], l[3], c))),
            i
          );
        }
      }
      var y = m;
      function x(t, e, i) {
        if (e && e.length && t >= 0 && t <= 1) {
          var r = t * (e.length - 1),
            n = Math.floor(r),
            s = Math.ceil(r),
            h = g(e[n]),
            l = g(e[s]),
            c = r - n,
            f = b(
              [a(u(h[0], l[0], c)), a(u(h[1], l[1], c)), a(u(h[2], l[2], c)), o(u(h[3], l[3], c))],
              'rgba'
            );
          return i ? { color: f, leftIndex: n, rightIndex: s, value: r } : f;
        }
      }
      var w = x;
      function b(t, e) {
        if (t && t.length) {
          var i = t[0] + ',' + t[1] + ',' + t[2];
          return (
            ('rgba' !== e && 'hsva' !== e && 'hsla' !== e) || (i += ',' + t[3]), e + '(' + i + ')'
          );
        }
      }
      (e.parse = g),
        (e.lift = function(t, e) {
          var i = g(t);
          if (i) {
            for (var r = 0; r < 3; r++)
              (i[r] = e < 0 ? (i[r] * (1 - e)) | 0 : ((255 - i[r]) * e + i[r]) | 0),
                i[r] > 255 ? (i[r] = 255) : t[r] < 0 && (i[r] = 0);
            return b(i, 4 === i.length ? 'rgba' : 'rgb');
          }
        }),
        (e.toHex = function(t) {
          var e = g(t);
          if (e) return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1);
        }),
        (e.fastLerp = m),
        (e.fastMapToColor = y),
        (e.lerp = x),
        (e.mapToColor = w),
        (e.modifyHSL = function(t, e, i, r) {
          if ((t = g(t)))
            return (
              (t = (function(t) {
                if (t) {
                  var e,
                    i,
                    r = t[0] / 255,
                    n = t[1] / 255,
                    a = t[2] / 255,
                    o = Math.min(r, n, a),
                    s = Math.max(r, n, a),
                    h = s - o,
                    l = (s + o) / 2;
                  if (0 === h) (e = 0), (i = 0);
                  else {
                    i = l < 0.5 ? h / (s + o) : h / (2 - s - o);
                    var u = ((s - r) / 6 + h / 2) / h,
                      c = ((s - n) / 6 + h / 2) / h,
                      f = ((s - a) / 6 + h / 2) / h;
                    r === s
                      ? (e = f - c)
                      : n === s
                      ? (e = 1 / 3 + u - f)
                      : a === s && (e = 2 / 3 + c - u),
                      e < 0 && (e += 1),
                      e > 1 && (e -= 1);
                  }
                  var d = [360 * e, i, l];
                  return null != t[3] && d.push(t[3]), d;
                }
              })(t)),
              null != e && (t[0] = ((n = e), (n = Math.round(n)) < 0 ? 0 : n > 360 ? 360 : n)),
              null != i && (t[1] = h(i)),
              null != r && (t[2] = h(r)),
              b(_(t), 'rgba')
            );
          var n;
        }),
        (e.modifyAlpha = function(t, e) {
          if ((t = g(t)) && null != e) return (t[3] = o(e)), b(t, 'rgba');
        }),
        (e.stringify = b);
    },
    85: function(t, e, i) {
      var r = i(28),
        n = r.create,
        a = r.distSquare,
        o = Math.pow,
        s = Math.sqrt,
        h = 1e-8,
        l = 1e-4,
        u = s(3),
        c = 1 / 3,
        f = n(),
        d = n(),
        p = n();
      function v(t) {
        return t > -h && t < h;
      }
      function g(t) {
        return t > h || t < -h;
      }
      function _(t, e, i, r, n) {
        var a = 1 - n;
        return a * a * (a * t + 3 * n * e) + n * n * (n * r + 3 * a * i);
      }
      function m(t, e, i, r) {
        var n = 1 - r;
        return n * (n * t + 2 * r * e) + r * r * i;
      }
      (e.cubicAt = _),
        (e.cubicDerivativeAt = function(t, e, i, r, n) {
          var a = 1 - n;
          return 3 * (((e - t) * a + 2 * (i - e) * n) * a + (r - i) * n * n);
        }),
        (e.cubicRootAt = function(t, e, i, r, n, a) {
          var h = r + 3 * (e - i) - t,
            l = 3 * (i - 2 * e + t),
            f = 3 * (e - t),
            d = t - n,
            p = l * l - 3 * h * f,
            g = l * f - 9 * h * d,
            _ = f * f - 3 * l * d,
            m = 0;
          if (v(p) && v(g)) {
            if (v(l)) a[0] = 0;
            else (M = -f / l) >= 0 && M <= 1 && (a[m++] = M);
          } else {
            var y = g * g - 4 * p * _;
            if (v(y)) {
              var x = g / p,
                w = -x / 2;
              (M = -l / h + x) >= 0 && M <= 1 && (a[m++] = M), w >= 0 && w <= 1 && (a[m++] = w);
            } else if (y > 0) {
              var b = s(y),
                T = p * l + 1.5 * h * (-g + b),
                k = p * l + 1.5 * h * (-g - b);
              (M =
                (-l - ((T = T < 0 ? -o(-T, c) : o(T, c)) + (k = k < 0 ? -o(-k, c) : o(k, c)))) /
                (3 * h)) >= 0 &&
                M <= 1 &&
                (a[m++] = M);
            } else {
              var S = (2 * p * l - 3 * h * g) / (2 * s(p * p * p)),
                A = Math.acos(S) / 3,
                C = s(p),
                P = Math.cos(A),
                M = (-l - 2 * C * P) / (3 * h),
                L =
                  ((w = (-l + C * (P + u * Math.sin(A))) / (3 * h)),
                  (-l + C * (P - u * Math.sin(A))) / (3 * h));
              M >= 0 && M <= 1 && (a[m++] = M),
                w >= 0 && w <= 1 && (a[m++] = w),
                L >= 0 && L <= 1 && (a[m++] = L);
            }
          }
          return m;
        }),
        (e.cubicExtrema = function(t, e, i, r, n) {
          var a = 6 * i - 12 * e + 6 * t,
            o = 9 * e + 3 * r - 3 * t - 9 * i,
            h = 3 * e - 3 * t,
            l = 0;
          if (v(o)) {
            if (g(a)) (c = -h / a) >= 0 && c <= 1 && (n[l++] = c);
          } else {
            var u = a * a - 4 * o * h;
            if (v(u)) n[0] = -a / (2 * o);
            else if (u > 0) {
              var c,
                f = s(u),
                d = (-a - f) / (2 * o);
              (c = (-a + f) / (2 * o)) >= 0 && c <= 1 && (n[l++] = c),
                d >= 0 && d <= 1 && (n[l++] = d);
            }
          }
          return l;
        }),
        (e.cubicSubdivide = function(t, e, i, r, n, a) {
          var o = (e - t) * n + t,
            s = (i - e) * n + e,
            h = (r - i) * n + i,
            l = (s - o) * n + o,
            u = (h - s) * n + s,
            c = (u - l) * n + l;
          (a[0] = t),
            (a[1] = o),
            (a[2] = l),
            (a[3] = c),
            (a[4] = c),
            (a[5] = u),
            (a[6] = h),
            (a[7] = r);
        }),
        (e.cubicProjectPoint = function(t, e, i, r, n, o, h, u, c, v, g) {
          var m,
            y,
            x,
            w,
            b,
            T = 0.005,
            k = 1 / 0;
          (f[0] = c), (f[1] = v);
          for (var S = 0; S < 1; S += 0.05)
            (d[0] = _(t, i, n, h, S)),
              (d[1] = _(e, r, o, u, S)),
              (w = a(f, d)) < k && ((m = S), (k = w));
          k = 1 / 0;
          for (var A = 0; A < 32 && !(T < l); A++)
            (y = m - T),
              (x = m + T),
              (d[0] = _(t, i, n, h, y)),
              (d[1] = _(e, r, o, u, y)),
              (w = a(d, f)),
              y >= 0 && w < k
                ? ((m = y), (k = w))
                : ((p[0] = _(t, i, n, h, x)),
                  (p[1] = _(e, r, o, u, x)),
                  (b = a(p, f)),
                  x <= 1 && b < k ? ((m = x), (k = b)) : (T *= 0.5));
          return g && ((g[0] = _(t, i, n, h, m)), (g[1] = _(e, r, o, u, m))), s(k);
        }),
        (e.quadraticAt = m),
        (e.quadraticDerivativeAt = function(t, e, i, r) {
          return 2 * ((1 - r) * (e - t) + r * (i - e));
        }),
        (e.quadraticRootAt = function(t, e, i, r, n) {
          var a = t - 2 * e + i,
            o = 2 * (e - t),
            h = t - r,
            l = 0;
          if (v(a)) {
            if (g(o)) (c = -h / o) >= 0 && c <= 1 && (n[l++] = c);
          } else {
            var u = o * o - 4 * a * h;
            if (v(u)) (c = -o / (2 * a)) >= 0 && c <= 1 && (n[l++] = c);
            else if (u > 0) {
              var c,
                f = s(u),
                d = (-o - f) / (2 * a);
              (c = (-o + f) / (2 * a)) >= 0 && c <= 1 && (n[l++] = c),
                d >= 0 && d <= 1 && (n[l++] = d);
            }
          }
          return l;
        }),
        (e.quadraticExtremum = function(t, e, i) {
          var r = t + i - 2 * e;
          return 0 === r ? 0.5 : (t - e) / r;
        }),
        (e.quadraticSubdivide = function(t, e, i, r, n) {
          var a = (e - t) * r + t,
            o = (i - e) * r + e,
            s = (o - a) * r + a;
          (n[0] = t), (n[1] = a), (n[2] = s), (n[3] = s), (n[4] = o), (n[5] = i);
        }),
        (e.quadraticProjectPoint = function(t, e, i, r, n, o, h, u, c) {
          var v,
            g = 0.005,
            _ = 1 / 0;
          (f[0] = h), (f[1] = u);
          for (var y = 0; y < 1; y += 0.05) {
            (d[0] = m(t, i, n, y)), (d[1] = m(e, r, o, y)), (T = a(f, d)) < _ && ((v = y), (_ = T));
          }
          _ = 1 / 0;
          for (var x = 0; x < 32 && !(g < l); x++) {
            var w = v - g,
              b = v + g;
            (d[0] = m(t, i, n, w)), (d[1] = m(e, r, o, w));
            var T = a(d, f);
            if (w >= 0 && T < _) (v = w), (_ = T);
            else {
              (p[0] = m(t, i, n, b)), (p[1] = m(e, r, o, b));
              var k = a(p, f);
              b <= 1 && k < _ ? ((v = b), (_ = k)) : (g *= 0.5);
            }
          }
          return c && ((c[0] = m(t, i, n, v)), (c[1] = m(e, r, o, v))), s(_);
        });
    },
    934: function(t, e, i) {
      i(935), (0, i(186).registerPainter)('vml', i(936));
    },
    935: function(t, e, i) {
      var r = i(35),
        n = i(28).applyTransform,
        a = i(29),
        o = i(71),
        s = i(53),
        h = i(189),
        l = i(382),
        u = i(150),
        c = i(120),
        f = i(100),
        d = i(33),
        p = i(122),
        v = i(191),
        g = i(453),
        _ = p.CMD,
        m = Math.round,
        y = Math.sqrt,
        x = Math.abs,
        w = Math.cos,
        b = Math.sin,
        T = Math.max;
      if (!r.canvasSupported) {
        var k = 21600,
          S = k / 2,
          A = function(t) {
            (t.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;'),
              (t.coordsize = k + ',' + k),
              (t.coordorigin = '0,0');
          },
          C = function(t, e, i) {
            return 'rgb(' + [t, e, i].join(',') + ')';
          },
          P = function(t, e) {
            e && t && e.parentNode !== t && t.appendChild(e);
          },
          M = function(t, e) {
            e && t && e.parentNode === t && t.removeChild(e);
          },
          L = function(t, e, i) {
            return 1e5 * (parseFloat(t) || 0) + 1e3 * (parseFloat(e) || 0) + i;
          },
          z = h.parsePercent,
          D = function(t, e, i) {
            var r = o.parse(e);
            (i = +i),
              isNaN(i) && (i = 1),
              r && ((t.color = C(r[0], r[1], r[2])), (t.opacity = i * r[3]));
          },
          B = function(t) {
            var e = o.parse(t);
            return [C(e[0], e[1], e[2]), e[3]];
          },
          R = function(t, e, i, r) {
            var a = 'fill' === e,
              o = t.getElementsByTagName(e)[0];
            null != i[e] && 'none' !== i[e] && (a || (!a && i.lineWidth))
              ? ((t[a ? 'filled' : 'stroked'] = 'true'),
                i[e] instanceof v && M(t, o),
                o || (o = g.createNode(e)),
                a
                  ? (function(t, e, i) {
                      var r = e.fill;
                      if (null != r)
                        if (r instanceof v) {
                          var a,
                            o = 0,
                            s = [0, 0],
                            h = 0,
                            l = 1,
                            u = i.getBoundingRect(),
                            c = u.width,
                            f = u.height;
                          if ('linear' === r.type) {
                            a = 'gradient';
                            var d = i.transform,
                              p = [r.x * c, r.y * f],
                              g = [r.x2 * c, r.y2 * f];
                            d && (n(p, p, d), n(g, g, d));
                            var _ = g[0] - p[0],
                              m = g[1] - p[1];
                            (o = (180 * Math.atan2(_, m)) / Math.PI) < 0 && (o += 360),
                              o < 1e-6 && (o = 0);
                          } else {
                            a = 'gradientradial';
                            (p = [r.x * c, r.y * f]), (d = i.transform);
                            var y = i.scale,
                              x = c,
                              w = f;
                            (s = [(p[0] - u.x) / x, (p[1] - u.y) / w]),
                              d && n(p, p, d),
                              (x /= y[0] * k),
                              (w /= y[1] * k);
                            var b = T(x, w);
                            (h = 0 / b), (l = (2 * r.r) / b - h);
                          }
                          var S = r.colorStops.slice();
                          S.sort(function(t, e) {
                            return t.offset - e.offset;
                          });
                          for (var A = S.length, C = [], P = [], M = 0; M < A; M++) {
                            var L = S[M],
                              z = B(L.color);
                            P.push(L.offset * l + h + ' ' + z[0]),
                              (0 !== M && M !== A - 1) || C.push(z);
                          }
                          if (A >= 2) {
                            var R = C[0][0],
                              O = C[1][0],
                              E = C[0][1] * e.opacity,
                              I = C[1][1] * e.opacity;
                            (t.type = a),
                              (t.method = 'none'),
                              (t.focus = '100%'),
                              (t.angle = o),
                              (t.color = R),
                              (t.color2 = O),
                              (t.colors = P.join(',')),
                              (t.opacity = I),
                              (t.opacity2 = E);
                          }
                          'radial' === a && (t.focusposition = s.join(','));
                        } else D(t, r, e.opacity);
                    })(o, i, r)
                  : (function(t, e) {
                      e.lineDash && (t.dashstyle = e.lineDash.join(' ')),
                        null == e.stroke || e.stroke instanceof v || D(t, e.stroke, e.opacity);
                    })(o, i),
                P(t, o))
              : ((t[a ? 'filled' : 'stroked'] = 'false'), M(t, o));
          },
          O = [[], [], []];
        (d.prototype.brushVML = function(t) {
          var e = this.style,
            i = this._vmlEl;
          i || ((i = g.createNode('shape')), A(i), (this._vmlEl = i)),
            R(i, 'fill', e, this),
            R(i, 'stroke', e, this);
          var r = this.transform,
            a = null != r,
            o = i.getElementsByTagName('stroke')[0];
          if (o) {
            var s = e.lineWidth;
            if (a && !e.strokeNoScale) {
              var h = r[0] * r[3] - r[1] * r[2];
              s *= y(x(h));
            }
            o.weight = s + 'px';
          }
          var l = this.path || (this.path = new p());
          this.__dirtyPath &&
            (l.beginPath(),
            (l.subPixelOptimize = !1),
            this.buildPath(l, this.shape),
            l.toStatic(),
            (this.__dirtyPath = !1)),
            (i.path = (function(t, e) {
              var i,
                r,
                a,
                o,
                s,
                h,
                l = _.M,
                u = _.C,
                c = _.L,
                f = _.A,
                d = _.Q,
                p = [],
                v = t.data,
                g = t.len();
              for (o = 0; o < g; ) {
                switch (((r = ''), (i = 0), (a = v[o++]))) {
                  case l:
                    (r = ' m '), (i = 1), (s = v[o++]), (h = v[o++]), (O[0][0] = s), (O[0][1] = h);
                    break;
                  case c:
                    (r = ' l '), (i = 1), (s = v[o++]), (h = v[o++]), (O[0][0] = s), (O[0][1] = h);
                    break;
                  case d:
                  case u:
                    (r = ' c '), (i = 3);
                    var x,
                      T,
                      A = v[o++],
                      C = v[o++],
                      P = v[o++],
                      M = v[o++];
                    a === d
                      ? ((x = P),
                        (T = M),
                        (P = (P + 2 * A) / 3),
                        (M = (M + 2 * C) / 3),
                        (A = (s + 2 * A) / 3),
                        (C = (h + 2 * C) / 3))
                      : ((x = v[o++]), (T = v[o++])),
                      (O[0][0] = A),
                      (O[0][1] = C),
                      (O[1][0] = P),
                      (O[1][1] = M),
                      (O[2][0] = x),
                      (O[2][1] = T),
                      (s = x),
                      (h = T);
                    break;
                  case f:
                    var L = 0,
                      z = 0,
                      D = 1,
                      B = 1,
                      R = 0;
                    e &&
                      ((L = e[4]),
                      (z = e[5]),
                      (D = y(e[0] * e[0] + e[1] * e[1])),
                      (B = y(e[2] * e[2] + e[3] * e[3])),
                      (R = Math.atan2(-e[1] / B, e[0] / D)));
                    var E = v[o++],
                      I = v[o++],
                      F = v[o++],
                      H = v[o++],
                      N = v[o++] + R,
                      W = v[o++] + N + R;
                    o++;
                    var q = v[o++],
                      V = E + w(N) * F,
                      X = I + b(N) * H,
                      j = ((A = E + w(W) * F), (C = I + b(W) * H), q ? ' wa ' : ' at ');
                    Math.abs(V - A) < 1e-4 &&
                      (Math.abs(W - N) > 0.01
                        ? q && (V += 0.0125)
                        : Math.abs(X - I) < 1e-4
                        ? (q && V < E) || (!q && V > E)
                          ? (C -= 0.0125)
                          : (C += 0.0125)
                        : (q && X < I) || (!q && X > I)
                        ? (A += 0.0125)
                        : (A -= 0.0125)),
                      p.push(
                        j,
                        m(((E - F) * D + L) * k - S),
                        ',',
                        m(((I - H) * B + z) * k - S),
                        ',',
                        m(((E + F) * D + L) * k - S),
                        ',',
                        m(((I + H) * B + z) * k - S),
                        ',',
                        m((V * D + L) * k - S),
                        ',',
                        m((X * B + z) * k - S),
                        ',',
                        m((A * D + L) * k - S),
                        ',',
                        m((C * B + z) * k - S)
                      ),
                      (s = A),
                      (h = C);
                    break;
                  case _.R:
                    var Y = O[0],
                      U = O[1];
                    (Y[0] = v[o++]),
                      (Y[1] = v[o++]),
                      (U[0] = Y[0] + v[o++]),
                      (U[1] = Y[1] + v[o++]),
                      e && (n(Y, Y, e), n(U, U, e)),
                      (Y[0] = m(Y[0] * k - S)),
                      (U[0] = m(U[0] * k - S)),
                      (Y[1] = m(Y[1] * k - S)),
                      (U[1] = m(U[1] * k - S)),
                      p.push(
                        ' m ',
                        Y[0],
                        ',',
                        Y[1],
                        ' l ',
                        U[0],
                        ',',
                        Y[1],
                        ' l ',
                        U[0],
                        ',',
                        U[1],
                        ' l ',
                        Y[0],
                        ',',
                        U[1]
                      );
                    break;
                  case _.Z:
                    p.push(' x ');
                }
                if (i > 0) {
                  p.push(r);
                  for (var G = 0; G < i; G++) {
                    var Q = O[G];
                    e && n(Q, Q, e),
                      p.push(m(Q[0] * k - S), ',', m(Q[1] * k - S), G < i - 1 ? ',' : '');
                  }
                }
              }
              return p.join('');
            })(l, this.transform)),
            (i.style.zIndex = L(this.zlevel, this.z, this.z2)),
            P(t, i),
            null != e.text ? this.drawRectText(t, this.getBoundingRect()) : this.removeRectText(t);
        }),
          (d.prototype.onRemove = function(t) {
            M(t, this._vmlEl), this.removeRectText(t);
          }),
          (d.prototype.onAdd = function(t) {
            P(t, this._vmlEl), this.appendRectText(t);
          });
        (c.prototype.brushVML = function(t) {
          var e,
            i,
            r,
            a = this.style,
            o = a.image;
          if ('object' === typeof (r = o) && r.tagName && 'IMG' === r.tagName.toUpperCase()) {
            var s = o.src;
            if (s === this._imageSrc) (e = this._imageWidth), (i = this._imageHeight);
            else {
              var h = o.runtimeStyle,
                l = h.width,
                u = h.height;
              (h.width = 'auto'),
                (h.height = 'auto'),
                (e = o.width),
                (i = o.height),
                (h.width = l),
                (h.height = u),
                (this._imageSrc = s),
                (this._imageWidth = e),
                (this._imageHeight = i);
            }
            o = s;
          } else o === this._imageSrc && ((e = this._imageWidth), (i = this._imageHeight));
          if (o) {
            var c = a.x || 0,
              f = a.y || 0,
              d = a.width,
              p = a.height,
              v = a.sWidth,
              _ = a.sHeight,
              x = a.sx || 0,
              w = a.sy || 0,
              b = v && _,
              k = this._vmlEl;
            k || ((k = g.doc.createElement('div')), A(k), (this._vmlEl = k));
            var S,
              C = k.style,
              M = !1,
              z = 1,
              D = 1;
            if (
              (this.transform &&
                ((S = this.transform),
                (z = y(S[0] * S[0] + S[1] * S[1])),
                (D = y(S[2] * S[2] + S[3] * S[3])),
                (M = S[1] || S[2])),
              M)
            ) {
              var B = [c, f],
                R = [c + d, f],
                O = [c, f + p],
                E = [c + d, f + p];
              n(B, B, S), n(R, R, S), n(O, O, S), n(E, E, S);
              var I = T(B[0], R[0], O[0], E[0]),
                F = T(B[1], R[1], O[1], E[1]),
                H = [];
              H.push(
                'M11=',
                S[0] / z,
                ',',
                'M12=',
                S[2] / D,
                ',',
                'M21=',
                S[1] / z,
                ',',
                'M22=',
                S[3] / D,
                ',',
                'Dx=',
                m(c * z + S[4]),
                ',',
                'Dy=',
                m(f * D + S[5])
              ),
                (C.padding = '0 ' + m(I) + 'px ' + m(F) + 'px 0'),
                (C.filter =
                  'progid:DXImageTransform.Microsoft.Matrix(' +
                  H.join('') +
                  ', SizingMethod=clip)');
            } else
              S && ((c = c * z + S[4]), (f = f * D + S[5])),
                (C.filter = ''),
                (C.left = m(c) + 'px'),
                (C.top = m(f) + 'px');
            var N = this._imageEl,
              W = this._cropEl;
            N || ((N = g.doc.createElement('div')), (this._imageEl = N));
            var q = N.style;
            if (b) {
              if (e && i)
                (q.width = m((z * e * d) / v) + 'px'), (q.height = m((D * i * p) / _) + 'px');
              else {
                var V = new Image(),
                  X = this;
                (V.onload = function() {
                  (V.onload = null),
                    (e = V.width),
                    (i = V.height),
                    (q.width = m((z * e * d) / v) + 'px'),
                    (q.height = m((D * i * p) / _) + 'px'),
                    (X._imageWidth = e),
                    (X._imageHeight = i),
                    (X._imageSrc = o);
                }),
                  (V.src = o);
              }
              W ||
                (((W = g.doc.createElement('div')).style.overflow = 'hidden'), (this._cropEl = W));
              var j = W.style;
              (j.width = m((d + (x * d) / v) * z)),
                (j.height = m((p + (w * p) / _) * D)),
                (j.filter =
                  'progid:DXImageTransform.Microsoft.Matrix(Dx=' +
                  ((-x * d) / v) * z +
                  ',Dy=' +
                  ((-w * p) / _) * D +
                  ')'),
                W.parentNode || k.appendChild(W),
                N.parentNode !== W && W.appendChild(N);
            } else
              (q.width = m(z * d) + 'px'),
                (q.height = m(D * p) + 'px'),
                k.appendChild(N),
                W && W.parentNode && (k.removeChild(W), (this._cropEl = null));
            var Y = '',
              U = a.opacity;
            U < 1 && (Y += '.Alpha(opacity=' + m(100 * U) + ') '),
              (Y +=
                'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' +
                o +
                ', SizingMethod=scale)'),
              (q.filter = Y),
              (k.style.zIndex = L(this.zlevel, this.z, this.z2)),
              P(t, k),
              null != a.text && this.drawRectText(t, this.getBoundingRect());
          }
        }),
          (c.prototype.onRemove = function(t) {
            M(t, this._vmlEl),
              (this._vmlEl = null),
              (this._cropEl = null),
              (this._imageEl = null),
              this.removeRectText(t);
          }),
          (c.prototype.onAdd = function(t) {
            P(t, this._vmlEl), this.appendRectText(t);
          });
        var E,
          I = {},
          F = 0,
          H = document.createElement('div');
        s.$override('measureText', function(t, e) {
          var i = g.doc;
          E ||
            (((E = i.createElement('div')).style.cssText =
              'position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;'),
            g.doc.body.appendChild(E));
          try {
            E.style.font = e;
          } catch (r) {}
          return (E.innerHTML = ''), E.appendChild(i.createTextNode(t)), { width: E.offsetWidth };
        });
        for (
          var N = new a(),
            W = function(t, e, i, r) {
              var a = this.style;
              this.__dirty && h.normalizeTextStyle(a, !0);
              var o = a.text;
              if ((null != o && (o += ''), o)) {
                if (a.rich) {
                  var l = s.parseRichText(o, a);
                  o = [];
                  for (var u = 0; u < l.lines.length; u++) {
                    for (var c = l.lines[u].tokens, f = [], d = 0; d < c.length; d++)
                      f.push(c[d].text);
                    o.push(f.join(''));
                  }
                  o = o.join('\n');
                }
                var p,
                  v,
                  _ = a.textAlign,
                  y = a.textVerticalAlign,
                  x = (function(t) {
                    var e = I[t];
                    if (!e) {
                      F > 100 && ((F = 0), (I = {}));
                      var i,
                        r = H.style;
                      try {
                        (r.font = t), (i = r.fontFamily.split(',')[0]);
                      } catch (n) {}
                      (e = {
                        style: r.fontStyle || 'normal',
                        variant: r.fontVariant || 'normal',
                        weight: r.fontWeight || 'normal',
                        size: 0 | parseFloat(r.fontSize || 12),
                        family: i || 'Microsoft YaHei'
                      }),
                        (I[t] = e),
                        F++;
                    }
                    return e;
                  })(a.font),
                  w =
                    x.style +
                    ' ' +
                    x.variant +
                    ' ' +
                    x.weight +
                    ' ' +
                    x.size +
                    'px "' +
                    x.family +
                    '"';
                i = i || s.getBoundingRect(o, w, _, y, a.textPadding, a.textLineHeight);
                var b = this.transform;
                if ((b && !r && (N.copy(e), N.applyTransform(b), (e = N)), r)) (p = e.x), (v = e.y);
                else {
                  var T = a.textPosition;
                  if (T instanceof Array)
                    (p = e.x + z(T[0], e.width)), (v = e.y + z(T[1], e.height)), (_ = _ || 'left');
                  else {
                    var k = this.calculateTextPosition
                      ? this.calculateTextPosition({}, a, e)
                      : s.calculateTextPosition({}, a, e);
                    (p = k.x), (v = k.y), (_ = _ || k.textAlign), (y = y || k.textVerticalAlign);
                  }
                }
                (p = s.adjustTextX(p, i.width, _)),
                  (v = s.adjustTextY(v, i.height, y)),
                  (v += i.height / 2);
                var S,
                  C,
                  M,
                  D = g.createNode,
                  B = this._textVmlEl;
                B
                  ? (C = (S = (M = B.firstChild).nextSibling).nextSibling)
                  : ((B = D('line')),
                    (S = D('path')),
                    (C = D('textpath')),
                    (M = D('skew')),
                    (C.style['v-text-align'] = 'left'),
                    A(B),
                    (S.textpathok = !0),
                    (C.on = !0),
                    (B.from = '0 0'),
                    (B.to = '1000 0.05'),
                    P(B, M),
                    P(B, S),
                    P(B, C),
                    (this._textVmlEl = B));
                var O = [p, v],
                  E = B.style;
                b && r
                  ? (n(O, O, b),
                    (M.on = !0),
                    (M.matrix =
                      b[0].toFixed(3) +
                      ',' +
                      b[2].toFixed(3) +
                      ',' +
                      b[1].toFixed(3) +
                      ',' +
                      b[3].toFixed(3) +
                      ',0,0'),
                    (M.offset = (m(O[0]) || 0) + ',' + (m(O[1]) || 0)),
                    (M.origin = '0 0'),
                    (E.left = '0px'),
                    (E.top = '0px'))
                  : ((M.on = !1), (E.left = m(p) + 'px'), (E.top = m(v) + 'px')),
                  (C.string = String(o)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;'));
                try {
                  C.style.font = w;
                } catch (W) {}
                R(B, 'fill', { fill: a.textFill, opacity: a.opacity }, this),
                  R(
                    B,
                    'stroke',
                    { stroke: a.textStroke, opacity: a.opacity, lineDash: a.lineDash || null },
                    this
                  ),
                  (B.style.zIndex = L(this.zlevel, this.z, this.z2)),
                  P(t, B);
              }
            },
            q = function(t) {
              M(t, this._textVmlEl), (this._textVmlEl = null);
            },
            V = function(t) {
              P(t, this._textVmlEl);
            },
            X = [l, u, c, d, f],
            j = 0;
          j < X.length;
          j++
        ) {
          var Y = X[j].prototype;
          (Y.drawRectText = W), (Y.removeRectText = q), (Y.appendRectText = V);
        }
        (f.prototype.brushVML = function(t) {
          var e = this.style;
          null != e.text
            ? this.drawRectText(
                t,
                { x: e.x || 0, y: e.y || 0, width: 0, height: 0 },
                this.getBoundingRect(),
                !0
              )
            : this.removeRectText(t);
        }),
          (f.prototype.onRemove = function(t) {
            this.removeRectText(t);
          }),
          (f.prototype.onAdd = function(t) {
            this.appendRectText(t);
          });
      }
    },
    936: function(t, e, i) {
      var r = i(149),
        n = i(453),
        a = i(2).each;
      function o(t) {
        return parseInt(t, 10);
      }
      function s(t, e) {
        n.initVML(), (this.root = t), (this.storage = e);
        var i = document.createElement('div'),
          r = document.createElement('div');
        (i.style.cssText =
          'display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;'),
          (r.style.cssText = 'position:absolute;left:0;top:0;'),
          t.appendChild(i),
          (this._vmlRoot = r),
          (this._vmlViewport = i),
          this.resize();
        var a = e.delFromStorage,
          o = e.addToStorage;
        (e.delFromStorage = function(t) {
          a.call(e, t), t && t.onRemove && t.onRemove(r);
        }),
          (e.addToStorage = function(t) {
            t.onAdd && t.onAdd(r), o.call(e, t);
          }),
          (this._firstPaint = !0);
      }
      (s.prototype = {
        constructor: s,
        getType: function() {
          return 'vml';
        },
        getViewportRoot: function() {
          return this._vmlViewport;
        },
        getViewportRootOffset: function() {
          var t = this.getViewportRoot();
          if (t) return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
        },
        refresh: function() {
          var t = this.storage.getDisplayList(!0, !0);
          this._paintList(t);
        },
        _paintList: function(t) {
          for (var e = this._vmlRoot, i = 0; i < t.length; i++) {
            var r = t[i];
            r.invisible || r.ignore
              ? (r.__alreadyNotVisible || r.onRemove(e), (r.__alreadyNotVisible = !0))
              : (r.__alreadyNotVisible && r.onAdd(e),
                (r.__alreadyNotVisible = !1),
                r.__dirty &&
                  (r.beforeBrush && r.beforeBrush(),
                  (r.brushVML || r.brush).call(r, e),
                  r.afterBrush && r.afterBrush())),
              (r.__dirty = !1);
          }
          this._firstPaint && (this._vmlViewport.appendChild(e), (this._firstPaint = !1));
        },
        resize: function(t, e) {
          (t = null == t ? this._getWidth() : t), (e = null == e ? this._getHeight() : e);
          if (this._width !== t || this._height !== e) {
            (this._width = t), (this._height = e);
            var i = this._vmlViewport.style;
            (i.width = t + 'px'), (i.height = e + 'px');
          }
        },
        dispose: function() {
          (this.root.innerHTML = ''), (this._vmlRoot = this._vmlViewport = this.storage = null);
        },
        getWidth: function() {
          return this._width;
        },
        getHeight: function() {
          return this._height;
        },
        clear: function() {
          this._vmlViewport && this.root.removeChild(this._vmlViewport);
        },
        _getWidth: function() {
          var t = this.root,
            e = t.currentStyle;
          return ((t.clientWidth || o(e.width)) - o(e.paddingLeft) - o(e.paddingRight)) | 0;
        },
        _getHeight: function() {
          var t = this.root,
            e = t.currentStyle;
          return ((t.clientHeight || o(e.height)) - o(e.paddingTop) - o(e.paddingBottom)) | 0;
        }
      }),
        a(
          [
            'getLayer',
            'insertLayer',
            'eachLayer',
            'eachBuiltinLayer',
            'eachOtherLayer',
            'getLayers',
            'modLayer',
            'delLayer',
            'clearLayer',
            'toDataURL',
            'pathToImage'
          ],
          function(t) {
            var e;
            s.prototype[t] =
              ((e = t),
              function() {
                r('In IE8.0 VML mode painter not support method "' + e + '"');
              });
          }
        );
      var h = s;
      t.exports = h;
    },
    937: function(t, e, i) {
      i(305), (0, i(186).registerPainter)('svg', i(938));
    },
    938: function(t, e, i) {
      var r = i(306).createElement,
        n = i(2),
        a = i(149),
        o = i(33),
        s = i(120),
        h = i(100),
        l = i(939),
        u = i(940),
        c = i(941),
        f = i(942),
        d = i(305),
        p = d.path,
        v = d.image,
        g = d.text;
      function _(t) {
        return parseInt(t, 10);
      }
      function m(t, e) {
        return e && t && e.parentNode !== t;
      }
      function y(t, e, i) {
        if (m(t, e) && i) {
          var r = i.nextSibling;
          r ? t.insertBefore(e, r) : t.appendChild(e);
        }
      }
      function x(t, e) {
        if (m(t, e)) {
          var i = t.firstChild;
          i ? t.insertBefore(e, i) : t.appendChild(e);
        }
      }
      function w(t, e) {
        e && t && e.parentNode === t && t.removeChild(e);
      }
      function b(t) {
        return t.__textSvgEl;
      }
      function T(t) {
        return t.__svgEl;
      }
      var k = function(t, e, i, a) {
        (this.root = t), (this.storage = e), (this._opts = i = n.extend({}, i || {}));
        var o = r('svg');
        o.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
          o.setAttribute('version', '1.1'),
          o.setAttribute('baseProfile', 'full'),
          (o.style.cssText = 'user-select:none;position:absolute;left:0;top:0;'),
          (this.gradientManager = new u(a, o)),
          (this.clipPathManager = new c(a, o)),
          (this.shadowManager = new f(a, o));
        var s = document.createElement('div');
        (s.style.cssText = 'overflow:hidden;position:relative'),
          (this._svgRoot = o),
          (this._viewport = s),
          t.appendChild(s),
          s.appendChild(o),
          this.resize(i.width, i.height),
          (this._visibleList = []);
      };
      (k.prototype = {
        constructor: k,
        getType: function() {
          return 'svg';
        },
        getViewportRoot: function() {
          return this._viewport;
        },
        getViewportRootOffset: function() {
          var t = this.getViewportRoot();
          if (t) return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
        },
        refresh: function() {
          var t = this.storage.getDisplayList(!0);
          this._paintList(t);
        },
        setBackgroundColor: function(t) {
          this._viewport.style.background = t;
        },
        _paintList: function(t) {
          this.gradientManager.markAllUnused(),
            this.clipPathManager.markAllUnused(),
            this.shadowManager.markAllUnused();
          var e,
            i,
            r = this._svgRoot,
            n = this._visibleList,
            a = t.length,
            u = [];
          for (e = 0; e < a; e++) {
            var c = t[e],
              f = (i = c) instanceof o ? p : i instanceof s ? v : i instanceof h ? g : p,
              d = T(c) || b(c);
            c.invisible ||
              (c.__dirty &&
                (f && f.brush(c),
                this.clipPathManager.update(c),
                c.style &&
                  (this.gradientManager.update(c.style.fill),
                  this.gradientManager.update(c.style.stroke),
                  this.shadowManager.update(d, c)),
                (c.__dirty = !1)),
              u.push(c));
          }
          var _,
            m = l(n, u);
          for (e = 0; e < m.length; e++) {
            if ((A = m[e]).removed)
              for (var k = 0; k < A.count; k++) {
                d = T((c = n[A.indices[k]]));
                var S = b(c);
                w(r, d), w(r, S);
              }
          }
          for (e = 0; e < m.length; e++) {
            var A;
            if ((A = m[e]).added)
              for (k = 0; k < A.count; k++) {
                (d = T((c = u[A.indices[k]]))), (S = b(c));
                _ ? y(r, d, _) : x(r, d),
                  d ? y(r, S, d) : _ ? y(r, S, _) : x(r, S),
                  y(r, S, d),
                  (_ = S || d || _),
                  this.gradientManager.addWithoutUpdate(d || S, c),
                  this.shadowManager.addWithoutUpdate(d || S, c),
                  this.clipPathManager.markUsed(c);
              }
            else if (!A.removed)
              for (k = 0; k < A.count; k++) {
                _ = b((c = u[A.indices[k]])) || T(c) || _;
                (d = T(c)), (S = b(c));
                this.gradientManager.markUsed(c),
                  this.gradientManager.addWithoutUpdate(d || S, c),
                  this.shadowManager.markUsed(c),
                  this.shadowManager.addWithoutUpdate(d || S, c),
                  this.clipPathManager.markUsed(c);
              }
          }
          this.gradientManager.removeUnused(),
            this.clipPathManager.removeUnused(),
            this.shadowManager.removeUnused(),
            (this._visibleList = u);
        },
        _getDefs: function(t) {
          var e,
            i = this._svgRoot;
          return 0 === (e = this._svgRoot.getElementsByTagName('defs')).length
            ? t
              ? ((e = i.insertBefore(r('defs'), i.firstChild)).contains ||
                  (e.contains = function(t) {
                    var i = e.children;
                    if (!i) return !1;
                    for (var r = i.length - 1; r >= 0; --r) if (i[r] === t) return !0;
                    return !1;
                  }),
                e)
              : null
            : e[0];
        },
        resize: function(t, e) {
          var i = this._viewport;
          i.style.display = 'none';
          var r = this._opts;
          if (
            (null != t && (r.width = t),
            null != e && (r.height = e),
            (t = this._getSize(0)),
            (e = this._getSize(1)),
            (i.style.display = ''),
            this._width !== t || this._height !== e)
          ) {
            (this._width = t), (this._height = e);
            var n = i.style;
            (n.width = t + 'px'), (n.height = e + 'px');
            var a = this._svgRoot;
            a.setAttribute('width', t), a.setAttribute('height', e);
          }
        },
        getWidth: function() {
          return this._width;
        },
        getHeight: function() {
          return this._height;
        },
        _getSize: function(t) {
          var e = this._opts,
            i = ['width', 'height'][t],
            r = ['clientWidth', 'clientHeight'][t],
            n = ['paddingLeft', 'paddingTop'][t],
            a = ['paddingRight', 'paddingBottom'][t];
          if (null != e[i] && 'auto' !== e[i]) return parseFloat(e[i]);
          var o = this.root,
            s = document.defaultView.getComputedStyle(o);
          return ((o[r] || _(s[i]) || _(o.style[i])) - (_(s[n]) || 0) - (_(s[a]) || 0)) | 0;
        },
        dispose: function() {
          (this.root.innerHTML = ''), (this._svgRoot = this._viewport = this.storage = null);
        },
        clear: function() {
          this._viewport && this.root.removeChild(this._viewport);
        },
        pathToDataUrl: function() {
          return this.refresh(), 'data:image/svg+xml;charset=UTF-8,' + this._svgRoot.outerHTML;
        }
      }),
        n.each(
          [
            'getLayer',
            'insertLayer',
            'eachLayer',
            'eachBuiltinLayer',
            'eachOtherLayer',
            'getLayers',
            'modLayer',
            'delLayer',
            'clearLayer',
            'toDataURL',
            'pathToImage'
          ],
          function(t) {
            var e;
            k.prototype[t] =
              ((e = t),
              function() {
                a('In SVG mode painter not support method "' + e + '"');
              });
          }
        );
      var S = k;
      t.exports = S;
    },
    939: function(t, e) {
      function i() {}
      function r(t, e, i, r) {
        for (var n = 0, a = e.length, o = 0, s = 0; n < a; n++) {
          var h = e[n];
          if (h.removed) {
            for (l = [], u = s; u < s + h.count; u++) l.push(u);
            (h.indices = l), (s += h.count);
          } else {
            for (var l = [], u = o; u < o + h.count; u++) l.push(u);
            (h.indices = l), (o += h.count), h.added || (s += h.count);
          }
        }
        return e;
      }
      i.prototype = {
        diff: function(t, e, i) {
          i ||
            (i = function(t, e) {
              return t === e;
            }),
            (this.equals = i);
          var n = this;
          t = t.slice();
          var a = (e = e.slice()).length,
            o = t.length,
            s = 1,
            h = a + o,
            l = [{ newPos: -1, components: [] }],
            u = this.extractCommon(l[0], e, t, 0);
          if (l[0].newPos + 1 >= a && u + 1 >= o) {
            for (var c = [], f = 0; f < e.length; f++) c.push(f);
            return [{ indices: c, count: e.length }];
          }
          function d() {
            for (var i = -1 * s; i <= s; i += 2) {
              var h,
                u = l[i - 1],
                c = l[i + 1],
                f = (c ? c.newPos : 0) - i;
              u && (l[i - 1] = void 0);
              var d = u && u.newPos + 1 < a,
                p = c && 0 <= f && f < o;
              if (d || p) {
                if (
                  (!d || (p && u.newPos < c.newPos)
                    ? ((h = { newPos: (v = c).newPos, components: v.components.slice(0) }),
                      n.pushComponent(h.components, void 0, !0))
                    : ((h = u).newPos++, n.pushComponent(h.components, !0, void 0)),
                  (f = n.extractCommon(h, e, t, i)),
                  h.newPos + 1 >= a && f + 1 >= o)
                )
                  return r(n, h.components, e, t);
                l[i] = h;
              } else l[i] = void 0;
            }
            var v;
            s++;
          }
          for (; s <= h; ) {
            var p = d();
            if (p) return p;
          }
        },
        pushComponent: function(t, e, i) {
          var r = t[t.length - 1];
          r && r.added === e && r.removed === i
            ? (t[t.length - 1] = { count: r.count + 1, added: e, removed: i })
            : t.push({ count: 1, added: e, removed: i });
        },
        extractCommon: function(t, e, i, r) {
          for (
            var n = e.length, a = i.length, o = t.newPos, s = o - r, h = 0;
            o + 1 < n && s + 1 < a && this.equals(e[o + 1], i[s + 1]);

          )
            o++, s++, h++;
          return h && t.components.push({ count: h }), (t.newPos = o), s;
        },
        tokenize: function(t) {
          return t.slice();
        },
        join: function(t) {
          return t.slice();
        }
      };
      var n = new i();
      t.exports = function(t, e, i) {
        return n.diff(t, e, i);
      };
    },
    940: function(t, e, i) {
      var r = i(307),
        n = i(2),
        a = i(149),
        o = i(71);
      function s(t, e) {
        r.call(this, t, e, ['linearGradient', 'radialGradient'], '__gradient_in_use__');
      }
      n.inherits(s, r),
        (s.prototype.addWithoutUpdate = function(t, e) {
          if (e && e.style) {
            var i = this;
            n.each(['fill', 'stroke'], function(r) {
              if (e.style[r] && ('linear' === e.style[r].type || 'radial' === e.style[r].type)) {
                var n,
                  a = e.style[r],
                  o = i.getDefs(!0);
                a._dom ? ((n = a._dom), o.contains(a._dom) || i.addDom(n)) : (n = i.add(a)),
                  i.markUsed(e);
                var s = n.getAttribute('id');
                t.setAttribute(r, 'url(#' + s + ')');
              }
            });
          }
        }),
        (s.prototype.add = function(t) {
          var e;
          if ('linear' === t.type) e = this.createElement('linearGradient');
          else {
            if ('radial' !== t.type) return a('Illegal gradient type.'), null;
            e = this.createElement('radialGradient');
          }
          return (
            (t.id = t.id || this.nextId++),
            e.setAttribute('id', 'zr' + this._zrId + '-gradient-' + t.id),
            this.updateDom(t, e),
            this.addDom(e),
            e
          );
        }),
        (s.prototype.update = function(t) {
          var e = this;
          r.prototype.update.call(this, t, function() {
            var i = t.type,
              r = t._dom.tagName;
            ('linear' === i && 'linearGradient' === r) || ('radial' === i && 'radialGradient' === r)
              ? e.updateDom(t, t._dom)
              : (e.removeDom(t), e.add(t));
          });
        }),
        (s.prototype.updateDom = function(t, e) {
          if ('linear' === t.type)
            e.setAttribute('x1', t.x),
              e.setAttribute('y1', t.y),
              e.setAttribute('x2', t.x2),
              e.setAttribute('y2', t.y2);
          else {
            if ('radial' !== t.type) return void a('Illegal gradient type.');
            e.setAttribute('cx', t.x), e.setAttribute('cy', t.y), e.setAttribute('r', t.r);
          }
          t.global
            ? e.setAttribute('gradientUnits', 'userSpaceOnUse')
            : e.setAttribute('gradientUnits', 'objectBoundingBox'),
            (e.innerHTML = '');
          for (var i = t.colorStops, r = 0, n = i.length; r < n; ++r) {
            var s = this.createElement('stop');
            s.setAttribute('offset', 100 * i[r].offset + '%');
            var h = i[r].color;
            if (h.indexOf(!1)) {
              var l = o.parse(h)[3],
                u = o.toHex(h);
              s.setAttribute('stop-color', '#' + u), s.setAttribute('stop-opacity', l);
            } else s.setAttribute('stop-color', i[r].color);
            e.appendChild(s);
          }
          t._dom = e;
        }),
        (s.prototype.markUsed = function(t) {
          if (t.style) {
            var e = t.style.fill;
            e && e._dom && r.prototype.markUsed.call(this, e._dom),
              (e = t.style.stroke) && e._dom && r.prototype.markUsed.call(this, e._dom);
          }
        });
      var h = s;
      t.exports = h;
    },
    941: function(t, e, i) {
      var r = i(307),
        n = i(2),
        a = i(44);
      function o(t, e) {
        r.call(this, t, e, 'clipPath', '__clippath_in_use__');
      }
      n.inherits(o, r),
        (o.prototype.update = function(t) {
          var e = this.getSvgElement(t);
          e && this.updateDom(e, t.__clipPaths, !1);
          var i = this.getTextSvgElement(t);
          i && this.updateDom(i, t.__clipPaths, !0), this.markUsed(t);
        }),
        (o.prototype.updateDom = function(t, e, i) {
          if (e && e.length > 0) {
            var r,
              n,
              o = this.getDefs(!0),
              s = e[0],
              h = i ? '_textDom' : '_dom';
            s[h]
              ? ((n = s[h].getAttribute('id')), (r = s[h]), o.contains(r) || o.appendChild(r))
              : ((n = 'zr' + this._zrId + '-clip-' + this.nextId),
                ++this.nextId,
                (r = this.createElement('clipPath')).setAttribute('id', n),
                o.appendChild(r),
                (s[h] = r));
            var l = this.getSvgProxy(s);
            if (s.transform && s.parent.invTransform && !i) {
              var u = Array.prototype.slice.call(s.transform);
              a.mul(s.transform, s.parent.invTransform, s.transform), l.brush(s), (s.transform = u);
            } else l.brush(s);
            var c = this.getSvgElement(s);
            (r.innerHTML = ''),
              r.appendChild(c.cloneNode()),
              t.setAttribute('clip-path', 'url(#' + n + ')'),
              e.length > 1 && this.updateDom(r, e.slice(1), i);
          } else t && t.setAttribute('clip-path', 'none');
        }),
        (o.prototype.markUsed = function(t) {
          var e = this;
          t.__clipPaths &&
            n.each(t.__clipPaths, function(t) {
              t._dom && r.prototype.markUsed.call(e, t._dom),
                t._textDom && r.prototype.markUsed.call(e, t._textDom);
            });
        });
      var s = o;
      t.exports = s;
    },
    942: function(t, e, i) {
      var r = i(307);
      function n(t, e) {
        r.call(this, t, e, ['filter'], '__filter_in_use__', '_shadowDom');
      }
      function a(t) {
        return (
          t &&
          (t.shadowBlur ||
            t.shadowOffsetX ||
            t.shadowOffsetY ||
            t.textShadowBlur ||
            t.textShadowOffsetX ||
            t.textShadowOffsetY)
        );
      }
      i(2).inherits(n, r),
        (n.prototype.addWithoutUpdate = function(t, e) {
          if (e && a(e.style)) {
            var i;
            if (e._shadowDom)
              (i = e._shadowDom), this.getDefs(!0).contains(e._shadowDom) || this.addDom(i);
            else i = this.add(e);
            this.markUsed(e);
            var r = i.getAttribute('id');
            t.style.filter = 'url(#' + r + ')';
          }
        }),
        (n.prototype.add = function(t) {
          var e = this.createElement('filter');
          return (
            (t._shadowDomId = t._shadowDomId || this.nextId++),
            e.setAttribute('id', 'zr' + this._zrId + '-shadow-' + t._shadowDomId),
            this.updateDom(t, e),
            this.addDom(e),
            e
          );
        }),
        (n.prototype.update = function(t, e) {
          if (a(e.style)) {
            var i = this;
            r.prototype.update.call(this, e, function() {
              i.updateDom(e, e._shadowDom);
            });
          } else this.remove(t, e);
        }),
        (n.prototype.remove = function(t, e) {
          null != e._shadowDomId && (this.removeDom(t), (t.style.filter = ''));
        }),
        (n.prototype.updateDom = function(t, e) {
          var i = e.getElementsByTagName('feDropShadow');
          i = 0 === i.length ? this.createElement('feDropShadow') : i[0];
          var r,
            n,
            a,
            o,
            s = t.style,
            h = (t.scale && t.scale[0]) || 1,
            l = (t.scale && t.scale[1]) || 1;
          if (s.shadowBlur || s.shadowOffsetX || s.shadowOffsetY)
            (r = s.shadowOffsetX || 0),
              (n = s.shadowOffsetY || 0),
              (a = s.shadowBlur),
              (o = s.shadowColor);
          else {
            if (!s.textShadowBlur) return void this.removeDom(e, s);
            (r = s.textShadowOffsetX || 0),
              (n = s.textShadowOffsetY || 0),
              (a = s.textShadowBlur),
              (o = s.textShadowColor);
          }
          i.setAttribute('dx', r / h),
            i.setAttribute('dy', n / l),
            i.setAttribute('flood-color', o);
          var u = a / 2 / h + ' ' + a / 2 / l;
          i.setAttribute('stdDeviation', u),
            e.setAttribute('x', '-100%'),
            e.setAttribute('y', '-100%'),
            e.setAttribute('width', Math.ceil((a / 2) * 200) + '%'),
            e.setAttribute('height', Math.ceil((a / 2) * 200) + '%'),
            e.appendChild(i),
            (t._shadowDom = e);
        }),
        (n.prototype.markUsed = function(t) {
          t._shadowDom && r.prototype.markUsed.call(this, t._shadowDom);
        });
      var o = n;
      t.exports = o;
    },
    99: function(t, e) {
      var i = Array.prototype.slice,
        r = function(t) {
          (this._$handlers = {}), (this._$eventProcessor = t);
        };
      function n(t, e, i, r, n, a) {
        var o = t._$handlers;
        if (('function' === typeof i && ((n = r), (r = i), (i = null)), !r || !e)) return t;
        (i = (function(t, e) {
          var i = t._$eventProcessor;
          return null != e && i && i.normalizeQuery && (e = i.normalizeQuery(e)), e;
        })(t, i)),
          o[e] || (o[e] = []);
        for (var s = 0; s < o[e].length; s++) if (o[e][s].h === r) return t;
        var h = { h: r, one: a, query: i, ctx: n || t, callAtLast: r.zrEventfulCallAtLast },
          l = o[e].length - 1,
          u = o[e][l];
        return u && u.callAtLast ? o[e].splice(l, 0, h) : o[e].push(h), t;
      }
      r.prototype = {
        constructor: r,
        one: function(t, e, i, r) {
          return n(this, t, e, i, r, !0);
        },
        on: function(t, e, i, r) {
          return n(this, t, e, i, r, !1);
        },
        isSilent: function(t) {
          var e = this._$handlers;
          return !e[t] || !e[t].length;
        },
        off: function(t, e) {
          var i = this._$handlers;
          if (!t) return (this._$handlers = {}), this;
          if (e) {
            if (i[t]) {
              for (var r = [], n = 0, a = i[t].length; n < a; n++)
                i[t][n].h !== e && r.push(i[t][n]);
              i[t] = r;
            }
            i[t] && 0 === i[t].length && delete i[t];
          } else delete i[t];
          return this;
        },
        trigger: function(t) {
          var e = this._$handlers[t],
            r = this._$eventProcessor;
          if (e) {
            var n = arguments,
              a = n.length;
            a > 3 && (n = i.call(n, 1));
            for (var o = e.length, s = 0; s < o; ) {
              var h = e[s];
              if (r && r.filter && null != h.query && !r.filter(t, h.query)) s++;
              else {
                switch (a) {
                  case 1:
                    h.h.call(h.ctx);
                    break;
                  case 2:
                    h.h.call(h.ctx, n[1]);
                    break;
                  case 3:
                    h.h.call(h.ctx, n[1], n[2]);
                    break;
                  default:
                    h.h.apply(h.ctx, n);
                }
                h.one ? (e.splice(s, 1), o--) : s++;
              }
            }
          }
          return r && r.afterTrigger && r.afterTrigger(t), this;
        },
        triggerWithContext: function(t) {
          var e = this._$handlers[t],
            r = this._$eventProcessor;
          if (e) {
            var n = arguments,
              a = n.length;
            a > 4 && (n = i.call(n, 1, n.length - 1));
            for (var o = n[n.length - 1], s = e.length, h = 0; h < s; ) {
              var l = e[h];
              if (r && r.filter && null != l.query && !r.filter(t, l.query)) h++;
              else {
                switch (a) {
                  case 1:
                    l.h.call(o);
                    break;
                  case 2:
                    l.h.call(o, n[1]);
                    break;
                  case 3:
                    l.h.call(o, n[1], n[2]);
                    break;
                  default:
                    l.h.apply(o, n);
                }
                l.one ? (e.splice(h, 1), s--) : h++;
              }
            }
          }
          return r && r.afterTrigger && r.afterTrigger(t), this;
        }
      };
      var a = r;
      t.exports = a;
    }
  }
]);
