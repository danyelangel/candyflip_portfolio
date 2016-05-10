(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name image.service:Image
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Image', Image);

  function Image($q) {
    var self = this,
        ImageCrud;

    self.init = init;
    self.get = get;
    self.create = create;
    self.remove = remove;

    function init(_ImageCrud) {
      ImageCrud = _ImageCrud;
      self.crud = ImageCrud;
    }

    function get(imageId) {
      var deferred = $q.defer();
      if (imageId) {
        ImageCrud.get(imageId).then(deferred.resolve);
      } else {
        ImageCrud.list().then(deferred.resolve);
      }
      return deferred.promise;
    }

    function create() {
      var deferred = $q.defer();
      ImageCrud.add({
        url: ''
      }).then(deferred.resolve);
      return deferred.promise;
    }

    function remove(imageKey) {
      var deferred = $q.defer();
      if (imageKey) {
        ImageCrud.remove(imageKey).then(deferred.resolve);
      } else {
        console.log('Could not remove image since there is no key');
      }
      return deferred.promise;
    }
  }
}());
