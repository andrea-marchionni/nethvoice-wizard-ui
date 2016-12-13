'use strict';

/**
 * @ngdoc function
 * @name nethvoiceWizardUiApp.controller:UsersConfigurationsCtrl
 * @description
 * # UsersConfigurationsCtrl
 * Controller of the nethvoiceWizardUiApp
 */
angular.module('nethvoiceWizardUiApp')
  .controller('UsersConfigurationsCtrl', function($scope, $filter, UserService, DeviceService, UtilService) {
    $scope.users = {};
    $scope.selectedUser = {};
    $scope.devices = {};
    $scope.maxExtensionReached = false;

    $scope.cancelError = function() {
      $scope.maxExtensionReached = false;
    };

    $scope.initGraphics = function() {
      jQuery('.bootstrap-switch-voicemail').on('switchChange.bootstrapSwitch', $scope.setVoiceMail);
    };

    $scope.getUserList = function(reload) {
      $scope.view.changeRoute = reload;
      UserService.list().then(function(res) {
        $scope.users = res.data;
        $scope.view.changeRoute = false;
        $scope.selectUser($scope.currentUserIndex || $scope.users[0].id);
        if ($scope.mode.isLegacy && UtilService.isEmpty($scope.users)) {
          $scope.wizard.nextState = false;
        }
      }, function(err) {
        console.log(err);
      });
    };

    $scope.getDeviceList = function(key) {
      DeviceService.phoneList().then(function(res) {
        $scope.devices = res.data;
        if (UtilService.isEmpty($scope.devices)) {
          $scope.wizard.nextState = false;
        }
      }, function(err) {
        console.log(err);
      });
    };

    $scope.getNameFromExtension = function(virtual) {
      if ($scope.users.filter) {
        return $scope.users.filter(function(obj) {
          if (obj.default_extension == virtual) {
            return obj;
          }
        })[0].displayname;
      }
    };

    $scope.selectUser = function(id) {
      $scope.currentUserIndex = id;
      $scope.selectedUser = $scope.users.filter(function(obj) {
        if (obj.id == id) {
          return obj;
        }
      })[0];
      UserService.getMobileExtension($scope.selectedUser.username).then(function(res) {
        $scope.selectedUser.mobile = res.data;
      }, function(err) {
        if (err.status != 404) {
          console.log(err);
        }
      });
      UserService.getVoiceMail($scope.selectedUser.default_extension).then(function(res) {
        $('#bootstrap-switch-voicemail-' + $scope.selectedUser.id).bootstrapSwitch('state', true);
      }, function(err) {
        if (err.status != 404) {
          console.log(err);
        }
        $('#bootstrap-switch-voicemail-' + $scope.selectedUser.id).bootstrapSwitch('state', false);
      });
    };

    $scope.setPhysicalExtension = function(user, device) {
      device.setPhysicalInAction = true;
      UserService.createPhysicalExtension({
        virtualextension: user.default_extension,
        mac: device.mac
      }).then(function(res) {
        device.setPhysicalInAction = false;
        $scope.getUserList(false);
        $scope.getDeviceList(false);
      }, function(err) {
        device.setPhysicalInAction = false;
        console.log(err);
        if (err.data.status == "There aren't available extension numbers") {
          $scope.maxExtensionReached = true;
        }
      });
    };

    $scope.unsetPhysicalExtension = function(device) {
      device.setPhysicalInAction = true;
      UserService.deletePhysicalExtension({
        mac: device.mac
      }).then(function(res) {
        device.setPhysicalInAction = false;
        $scope.getUserList(false);
        $scope.getDeviceList(false);
        console.log(res);
      }, function(err) {
        device.setPhysicalInAction = false;
        console.log(err);
      });
    };

    $scope.setMobileExtension = function(user) {
      $scope.selectedUser.setMobileInAction = true;
      if (user.mobile) {
        UserService.createMobileExtension({
          username: user.username,
          mobile: user.mobile
        }).then(function(res) {
          $scope.selectedUser.setMobileInAction = false;
        }, function(err) {
          console.log(err);
          $scope.selectedUser.setVoiceMailInAction = false;
        });
      }
    };

    $scope.setVoiceMail = function(event, state) {
      $scope.selectedUser.setVoiceMailInAction = true;
      UserService.createVoiceMail({
        extension: $scope.selectedUser.default_extension,
        state: state ? 'yes' : 'no'
      }).then(function(res) {
        $scope.selectedUser.setVoiceMailInAction = false;
      }, function(err) {
        console.log(err);
        $scope.selectedUser.setVoiceMailInAction = false;
      });
    };

    $scope.initGraphics();

    $scope.getUserList(true);
    $scope.getDeviceList();
  });