angular.module('Leads')

.controller('LeadsController', ['$scope', '$mdDialog', 'LeadsService','PhasesService','ToastService', function($scope, $mdDialog, LeadsService, PhasesService, ToastService) {

  $scope.leads = LeadsService.get();
  var phases = PhasesService.get();
  $scope.phases = {};
  $scope.showProgress = true;
  $scope.leads.$loaded().then(function() {
    $scope.showProgress = false;
    angular.forEach(phases, function(phase, phaseId) {
      $scope.phases[phase.name] = {id: phaseId, name: phase.name,checklist:phases[phaseId].checklist};
    });
  });

  $scope.showLeadDialog = function(ev, phases) {
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.lead = null;
        $scope.submitted = false;
        $scope.phases = phases;
        $scope.save = function(valid) {
          $scope.submitted = true;
          if (valid) {
            $scope.lead.start_date = $scope.lead.startDate ? $scope.lead.startDate.getTime() : null;
            delete $scope.lead.startDate;
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
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/leads/partials/new-lead.html',
      targetEvent: ev
    });
  };

  $scope.showLead = function(ev, phases, lead) {
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        var self = $scope;
        self.lead = lead;
        self.submitted = false;
        self.phases = phases;
        $scope.save = function() {
          self.submitted = true;
          var id = self.lead.$id;
          delete self.lead.$id;
          delete self.lead.$priority;
          delete self.lead.$$hashKey;
          LeadsService.update(self.lead, id, function(err) {
            if(err) {
              ToastService('An error occurred');
            }
            else {
              ToastService(self.lead.contact + ' lead updated!');
            }
            $mdDialog.hide();
          });
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/leads/partials/leads.html',
      targetEvent: ev
    });
  };
}]);
