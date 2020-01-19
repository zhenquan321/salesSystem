(window.webpackJsonp = window.webpackJsonp || []).push([
  [80],
  {
    506: function(e, r, t) {
      'use strict';
      t.r(r),
        t.d(r, 'createOrders', function() {
          return a;
        }),
        t.d(r, 'deleteOrders', function() {
          return u;
        }),
        t.d(r, 'updateOrders', function() {
          return s;
        }),
        t.d(r, 'ordersList', function() {
          return d;
        }),
        t.d(r, 'ordersDetail', function() {
          return i;
        }),
        t.d(r, 'ordersAnalysis', function() {
          return o;
        }),
        t.d(r, 'dailyDataAnalysis', function() {
          return p;
        });
      var n = t(141);
      function a(e) {
        return n.default.sendRequest('post', { path: '/api/v1/orders', params: e });
      }
      function u(e) {
        return n.default.sendRequest('delete', { path: '/api/v1/orders/' + e });
      }
      function s(e, r) {
        return n.default.sendRequest('post', { path: '/api/v1/orders/' + e, params: r });
      }
      function d(e) {
        return n.default.get('/api/v1/orders', { params: e });
      }
      function i(e) {
        return n.default.sendRequest('get', { path: '/api/v1/orders/' + e });
      }
      function o(e) {
        return n.default.get('/api/v1/ordersAnalysis', { params: e });
      }
      function p(e) {
        return n.default.get('/api/v1/dailyData', { params: e });
      }
    }
  }
]);
