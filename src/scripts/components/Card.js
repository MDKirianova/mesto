export default class Card {
  constructor({data, handleCardClick}, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

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
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    return this._element;
  }

  _setEventListeners(){
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton.addEventListener('click', () => {this._handleLike()});
    this._trashButton.addEventListener('click', () => {this._handleDelete()});
    this._cardImage.addEventListener('click',() =>  {this._handleCardClick(this._name, this._link)});
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__like_active');
    }

  _handleDelete() {
    this._element.remove();
  }

}