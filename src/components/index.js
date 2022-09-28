import '../pages/index.css'
import { enableValidation } from './validate.js'
import { renderData } from './data.js'
import { popupCardWindow, postNewCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
import {
  editAvatarPicture,
  editProfileFields,
  popupProfileWindow,
  profile,
  popupAvatar,
  renderProfileData,
} from './profile.js'

// Селекторы для формы аватара
const avatarForm = popupAvatar.querySelector('.popup__form')
const urlLink = avatarForm.querySelector('.popup__item_el_avatar')
// Селекторы для формы профайла
const profileForm = popupProfileWindow.querySelector('.popup__form')
const inputName = profileForm.querySelector('.popup__item_el_name')
const avatar = profile.querySelector('.profile__avatar')

// const inputName = popupProfileWindow.querySelector(".popup__item_el_name");
const inputProfession = popupProfileWindow.querySelector(
  '.popup__item_el_profession'
)

// Селекторы для формы карточки
const placeValue = popupCardWindow.querySelector('.popup__item_el_name')
const imageSrcValue = popupCardWindow.querySelector(
  '.popup__item_el_profession'
)
const cardForm = popupCardWindow.querySelector('.popup__form')

// Селекторы кнопок
const addCardButton = document.querySelector('.button_type_add')
const closeButtons = document.querySelectorAll('.button_type_close')
const editButton = document.querySelector('.button_type_edit')
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_type_save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
}

renderData()
renderProfileData()
enableValidation(validationConfig)

// Реализация закрытия любого popup по кнопке button
closeButtons.forEach((button) => {
  const popupMain = button.closest('.popup')
  button.addEventListener('click', function () {
    closePopup(popupMain)
  })
})

// Открытие popup для редактирования данных профиля
editButton.addEventListener('click', () => {
  openPopup(popupProfileWindow, validationConfig)
})

// Открытие popup для редкатирования данных профиля
addCardButton.addEventListener('click', () => {
  openPopup(popupCardWindow, validationConfig)
})

// Открытие popup для измненения аватарки
avatar.addEventListener('click', () => {
  openPopup(popupAvatar, validationConfig)
})

// Добавляем событие на кнопку "Сохранить" в popup
profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  editProfileFields(inputName.value, inputProfession.value)
})

// Добавляем событие на кнопку "Сохранить" в popup для аватарки
popupAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault()
  editAvatarPicture(urlLink.value)
})

// Добавляем новую карточку нажатием на кнопку "Сохранить" в popup
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  postNewCard(placeValue.value, imageSrcValue.value)
  evt.target.reset()
  closePopup(popupCardWindow)
})