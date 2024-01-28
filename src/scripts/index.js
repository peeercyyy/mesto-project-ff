import '../pages/index.css';
import { createCard, deleteCard, likeCard, openImage } from './card';
import { initialCards } from './cards';
import { loadImages } from './imagesLoader';
import { closeModal, openModal } from './modal';
import { clearValidation, enableValidation } from './validation';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardPopup = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm.link;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const handleFillProfileFormInputs = () => {
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profileForm.reset();
  closeModal(editPopup);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = newPlaceName.value;
  const link = newPlaceLink.value;
  const newCard = createCard({ name, link }, deleteCard, likeCard, openImage);
  placesList.prepend(newCard);
  newPlaceForm.reset();
  closeModal(addNewCardPopup);
  clearValidation(newPlaceForm, validationConfig);
};

loadImages();

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup_is-opened') ||
      evt.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, likeCard, openImage));
});

editProfileButton.addEventListener('click', () => {
  openModal(editPopup);
  handleFillProfileFormInputs();
});

addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

newPlaceForm.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);
