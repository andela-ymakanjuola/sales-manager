angular.module('Phases')

.controller('PhasesController', ['$scope', '$mdDialog', 'PhasesService','ToastService', function($scope, $mdDialog, PhasesService, ToastService) {

  $scope.phases = ['New','Ending', 'Sold'];

  // $scope.phases.$loaded().then(function() {
  //   $scope.showProgress = false;
  // });
  
  $scope.showPhaseDialog = function(ev) { 
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.phase = null;
        $scope.submitted = false;
        $scope.number = 5;
        $scope.getNumber = function(num) {
          return new Array(parseInt(num));   
        }

        $scope.save = function() {
          $scope.submitted = true;
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
      templateUrl: 'app/js/Phases/partials/new-phase.html',
      targetEvent: ev
    });
  };
}]);
