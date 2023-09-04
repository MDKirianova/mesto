import './../../pages/index.css'
import { initialCards } from '../utils/array.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const cardsContainer = '.grid-elements__list';
const popupZoom = '.popup-zoom';
const popupAdd = '.popup-add';
const popupProfile = '.popup-profile';
const profileTitle = '.profile__info-title';
const profileSubtitle = '.profile__info-subtitle';
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementPopupAdd = document.querySelector('.popup__form-element_add');
const formElementPopupProfile = document.querySelector('.popup__form-element_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const validators = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const createCard = (item) => {
  const card = new Card ({data: item,
     handleCardClick: (name, link) =>{
      popupWithImage.open(name, link);
     }},
     '#card-template');
  return card.createCardElement();
} 

const cardList = new Section({data: initialCards, renderer: (item) => {
  cardList.addItem(createCard(item))}
}, cardsContainer)

cardList.renderItems();

const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage.setEventListeners();

const popupWithFormAdd = new PopupWithForm({ popupSelector: popupAdd,
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
    popupWithFormAdd.close()
  }
});
popupWithFormAdd.setEventListeners();

const validatorAddCard = new FormValidator(validators, formElementPopupAdd);
validatorAddCard.enableValidation();

buttonOpenPopupAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
  validatorAddCard.resetValidation();
});

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const popupWithFormProfile = new PopupWithForm({popupSelector: popupProfile,
handleFormSubmit: (data) => {
  userInfo.setUserInfo(data.fieldName, data.fieldJob);
  popupWithFormProfile.close();
}
});

popupWithFormProfile.setEventListeners();

const validatorEditProfile =  new FormValidator(validators, formElementPopupProfile);
validatorEditProfile.enableValidation();

buttonOpenPopupProfile.addEventListener('click', () => {
  popupWithFormProfile.open();
  validatorEditProfile.resetValidation();
  const input = userInfo.getUserInfo();
  nameInput.value = input.profileTitle;
  jobInput.value = input.profileSubtitle;
});