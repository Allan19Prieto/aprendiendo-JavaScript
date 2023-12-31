pl.v.deleteMovie = {
    setupUserInterface: function () {
    var deleteMovie = document.forms['Movie'].commit;
    var selectEl = document.forms['Movie'].selectMovie;
    var key="", keys=[], book=null, optionEl=null, i=0;

    // load all book objects
    Movie.retrieveAll();
    keys = Object.keys( Movie.instances);
    
    // populate the selection list with books
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      movie = Movie.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.movieId;
      selectEl.add( optionEl, null);
    }
    // Set an event handler for the submit/delete button
    deleteMovie.addEventListener("click",
        pl.v.deleteMovie.handleDeleteButtonClickEvent);
    // Set a handler for the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Movie.saveAll);
  },
    // Event handler for deleting a book
  handleDeleteButtonClickEvent: function () {
    const selectEl = document.forms["Movie"].selectBook,
          isbn = selectEl.value;
    if (isbn) {
      Movie.destroy( isbn );
      // remove deleted book from select options
      selectEl.remove( selectEl.selectedIndex);
    }
  }
}