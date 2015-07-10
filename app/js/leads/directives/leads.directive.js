angular.module('Leads')

  .directive('leads',function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      templateUrl: 'app/js/leads/partial/leads.html'
    }
  })
