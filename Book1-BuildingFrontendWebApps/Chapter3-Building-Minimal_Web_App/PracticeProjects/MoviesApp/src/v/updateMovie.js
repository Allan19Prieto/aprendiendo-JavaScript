pl.v.updateMovie = {
  setupUserInterface: function () {
    const formEl = document.forms["Movie"],
          saveButton = formEl.commit,
          selectMovieEl = formEl.selectMovie;
    // load all book objects
    Movie.retrieveAll();  
    
    // populate the selection list with books
    for (const key of Object.keys( Movie.instances)) {
      const movie = Movie.instances[key];
      const optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.movieId;
      selectMovieEl.add( optionEl, null);
    }

    // when a book is selected, fill the form with its data
    selectMovieEl.addEventListener("change", 
        pl.v.updateMovie.handleMovieSelectionEvent);
    // set an event handler for the submit/save button
    saveButton.addEventListener("click",
        pl.v.updateMovie.handleSaveButtonClickEvent);
    // handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Movie.saveAll);
  },
  handleMovieSelectionEvent: function () {
    const formEl = document.forms["Movie"],
          selectMovieEl = formEl.selectMovie,
          key = selectMovieEl.value;
    if (key) {
      const movie = Movie.instances[key];
      formEl.movieId.value = movie.movieId;
      formEl.title.value = movie.title;
      formEl.releaseDate.value = movie.releaseDate;
    } else {
      formEl.reset();
    }
  },
  handleSaveButtonClickEvent: function () {
    const formEl = document.forms["Movie"],
          selectMovieEl = formEl.selectMovie;
    const slots = { isbn: formEl.isbn.value,
        title: formEl.title.value,
        year: formEl.releaseDate.value
    };
    Movie.update( slots);
    // update the selection list option element
    selectMovieEl.options[selectMovieEl.selectedIndex].text = slots.title;
    formEl.reset();
  }
};