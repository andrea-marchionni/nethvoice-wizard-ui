'use strict';

/**
 * @ngdoc function
 * @name nethvoiceWizardUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nethvoiceWizardUiApp
 */
angular.module('nethvoiceWizardUiApp')
  .controller('MainCtrl', function($scope, $location, $http) {
    if ($scope.wizard.isWizard) {
      $location.path('users/extensions');
    }
  });