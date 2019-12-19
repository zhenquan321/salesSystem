(window.webpackJsonp = window.webpackJsonp || []).push([
  [63],
  {
    505: function(t, e, n) {
      'use strict';
      n.r(e),
        n.d(e, 'createGoods', function() {
          return u;
        }),
        n.d(e, 'deleteGoods', function() {
          return d;
        }),
        n.d(e, 'updateGoods', function() {
          return s;
        }),
        n.d(e, 'goodsList', function() {
          return r;
        }),
        n.d(e, 'goodsDetail', function() {
          return a;
        });
      var o = n(139);
      function u(t) {
        return o.default.sendRequest('post', { path: '/v1/goods', params: t });
      }
      function d(t) {
        return o.default.sendRequest('delete', { path: '/v1/goods/' + t });
      }
      function s(t, e) {
        return o.default.sendRequest('put', { path: '/v1/goods/' + t, params: e });
      }
      function r() {
        return o.default.sendRequest('get', { path: '/v1/goods' });
      }
      function a(t) {
        return o.default.sendRequest('get', { path: '/v1/goods/' + t });
      }
    }
  }
]);
