angular.module('Leads')

.factory('LeadsService',['$firebaseArray', '$firebaseObject', 'Refs', function($firebaseArray, $firebaseObject, Refs) {
  return {

    get: function(cb) {
      if(!cb) {
        return $firebaseObject(Refs.leads);
      }
      else {
        Refs.leads.once('value', function(snap) {
          cb(snap.val());
        });
      }
    },

    create: function(lead, cb) {
      var leadRef = Refs.leads.push(lead, function(err) {
        if(err) {
          cb(err);
        }
        else {
          cb();
        }
      });
    },

    update: function(data, id, cb) {
      Refs.leads.child(id).update(data, function(err) {
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