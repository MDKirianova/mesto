export class UserInfo {
  constructor(profileTitle, profileSubtitle){
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
  }

  getUserInfo(){
    return {
      profileTitle: this._profileTitle.textContent,
      profileSubtitle: this._profileSubtitle.textContent
    }
  }

  setUserInfo(profileTitle, profileSubtitle){
    this._profileTitle.textContent = profileTitle;
    this._profileSubtitle.textContent = profileSubtitle;
  }

}