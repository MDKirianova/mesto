import { initialCards } from './array.js'

const cardTemplate = document.querySelector('#card-template');
const gridElementsContainer = document.querySelector('.grid-elements__list');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileTitle = document.querySelector('.profile__info-title')
const profileSubtitle = document.querySelector('.profile__info-subtitle')
const formElement = document.querySelector('.popup__form-element');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupAdd = document.querySelector('.popup-add');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const formElementPopupAdd = document.querySelector('.popup__form-element_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomText = popupZoom.querySelector('.popup-zoom__text');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');


function popupOpen(item){
  item.classList.add('popup_opened');
};

function popupClose (item){
  item.classList.remove('popup_opened');
};

const createCardElement = (name, link) => {
 const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
 const elementImage = cardElement.querySelector('.element__image');
 const elementTitle = cardElement.querySelector('.element__title');
 const buttonLikeCard = cardElement.querySelector('.element__like');
 const buttonDeleteCard = cardElement.querySelector('.element__trash');

 elementTitle.textContent = name;
 elementImage.alt = name;
 elementImage.src = link;
 
 const handleLike = () => {
  buttonLikeCard.classList.toggle('element__like_active');
 };

 const handleDelete = () => {
  cardElement.remove();
 };

  const handleZoom = () => {
    popupOpen(popupZoom);
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomText.textContent = name;
  };

 buttonLikeCard.addEventListener('click', handleLike);
 buttonDeleteCard.addEventListener('click', handleDelete);
 elementImage.addEventListener('click', handleZoom);

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

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose (popup);
};

buttonOpenPopupAdd.addEventListener('click', () => {
  titleInput.value = '';
  linkInput.value = '';
  popupOpen(popupAdd);

});
buttonOpenPopupProfile.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupOpen(popup);
});
formElement.addEventListener('submit', handleProfileFormSubmit);
formElementPopupAdd.addEventListener('submit', handleAddFormSubmit);

const allCloseBtns = document.querySelectorAll('.popup__close-btn');
allCloseBtns.forEach((button) => {
  const popupToClose = button.closest('.popup');
  button.addEventListener('click', () =>  popupClose(popupToClose));
});
