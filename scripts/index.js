const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function(){
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
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

const profileNameElement = document.querySelector(".profile_name");
const profileJobElement = document.querySelector(".profile_description");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-description-input");
 
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

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#profile-name-input");
const descriptionInput = newPostModal.querySelector("#profile-description-input");

function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  console.log(linkInput.value);
  console.log(descriptionInput.value);

  // Close the modal.
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);