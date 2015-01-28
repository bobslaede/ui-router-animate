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
  .directive('routerAnimate', function () {
    return {
      restrict: 'A',
      priority: 200,
      controller: function ($scope, $rootScope, routerAnimate) {
        var element;

        var states = routerAnimate.getStates();

        this.setElement = function (ele) {
          element = ele;
        };

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

        var unbind = $rootScope.$on('$stateChangeStart', function (e, to, _toParams, from, _fromParams) {
          if (!element) {
            return;
          }
          var direction = getDirection(from.name, to.name);
          console.log(direction);
          element
            .removeClass('forward backward')
            .addClass(direction);
        });

        $scope.$on('$destroy', function () {
          console.log('destroy');
          unbind();
        })

      },
      link: function (scope, element, attrs, ctrl) {
        ctrl.setElement(element);
        console.log('create');
      }
    }
  });