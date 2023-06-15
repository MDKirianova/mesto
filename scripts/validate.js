const formValidationConfig = {
   formSelector: '.popup__form-element',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-btn',
   inactiveButtonClass: 'popup__save-btn_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'

  };

function disableSubmit(evt) {
    evt.preventDefault();
}

function enableValidation(config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((form) => {
    enableFormValidation(form, config);
   });
}

function enableFormValidation(form, config) {
  form.addEventListener('submit', disableSubmit);
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });
  addInputListeners(form, config);
  toggleButton(form, config);
}

function handleFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  if (input.validity.valid){
    hideInputError(input, config, errorElement);
  } else {
    showInputError(input, config, errorElement);
  }
}

function hideInputError(input, config, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function showInputError(input, config, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  inputList.forEach(function (item) {
    item.addEventListener('input', (event) =>{
      handleFormInput(event, config);
    })
  })
}

enableValidation(formValidationConfig);