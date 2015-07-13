angular.module('Refs')
  .factory('Refs', [function() {
    var rootRef = new Firebase('https://sales-manager.firebaseio.com/');

    // define every standard ref used application wide
    return {
      root: rootRef,
      users: rootRef.child('users'),
      phases: rootRef.child('phases'),
      leads: rootRef.child('leads')
    };
  }]);
