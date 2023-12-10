import '../pages/index.css';
import { loadImages } from './imagesLoader';
import { createCard, deleteCard, likeCard, openImage } from './card';
import { initialCards } from './cards';
import { closeModal, openModal } from './modal';

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

const handleFillProfileFormInputs = () => {
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

// @todo: Вывести карточки на страницу
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
