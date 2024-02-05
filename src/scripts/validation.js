/* formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error", */

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((item) => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(item, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  const dataMessageError =
    'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
  const patternForTextInput = '^[a-zA-Zа-яёА-яЁ\\-\\s]+$';

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    if (inputElement.type === 'text') {
      inputElement.setAttribute('pattern', patternForTextInput);
      inputElement.setAttribute('data-error-message', dataMessageError);
    }
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const checkValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showValidationError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideValidationError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showValidationError = (
  formElement,
  inputElement,
  errorMessage,
  config
) => {
  console.log(`.${inputElement.name}-error`);
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideValidationError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
};

export const clearValidation = (formElement, config) => {
  if (!formElement) return;
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  buttonElement.classList.add(config.inactiveButtonClass);

  inputList.forEach((input) => {
    hideValidationError(formElement, input, config);
  });
};
