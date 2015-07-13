angular.module('Leads')

.controller('LeadsController', ['$scope', '$mdDialog', 'LeadsService','PhasesService','ToastService', function($scope, $mdDialog, LeadsService, PhasesService, ToastService) {

  $scope.leads = LeadsService.get();
  $scope.phases = {};
  PhasesService.get(function(phases){
    angular.forEach(phases, function(phase, phaseId) {
      $scope.phases[phase.name] = {id: phaseId, name: phase.name,checklist:phases[phaseId].checklist};
    });
  });
  $scope.showProgress = true;
  $scope.leads.$loaded().then(function() {
    $scope.showProgress = false;
  });

  $scope.hoverIn=function(){
    this.showButton = true;
  };
  $scope.hoverOut=function(){
    this.showButton = false;
  };

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

  $scope.showEditLead = function(ev, phases,leadId, lead) {
    $mdDialog.show({
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        var self = $scope;
        self.lead = lead;
        self.submitted = false;
        self.phases = phases;
        self.lead.startDate = self.lead.start_date ? new Date(self.lead.start_date) : null;

        $scope.save = function(valid) {
          self.submitted = true;
          self.lead.start_date = self.lead.startDate ? self.lead.startDate.getTime() : null;
          if(valid) {
            var id = self.lead.$id;
            delete self.lead.$id;
            delete self.lead.$priority;
            delete self.lead.$$hashKey;
            delete self.lead.startDate;
            LeadsService.update(self.lead, id, function(err) {
              if(err) {
                ToastService('An error occurred');
              }
              else {
                ToastService(self.lead.contact + ' lead updated!');
              }
              $mdDialog.hide();
            });
          }
        };
        $scope.close = function() {
          $mdDialog.hide();
        };
      }],
      templateUrl: 'app/js/leads/partials/lead-edit.html',
      targetEvent: ev
    });
  };

  $scope.showConfirm = function(ev,leadId, lead) {
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Delete ' + lead.contact + '?!')
      .content('You cannot revert this!')
      .ariaLabel('Lead Delete')
      .ok('ok')
      .cancel('cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      LeadsService.delete(lead.$id, function(err) {
        if(err) {
          ToastService('An error occurred');
        }
        else {
          ToastService('lead deleted!');
        }
        $mdDialog.hide();
      });
    });
  };
}]);
