import { initialCards } from './array.js';
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';

const cardsContainer = document.querySelector('.grid-elements__list');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const formElementPopupProfile = document.querySelector('.popup__form-element_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupAdd = document.querySelector('.popup-add');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const formElementPopupAdd = document.querySelector('.popup__form-element_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const allCloseBtns = document.querySelectorAll('.popup__close-btn');
const popupList = document.querySelectorAll('.popup');
const cardFormSubmitButton = formElementPopupAdd.querySelector('.popup__save-btn');
const profileFormSubmitButton = formElementPopupProfile.querySelector('.popup__save-btn');
const validators = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
}


initialCards.forEach((item) => {
  const card = new Card (item, '#card-template');
  const element = card.createCardElement();
  cardsContainer.prepend(element);
});

function hideValidationErrors(form, validators) {
  const inputs = form.querySelectorAll(validators.inputSelector);
  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      input.classList.remove(validators.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(validators.errorClass);
    }
  })
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileFormSubmitButton.disabled = false;
  hideValidationErrors(formElementPopupProfile, validators);
  openPopup(popupProfile);
}

function openPopupAdd() {
  formElementPopupAdd.reset();
  cardFormSubmitButton.disabled = true;
  openPopup(popupAdd);
  hideValidationErrors(formElementPopupAdd, validators);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card({ name: titleInput.value, link: linkInput.value }, '#card-template');
  const element = card.createCardElement();
  cardsContainer.prepend(element);
  closePopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

allCloseBtns.forEach((button) => {
  const popupToClose = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupToClose));
});

function handleClosePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}
popupList.forEach(popup => {
  popup.addEventListener('click', handleClosePopupByOverlay);
});

function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

new FormValidator(validators, formElementPopupProfile).enableValidation();
new FormValidator(validators, formElementPopupAdd).enableValidation();


buttonOpenPopupAdd.addEventListener('click', openPopupAdd);
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
formElementPopupProfile.addEventListener('submit', handleProfileFormSubmit);
formElementPopupAdd.addEventListener('submit', handleAddFormSubmit);


export { openPopup }