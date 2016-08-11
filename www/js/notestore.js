angular.module('mynotes.notestore', [])
/* Creating a Service
  Service to manage the sahared notes data called NoteStore
   */
   .factory('NoteStore', function(){
    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    //window.localStorage['notes']
    function persist(){
    	window.localStorage['notes'] = angular.toJson(notes);
    }

    return {
      list:function(){
        return notes;
      },

      getNote: function(noteId){
        for(var i = 0; i < notes.length; i++){
          if(notes[i].id === noteId){
            return notes[i];
          }
        }
        return undefined;
      },

      createNote: function(note) {
        notes.push(note);
        persist();
      },

      updateNote: function(note){
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            persist();
            return;
          }
        }
      },

      remove: function(noteId){
	      	for(var i = 0; i < notes.length; i++){
	          if(notes[i].id === noteId){
	            notes.splice(i, 1);
	            persist();
	            return;
	          }
	      }
	  	}
    };

   });