import { resetError } from './validate.js'
// Функция для открытия любого popup с формой
export function openPopup(popup, obj) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
  document.addEventListener('mousedown', closePopupByClickOutside)
  resetError(popup, obj)
}

// Функция для открытия popup с image
export function openImagePopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
  document.addEventListener('mousedown', closePopupByClickOutside)
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
    openedPopup.classList.remove('popup_opened')
  }
}

export function closePopupByClickOutside(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened')
    openedPopup.classList.remove('popup_opened')
  }
}
