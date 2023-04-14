const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');

function popupOpen(){
  popup.classList.add('popup_open');
}

function popupClose (evt){
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');

  if (isOverlay || isCloseBtn) {
    popup.classList.remove('popup_open');
  }
}

openPopupBtn.addEventListener('click', popupOpen);
popup.addEventListener('click', popupClose);

let profileTitle = document.querySelector('.profile__info-title')
let profileSubtitle = document.querySelector('.profile__info-subtitle')
let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__name-input');
let jobInput = document.querySelector('.popup__job-input');
let popupSaveBtn = document.querySelector('.popup__save-btn');
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    console.log(nameInput.value);
    console.log(jobInput.value);
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup_open')
}

formElement.addEventListener('submit', handleFormSubmit); 