const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-description-input");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#new-post-link");
const descriptionInput = newPostModal.querySelector("#new-post-caption");

editProfileBtn.addEventListener("click", function(){
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
    editProfileModal.classList.add("modal_is-opened"); 
}); 

editProfileCloseBtn.addEventListener("click", function(){
    editProfileModal.classList.remove("modal_is-opened")
}
);

newPostBtn.addEventListener("click", function(){
    newPostModal.classList.add("modal_is-opened")
});

newPostCloseBtn.addEventListener("click", function(){
    newPostModal.classList.remove("modal_is-opened")
});
 
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  fillInputFields();
  editProfileModal.classList.remove("modal_is-opened")
};
 
function fillInputFields(){
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value; 
};

  // Close the modal.

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  console.log(linkInput.value);
  console.log(descriptionInput.value);

  // Close the modal.
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);