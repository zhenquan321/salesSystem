(window.webpackJsonp = window.webpackJsonp || []).push([
  [69],
  {
    507: function(t, n, e) {
      'use strict';
      e.r(n),
        e.d(n, 'createGoods', function() {
          return u;
        }),
        e.d(n, 'deleteGoods', function() {
          return s;
        }),
        e.d(n, 'updateGoods', function() {
          return d;
        }),
        e.d(n, 'goodsList', function() {
          return a;
        }),
        e.d(n, 'goodsDetail', function() {
          return r;
        }),
        e.d(n, 'goodsAnalysis', function() {
          return i;
        });
      var o = e(144);
      function u(t) {
        return o.default.sendRequest('post', { path: '/api/v1/goods', params: t });
      }
      function s(t) {
        return o.default.sendRequest('post', { path: '/api/v1/goods/' + t });
      }
      function d(t, n) {
        return o.default.sendRequest('post', { path: '/api/v1/goods/' + t, params: n });
      }
      function a(t) {
        return o.default.get('/api/v1/goods', { params: t });
      }
      function r(t) {
        return o.default.sendRequest('get', { path: '/api/v1/goods/' + t });
      }
      function i() {
        return o.default.sendRequest('get', { path: '/api/v1/goodsAnalysis' });
      }
    }
  }
]);
