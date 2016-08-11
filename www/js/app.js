//step3.1 wrap everything in a annomus function to prevent global variable in Step 3
(function() {
//Step 1 create the app variable
var app = angular.module('mynotes', ['ionic', 'mynotes.notestore']);

//State provider service
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
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

  $urlRouterProvider.otherwise('/list');
});

//Step 2 create the controller
app.controller('ListCtrl', function($scope, NoteStore){
  //Step 3.2 created a note object on the scope
  $scope.notes = NoteStore.list();

  $scope.remove = function(noteId){
    NoteStore.remove(noteId);
  };
});

app.controller('AddCtrl', function($scope, $state, NoteStore) {

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function() {
    NoteStore.createNote($scope.note);
    $state.go('list');
  };
});

//the $state is a service that allows us to get the id passed in the url
app.controller('EditCtrl', function($scope, $state, NoteStore){
  //we first set a variavble on the scope with our noteId passed in the url
  $scope.note = angular.copy(NoteStore.getNote($state.params.noteId));
  
  $scope.save = function() {
    NoteStore.updateNote($scope.note);
    $state.go('list');
  };
});

//Step1.1 calling the run on the app variable
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());