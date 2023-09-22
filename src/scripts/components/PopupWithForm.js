import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor( {popupSelector, handleFormSubmit} ){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._selectorForm = this._popup.querySelector('.popup__form-element');
    this.submitButton = this._popup.querySelector(".popup__save-btn");
    this.btnReadyText = this.submitButton.textContent;

  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  close() {
    this._selectorForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = 'Сохранение...';
    } else {
      this.submitButton.textContent = this.btnReadyText;
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues()
      this._handleFormSubmit(formValues);
      this.close();
    })
  }
}