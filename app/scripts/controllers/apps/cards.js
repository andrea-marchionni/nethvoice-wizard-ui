'use strict';

/**
 * @ngdoc function
 * @name nethvoiceWizardUiApp.controller:AppsCardsCtrl
 * @description
 * # AppsCardsCtrl
 * Controller of the nethvoiceWizardUiApp
 */
angular.module('nethvoiceWizardUiApp')
  .controller('AppsCardsCtrl', function ($scope, ProfileService, ApplicationService) {
    $scope.allProfiles = [];
    $scope.allSources = [];
    $scope.allTemplates = [];
    $scope.allCards = [];
    $scope.allDBTypes = [];
    $scope.supportedColors = {
      'red': '#cc0000',
      'blue': '#0088ce',
      'orange': '#ec7a08',
      'gold': '#f0ab00',
      'light-green': '#92d400',
      'green': '#3f9c35',
      'cyan': '#007a87',
      'light-blue': '#00b9e4',
      'purple': '#703fec'
    };

    $scope.newSource = {
      verified: false,
      isChecking: false,
      checked: false,
      showPass: false
    };

    $scope.newTemplate = {
      html: '',
      custom: true
    };

    $scope.newCard = {
      query: ''
    };

    $scope.isCustomerCardsWizard = function (step) {
      var status = true;
      if (step == 1) {
        status = $scope.allSources.length == 0 && $scope.allTemplates.length == 0 && $scope.allCards.length == 0;
      }
      if (step == 2) {
        status = $scope.allTemplates.length == 0 && $scope.allCards.length == 0;
      }
      if (step == 3) {
        status = $scope.allCards.length == 0;
      }
      return status;
    };

    $scope.togglePass = function (g) {
      g.showPass = !g.showPass;
    };

    $scope.setColor = function (g, color) {
      g.onSaveColor = true;
      var oldColor = g.color;
      g.color = color;
      var hashOld = $scope.supportedColors[oldColor];
      var hash = $scope.supportedColors[color];
      RegExp.quote = function (str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      };
      var replace = hashOld;
      var re = new RegExp(RegExp.quote(replace), "g");
      g.html = g.html.replace(re, hash).replace('<!-- color: ' + oldColor + ' -->\n', '<!-- color: ' + color + ' -->\n');
    };

    $scope.editorOnChange = function (e) {
      setTimeout(function () {
        var _editor = e[1];
        _editor.resize();
      }, 200);
    };

    $scope.getDBName = function (type) {
      return $scope.allDBTypes[type];
    };

    $scope.getSourceName = function (id) {
      var obj = $scope.allSources.filter(function (val) {
        return val.id == id;
      })[0];
      return obj && obj.name;
    };

    $scope.getAllDBTypes = function () {
      ApplicationService.allDBTypes().then(function (res) {
        $scope.allDBTypes = res.data;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getAllSources = function (reload) {
      $scope.view.changeRoute = reload;
      ApplicationService.allSources().then(function (res) {
        $scope.allSources = res.data;
        $scope.view.changeRoute = false;
        for (var s in $scope.allSources) {
          $scope.checkConnection($scope.allSources[s]);
        }
      }, function (err) {
        console.log(err);
        $scope.view.changeRoute = false;
      });
    };

    $scope.getAllTemplates = function (reload) {
      $scope.view.changeRoute = reload;
      ApplicationService.allTemplates().then(function (res) {
        $scope.allTemplates = res.data;
        for (var t in $scope.allTemplates) {
          $scope.allTemplates[t].html = atob($scope.allTemplates[t].html);
        }
        $scope.view.changeRoute = false;
      }, function (err) {
        console.log(err);
        $scope.view.changeRoute = false;
      });
    };

    $scope.getAllCards = function (reload) {
      $scope.view.changeRoute = reload;
      ApplicationService.allCards().then(function (res) {
        $scope.allCards = res.data;
        for (var t in $scope.allCards) {
          $scope.allCards[t].query = atob($scope.allCards[t].query);
        }
        $scope.view.changeRoute = false;
      }, function (err) {
        console.log(err);
        $scope.view.changeRoute = false;
      });
    };

    $scope.getAllProfiles = function () {
      ProfileService.allProfiles().then(function (res) {
        $scope.allProfiles = res.data;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.checkConnection = function (s) {
      s.isChecking = true;
      ApplicationService.checkConnectionSource(s).then(function (res) {
        s.checked = true;
        s.isChecking = false;
        s.verified = true;
      }, function (err) {
        s.checked = true;
        s.isChecking = false;
        s.verified = false;
        console.log(err);
      });
    };

    $scope.saveSource = function (s) {
      s.onSave = true;
      if (s.id) {
        // clean useless data
        delete s.checked;
        delete s.isChecking;
        delete s.onSave;
        delete s.onMod;
        delete s.verified;
        ApplicationService.updateSource(s.id, s).then(function (res) {
          s.onSave = false;
          $scope.getAllSources(false);
          $scope.onSaveSuccessSource = true;
          $scope.onSaveErrorSource = false;
          $scope.allSources.push(s);
          $scope.newSource = {
            verified: false,
            isChecking: false,
            checked: false
          };
          $('#newSourceModal').modal('hide');
          if ($scope.isCustomerCardsWizard(2)) {
            setTimeout(function () {
              $('#newTemplateModal').modal('show');
            }, 500);
          }
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessSource = false;
          $scope.onSaveErrorSource = true;
          $('#newSourceModal').modal('hide');
          console.log(err);
        });
      } else {
        ApplicationService.createSource(s).then(function (res) {
          s.onSave = false;
          $scope.getAllSources(false);
          $scope.onSaveSuccessSource = true;
          $scope.onSaveErrorSource = false;
          $scope.allSources.push(s);
          $scope.newSource = {
            verified: false,
            isChecking: false,
            checked: false
          };
          $('#newSourceModal').modal('hide');
          if ($scope.isCustomerCardsWizard(3)) {
            setTimeout(function () {
              $('#newCardModal').modal('show');
            }, 500);
          }
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessSource = false;
          $scope.onSaveErrorSource = true;
          $('#newSourceModal').modal('hide');
          console.log(err);
        });
      }
    };
    $scope.modifySource = function (s) {
      s.onMod = true;
      $scope.newSource = s;
    };
    $scope.checkSourceDeps = function (s) {
      $('#cardSourceDepsModal').modal('show');
      $scope.cardDeps = s;
      $scope.cardDeps.loading = true;
      ApplicationService.sourceDeps(s.id).then(function (res) {
        $scope.cardDeps.dependencies = res.data;
        $scope.cardDeps.loading = false;
      }, function (err) {
        $scope.cardDeps.loading = false;
        console.log(err);
      });
    };
    $scope.deleteSource = function (s) {
      s.onSave = true;
      ApplicationService.deleteSource(s.id).then(function (res) {
        s.onSave = false;
        $scope.getAllSources(false);
        $('#cardSourceDepsModal').modal('hide');
      }, function (err) {
        s.onSave = false;
        console.log(err);
      });
    };
    $scope.cancelSource = function (s) {
      $scope.newSource = {
        verified: false,
        isChecking: false,
        checked: false
      };
      s = $scope.newSource;
      s.onMod = false;
    };

    $scope.saveTemplate = function (s) {
      s.onSave = true;
      s.html = btoa(s.html);
      if (s.onMod && s.name == s.old_name) {
        // clean useless data
        delete s.objects;
        delete s.onSave;
        delete s.onMod;
        delete s.onSaveColor;
        delete s.color;
        ApplicationService.updateTemplate(s.old_name, s).then(function (res) {
          s.onSave = false;
          $scope.getAllTemplates(false);
          $scope.onSaveSuccessTemplate = true;
          $scope.onSaveErrorTemplate = false;
          $scope.allTemplates.push(s);
          $scope.newTemplate = {
            html: '',
            custom: true
          };
          $('#newTemplateModal').modal('hide');
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessTemplate = false;
          $scope.onSaveErrorTemplate = true;
          $('#newTemplateModal').modal('hide');
          console.log(err);
        });
      } else {
        ApplicationService.createTemplate(s).then(function (res) {
          s.onSave = false;
          $scope.getAllTemplates(false);
          $scope.onSaveSuccessTemplate = true;
          $scope.onSaveErrorTemplate = false;
          $scope.allTemplates.push(s);
          $scope.newTemplate = {
            html: '',
            custom: true
          };
          $('#newTemplateModal').modal('hide');
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessTemplate = false;
          $scope.onSaveErrorTemplate = true;
          $('#newTemplateModal').modal('hide');
          console.log(err);
        });
      }

    };
    $scope.modifyTemplate = function (s) {
      s.onMod = true;
      s.old_name = s.name;
      s.objects = s.custom ? '[{"name": "John", "lastname": "Doe"}]' : '[{"col_1":"val_1","col_2":"val_2"}]';
      $scope.newTemplate = s;
    };
    $scope.checkTemplateDeps = function (s) {
      $('#cardTemplateDepsModal').modal('show');
      $scope.cardDeps = s;
      $scope.cardDeps.loading = true;
      ApplicationService.templateDeps(s.name).then(function (res) {
        $scope.cardDeps.dependencies = res.data;
        $scope.cardDeps.loading = false;
      }, function (err) {
        $scope.cardDeps.loading = false;
        console.log(err);
      });
    };
    $scope.deleteTemplate = function (s) {
      s.onSave = true;
      ApplicationService.deleteTemplate(s.name).then(function (res) {
        s.onSave = false;
        $scope.getAllTemplates(false);
        $('#cardTemplateDepsModal').modal('hide');
      }, function (err) {
        s.onSave = false;
        console.log(err);
      });
    };
    $scope.cancelTemplate = function (s) {
      $scope.newTemplate = {
        html: '<% for(var i=0; i<results.length; i++){ %><%= results[i].name %> <strong><%= results[i].lastname %></strong><% } %>',
        custom: true,
        objects: JSON.stringify([{
          name: "John",
          lastname: "Doe"
        }])
      };
      s = $scope.newTemplate;
      s.onMod = false;
    };

    $scope.saveCard = function (s) {
      s.onSave = true;
      s.query = btoa(s.query);
      if (s.id) {
        // clean useless data
        delete s.onSave;
        delete s.onMod;
        ApplicationService.updateCard(s.id, s).then(function (res) {
          s.onSave = false;
          $scope.getAllCards(false);
          $scope.onSaveSuccessCard = true;
          $scope.onSaveErrorCard = false;
          $scope.allCards.push(s);
          $scope.newCard = {
            query: ''
          };
          $('#newCardModal').modal('hide');
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessCard = false;
          $scope.onSaveErrorCard = true;
          $('#newCardModal').modal('hide');
          console.log(err);
        });
      } else {
        ApplicationService.createCard(s).then(function (res) {
          s.onSave = false;
          $scope.getAllCards(false);
          $scope.onSaveSuccessCard = true;
          $scope.onSaveErrorCard = false;
          $scope.allCards.push(s);
          $scope.newCard = {
            query: ''
          };
          $('#newCardModal').modal('hide');
        }, function (err) {
          s.onSave = false;
          $scope.onSaveSuccessCard = false;
          $scope.onSaveErrorCard = true;
          $('#newCardModal').modal('hide');
          console.log(err);
        });
      }

    };
    $scope.modifyCard = function (s) {
      s.onMod = true;
      s.render_html = '';
      $scope.newCard = s;
    };
    $scope.deleteCard = function (s) {
      s.onSave = true;
      ApplicationService.deleteCard(s.id).then(function (res) {
        s.onSave = false;
        $scope.getAllCards(false);
      }, function (err) {
        s.onSave = false;
        console.log(err);
      });
    };
    $scope.cancelCard = function (s) {
      $scope.newCard = {
        query: '',
        render_html: ''
      };
      s = $scope.newCard;
      s.onMod = false;
    };

    $scope.setPreview = function (g) {
      var tmpl = '';
      for (var t in $scope.allTemplates) {
        if (g.template == $scope.allTemplates[t].name) {
          tmpl = $scope.allTemplates[t].html;
        }
      }
      g.html = tmpl;
      g.render_html = '';
      $scope.ccard = g;
    };
    $scope.updatePreview = function (g) {
      g.isChecking = true;
      ApplicationService.customerCardPreview({
        dbconn_id: g.dbconn_id,
        template: g.template,
        query: btoa(g.query)
      }).then(function (res) {
        g.render_html = res.data;
        g.isChecking = false;
      }, function (err) {
        g.isChecking = false;
        console.log(err);
      });
    };
    $scope.setTemplatePreview = function (g) {
      g.objects = '[{"name": "John", "lastname": "Doe"}]';
    };
    $scope.setDuplicate = function (g) {
      $scope.duplicated = g;
      $scope.duplicated.old_name = g.name;
    };
    $scope.duplicateTemplate = function (g) {
      g.name = g.name;
      g.custom = true;
      $scope.saveTemplate(g);
      $('#duplicateTemplateModal').modal('hide');
    };

    $scope.getAllDBTypes();
    $scope.getAllProfiles();
    $scope.getAllSources(true);
    $scope.getAllTemplates(true);
    $scope.getAllCards(true);
  });
