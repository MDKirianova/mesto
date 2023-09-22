import './../../pages/index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js'

const cardsContainer = '.grid-elements__list';
const popupZoom = '.popup-zoom';
const popupAdd = '.popup-add';
const popupConfirm = '.popup-confirm';
const popupProfile = '.popup-profile';
const popupAvatar = '.popup-avatar';
const profileTitle = '.profile__info-title';
const profileSubtitle = '.profile__info-subtitle';
const profileAvatar = '.profile__avatar';
const profileClickAvatar = document.querySelector('.profile__element-avatar');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formElementPopupAdd = document.querySelector('.popup__form-element_add');
const formElementPopupProfile = document.querySelector('.popup__form-element_profile');
const formElementPopupAvatar = document.querySelector('.popup__form-element_avatar');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
let userId

const validators = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'd9427d48-215a-411e-b01d-44ad22fcdd68',
    'Content-Type': 'application/json'
  }
}); 

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

const cardList = new Section({ renderer: (item) => {
  cardList.addItem(createCard(item))}
}, cardsContainer)

// получение с сервера данных профиля
 api.getUserInfo()
 .then((user) => {
   userId = user._id
   userInfo.setUserInfo(user.name, user.about);
   userInfo.setUserAvatar(user.avatar);
 })
 .catch((err) => {
   console.log(`Ошибка при получении профиля пользователя: ${err}`);  //выведем ошибку в консоль
 });

// получение с сервера данных карточек и рендер
 api.getInitialCards()
 .then((serverCards) => {
   cardList.renderItems(serverCards);
 })
 .catch((err) => {
   console.log(`Ошибка при получении карточек с сервера: ${err}`);  //выведем ошибку в консоль
 }); 

// cоздание карточки
const createCard = (item) => {
  const card = new Card ({ userId, data: item,
     handleCardClick: (name, link) =>{
      popupWithImage.open(name, link);
     },
    handleDeleteClick: (id) =>{
      popupWithConfirm.open(id);
      popupWithConfirm.setAction(()=>{
        api.deleteMyCard(id)
        .then(()=>{
          card.deleteCardElement();
          popupWithConfirm.close(); 
        })
        .catch((err) => {
          console.log(`Ошибка при удалении своей карточки: ${err}`); // выведем ошибку в консоль
        });
      })
     },
     handleLikeClick: (id) =>{
      if (card.isLiked()) {
        api.deleteLike(id)
        .then((res) =>{
          card.showLikes(res.likes)
        })
        .catch((err) => {
          console.log(`Ошибка при снятии лайка на карточке: ${err}`); // выведем ошибку в консоль
        });
      } else {
        api.addLike(id)
        .then((res) =>{
          card.showLikes(res.likes)
        })
        .catch((err) => {
          console.log(`Ошибка при установке лайка на карточке: ${err}`); // выведем ошибку в консоль
        }); 
      }
     }},
     '#card-template');
  return card.createCardElement();
} 

// попап картинк
const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage.setEventListeners();

//попап новой карточки
const popupWithFormAdd = new PopupWithForm({ popupSelector: popupAdd,
  handleFormSubmit: (item) => {
    popupWithFormAdd.renderLoading(true)
    api.createNewCard(item.fieldTitle, item.fieldLink)
    .then((item) => {
      cardList.addItem(createCard(item));
      cardList.renderItems(item);
      popupWithFormAdd.close()
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`); // выведем ошибку в консоль
    })
    .finally(()=> {
      popupWithFormAdd.renderLoading(false)
    })

  }
});
popupWithFormAdd.setEventListeners();

const validatorAddCard = new FormValidator(validators, formElementPopupAdd);
validatorAddCard.enableValidation();

buttonOpenPopupAdd.addEventListener('click', () => {
  popupWithFormAdd.open();
  validatorAddCard.resetValidation();
});

//попап подтверждения удаления
const popupWithConfirm = new PopupWithConfirm({popupSelector: popupConfirm}); 
popupWithConfirm.setEventListeners();

//попап изменения профиля
const popupWithFormProfile = new PopupWithForm({popupSelector: popupProfile,
handleFormSubmit: (data) => {
  popupWithFormProfile.renderLoading(true);
  api.editUserInfo(data.fieldName, data.fieldJob)
    .then((user) => {
      userInfo.setUserInfo(user.name, user.about);
      popupWithFormProfile.close();
})

.catch((err) => {
  console.log(`Ошибка при редактировании профиля пользователя: ${err}`); // выведем ошибку в консоль
})
.finally(()=> {
  popupWithFormProfile.renderLoading(false);
})
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

const popupWithFormAvatar = new PopupWithForm({popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    popupWithFormAvatar.renderLoading(true);
    api.editUserAvatar(data.fieldAvatar)
      .then((user) => {
        userInfo.setUserAvatar(user.avatar);
        popupWithFormAvatar.close();
      })
    .catch((err) => {
        console.log(`Ошибка при изменении аватарки: ${err}`); // выведем ошибку в консоль
    })
    .finally(()=> {
      popupWithFormAvatar.renderLoading(false);
    }) 
}
});
popupWithFormAvatar.setEventListeners();

const validatorEditAvatar = new FormValidator(validators, formElementPopupAvatar);
validatorEditAvatar.enableValidation();
profileClickAvatar.addEventListener('click', () => {
  popupWithFormAvatar.open();

  validatorEditAvatar.resetValidation();
})