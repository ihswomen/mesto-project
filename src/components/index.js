import '../pages/index.css'
import { enableValidation, resetError } from './validate.js'
import {
  renderData,
  postNewCard,
  renderProfileData,
  deleteMyCard,
} from './api.js'
import { addNewCard, popupCardWindow, cardIdForDelete } from './card.js'
import { openPopup, closePopup, closePopupByClickOutside } from './modal.js'
import {
  editAvatarPicture,
  editProfileFields,
  popupProfileWindow,
  profile,
  popupAvatar,
  profession,
  name,
  addDataToProfile,
} from './profile.js'
import { renderInitialCards } from './data'

// Селектор для всех popup
const popupList = document.querySelectorAll('.popup')
// Селекторы для формы аватара
const avatarForm = popupAvatar.querySelector('.popup__form')
const urlLink = avatarForm.querySelector('.popup__item_el_avatar')
// Селекторы для формы профайла
const profileForm = popupProfileWindow.querySelector('.popup__form')
const inputName = profileForm.querySelector('.popup__item_el_name')
const avatar = profile.querySelector('.profile__avatar')
const inputProfession = popupProfileWindow.querySelector(
  '.popup__item_el_profession'
)

// Селекторы для формы карточки
const placeValue = popupCardWindow.querySelector('.popup__item_el_name')
const imageSrcValue = popupCardWindow.querySelector(
  '.popup__item_el_profession'
)
const cardForm = popupCardWindow.querySelector('.popup__form')
const popupQuestion = document.querySelector('#popup-agree')

// Селекторы кнопок
const addCardButton = document.querySelector('.button_type_add')
const editButton = document.querySelector('.button_type_edit')
const agreeButton = document.querySelector('.button_type_agree')

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_type_save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
}

// Первоначальная загрузка данных с сервера
Promise.all([renderData(), renderProfileData()])
  .then(([cards, userData]) => {
    renderInitialCards(cards.reverse(), addNewCard)
    addDataToProfile(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    )
  })
  .catch((error) => {
    console.log(error.message)
  })

enableValidation(validationConfig)

// Добавляем слушатель на каждый popup для закрытия при клике на overlay и по кнопке button
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopupByClickOutside(evt)
    }
    if (evt.target.classList.contains('button_type_close')) {
      closePopup(popup)
    }
  })
})

// Открытие popup для редактирования данных профиля
editButton.addEventListener('click', () => {
  inputName.value = name.textContent
  inputProfession.value = profession.textContent
  resetError(popupProfileWindow, validationConfig)
  openPopup(popupProfileWindow, validationConfig)
})

// Открытие popup для редкатирования данных профиля
addCardButton.addEventListener('click', () => {
  resetError(popupCardWindow, validationConfig)
  openPopup(popupCardWindow, validationConfig)
})

// Открытие popup для измненения аватарки
avatar.addEventListener('click', () => {
  resetError(popupAvatar, validationConfig)
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
    .then((data) => {
      addNewCard(data.name, data.link, data.likes, data.owner, data._id)
      closePopup(popupCardWindow)
      evt.target.reset()
    })
    .catch((error) => {
      console.error('Error', error)
    })
})

// Слушатель на кнопку согласия на удаление карточки
agreeButton.addEventListener('click', () => {
  deleteMyCard(cardIdForDelete)
    .then((data) => {
      cardIdForDelete.target.closest('.elements__element').remove()
      closePopup(popupQuestion)
    })
    .catch((error) => {
      console.log(error)
    })
})
