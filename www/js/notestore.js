/*
Note Store Service
Creator: Kyle St.Hill
Purpose: Manage the notes data
*/
angular.module('mynotes.notestore', [])
//Step 1 Add http angular service used to make http request
   .factory('NoteStore', function($http){

    //Variable decleared that contains the base URL can be called in future from a configuration file
    var apiUrl = 'http://localhost:8200';

    return {
      //Fucton used to return a list of notes from the REST API
      list:function(){
        //TODO
        /*Make an Http get request from the /notes/ path the get request returns a promise
        we then call the .then on the get request and pass a call back function that will receive the response
        */
        return $http.get(apiUrl + '/notes/').then(function(response){
          return response.data;
        });
      },

      get: function(noteId){
        return $http.get(apiUrl + '/notes/' + noteId)
          .then(function(response){
          return response.data;
        });
      },

      create: function(note) {
        return $http.post(apiUrl + '/notes/', note);
      },

      update: function(note){
        return $http.put(apiUrl + '/notes/' + note.id, note);
      },

      remove: function(noteId){
	      return $http.delete(apiUrl + '/notes/' + noteId);
      }

    };

   });