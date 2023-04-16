let openPopupBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__info-title')
let profileSubtitle = document.querySelector('.profile__info-subtitle')
let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let popupSaveBtn = document.querySelector('.popup__save-btn');

function popupOpen(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function popupClose (evt){
    popup.classList.remove('popup_opened');
  }

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose (evt);
}

  openPopupBtn.addEventListener('click', popupOpen);
  popup.addEventListener('click', popupClose);
  formElement.addEventListener('submit', handleFormSubmit); 