import { addNewCard } from './card.js'

export const renderData = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
    headers: {
      authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(res.status)
    })
    .then((res) => {
      renderInitialCards(res, addNewCard)
    })
}

// Функция для первоначальной загрузки карточек
export function renderInitialCards(initialCards, addNewCard) {
  initialCards.map((card) => {
    addNewCard(card.name, card.link)
  })
}
