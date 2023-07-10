import {openPopup} from './index.js'

export class Card {
  constructor(data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;

  }

  createCardElement() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__title').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;
    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', () => {this._handleLike()});
    this._element.querySelector('.element__trash').addEventListener('click', () => {this._handleDelete()});
    this._element.querySelector('.element__image').addEventListener('click',() =>  {this._handleZoom()});
  }

  _handleLike() {
   this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

  _handleDelete() {
    this._element.remove();
  }

  _handleZoom() {
    const popupZoom = document.querySelector('.popup-zoom');
    openPopup(popupZoom);
    popupZoom.querySelector('.popup-zoom__image').src = this._link;
    popupZoom.querySelector('.popup-zoom__image').alt = this._name;
    popupZoom.querySelector('.popup-zoom__text').textContent = this._name;
  };
}