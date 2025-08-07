const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function(){
    editProfileModal.classList.add("modal_is-opened"); 
}); 

editProfileCloseBtn.addEventListener("click", function(){
    editProfileModal.classList.remove("modal_is-opened")
}
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

newPostBtn.addEventListener("click", function(){
    newPostModal.classList.add("modal_is-opened")
});

newPostCloseBtn.addEventListener("click", function(){
    newPostModal.classList.remove("modal_is-opened")
});


const profileNameElement = document.querySelector("profile_name");
const profileJobElement = document.querySelector("profile_description");

const profileFormElement = editProfileModal.querySelector(."modal__form")
const nameInput = editProfileModal.querySelector(".popup__input_name");
const jobInput = editProfileModal.querySelector(".popup__input_description");
 
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  inputName.value = profileNameElement.textContent;
  inputJob.value = profileJobElement.textContent;
});
 
function fillInputFields(){
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value; 
});

  // Close the modal.

// Set the submit listener.
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Select the necessary form elements. You should select
// these from inside the modal, not the document.
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector(".modal__label");
const nameInput = newPostModal.querySelector(".modal__submit-btn");

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  console.log("linkInput.value");
  console.log("nameinput.value");

  // Close the modal.
}

// Create the submit listener.
addCardFormElement.addEventListener('submit', handleAddCardSubmit);