import { initialCards } from './array.js'

const cardTemplate = document.querySelector('#card-template');
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
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomText = popupZoom.querySelector('.popup-zoom__text');
const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
const allCloseBtns = document.querySelectorAll('.popup__close-btn');
const popupList = document.querySelectorAll('.popup');
const cardFormSubmitButton = formElementPopupAdd.querySelector('.popup__save-btn');
const profileFormSubmitButton = formElementPopupProfile.querySelector('.popup__save-btn');
const config = {
  inputSelector: '.popup__input',
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
    openPopup(popupZoom);
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomText.textContent = name;
  };

  buttonLikeCard.addEventListener('click', handleLike);
  buttonDeleteCard.addEventListener('click', handleDelete);
  elementImage.addEventListener('click', handleZoom);

  return cardElement;
}

initialCards.forEach((card) => {
  const element = createCardElement(card.name, card.link);
  cardsContainer.prepend(element);
});

function hideValidationErrors(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      input.classList.remove(config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(config.errorClass);
    }
  })
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileFormSubmitButton.disabled = false;
  hideValidationErrors(formElementPopupProfile, config);
  openPopup(popupProfile);
}

function openPopupAdd() {
  formElementPopupAdd.reset();
  cardFormSubmitButton.disabled = true;
  openPopup(popupAdd);
  hideValidationErrors(formElementPopupAdd, config);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const element = createCardElement(titleInput.value, linkInput.value);
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

buttonOpenPopupAdd.addEventListener('click', openPopupAdd);
buttonOpenPopupProfile.addEventListener('click', openPopupProfile);
formElementPopupProfile.addEventListener('submit', handleProfileFormSubmit);
formElementPopupAdd.addEventListener('submit', handleAddFormSubmit);