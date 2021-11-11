const addMovieModal = document.getElementById("add-modal");
console.log(addMovieModal); //DISPLAY A SCREEN TO ADD MOVEIS
const startMovieButton = document.querySelector("header button");
console.log(startMovieButton); // TARGTING ADD MOVIE BUTTOn
const addBackDrop = document.getElementById("backdrop");
const cancelMovieModalButton = addMovieModal.querySelector(".btn--passive");
console.log(cancelMovieModalButton); //
const addMovieModalButton = cancelMovieModalButton.nextElementSibling;
console.log(addMovieModalButton);
const userInputsFromAddMovie = addMovieModal.querySelectorAll("input");
console.log(userInputsFromAddMovie);
const section = document.querySelector("section");
console.log(section);
const moviesListUL = document.getElementById("movie-list");

const deleteModalConfirmation = document.getElementById("delete-modal");
console.log(deleteModalConfirmation);

const cancelButton = deleteModalConfirmation.querySelector(".btn--passive");
let yesButton = deleteModalConfirmation.querySelector(".btn--danger"); //has replace with method for fliping

const moviesFromAddButton = [];

// also you can do other ways like this:
/*

 const addBackDropElement = () =>{
 addBackDrop.classList.add("visible");
 }
 function toggleMovieVisibility (){
     addMovieModal.classList.toggle("visible")
     addBackDropElement();
     thenn add it after click event listener without parantesis because you don't want to imidityl execute the function just to point at it 
 }
*/

const clearUserInputs = () => {
  for (const usrInput of userInputsFromAddMovie) {
    usrInput.value = "";
  }
};

startMovieButton.addEventListener("click", () => {
  addMovieModal.classList.toggle("visible");
  addBackDrop.classList.toggle("visible");
});

// const toggleMovieBackDrop = () => {
//   addBackDrop.classList.remove("visible");
//   addMovieModal.classList.remove("visible");
// };

// addBackDrop.addEventListener("click", toggleMovieBackDrop);

const cancelMovieHandler = () => {
  addMovieModal.classList.remove("visible");
  addBackDrop.classList.remove("visible");
  deleteModalConfirmation.classList.remove("visible");
  clearUserInputs();
};

const addMoviesUI = () => {
  if (moviesFromAddButton > 0) {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
};

const deleteMovieConfirm = (movieId) => {
  let movieIndex = 0;
  for (const movie of moviesFromAddButton) {
    if (movie.id === movieId) {
      alert("You have deleted the movie !!");
      deleteModalConfirmation.classList.remove("visible");
      addBackDrop.classList.remove("visible");
      break;
    }
    movieIndex++;
  }
  moviesFromAddButton.splice(movieIndex, 1);
  moviesListUL.children[movieIndex].remove();
  addMoviesUI();
};

const deleteMoviesHandler = (movieId) => {
  deleteModalConfirmation.classList.add("visible");
  addBackDrop.classList.add("visible");
  //this will delete previues events to fire a new events works fine without bind method

  ///this will clone your function and replace this existing with the new one FLIP hack style
  yesButton.replaceWith(yesButton.cloneNode(true));
  cancelButton.removeEventListener("click", cancelMovieHandler);
  cancelButton.addEventListener("click", cancelMovieHandler);

  yesButton.addEventListener("click", deleteMovieConfirm.bind(null, movieId));
  //deleteMovieConfirm(movieId);
};
const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.classList.add("movie-element");
  newMovieElement.innerHTML = `
   <div class ="movie-element__image">
    <img src=${image} alt="${title}"></img>
   </div>
    <div class ="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
   </div>
  `;
  newMovieElement.addEventListener("click", deleteMoviesHandler.bind(null, id));
  moviesListUL.appendChild(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = userInputsFromAddMovie[0].value;
  const urlValue = userInputsFromAddMovie[1].value;
  const ratingValue = userInputsFromAddMovie[2].value;

  if (
    titleValue.trim() === "" ||
    urlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert(
      "INVALID INPUTS fields must not be emtpy and rating value must be not bigger then 5 "
    );
    return; // do not continue with function exectuion
  }
  // moviesFromAddButton.push(titleValue, urlValue, ratingValue);
  // console.log(moviesFromAddButton);
  const userMovies = {
    id: Math.random().toString(),
    userTitle: titleValue,
    userUrl: urlValue,
    userRating: ratingValue,
  };
  moviesFromAddButton.push(userMovies);
  cancelMovieHandler();
  clearUserInputs();
  addMoviesUI();
  renderNewMovieElement(
    userMovies.id,
    userMovies.userTitle,
    userMovies.userUrl,
    userMovies.userRating
  );
  console.log(moviesFromAddButton);
};

addMovieModalButton.addEventListener("click", addMovieHandler);
cancelMovieModalButton.addEventListener("click", cancelMovieHandler);
// cancelMovieModalButton.addEventListener("click", () => {
//   addMovieModal.classList.remove("visible");
//   addBackDrop.classList.remove("visible");
// });
