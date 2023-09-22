import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor( {popupSelector} ){
    super(popupSelector); 
    this.submitButton = this._popup.querySelector(".popup__save-btn");
  }

  open(id) {
    this._id = id;
    super.open();
  }
  
  setAction(action){
    this._formSubmit = action;
  }

  setEventListeners(){
    super.setEventListeners();
    this.submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._id);
    })
  }
}


