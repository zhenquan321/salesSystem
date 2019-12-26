(window.webpackJsonp = window.webpackJsonp || []).push([
  [70],
  {
    513: function(e, r, t) {
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
          return o;
        }),
        t.d(r, 'ordersDetail', function() {
          return a;
        }),
        t.d(r, 'ordersAnalysis', function() {
          return i;
        });
      var n = t(141);
      function u(e) {
        return n.default.sendRequest('post', { path: '/v1/orders', params: e });
      }
      function s(e) {
        return n.default.sendRequest('post', { path: '/v1/orders/' + e });
      }
      function d(e, r) {
        return n.default.sendRequest('post', { path: '/v1/orders/' + e, params: r });
      }
      function o(e) {
        return n.default.get('/v1/orders', { params: e });
      }
      function a(e) {
        return n.default.sendRequest('get', { path: '/v1/orders/' + e });
      }
      function i() {
        return n.default.sendRequest('get', { path: '/v1/ordersAnalysis' });
      }
    }
  }
]);
