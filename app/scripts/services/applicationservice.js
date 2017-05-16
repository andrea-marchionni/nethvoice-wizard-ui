'use strict';

/**
 * @ngdoc service
 * @name nethvoiceWizardUiApp.ApplicationService
 * @description
 * # ApplicationService
 * Service in the nethvoiceWizardUiApp.
 */
angular.module('nethvoiceWizardUiApp')
  .service('ApplicationService', function ($q, $http, RestService, RestServiceCTI) {
    this.allSources = function () {
      return $q(function (resolve, reject) {
        RestService.get('/cti/dbconn').then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.allTemplates = function () {
      return $q(function (resolve, reject) {
        RestService.get('/cti/customer_card/template').then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.allCards = function () {
      return $q(function (resolve, reject) {
        RestService.get('/cti/customer_card').then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.allDBTypes = function () {
      return $q(function (resolve, reject) {
        RestService.get('/cti/dbconn/type').then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.sourceDeps = function (id) {
      return $q(function (resolve, reject) {
        RestService.get('/cti/customer_card?dbconn_id=' + id).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.templateDeps = function (name) {
      return $q(function (resolve, reject) {
        RestService.get('/cti/customer_card?template=' + name).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.checkConnectionSource = function (obj) {
      return $q(function (resolve, reject) {
        RestServiceCTI.post('/dbconn/test', obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.customerCardPreview = function () {
      return $q(function (resolve, reject) {
        RestServiceCTI.get('/custcard/getbynum/%/html').then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.createSource = function (obj) {
      return $q(function (resolve, reject) {
        RestService.post('/cti/dbconn', obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.updateSource = function (id, obj) {
      return $q(function (resolve, reject) {
        RestService.put('/cti/dbconn/' + id, obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.deleteSource = function (id) {
      return $q(function (resolve, reject) {
        RestService.delete('/cti/dbconn/' + id).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.createTemplate = function (obj) {
      return $q(function (resolve, reject) {
        RestService.post('/cti/customer_card/template', obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.updateTemplate = function (id, obj) {
      return $q(function (resolve, reject) {
        RestService.put('/cti/customer_card/template/' + id, obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.deleteTemplate = function (name) {
      return $q(function (resolve, reject) {
        RestService.delete('/cti/customer_card/template/' + name).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.createCard = function (obj) {
      return $q(function (resolve, reject) {
        RestService.post('/cti/customer_card', obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.updateCard = function (id, obj) {
      return $q(function (resolve, reject) {
        RestService.put('/cti/customer_card/' + id, obj).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };

    this.deleteCard = function (id) {
      return $q(function (resolve, reject) {
        RestService.delete('/cti/customer_card/' + id).then(function (res) {
          resolve(res);
        }, function (err) {
          reject(err);
        });
      });
    };
  });
