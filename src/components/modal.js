// Функция для открытия любого popup с формой
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}

// Функция для закрытия любого popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
}

// Функция закрытия popup по Esc
export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// Функция закрытия любого popup по клику вне его
export function closePopupByClickOutside(evt) {
  closePopup(evt.target)
}
