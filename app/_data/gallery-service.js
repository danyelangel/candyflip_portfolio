(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name gallery.service:Gallery
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Gallery', Gallery);

  function Gallery($q, Image) {
    var self = this,
        GalleryCrud;

    self.init = init;
    self.get = get;
    self.create = create;
    self.remove = remove;
    self.addImage = addImage;
    self.removeImage = removeImage;

    function init(_GalleryCrud) {
      GalleryCrud = _GalleryCrud;
      self.crud = GalleryCrud;
    }

    function get(galleryId) {
      var deferred = $q.defer();
      if (galleryId) {
        GalleryCrud.get(galleryId).then(deferred.resolve);
      } else {
        GalleryCrud.list().then(deferred.resolve);
      }
      return deferred.promise;
    }

    function create() {
      var deferred = $q.defer();
      Image.create().then(function (imageRef) {
        GalleryCrud.add().then(function (galleryRef) {
          GalleryCrud.addChild(imageRef.key(), galleryRef.key()).then(function () {
            deferred.resolve(galleryRef);
          });
        });
      });
      return deferred.promise;
    }

    function remove(galleryKey) {
      var deferred = $q.defer();
      if (galleryKey) {
        GalleryCrud.remove(galleryKey).then(deferred.resolve);
      } else {
        console.log('Could not remove gallery since there is no key');
      }
      return deferred.promise;
    }

    function addImage(galleryKey) {
      // Create image. Returns reference
      Image.create().then(function (imageRef) {
        // Add image to article
        GalleryCrud.addChild(imageRef.key(), galleryKey);
      });
    }

    function removeImage(index, imageKey, galleryKey) {
      var deferred = $q.defer();
      GalleryCrud.removeChild(index, galleryKey).then(function () {
        Image.remove(imageKey).then(deferred.resolve);
      });
      return deferred.promise;
    }
  }
}());
