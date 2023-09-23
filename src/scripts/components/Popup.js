export class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this.allCloseBtns = document.querySelectorAll('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseByOverlay = this._handleCloseByOverlay.bind(this);

  }
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleCloseByOverlay);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleCloseByOverlay);
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
        this.close();
      }
    }

  _handleCloseByOverlay(evt){
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners(){
    this._popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn'))
        this.close();
      })
  }
}
