(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Auth
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Lang', Lang);

  function Lang($window) {
    var self = this,
        callbacks = [],
        language = $window.navigator.language || $window.navigator.userLanguage;

    self.set = set;
    self.current = 'en';
    self.onChange = onChange;
    self.validLangs = ['en', 'es'];
    if (language.indexOf('es') > -1) {
      self.current = 'es';
    } else {
      self.current = 'en';
    }

    function set(lang) {
      var langExists = false;
      angular.forEach(self.validLangs, function (value) {
        if (lang === value) {
          langExists = true;
        }
      });
      if (langExists) {
        self.current = lang;
        fireCallbacks();
      } else {
        console.log('Couldn\'t set current language. Language doesn\'t exist');
      }
    }

    function onChange(callback) {
      callback();
      callbacks.push(callback);
    }

    function fireCallbacks() {
      angular.forEach(callbacks, function (callback) {
        callback();
      });
    }
  }
}());
