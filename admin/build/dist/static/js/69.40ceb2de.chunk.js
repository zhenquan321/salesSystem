(window.webpackJsonp = window.webpackJsonp || []).push([
  [69],
  {
    506: function(t, e, n) {
      'use strict';
      n.r(e),
        n.d(e, 'createGoods', function() {
          return u;
        }),
        n.d(e, 'deleteGoods', function() {
          return s;
        }),
        n.d(e, 'updateGoods', function() {
          return d;
        }),
        n.d(e, 'goodsList', function() {
          return a;
        }),
        n.d(e, 'goodsDetail', function() {
          return r;
        }),
        n.d(e, 'goodsAnalysis', function() {
          return i;
        });
      var o = n(144);
      function u(t) {
        return o.default.sendRequest('post', { path: '/api/v1/goods', params: t });
      }
      function s(t) {
        return o.default.sendRequest('delete', { path: '/api/v1/goods/' + t });
      }
      function d(t, e) {
        return o.default.sendRequest('put', { path: '/api/v1/goods/' + t, params: e });
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
