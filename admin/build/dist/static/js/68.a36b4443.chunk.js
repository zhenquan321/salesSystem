(window.webpackJsonp = window.webpackJsonp || []).push([
  [68],
  {
    503: function(e, t, r) {
      'use strict';
      r.r(t),
        r.d(t, 'createOrders', function() {
          return u;
        }),
        r.d(t, 'deleteOrders', function() {
          return a;
        }),
        r.d(t, 'updateOrders', function() {
          return s;
        }),
        r.d(t, 'ordersList', function() {
          return d;
        }),
        r.d(t, 'ordersDetail', function() {
          return i;
        }),
        r.d(t, 'ordersAnalysis', function() {
          return o;
        }),
        r.d(t, 'dailyDataAnalysis', function() {
          return p;
        });
      var n = r(141);
      function u(e) {
        return n.default.sendRequest('post', { path: '/api/v1/orders', params: e });
      }
      function a(e) {
        return n.default.sendRequest('delete', { path: '/api/v1/orders/' + e });
      }
      function s(e, t) {
        return n.default.sendRequest('post', { path: '/api/v1/orders/' + e, params: t });
      }
      function d(e) {
        return n.default.get('/api/v1/orders', { params: e });
      }
      function i(e) {
        return n.default.sendRequest('get', { path: '/api/v1/orders/' + e });
      }
      function o() {
        return n.default.sendRequest('get', { path: '/api/v1/ordersAnalysis' });
      }
      function p() {
        return n.default.sendRequest('get', { path: '/api/v1/dailyData' });
      }
    }
  }
]);
