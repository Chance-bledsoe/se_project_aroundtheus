import Card from "../Componets/Card.js";

import FormValidator from "../Componets/FormValidator.js";


const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanois National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

const cardData = { 
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addNewCardButton = document.querySelector("#add-card-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const profileEditCloseButton = profileEditModal.querySelector("#profile-close-modal");
const addNewCardCloseButton = addNewCardModal.querySelector("#card-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardsListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
const cardLinkInput = addCardFormElement.querySelector(".modal__input_type_link");
const cardFormSubmitButton = addCardFormElement.querySelector(".modal__button");

const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector("#modalImage");
const modalImageTitle = imageModal.querySelector(".modal__image-title");
const imageModalCloseButton = imageModal.querySelector(".modal__close");

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEsc);

}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function closeModalClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

[profileEditModal, addNewCardModal, imageModal ].forEach((modal) => {
  modal.addEventListener("mousedown", closeModalClick);
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  evt.target.reset();
  renderCard({ name, link }, cardsListEl);
  closePopup(addNewCardModal);
  toggleButtonState([cardTitleInput, cardLinkInput], cardFormSubmitButton, config);
}


function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__image-title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
    
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    imageModalImage.setAttribute("src", `${cardData.link}`);
    imageModalImage.setAttribute("alt", `${cardData.name}`);
    modalImageTitle.textContent = cardData.name;
    openPopup(imageModal);
  });

  

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

imageModalCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEl));

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardModal);
});

addNewCardCloseButton.addEventListener("click", () => {
  closePopup(addNewCardModal);
} );


const formElement = document.querySelector(".modal__form");
const formValidator = new FormValidator(formElement, {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
});

formValidator.enableValidation();