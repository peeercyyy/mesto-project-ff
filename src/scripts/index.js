import '../pages/index.css';
import { loadImages } from './imagesLoader';
import { createCard, deleteCard } from './card';
import { initialCards } from './cards';
import { closeModal, handleOverLayClose, openModal } from './modal';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addNewCardButton = document.querySelector('profile__add-button');

loadImages();

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});

editProfileButton.addEventListener('click', (evt) => {
  openModal(editPopup);
});

editPopup.addEventListener('click', handleOverLayClose);

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.parentNode.parentNode);
  }
});
