import { openModal } from './modal';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export const createCard = (
  cardData,
  deleteCallback,
  likeCardCallback,
  openImageCallback
) => {
  const card = cardTemplate.content.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const likeBtn = card.querySelector('.card__like-button');

  const titleContent = document.createTextNode(cardData.name);
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', `изображение ${cardData.name}`);
  cardTitle.append(titleContent);

  cardDeleteBtn.addEventListener('click', deleteCallback);
  likeBtn.addEventListener('click', likeCardCallback);
  cardImage.addEventListener('click', openImageCallback);

  return card;
};
// @todo: Функция удаления карточки
export const deleteCard = (event) => {
  const deleteBtn = event.target;
  const deleteBtnCardParent = deleteBtn.closest('.card');
  deleteBtnCardParent.remove();
};

export const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export const openImage = (evt) => {
  const image = evt.target;
  const cardImageCaption = image.parentNode.querySelector('.card__title');

  const popupContainer = document.querySelector('.popup_type_image');
  const popupContainerImage = popupContainer.querySelector('.popup__image');
  const popupContainerCaption = popupContainer.querySelector('.popup__caption');

  const imageSource = image.getAttribute('src');
  const imageAltText = image.getAttribute('alt');

  popupContainerImage.setAttribute('src', imageSource);
  popupContainerImage.setAttribute('alt', imageAltText);
  popupContainerCaption.textContent = cardImageCaption.textContent;

  openModal(popupContainer);
};
