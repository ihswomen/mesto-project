import { v4 as uuidv4 } from 'uuid'
// Базовая конфигурация запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
    'Content-Type': 'application/json',
  },
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

// Начальная загрузка данных с сервера
export const renderData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse)
}

// Публикация новой карточки
export const postNewCard = (placeValue, imageSrcValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      _id: uuidv4(),
      name: placeValue,
      link: imageSrcValue,
      likes: [],
    }),
  }).then(checkResponse)
}

// Получаем данные профиля с сервера
export const renderProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse)
}

// Сохраняем измененные данные профиля на сервер
export const saveProfile = (nameValue, professionValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: professionValue,
    }),
  }).then(checkResponse)
}

// Сохраняем новый аватар на сервер
export const saveAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then(checkResponse)
}

// Удаляем свою карточку с сервера
export const deleteMyCard = (evt) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-15/cards/${evt.target.parentElement.id}`,
    {
      method: 'DELETE',
      headers: config.headers,
    }
  ).then(checkResponse)
}

// Сохраняем лайк карточки на сервер
export const cardLikeAdd = (evt) => {
  const card = evt.target.parentElement.parentElement.parentElement
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse)
}

// Удаляем лайк карточки с сервера
export const cardLikeRemove = (evt) => {
  const card = evt.target.parentElement.parentElement.parentElement
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse)
}
