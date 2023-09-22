export default class Card {
  constructor({userId, data, handleCardClick, handleDeleteClick, handleLikeClick}, templateSelector){
    this._userId = userId;
    this._alt = `Описание фотографии: ${this._name}`;
    this._name = data.name;
    this._link = data.link;    
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

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
    this.showLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = 'none';
    } else {
      this._trashButton.style.display = 'block';
    }

    return this._element;
  }

  _setEventListeners(){
    this._likeButton = this._element.querySelector('.element__like');
    this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._id)});

    this._trashButton = this._element.querySelector('.element__trash');
    this._trashButton.addEventListener('click', () => {this._handleDeleteClick(this._id)});


    this._cardImage.addEventListener('click',() =>  {this._handleCardClick(this._name, this._link)});
  }

  _handleLike() {
    this._likeButton.classList.add('element__like_active');
    }

  _cleanLike(){
    this._likeButton.classList.remove('element__like_active');
  }

  deleteCardElement() {
    this._element.remove();
  }

  isLiked() {
    const haveLikedCard = this._likes.some((user) => user._id === this._userId);
    return haveLikedCard;
  }
  showLikes(likes) {
    this._likes = likes;
    this._likesregister = this._element.querySelector('.element__like-register');
    if (this._likes.length > 0) {
      this._likesregister.textContent = this._likes.length;
      this._likesregister.style.display = 'block';
    } else {
      this._likesregister.style.display = 'none';
    }

    if (this.isLiked()) {
      this._handleLike()
    } else {
      this._cleanLike();
    }
  }


}