let openPopupBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__info-title')
let profileSubtitle = document.querySelector('.profile__info-subtitle')
let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

function popupOpen(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function popupClose (){
    popup.classList.remove('popup_opened');
  }

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose ();
}

  openPopupBtn.addEventListener('click', popupOpen);
  popupCloseBtn.addEventListener('click', popupClose);
  formElement.addEventListener('submit', handleFormSubmit); 