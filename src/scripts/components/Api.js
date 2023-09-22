export class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _sendRequest(baseUrl, options){
    return fetch(baseUrl,options)
    .then(res=>{
      if (res.ok) {
        return res.json()
      } 
      
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getUserInfo() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  editUserInfo(name, about) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about})
    })
  }

  editUserAvatar(avatar){
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })

    })
  }
  
  createNewCard(name, link) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link})
    })
  }

  deleteMyCard(id){
    return this._sendRequest(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  addLike(id){
    return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  deleteLike(id){
    return this._sendRequest(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

}