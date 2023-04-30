import { initialCards } from './array.js'

const cardTemplate = document.querySelector('#card-template');
const gridElementsContainer = document.querySelector('.grid-elements__list');
let openPopupBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__info-title')
let profileSubtitle = document.querySelector('.profile__info-subtitle')
let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let popupAdd = document.querySelector('.popup_add');
let openAddPopupBtn = document.querySelector('.profile__add-button');
let addFormElement = document.querySelector('.popup__form-element_add');
let titleInput = document.querySelector('.popup__input_type_title');
let linkInput = document.querySelector('.popup__input_type_link');
let popupAddCloseBtn = document.querySelector('.popup__close-btn_add')

function popupOpen(item){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  item.classList.add('popup_opened');
};

function popupClose (item){
  titleInput.value = '';
  linkInput.value = '';
  item.classList.remove('popup_opened');
};

const createCardElement = (name, link) => {
 const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
 const elementImage = cardElement.querySelector('.element__image');
 const elementTitle = cardElement.querySelector('.element__title');
 const cardLikeButton = cardElement.querySelector('.element__like');
 const cardDeleteButton = cardElement.querySelector('.element__trash');
 const popupZoom = document.querySelector('.zoom-popup');
 const popupZoomCloseBtn = popupZoom.querySelector('.popup__close-btn_zoom');
 const popupZoomText = popupZoom.querySelector('.zoom-popup__text');
 const popupZoomImage = popupZoom.querySelector('.zoom-popup__image');

 elementTitle.textContent = name;
 elementImage.src = link;
 
 const handleLike = () => {
  cardLikeButton.classList.toggle('element__like_active');
 };

 const handleDelete = () => {
  cardElement.remove();
 };

  const handleZoom = () => {
    popupOpen(popupZoom);
    popupZoomImage.src = link;
    popupZoomText.textContent = name;

  }

 cardLikeButton.addEventListener('click', handleLike);
 cardDeleteButton.addEventListener('click', handleDelete);
 elementImage.addEventListener('click', handleZoom);
 popupZoomCloseBtn.addEventListener('click',() =>  popupClose(popupZoom));

return cardElement;
};

initialCards.forEach((card) => {
  const element = createCardElement(card.name, card.link);
  gridElementsContainer.prepend(element);
});

function handleAddFormSubmit (evt) {
  evt.preventDefault(); 
  const element = createCardElement(titleInput.value, linkInput.value);
  gridElementsContainer.prepend(element);
  popupClose (popupAdd);
};

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose (popup);
};


  openAddPopupBtn.addEventListener('click', () => popupOpen(popupAdd));
  openPopupBtn.addEventListener('click',() =>  popupOpen(popup));
  popupCloseBtn.addEventListener('click',() =>  popupClose(popup));
  popupAddCloseBtn.addEventListener('click', () => popupClose(popupAdd));
  formElement.addEventListener('submit', handleFormSubmit);
  addFormElement.addEventListener('submit', handleAddFormSubmit);
