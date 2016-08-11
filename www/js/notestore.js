angular.module('mynotes.notestore', [])
/* Creating a Service
  Service to manage the sahared notes data called NoteStore
   */
   .factory('NoteStore', function(){
    var notes = [];

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
      },

      updateNote: function(note){
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            return;
          }
        }
      }

    };

   });