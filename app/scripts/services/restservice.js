'use strict';

/**
 * @ngdoc service
 * @name nethvoiceWizardUiApp.RestService
 * @description
 * # RestService
 * Service in the nethvoiceWizardUiApp.
 */
angular.module('nethvoiceWizardUiApp')
  .service('RestService', function ($q, $http) {

    this.setAuthHeader = function(user, hash) {
      $http.defaults.headers.common.User = user;
      $http.defaults.headers.common.Secretkey = hash;
    };

    this.getHash = function(username, password) {
      var pwdHash = sha1(password);
      var hash = sha1(username + pwdHash + appConfig.SECRET_KEY);
      return hash;
    };

    this.get = function(endpoint) {
      return $q(function(resolve, reject) {
        $http.get(appConfig.BASE_API_URL + endpoint).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
    };

    this.post = function(endpoint, data) {
      return $q(function(resolve, reject) {
        $http.post(appConfig.BASE_API_URL + endpoint, data).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
    };

    this.put = function(endpoint, data) {
      return $q(function(resolve, reject) {
        $http.put(appConfig.BASE_API_URL + endpoint, data).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
    };

    this.delete = function(endpoint) {
      return $q(function(resolve, reject) {
        $http.delete(appConfig.BASE_API_URL + endpoint).then(function successCallback(response) {
          resolve(response);
        }, function errorCallback(response) {
          reject(response);
        });
      });
    };
  });
