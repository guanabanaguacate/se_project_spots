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

// click listener on the new modal’s close button
const modalCloseBtn = document.querySelector(".modal__close-btn_type_preview")
modalCloseBtn.addEventListener("click", () => {
  modalCloseBtn.classList.toggle('modal_is-opened');
})

const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" }
];

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
} 

editProfileBtn.addEventListener("click", function(){
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
    openModal(editProfileModal);
}); 

editProfileCloseBtn.addEventListener("click", function(){
    closeModal(editProfileModal);
}
);

newPostBtn.addEventListener("click", function(){
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function(){
    closeModal(newPostModal);
});
 
function fillInputFields(){
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value; 
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  fillInputFields();
  closeModal(editProfileModal);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//This function hasn't been called... 
function handleAddCardSubmit(evt) {
  evt.preventDefault(); 
  closeModal(newPostModal);
  evt.target.reset(); 
}

// this variable is needed right? 
const cardList = document.querySelector('.cards__list');

//"NEW POST" MODAL SUBMISSION
addCardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

const cardName = descriptionInput.value;
const cardLink = linkInput.value;
  //create a data object with the form values
const newCardData = {
  name: cardName,
  link: cardLink
}
  //copied and pasted this code from initialCards loop
  //const cardElement = getCardElement(item);
  //prepend the created card element to the appropriate HTML container (the one where the hardcoed cards were located)
  //cardList.prepend(cardElement);

//create and add the card
const newCardElement = getCardElement(newCardData)
//add it as the first element in the container
cardList.prepend(newCardElement); 

handleAddCardSubmit(addCardFormElement);

});


initialCards.forEach(item => {
  const cardElement = getCardElement(item);
  //prepend the created card element to the appropriate HTML container (the one where the hardcoed cards were located)
  cardList.prepend(cardElement);
}); 

//create function
//clone the content of the template

function getCardElement(data) {
  const cardElement = cardTemplate.content
  .querySelector(".card")
  .cloneNode(true);

  //select the clone's title and image elements and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image"); 
  const cardTitleEl = cardElement.querySelector(".card__title");

   //Assign the data parameter’s link property to the image element’s src property.
  cardImageEl.src = data.link;

  // Assign the data parameter’s name property to the image element’s alt property.
  cardImageEl.alt = data.name;

  // Assign the data parameter’s name property to the name element’s textContent property.
  cardTitleEl.textContent = data.name;


//when the user clicks on the card’s heart-shaped “like button,” the heart's color should change.   
  // Select the card element's like button
  const likeButton = cardElement.querySelector(".card__like-button")
  likeButton.addEventListener("click", () => {
  likeButton.classList.toggle('card__like-button_is-active');
  })

const deleteBtn = cardElement.querySelector(".card__delete-btn")
    deleteBtn.addEventListener("click", () => {
    deleteBtn.closest(".card").remove();
    })


const modalPreview = document.querySelector("#preview-image-modal")
const imageModal = cardElement.querySelector(".modal__image"); 
const titleModal = cardElement.querySelector(".modal__caption"); // #new-post-caption ??


//??Preview Image Modal
cardImageEl.addEventListener("click", () => {

//Set the text of the modal’s caption element.
titleModal.textContent = data.name
//Set the src of the modal’s image element.
imageModal.src = data.link //should this be linked to the card__image ?
//Set the alt of the modal’s image element.
imageModal.alt = data.name

  openModal(modalPreview); 
  })

 //return the cloned card element
  return(cardElement); 
  
};
