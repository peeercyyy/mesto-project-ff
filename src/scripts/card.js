import { placesList } from '.';
import { deleteCard as deleteCardRes, toggleLike } from './api';
import { openModal } from './modal';

const popupContainer = document.querySelector('.popup_type_image');
const popupContainerImage = popupContainer.querySelector('.popup__image');
const popupContainerCaption = popupContainer.querySelector('.popup__caption');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export const createCard = (
  cardData,
  userId,
  { deleteCallback, likeCardCallback, openImageCallback } = {}
) => {
  const card = cardTemplate.content.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const likeBtn = card.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', `изображение ${cardData.name}`);

  card.id = cardData._id;

  cardDeleteBtn.addEventListener('click', (evt) =>
    deleteCallback(evt, card.id)
  );
  if (cardData.owner._id === userId) {
    cardDeleteBtn.style.display = 'block';
  }

  const numberOfLikes = card.querySelector('.numberOfLikes');
  numberOfLikes.textContent = cardData.likes.length;

  if (cardData.likes.find((user) => user._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  refreshLikes(numberOfLikes, likeBtn);

  likeBtn.addEventListener('click', () =>
    likeCardCallback(likeBtn, numberOfLikes, cardData._id)
  );
  cardImage.addEventListener('click', openImageCallback);

  return card;
};
// @todo: Функция удаления карточки
export const deleteCard = (event, cardId) => {
  const deleteBtn = event.target;
  const deleteBtnCardParent = deleteBtn.closest('.card');

  deleteCardRes(cardId).then(() => deleteBtnCardParent.remove());
};

export const likeCard = (likeBtn, numberOfLikes, likes) => {
  likeBtn.classList.toggle('card__like-button_is-active');
  numberOfLikes.textContent = likes;
  refreshLikes(numberOfLikes, likeBtn);
};

export const openImage = (evt) => {
  const image = evt.target;
  const cardImageCaption = image.closest('.card').querySelector('.card__title');

  const imageSource = image.getAttribute('src');
  const imageAltText = image.getAttribute('alt');

  popupContainerImage.setAttribute('src', imageSource);
  popupContainerImage.setAttribute('alt', imageAltText);
  popupContainerCaption.textContent = cardImageCaption.textContent;

  openModal(popupContainer);
};

const refreshLikes = (numberOfLikes, likeBtn) => {
  if (numberOfLikes.textContent === '0') {
    numberOfLikes.classList.add('numberOfLikes__zero');
    likeBtn.classList.add('card__like-button-zero');
  } else {
    numberOfLikes.classList.remove('numberOfLikes__zero');
    likeBtn.classList.remove('card__like-button-zero');
  }
};

export const addCard = (item, userId) => {
  const newCard = createCard(item, userId, {
    deleteCallback: deleteCard,
    likeCardCallback: likeWithFetch,
    openImageCallback: openImage,
  });

  placesList.prepend(newCard);
};

export const likeWithFetch = (likeBtn, numberOfLikes, cardId) => {
  if (!likeBtn.classList.contains('card__like-button_is-active')) {
    toggleLike(cardId, true)
      .then((data) => {
        likeCard(likeBtn, numberOfLikes, data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    toggleLike(cardId)
      .then((data) => {
        likeCard(likeBtn, numberOfLikes, data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
