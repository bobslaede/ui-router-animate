"use strict";

angular.module('app', ['uiRouterAnimate', 'ngAnimate', 'ui.router'])
  .config(function ($stateProvider, routerAnimateProvider) {
    $stateProvider
      .state('one', {
        url: '/one',
        resolve: {
          foo: function () {
            return true;
          }

        },
        template: '<div>one</div>'
      })
      .state('two', {
        url: '/two',
        template: '<div>two</div>'
      })
      .state('three', {
        url: '/three',
        template: '<div>three</div>'
      })

    // set custom state order, otherwise it will get it from the $stateProvider
    /*
    routerAnimateProvider.setStates([
      'one', 'two', 'three'
    ]);
    */

  });