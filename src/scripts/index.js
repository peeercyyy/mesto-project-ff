import '../pages/index.css';
import { loadImages } from './imagesLoader';
import { createCard, deleteCard, likeCard, openImage } from './card';
import { initialCards } from './cards';
import { closeModal, handleOverLayClose, openModal } from './modal';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardPopup = document.querySelector('.popup_type_new-card');

const avatarFormElement = document.forms['edit-profile'];
const nameInput = avatarFormElement.name;
const jobInput = avatarFormElement.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm.link;

const handleFillAvatarFormInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  avatarFormElement.reset();
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
};

loadImages();

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, likeCard, openImage));
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.parentNode.parentNode);
  }
});

editProfileButton.addEventListener('click', () => {
  openModal(editPopup);
  handleFillAvatarFormInputs();
});

editPopup.addEventListener('click', handleOverLayClose);

addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardPopup);
});

addNewCardPopup.addEventListener('click', handleOverLayClose);

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

newPlaceForm.addEventListener('submit', handleCardFormSubmit);
