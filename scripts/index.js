// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const addCard = (cardData, deleteCB) => {
  const card = cardTemplate.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  const titleContent = document.createTextNode(cardData.name);
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', `изображение ${cardData.name}`);
  cardTitle.append(titleContent);
  cardDeleteBtn.addEventListener('click', deleteCB);

  return card;
};
// @todo: Функция удаления карточки
const deleteCard = (e) => {
  const deleteBtn = e.target;
  const deleteBtnCardParent = deleteBtn.closest('.card');
  deleteBtnCardParent.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(addCard(card, deleteCard));
});
