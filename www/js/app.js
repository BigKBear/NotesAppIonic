(function() {

var app = angular.module('mynotes', ['ionic', 'mynotes.user', 'mynotes.notestore']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  $stateProvider.state('list', {
    url: '/',
    templateUrl: 'templates/list.html',
    cache: false
  });

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  $urlRouterProvider.otherwise('/');
});

//$ionicHistory is used to know that there is no need to go back to the login page via the back button
app.controller('LoginCtrl', function($scope, $state, $ionicHistory, User) {

  $scope.credentials = {
    user: '',
    password: ''
  };
  $scope.loginFailed = false;

  $scope.login = function() {
    //check if the use is already logged in
    User.login($scope.credentials)
      .then(function() {
        //the below line lets ionic ensure the history is new
        $ionicHistory.nextViewOptions({historyRoot: true});
        $state.go('list');
      })
      .catch(function() {
        $scope.loginFailed = true;
      });
  };

});

app.controller('ListCtrl', function($scope, NoteStore) {

  function refreshNotes() {
    NoteStore.list().then(function(notes) {
      $scope.notes = notes;
    });
  }
  refreshNotes();

  $scope.remove = function(noteId) {
    NoteStore.remove(noteId).then(refreshNotes);
  };

});

app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    title: '',
    description: ''
  };

  $scope.save = function() {
    NoteStore.create($scope.note).then(function() {
      $state.go('list');
    });
  };
});

app.controller('EditCtrl', function($scope, $state, NoteStore) {

  NoteStore.get($state.params.noteId).then(function(note) {
    $scope.note = note;
  });

  $scope.save = function() {
    NoteStore.update($scope.note).then(function() {
      $state.go('list');
    });
  };
});

app.run(function($rootScope, $state, $ionicPlatform, User) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    if (!User.isLoggedIn() && toState.name !== 'login') {
      event.preventDefault();
      $state.go('login');
    }

  });

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());