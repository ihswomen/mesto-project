// Функция для первоначальной загрузки карточек
export function renderInitialCards(initialCards, addNewCard) {
  initialCards.map((card) => {
    addNewCard(card.name, card.link, card.likes, card.owner, card._id)
  })
}
