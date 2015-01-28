"use strict";

angular.module('uiRouterAnimate', ['ui.router'])
  .provider('routerAnimate', function () {

    var states = [];
    this.setStates = function(v) {
      states = [].concat(v);
    };

    this.$get = function ($state) {
      return {
        getStates: function () {
          return states.length ? states : $state.get()
            .filter(function (state) {
              return state.name !== "";
            })
            .map(function (state) {
              return state.name;
            })
        }
      }
    }

  })
  .directive('routerAnimate', function ($rootScope, routerAnimate) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var states = routerAnimate.getStates();

        var getDirection = function (from, to) {
          var fromIndex = states.indexOf(from);
          var toIndex = states.indexOf(to);
          if (fromIndex < 0 && toIndex < 0) {
            return '';
          }
          if (toIndex > fromIndex) {
            return 'forward';
          }
          if (toIndex < fromIndex) {
            return 'backward';
          }
          return '';
        };

        scope.$on('$stateChangeStart', function (e, to, _toParams, from, _fromParams) {
          var direction = getDirection(from.name, to.name);
          element
            .removeClass('forward backward')
            .addClass(direction);
        });
      }
    }
  });