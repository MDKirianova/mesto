export class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar){
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
    this._profileAvatar =document.querySelector(profileAvatar)
  }

  getUserInfo(){
    return {
      profileTitle: this._profileTitle.textContent,
      profileSubtitle: this._profileSubtitle.textContent
    }
  }

  setUserInfo(profileTitle, profileSubtitle){
    if (profileTitle && profileSubtitle){
      this._profileTitle.textContent = profileTitle;
      this._profileSubtitle.textContent = profileSubtitle;
    }
  }

  setUserAvatar(profileAvatar) {
    if (profileAvatar) {
      this._profileAvatar.src = profileAvatar;
    }
  }

}