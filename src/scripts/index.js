import '../pages/index.css';
import {
  addCard as addCardRes,
  editProfile,
  getCardList,
  getUserData,
  updateProfilePic,
} from './api';
import { addCard } from './card';
import { loadImages } from './imagesLoader';
import { closeModal, openModal } from './modal';
import { clearValidation, enableValidation } from './validation';

loadImages();

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
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
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');

const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm.link;

const avatarForm = document.forms['new-avatar'];
const avatarLink = avatarForm.elements['avatar'];

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
  const buttonText = evt.submitter.textContent;
  evt.submitter.textContent += '...';

  editProfile({ name: nameInput.value, about: jobInput.value })
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      profileForm.reset();
      closeModal(editPopup);
    })
    .finally(() => (evt.submitter.textContent = buttonText));
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonText = evt.submitter.textContent;
  evt.submitter.textContent += '...';
  const name = newPlaceName.value;
  const link = newPlaceLink.value;
  addCardRes({ name, link })
    .then((res) => {
      addCard(res, res.owner._id);
      newPlaceForm.reset();
      closeModal(addNewCardPopup);
      clearValidation(newPlaceForm, validationConfig);
    })
    .finally(() => (evt.submitter.textContent = buttonText));
};

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

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const buttonText = evt.submitter.textContent;
  evt.submitter.textContent += '...';
  updateProfilePic(avatarLink.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarLink.value})`;
      closeModal(avatarPopup);
    })
    .catch(console.log)
    .finally(() => (evt.submitter.textContent = buttonText));
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

Promise.all([getUserData(), getCardList()]).then(([user, cards]) => {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
  const userId = user._id;

  placesList.innerHTML = '';
  cards.reverse().forEach((card) => addCard(card, userId));
});
