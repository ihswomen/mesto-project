import { addNewCard } from './card.js'
import { renderInitialCards } from './data.js'
import { addDataToProfile } from './profile.js'
export const saveButton = document.querySelector('.button_type_save')

// Базовая конфигурация запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
    'Content-Type': 'application/json',
  },
}

// Начальная загрузка данных с сервера
export const renderData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((res) => {
      renderInitialCards(res.reverse(), addNewCard)
    })
    .catch((error) => {
      console.log(error.message)
    })
}

// Публикация новой карточки
export const postNewCard = (placeValue, imageSrcValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeValue,
      link: imageSrcValue,
      likes: [],
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      addNewCard(data.name, data.link, data.likes, data.owner)
      renderData()
    })
    .catch((error) => {
      console.error('Error', error)
    })
}

// Получаем данные профиля с сервера
export const renderProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((res) => {
      addDataToProfile(res.name, res.about, res.avatar, res._id)
    })
    .catch((error) => {
      console.log(error.message)
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить'
    })
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
  })
    .then((res) => {
      if (res.ok) {
        saveButton.textContent = 'Сохранение...'
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      renderProfileData()
    })
    .catch((error) => {
      console.log(error)
    })
}

// Сохраняем новый аватар на сервер
export const saveAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

// Удаляем свою карточку с сервера
export const deleteMyCard = (evt) => {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-15/cards/${evt.target.parentElement.id}`,
    {
      method: 'DELETE',
      headers: config.headers,
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

// Сохраняем лайк карточки на сервер
export const cardLikeAdd = (evt) => {
  const card = evt.target.parentElement.parentElement.parentElement
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

// Удаляем лайк карточки с сервера
export const cardLikeRemove = (evt) => {
  const card = evt.target.parentElement.parentElement.parentElement
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}
