// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: Функция создания карточки
export const createCard = (cardData, deleteCallback) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const titleContent = document.createTextNode(cardData.name);
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', `изображение ${cardData.name}`);
  cardTitle.append(titleContent);
  cardDeleteBtn.addEventListener('click', deleteCallback);

  return card;
};
// @todo: Функция удаления карточки
export const deleteCard = (event) => {
  const deleteBtn = event.target;
  const deleteBtnCardParent = deleteBtn.closest('.card');
  deleteBtnCardParent.remove();
};
