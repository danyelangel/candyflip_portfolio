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
    .service('Auth', Auth);

  function Auth($firebaseAuth, $window) {
    var self = this,
        authObject = null;

    self.init = init;
    self.auth = auth;
    self.unauth = unauth;
    self.onAuth = onAuth;

    function init(ref) {
      authObject = $firebaseAuth(ref);
      self.authData = authObject.$getAuth();
      authObject.$onAuth(function (authData) {
        self.authData = authData;
      });
    }

    function auth() {
      var password;
      if (authObject) {
        password = $window.prompt('Introduzca Contraseña');
        if (password) {
          self.authObject.$authWithPassword({
            email: 'danyelangel@hotmail.com',
            password: password
          }).then(function () {
          }).catch(function () {
            self.auth();
          });
        }
      } else {
        console.log('The Auth module hasn\'t been initialized');
      }
    }

    function unauth() {
      authObject.$unauth();
      console.log('unauthed');
    }

    function onAuth(callback) {
      if (self.authData) {
        callback(self.authData);
      }
      authObject.$onAuth(function (authData) {
        callback(authData);
      });
    }
  }
}());
