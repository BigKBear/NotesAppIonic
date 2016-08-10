//step3.1 wrap everything in a annomus function to prevent global variable in Step 3
(function() {
//Step 1 create the app variable
var app = angular.module('starter', ['ionic']);

//State provider service
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html'
  });

  $urlRouterProvider.otherwise('/list');
});

//Step 3 create a global variable
var notes = [
  {
    id: '1',
    title: 'First Note',
    description: 'This is my first note.'
  },
  {
    id: '2',
    title: 'Second Note',
    description: 'This is my second note.'
  }
];

  function getNote(noteId){
    for(var i = 0; i < notes.length; i++){
      if(notes[i].id === noteId){
        return notes[i];
      }
    }
    return undefined;
  }

//Step 2 create the controller
app.controller('ListCtrl', function($scope){
  //Step 3.2 created a note object on the scope
  $scope.notes = notes;

});

//the $state is a service that allows us to get the id passed in the url
app.controller('EditCtrl', function($scope, $state){
  //we first set a variavble on the scope with our noteId passed in the url
  $scope.note = getNote($state.params.noteId);

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