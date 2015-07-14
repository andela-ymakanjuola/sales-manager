angular.module('Phases')

.controller('PhasesController', ['$scope', '$mdDialog', 'PhasesService','ToastService', function($scope, $mdDialog, PhasesService, ToastService) {

  $scope.phases = PhasesService.get();
  $scope.selected = null;
  $scope.showProgress = true;
  $scope.phases.$loaded().then(function() {
    $scope.showProgress = false;
  });
  $scope.hoverIn=function(){
    this.showButton = true;
  };
  $scope.hoverOut=function(){
    this.showButton = false;
  };
  $scope.getChecklist = function(phaseId) {
    return $scope.phases[phaseId].checklist;
  };
  $scope.showPhaseDialog = function(ev) { 
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.phase = {};
        $scope.phase.checklist = [];
        $scope.submitted = false;
        $scope.number = null;
        $scope.getNumber = function(num) {
          return num ? new Array(parseInt(num)): [];
        };
        $scope.save = function(valid) {
          $scope.submitted = true;
          if(valid) {
            PhasesService.create($scope.phase, function(err) {
              if(err) {
                ToastService('An error occurred');
              }
              else {
                ToastService($scope.phase.name + ' phase created!');
              }
              $mdDialog.hide();
            });
          }
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/phases/partials/new-phase.html',
      targetEvent: ev
    });
  };
  $scope.showPhase = function(ev, phase, phaseId) { 
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        var self = $scope;
        self.phase = phase;
        self.number = phase.checklist.length;
        $scope.getNumber = function(num) {
          return num ? new Array(parseInt(num)): [];
        };
        $scope.save = function(valid) {
          $scope.submitted = true;
          delete self.phase.$$hashKey;
          delete self.phase.$id;
          delete self.phase.$priority;
          PhasesService.update(self.phase, phase.name, function(err) {
            if(err) {
              ToastService('An error occurred');
            }
            else {
              ToastService($scope.phase.name + ' phase updated!');
            }
            $mdDialog.hide();
          });
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/phases/partials/phase-edit.html',
      targetEvent: ev
    });
  };
  $scope.showConfirm = function(ev, phase) {
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Delete ' + phase.name + '?!')
      .content('You cannot revert this!')
      .ariaLabel('Lead Delete')
      .ok('ok')
      .cancel('cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      PhasesService.delete(phase.$id, function(err) {
        if(err) {
          ToastService('An error occurred');
        }
        else {
          ToastService('phase deleted!');
        }
        $mdDialog.hide();
      });
    });
  };
}]);
