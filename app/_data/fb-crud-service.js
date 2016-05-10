(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Image
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('FbCrud', FbCrud);

  function FbCrud($firebaseObject, $firebaseArray, $q) {
    var self = this,
        objects = {};

    self.newInstance = newInstance;

    function newInstance(rootRef, child) {
      objects[child] = {
        ref: rootRef.child(child),
        fbArray: $firebaseArray(rootRef.child(child))
      };
      return {
        setModel: set(objects[child], 'model'),
        list: list(objects[child]),
        add: add(objects[child]),
        addChild: addChild(objects[child]),
        removeChild: removeChild(objects[child]),
        remove: remove(objects[child]),
        get: get(objects[child])
      };
    }

    function set(object, property) {
      return function (data) {
        object[property] = data;
      };
    }

    function get(object) {
      return function (itemKey) {
        var deferred = $q.defer(),
            fbObj;
        if (object.ref) {
          fbObj = $firebaseObject(object.ref.child(itemKey));
          fbObj.$loaded().then(deferred.resolve);
        } else {
          console.log('Could not get since array has not been initialized.');
        }
        return deferred.promise;
      };
    }

    function list(object) {
      return function () {
        var deferred = $q.defer();
        if (object.fbArray) {
          object.fbArray.$loaded().then(deferred.resolve);
        } else {
          console.log('Could not list since array has not been initialized.');
        }
        return deferred.promise;
      };
    }

    function add(object) {
      return function (data) {
        var deferred = $q.defer(),
            newModel;
        if (object.fbArray) {
          if (data) {
            newModel = data;
          } else if (object.model) {
            newModel = object.model;
          } else {
            newModel = {};
          }
          object.fbArray.$add(newModel).then(deferred.resolve);
        } else {
          console.log('Could not create since array has not been initialized.');
        }
        return deferred.promise;
      };
    }

    function addChild(object) {
      return function (childKey, parentKey) {
        var deferred = $q.defer(),
            childrenRef,
            childrenArray;
        if (object.ref) {
          childrenRef = object.ref.child(parentKey).child('children');
          childrenArray = $firebaseArray(childrenRef);
          childrenArray.$add(childKey).then(deferred.resolve);
        } else {
          console.log('Could not create child since array has not been initialized.');
        }
        return deferred.promise;
      };
    }

    function removeChild(object) {
      return function (index, parentKey) {
        var deferred = $q.defer(),
            childrenRef,
            childrenArray;
        if (object.ref) {
          childrenRef = object.ref.child(parentKey).child('children');
          childrenArray = $firebaseArray(childrenRef);
          childrenArray.$loaded().then(function () {
            childrenArray
              .$remove(childrenArray[index])
              .then(deferred.resolve);
          });
        } else {
          console.log('Could not remove child since array has not been initialized.');
        }
        return deferred.promise;
      };
    }

    function remove(object) {
      return function (itemKey) {
        var deferred = $q.defer(),
            record;
        if (object.fbArray) {
          record = object.fbArray.$getRecord(itemKey);
          object.fbArray.$remove(record).then(deferred.resolve);
        } else {
          console.log('Could not remove since array has not been initialized.');
        }
        return deferred.promise;
      };
    }
  }
}());
