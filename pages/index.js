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

let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__name-input');
let jobInput = document.querySelector('.popup__job-input');
let popupSaveBtn = document.querySelector('.popup__save-btn');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 