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
const addCardFormElement = newPostModal.querySelector(".modal__form"); //why select the modal__form and not its parent modal__container including the buttons?
const linkInput = newPostModal.querySelector("#new-post-link");
const descriptionInput = newPostModal.querySelector("#new-post-caption");

//select template by it's id
const cardTemplate = document.querySelector("#card-template");

//Scope question: The preview image modal is not apart of the cloned template card
//elements in the DOM. How does the Scope of the preview image modal and the cloned
//card nodes compare? Right now, the JavaScript for the preview is in the Universal
//scope and it works.

//This is selecting the preview image modal
const modalPreview = document.querySelector("#preview-image-modal");

const imageModal = modalPreview.querySelector(".modal__image"); // Select the modalImageEl from your modalPreview
const titleModal = modalPreview.querySelector(".modal__caption"); //

//This is selecting the preview image modal button
const closeModalPreview = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);

const cardList = document.querySelector(".cards__list");

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

//select the clone's title and image elements and store them in variables
const cardImageEl = cardElement.querySelector(".card__image");
const cardTitleEl = cardElement.querySelector(".card__title");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//EVENT LISTENERS
editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

//this code has an event listener on the close button on the preview image modal
closeModalPreview.addEventListener("click", () => {
  closeModal(modalPreview);
});

//"NEW POST" MODAL SUBMISSION
addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = descriptionInput.value;
  const cardLink = linkInput.value;
  //create a data object with the form values
  const newCardData = {
    name: cardName,
    link: cardLink,
  };
  //Why does this variable need to exist inside of this event listener?
  //create and add the card
  const newCardElement = getCardElement(newCardData);
  //add it as the first element in the container
  cardList.prepend(newCardElement);

  //alternative way of consolidating the code above
  //cardList.prepend(getCardElement(newCardData));

  // close the add card modal
  // empty the inputs
  closeModal(newPostModal);
  evt.target.reset();
  //handleAddCardSubmit(evt);
});

//is this line of code doing anything?
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//FUNCTIONS
function fillInputFields() {
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
}

//core javascript concept: objects. by default, a function creates a js object...
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //prevents the page from reloading and by default removing anything you type into the form
  fillInputFields();
  closeModal(editProfileModal);
}

//create Loop to select each initial card element and add them one by one after the next
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  //prepend the created card element to the appropriate HTML container (the one where the hardcoed cards were located)
  cardList.prepend(cardElement);
});

//create Function from Loop
//clone the content of the template
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  //Add all JavaScript activities that need to happen on the clone
  //INSIDE of this Function that clones each DOM element from the
  //template created in the HTML

  //select the clone's title and image elements and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  //Assign the data parameter’s link property to the image element’s src property.
  cardImageEl.src = data.link;

  // Assign the data parameter’s name property to the image element’s alt property.
  cardImageEl.alt = data.name;

  // Assign the data parameter’s name property to the name element’s textContent property.
  cardTitleEl.textContent = data.name;

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteBtn.closest(".card").remove();
  });

  //Preview Image Modal
  cardImageEl.addEventListener("click", () => {
    //Set the text of the modal’s caption element.
    titleModal.textContent = data.name;
    //Set the src of the modal’s image element.
    imageModal.src = data.link; //should this be linked to the card__image ?
    //Set the alt of the modal’s image element.
    imageModal.alt = data.name;

    openModal(modalPreview);
  });

  //when the user clicks on the card’s heart-shaped “like button,” the heart's color should change.
  // Select the card element's like button
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  //return the cloned card element
  return cardElement;
}
