export const openModal = (modalElement) => {
  modalElement.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (modalElement) => {
  modalElement.classList.toggle('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

export const handleOverLayClose = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
};
