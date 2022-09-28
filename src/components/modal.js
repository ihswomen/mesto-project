// Функция для открытия любого popup
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened')
    }
  })
}

// Функция для закрытия любого popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
}
