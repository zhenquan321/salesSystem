(window.webpackJsonp = window.webpackJsonp || []).push([
  [20],
  {
    267: function(e, n, t) {
      'use strict';
      t.r(n);
      t(170);
      var r = t(48),
        c = (t(602), t(381)),
        i = t(0),
        o = t.n(i),
        a = t(52);
      n.default = Object(a.g)(function(e) {
        var n = function(n) {
          var t = n.code,
            r = n.description;
          e.history.push('/exception/'.concat(t)),
            c.a.error({ message: '\u8bf7\u6c42\u9519\u8bef '.concat(t), description: r });
        };
        return o.a.createElement(
          'div',
          null,
          o.a.createElement(
            r.a,
            {
              type: 'primary',
              onClick: function() {
                return n({
                  code: 403,
                  description:
                    '\u7528\u6237\u5df2\u6388\u6743,\u4f46\u662f\u6ca1\u6709\u8bbf\u95ee\u9875\u9762\u7684\u6743\u9650\u54e6~'
                });
              }
            },
            '\u9519\u8bef403'
          ),
          o.a.createElement(
            r.a,
            {
              style: { margin: '0 16px' },
              type: 'primary',
              onClick: function() {
                return n({
                  code: 404,
                  description:
                    '\u62b1\u6b49~\u670d\u52a1\u5668\u4e0a\u6ca1\u6709\u76f8\u5e94\u7684\u8d44\u6e90'
                });
              }
            },
            '\u9519\u8bef404'
          ),
          o.a.createElement(
            r.a,
            {
              type: 'primary',
              onClick: function() {
                return n({ code: 500, description: '\u670d\u52a1\u5668\u51fa\u9519\u4e86\u54e6' });
              }
            },
            '\u9519\u8bef500'
          )
        );
      });
    }
  }
]);
