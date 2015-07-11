angular.module('Phases')

.factory('PhasesService',['$firebaseArray', '$firebaseObject', 'Refs', function($firebaseArray, $firebaseObject, Refs) {
  return {

    get: function(cb) {
      if(!cb) {
        return $firebaseObject(Refs.phases);
      }
      else {
        Refs.phases.once('value', function(snap) {
          cb(snap.val());
        });
      }
    },

    create: function(lead, cb) {
      var phaseref = Refs.phases.push(lead, function(err) {
        if(err) {
          cb(err);
        }
        else {
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
    }
  };
}]);