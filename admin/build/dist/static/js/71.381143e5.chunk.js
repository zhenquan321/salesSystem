(window.webpackJsonp = window.webpackJsonp || []).push([
  [71],
  {
    518: function(e, r, t) {
      'use strict';
      t.r(r),
        t.d(r, 'createOrders', function() {
          return u;
        }),
        t.d(r, 'deleteOrders', function() {
          return s;
        }),
        t.d(r, 'updateOrders', function() {
          return d;
        }),
        t.d(r, 'ordersList', function() {
          return a;
        }),
        t.d(r, 'ordersDetail', function() {
          return o;
        }),
        t.d(r, 'ordersAnalysis', function() {
          return i;
        });
      var n = t(144);
      function u(e) {
        return n.default.sendRequest('post', { path: '/api/v1/orders', params: e });
      }
      function s(e) {
        return n.default.sendRequest('post', { path: '/api/v1/orders/' + e });
      }
      function d(e, r) {
        return n.default.sendRequest('post', { path: '/api/v1/orders/' + e, params: r });
      }
      function a(e) {
        return n.default.get('/api/v1/orders', { params: e });
      }
      function o(e) {
        return n.default.sendRequest('get', { path: '/api/v1/orders/' + e });
      }
      function i() {
        return n.default.sendRequest('get', { path: '/api/v1/ordersAnalysis' });
      }
    }
  }
]);
