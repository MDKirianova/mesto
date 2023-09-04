import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupZoomText = this._popup.querySelector('.popup-zoom__text');
    this._popupZoomImage = this._popup.querySelector('.popup-zoom__image');
  }

  open(name, link){
    this._popupZoomText.textContent = name;
    this._popupZoomImage.src = link;
    this._popupZoomImage.alt = name;
    super.open();

  }

  setEventListeners(){
    super.setEventListeners();
  }
}