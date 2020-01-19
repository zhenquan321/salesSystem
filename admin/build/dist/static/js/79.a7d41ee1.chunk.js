(window.webpackJsonp = window.webpackJsonp || []).push([
  [79],
  {
    528: function(a, t, e) {
      'use strict';
      e.r(t),
        e.d(t, 'getListData', function() {
          return i;
        }),
        e.d(t, 'getTableData', function() {
          return o;
        });
      var n = e(141),
        d = e(168),
        r = e.n(d),
        s = r.a.mock({
          'data|6-10': [
            {
              id: '@id',
              detail: '@paragraph(1)',
              title: '@name',
              handler: '@cname',
              date: '@date(yyyy-MM-dd HH:mm:ss)',
              progress: '@natural(1,100)'
            }
          ]
        });
      r.a.mock('/get/listData', s);
      var u = r.a.mock({
        'data|30-60': [
          {
            'key|+1': 1,
            no: '@string(10)',
            domain: '@domain',
            num: '@natural(1,100)',
            status: '@natural(0,3)',
            date: '@date(yyyy-MM-dd HH:mm:ss)'
          }
        ]
      });
      function i() {
        return n.default.sendRequest('get', { path: '/get/listData' });
      }
      function o() {
        return n.default.sendRequest('get', { path: '/get/tableData' });
      }
      r.a.mock('/get/tableData', u);
    }
  }
]);
