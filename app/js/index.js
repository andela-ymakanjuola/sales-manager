(function(){
  angular.module("app", ["ngMaterial", "Leads", "Phases", "Refs", "Toast"])
  //Material design theme config
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('red');
  });
})();