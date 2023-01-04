"use strict";
(function () {
  angular
    .module("cybersponse")
    .controller("editRecordCard100DevCtrl", editRecordCard100DevCtrl);

    editRecordCard100DevCtrl.$inject = [
    "$scope",
    "$uibModalInstance",
    "config",
    "appModulesService",
    "Entity"
  ];
  function editRecordCard100DevCtrl(
    $scope,
    $uibModalInstance,
    config,
    appModulesService,
    Entity
  ) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.loadAttributes = loadAttributes;
    function _init(){
      var _config = {
        mapping: {
            cardTitle: null,
            subtitle: null,
            showIcon: false,
            cardLeftBorder: null
          }};
      $scope.config = {};
      angular.extend($scope.config, _config, config);
      $scope.pageConfig = {
        maxRecordSize: [5, 10, 15, 20],
      };
      appModulesService.load(true).then(function (modules) {
        $scope.modules = modules;
        if ($scope.config.module !== "") {
          loadAttributes();
        }
      });
    }
    function loadAttributes() {
      $scope.fields = [];
      $scope.fieldsArray = [];
      $scope.pickListFields = [];
      var entity = new Entity($scope.config.module);
      entity.loadFields().then(function () {
        for (var key in entity.fields) {
          if (entity.fields[key].type === "picklist") {
            $scope.pickListFields.push(entity.fields[key]);
          }
        }
        $scope.fields = entity.getFormFields();
        angular.extend($scope.fields, entity.getRelationshipFields());
        $scope.fieldsArray = entity.getFormFieldsArray();
      });
    }
    function cancel() {
      $uibModalInstance.dismiss("cancel");
    }

    function save() {
      if ($scope.editRecordCardWidgetForm.$invalid) {
        $scope.editRecordCardWidgetForm.$setTouched();
        $scope.editRecordCardWidgetForm.$focusOnFirstError();
        return;
      }
      $uibModalInstance.close($scope.config);
    }
    _init();
  }
})();