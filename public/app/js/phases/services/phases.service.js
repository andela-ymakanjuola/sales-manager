angular.module('Phases')

.factory('PhasesService',['$firebaseArray', '$firebaseObject', 'Refs', function($firebaseArray, $firebaseObject, Refs) {
  return {
    get: function(cb) {
      if(!cb) {
        return $firebaseObject(Refs.phases);
      }
      else {
        Refs.phases.orderByChild('no').once('value', function(snap) {
          cb(snap.val());
        });
      }
    },
    create: function(lead, cb) {
      var phaseref = Refs.phases.child(lead.name).set(lead, function(err) {
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
    },
    delete: function(id, cb) {
      Refs.leads.child(id).remove(function(err) {
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