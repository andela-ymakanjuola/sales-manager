angular.module('Phases')

.controller('PhasesController', ['$scope', '$mdDialog', 'PhasesService','ToastService', function($scope, $mdDialog, PhasesService, ToastService) {

  $scope.phases = PhasesService.get();
  $scope.selected = null;
  $scope.showProgress = true;

  $scope.phases.$loaded().then(function() {
    $scope.showProgress = false;
  });

  $scope.getChecklist = function(phaseId) {
    return $scope.phases[phaseId].checklist;
  };
  
  $scope.showPhaseDialog = function(ev) { 
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.phase = {};
        $scope.phase.checklist = [];
        $scope.submitted = false;
        $scope.number = 1;
        $scope.getNumber = function(num) {
          return new Array(parseInt(num));   
        };
        $scope.save = function() {
          $scope.submitted = true;
          console.log($scope.phase);
          PhasesService.create($scope.phase, function(err) {
            if(err) {
              ToastService('An error occurred');
            }
            else {
              ToastService($scope.phase.name + ' phase created!');
            }
            $mdDialog.hide();
          });
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/phases/partials/new-phase.html',
      targetEvent: ev
    });
  };
}]);
