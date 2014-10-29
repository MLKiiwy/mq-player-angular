'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
