import "../pages/index.css";
import {
  enableValidation,
  disableButton,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "447cc5c7-8732-411c-ac01-1b197e9caa1d",
    "Content-Type": "application/json",
  },
});

const profilePhotoImage = document.querySelector(".profile__photo");

//when you call an element, think about what it is supposed to do and the reason why you need to call it
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

const newPostModal = document.querySelector("#new-post-modal");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = newPostModal.querySelector(".modal__form"); //why select the modal__form and not its parent modal__container including the buttons?
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

//CREATE PROFILE PHOTO AVATAR SELECTORS. VIDEO 5 18:05
const avatarProfileBtn = document.querySelector(".profile__photo-btn");
const avatarEditModal = document.querySelector("#avatar-profile-modal");
const avatarModalCloseBtn = avatarEditModal.querySelector(".modal__close-btn");
const avatarModalSubmitBtn =
  avatarEditModal.querySelector(".modal__submit-btn");
const avatarPhotoForm = avatarEditModal.querySelector(".modal__form");

//DELETE FORM ELEMENTS
const deleteModal = document.querySelector("#delete-modal");
const deleteModalSubmit = deleteModal.querySelector("#delete-modal-submit");
const deleteModalCancel = deleteModal.querySelector("#delete-modal-cancel");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");

const avatarInput = avatarEditModal.querySelector("#profile-photo-input");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-description-input");
const newPostBtn = document.querySelector(".profile__add-btn");
const linkInput = newPostModal.querySelector("#new-post-link");
const descriptionInput = newPostModal.querySelector("#new-post-caption");
const submitButton = newPostModal.querySelector(".modal__submit-btn");
const cardTemplate = document.querySelector("#card-template");
//Scope question: The preview image modal is not apart of the cloned template card
//elements in the DOM. How does the Scope of the preview image modal and the cloned
//card nodes compare? Right now, the JavaScript for the preview is in the Universal
//scope and it works.

const modalPreview = document.querySelector("#preview-image-modal");
const imageModal = modalPreview.querySelector(".modal__image"); // Select the modalImageEl from your modalPreview
const titleModal = modalPreview.querySelector(".modal__caption"); //
const closeModalPreview = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);

const cardList = document.querySelector(".cards__list");

function escapeHandler(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_is-opened");
    closeModal(activePopup);
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  const likeButton = cardElement.querySelector(".card__like-button");

  console.log(data.link, data._id);
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  likeButton.addEventListener("click", () => {
    handleLike(data._id);
  });

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  function handleLike(id) {
    const changeLikeStatus = likeButton.classList.contains(
      "card__like-button_is-active"
    )
      ? api.removeLike
      : api.addLike;
    changeLikeStatus(id)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch(console.error);
  }

  deleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  //Preview Image Modal
  cardImageEl.addEventListener("click", () => {
    titleModal.textContent = data.name;
    imageModal.src = data.link;
    imageModal.alt = data.name;

    openModal(modalPreview);
  });

  return cardElement;
}

let cardReadyToBeDeleted, cardReadyToBeDeletedEl;

function handleDeleteCard(cardElement, cardId) {
  cardReadyToBeDeleted = cardId;
  cardReadyToBeDeletedEl = cardElement;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.target.textContent = "Deleting...";

  api
    .deleteCard(cardReadyToBeDeleted)
    .then(() => {
      cardReadyToBeDeletedEl.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      evt.target.textContent = "Delete";
    });
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeHandler);
}

avatarProfileBtn.addEventListener("click", function () {
  openModal(avatarEditModal);
});

avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarEditModal);
});

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
  openModal(editProfileModal);
});

deleteModalSubmit.addEventListener("click", (evt) => handleDeleteSubmit(evt));

deleteModalCancel.addEventListener("click", () => closeModal(deleteModal));

deleteModalCloseBtn.addEventListener("click", () => closeModal(deleteModal));

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  addCardFormElement.reset();
  resetValidation(addCardFormElement, [linkInput, descriptionInput], settings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

closeModalPreview.addEventListener("click", () => {
  closeModal(modalPreview);
});

//"NEW POST" MODAL SUBMISSION
addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Saving...";

  api
    .addCard({ link: linkInput.value, name: descriptionInput.value })
    .then((data) => {
      const newCardElement = getCardElement(data);
      cardList.prepend(newCardElement);
      closeModal(newPostModal);
      evt.target.reset();
      disableButton(submitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Save";
    });
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //prevents the page from reloading and by default removing anything you type into the form

  evt.submitter.textContent = "Saving...";

  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Save";
    });
}

//Avatar edit modal submission
avatarPhotoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Saving...";

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profilePhotoImage.src = data.avatar;
      evt.target.reset();
      evt.submitter.disabled = true;
      closeModal(avatarEditModal);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Save";
    });
});

//Code a feature that allows the users to close the modal by clicking on the overlay, i.e. anywhere outside the modal’s borders:
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardList.append(cardEl);
    });

    profilePhotoImage.src = userInfo.avatar;
    profileNameElement.textContent = userInfo.name;
    profileJobElement.textContent = userInfo.about;
  })
  .catch(console.error);

enableValidation(settings);
