export class FormValidator {
  constructor(validators, form) {
    this.validators = validators;
    this.form = form;
    this.formList = Array.from(document.querySelector(this.validators.formSelector));
    this.buttonSubmit = this.form.querySelector(this.validators.submitButtonSelector);
    this.inputList = Array.from(this.form.querySelectorAll(this.validators.inputSelector));
    this.inputListSelector = this.form.querySelectorAll(this.validators.inputSelector);


  }

  enableValidation(){
    this.form.addEventListener('click', (e) => e.preventDefault());
    this._setEventListeners();
  }

  _setEventListeners(){
      this.form.addEventListener('input', () => {
        this._toggleButton();
      });
      this._addInputListeners();
      this._toggleButton();
  }

  _handleFormInput(event) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = this.form.querySelector(`#${inputId}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, errorElement);
    } else {
      this._showInputError(input, errorElement);
    }
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this.validators.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.validators.errorClass);
  }

  _showInputError(input, errorElement) {
    input.classList.add(this.validators.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this.validators.errorClass);
  }

  _toggleButton() {
    const isFormValid = Array.from(this.inputListSelector).every(input => input.checkValidity());
    this.buttonSubmit.disabled = !isFormValid;
    this.buttonSubmit.classList.toggle(this.validators.inactiveButtonClass, !isFormValid);
  }

  _addInputListeners() {
    this.inputList.forEach( (item) => {
      item.addEventListener('input', (event) => {
        this._handleFormInput(event);
      })
    })
  }
}