(window.webpackJsonp = window.webpackJsonp || []).push([
  [103, 131],
  {
    1104: function(a, i, n) {
      a.exports = {
        'margin-mini': 'margin-mini--D94aE',
        'padding-mini': 'padding-mini--3pMW5',
        'margin-top-mini': 'margin-top-mini--2PapX',
        'padding-top-mini': 'padding-top-mini--1nWJa',
        'margin-right-mini': 'margin-right-mini--3xfiR',
        'padding-right-mini': 'padding-right-mini--3onaf',
        'margin-bottom-mini': 'margin-bottom-mini--lW2lQ',
        'padding-bottom-mini': 'padding-bottom-mini--2ix1M',
        'margin-left-mini': 'margin-left-mini--2Myyu',
        'padding-left-mini': 'padding-left-mini--2cOr5',
        'margin-small': 'margin-small--IFkGm',
        'padding-small': 'padding-small--2dDpc',
        'margin-top-small': 'margin-top-small--3Yn9Y',
        'padding-top-small': 'padding-top-small--3HZOU',
        'margin-right-small': 'margin-right-small--37JC0',
        'padding-right-small': 'padding-right-small--3v4EF',
        'margin-bottom-small': 'margin-bottom-small--2mroo',
        'padding-bottom-small': 'padding-bottom-small--13xb8',
        'margin-left-small': 'margin-left-small--3Bp6g',
        'padding-left-small': 'padding-left-small--1n3ra',
        'margin-normal': 'margin-normal--39Ca-',
        'padding-normal': 'padding-normal--19v9e',
        'margin-top-normal': 'margin-top-normal--xdFuP',
        'padding-top-normal': 'padding-top-normal--3LSXn',
        'margin-right-normal': 'margin-right-normal--3tO92',
        'padding-right-normal': 'padding-right-normal--3Q9Ug',
        'margin-bottom-normal': 'margin-bottom-normal--192si',
        'padding-bottom-normal': 'padding-bottom-normal--bvCEO',
        'margin-left-normal': 'margin-left-normal--3z8bG',
        'padding-left-normal': 'padding-left-normal--2U43Y',
        'margin-large': 'margin-large--13JK_',
        'padding-large': 'padding-large--26njd',
        'margin-top-large': 'margin-top-large--1T_Z8',
        'padding-top-large': 'padding-top-large--3xqpj',
        'margin-right-large': 'margin-right-large--apFBo',
        'padding-right-large': 'padding-right-large--2QZGw',
        'margin-bottom-large': 'margin-bottom-large--2mke-',
        'padding-bottom-large': 'padding-bottom-large--2LDxG',
        'margin-left-large': 'margin-left-large--3CBa_',
        'padding-left-large': 'padding-left-large--3PnVe',
        steps: 'steps--3hrMG',
        step: 'step--1nWfn',
        buttonGroup: 'buttonGroup--1WIgN',
        descript: 'descript--7XCoz'
      };
    },
    511: function(a, i, n) {
      'use strict';
      n.r(i);
      n(164);
      var t = n(44),
        m = n(0),
        r = n.n(m),
        e = n(249),
        g = n(74),
        l = n(502),
        d = n(1104),
        o = n.n(d);
      i.default = function() {
        var a = l.default.initStep;
        return r.a.createElement(
          'div',
          { className: o.a.step },
          r.a.createElement(e.default, {
            type: 'successed',
            title: r.a.createElement(g.default, {
              id: 'action.success',
              defaultMessage: '\u64cd\u4f5c\u6210\u529f'
            }),
            subtitle: r.a.createElement(g.default, {
              id: 'step3.soon',
              defaultMessage: '\u5df2\u6536\u5230\u6d88\u606f\uff0c\u5c06\u5c3d\u5feb\u5904\u7406~'
            })
          }),
          r.a.createElement(
            'div',
            { className: o.a.buttonGroup },
            r.a.createElement(
              t.a,
              { type: 'primary', onClick: a },
              r.a.createElement(g.default, {
                id: 'step3.oneMore',
                defaultMessage: '\u518d\u6765\u4e00\u5355'
              })
            ),
            r.a.createElement(
              t.a,
              { style: { marginLeft: '8px' } },
              r.a.createElement(g.default, {
                id: 'step3.checkList',
                defaultMessage: '\u67e5\u770b\u8bb0\u5f55'
              })
            )
          )
        );
      };
    }
  }
]);
