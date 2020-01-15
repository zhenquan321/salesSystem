(window.webpackJsonp = window.webpackJsonp || []).push([
  [78],
  {
    524: function(e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, 'createReplenishment', function() {
          return r;
        }),
        t.d(n, 'deleteReplenishment', function() {
          return u;
        }),
        t.d(n, 'updateReplenishment', function() {
          return a;
        }),
        t.d(n, 'replenishmentList', function() {
          return s;
        }),
        t.d(n, 'replenishmentGoing', function() {
          return p;
        }),
        t.d(n, 'replenishmentDetail', function() {
          return l;
        }),
        t.d(n, 'replenishmentAnalysis', function() {
          return d;
        }),
        t.d(n, 'dailyDataAnalysis', function() {
          return f;
        });
      var i = t(141);
      function r(e) {
        return i.default.sendRequest('post', { path: '/api/v1/replenishment', params: e });
      }
      function u(e) {
        return i.default.sendRequest('delete', { path: '/api/v1/replenishment/' + e });
      }
      function a(e, n) {
        return i.default.sendRequest('put', { path: '/api/v1/replenishment/' + e, params: n });
      }
      function s(e) {
        return i.default.get('/api/v1/replenishment', { params: e });
      }
      function p(e) {
        return i.default.get('/api/v1/replenishmentGoing', { params: e });
      }
      function l(e) {
        return i.default.sendRequest('get', { path: '/api/v1/replenishment/' + e });
      }
      function d() {
        return i.default.sendRequest('get', { path: '/api/v1/replenishmentAnalysis' });
      }
      function f() {
        return i.default.sendRequest('get', { path: '/api/v1/dailyData' });
      }
    }
  }
]);
