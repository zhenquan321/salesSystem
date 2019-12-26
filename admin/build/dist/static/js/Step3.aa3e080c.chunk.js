(window.webpackJsonp = window.webpackJsonp || []).push([
  [106, 136],
  {
    1118: function(a, i, n) {
      a.exports = {
        'margin-mini': 'margin-mini--3XD7h',
        'padding-mini': 'padding-mini--dl1mv',
        'margin-top-mini': 'margin-top-mini--1B1A0',
        'padding-top-mini': 'padding-top-mini--2zirX',
        'margin-right-mini': 'margin-right-mini--2FYyd',
        'padding-right-mini': 'padding-right-mini--3Vz5D',
        'margin-bottom-mini': 'margin-bottom-mini--hy1sN',
        'padding-bottom-mini': 'padding-bottom-mini--1q5_R',
        'margin-left-mini': 'margin-left-mini--3HTaW',
        'padding-left-mini': 'padding-left-mini--3bhf9',
        'margin-small': 'margin-small--5yzdH',
        'padding-small': 'padding-small--3Myim',
        'margin-top-small': 'margin-top-small--2gD9b',
        'padding-top-small': 'padding-top-small--3HXNV',
        'margin-right-small': 'margin-right-small--3BdM0',
        'padding-right-small': 'padding-right-small--1pLYI',
        'margin-bottom-small': 'margin-bottom-small--3u9lQ',
        'padding-bottom-small': 'padding-bottom-small--1ou2f',
        'margin-left-small': 'margin-left-small--NpbwM',
        'padding-left-small': 'padding-left-small--34GEJ',
        'margin-normal': 'margin-normal--1pK2t',
        'padding-normal': 'padding-normal--1h6lf',
        'margin-top-normal': 'margin-top-normal--1KanD',
        'padding-top-normal': 'padding-top-normal--3inPU',
        'margin-right-normal': 'margin-right-normal--24As7',
        'padding-right-normal': 'padding-right-normal--WuC88',
        'margin-bottom-normal': 'margin-bottom-normal--tmCw5',
        'padding-bottom-normal': 'padding-bottom-normal--2DDlL',
        'margin-left-normal': 'margin-left-normal--28ou0',
        'padding-left-normal': 'padding-left-normal--8CT1_',
        'margin-large': 'margin-large--mSJCS',
        'padding-large': 'padding-large--1XzqV',
        'margin-top-large': 'margin-top-large--3ib67',
        'padding-top-large': 'padding-top-large--P8yha',
        'margin-right-large': 'margin-right-large--3r6CM',
        'padding-right-large': 'padding-right-large--2MEYU',
        'margin-bottom-large': 'margin-bottom-large--1Pdrr',
        'padding-bottom-large': 'padding-bottom-large--_lDfL',
        'margin-left-large': 'margin-left-large--1ICVl',
        'padding-left-large': 'padding-left-large--3HvCb',
        steps: 'steps--9kOON',
        step: 'step--h7RiL',
        buttonGroup: 'buttonGroup--2JaPN',
        descript: 'descript--330hs'
      };
    },
    548: function(a, i, n) {
      'use strict';
      n.r(i);
      n(167);
      var t = n(46),
        m = n(0),
        l = n.n(m),
        r = n(253),
        g = n(76),
        e = n(511),
        d = n(1118),
        o = n.n(d),
        p = n(244);
      i.default = function() {
        var a = e.default.initStep;
        return l.a.createElement(
          'div',
          { className: o.a.step },
          l.a.createElement(r.default, {
            type: 'successed',
            title: '\u6dfb\u52a0\u6210\u529f',
            subtitle: l.a.createElement(g.default, {
              id: 'step3.soon',
              defaultMessage: '\u5546\u54c1\u5df2\u6210\u529f\u6dfb\u52a0'
            })
          }),
          l.a.createElement(
            'div',
            { className: o.a.buttonGroup },
            l.a.createElement(
              t.a,
              { type: 'primary', onClick: a },
              l.a.createElement(g.default, {
                id: 'step3.oneMore',
                defaultMessage: '\u518d\u6b21\u6dfb\u52a0'
              })
            ),
            l.a.createElement(
              p.b,
              { to: '/form/goodsList', replace: !0 },
              l.a.createElement(
                t.a,
                { style: { marginLeft: '8px' } },
                l.a.createElement(g.default, {
                  id: 'step3.checkList',
                  defaultMessage: '\u67e5\u770b\u5546\u54c1\u5217\u8868'
                })
              )
            )
          )
        );
      };
    }
  }
]);
