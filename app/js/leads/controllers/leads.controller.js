angular.module('Leads')

.controller('LeadsController', ['$scope', '$mdDialog', 'LeadsService','ToastService', function($scope, $mdDialog, LeadsService, ToastService) {

  $scope.leads = LeadsService.get();
  $scope.phases = ['New','Ending', 'Sold'];

  $scope.leads.$loaded().then(function() {
    $scope.showProgress = false;
  });
  
  $scope.showLeadDialog = function(ev) { 
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.lead = null;
        $scope.submitted = false;

        $scope.save = function() {
          $scope.submitted = true;
          LeadsService.create($scope.lead, function(err) {
            if(err) {
              ToastService('An error occurred');
            }
            else {
              ToastService($scope.lead.contact + ' lead created!');
            }
            $mdDialog.hide();
          });
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/leads/partials/new-lead.html',
      targetEvent: ev
    });
  };
}]);
