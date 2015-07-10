angular.module('Phases')

.factory('PhasesService',['$firebaseArray', '$firebaseObject', 'Refs', function($firebaseArray, $firebaseObject, Refs) {
  return {

    get: function(cb) {
      if(!cb) {
        return $firebaseArray(Refs.phases);
      }
      else {
        Refs.phases.once('value', function(snap) {
          cb(snap.val());
        });
      }
    },

    create: function(lead, cb) {
      var leadRef = Refs.phases.push(lead, function(err) {
        if(err) {
          cb(err);
        }
        else {
          // project.id = projectRef.toString().split('/').pop();
          cb();
        }
      });
    },

    update: function(data, id, cb) {
      Refs.phases.child(id).update(data, function(err) {
        if(err) {
          cb(err);
        }
        else {
          cb();
        }
      });
    },

  };
}]);