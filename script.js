import { initialCards } from './data/data.js'

const elementsLike = document.querySelectorAll('.elements__like')
const addCardButton = document.querySelector('.button_type_add')
const popupProfileWindow = document.getElementById('popup-profile')
const popupCardWindow = document.getElementById('popup-card')
const popupCardImage = document.getElementById('popup-image')
const buttonsClose = document.querySelectorAll('.button_type_close')
const buttonEdit = document.querySelector('.button_type_edit')
const buttonSaveProfile = popupProfileWindow.querySelector('.button_type_save')
const buttonSaveCard = popupCardWindow.querySelector('.button_type_save')
const inputName = popupProfileWindow.querySelector('.popup__item_el_name')
const inputProfession = popupProfileWindow.querySelector(
  '.popup__item_el_profession'
)
const placeValue = popupCardWindow.querySelector('.popup__item_el_name')
const imageSrcValue = popupCardWindow.querySelector(
  '.popup__item_el_profession'
)
const profile = document.querySelector('.profile')
const cardTemplate = document.querySelector('#card').content
const cardList = document.querySelector('.elements__list')

// Функция для первоначальной загрузки карточек
function initialCardsRender(data) {
  data.map((card) => {
    addNewCard(card.name, card.link)
  })
}

// Изменение полей и сохранение полей popup
function editProfileFields(nameValue, professionValue) {
  const name = profile.querySelector('.profile__name')
  const profession = profile.querySelector('.profile__profession')
  name.textContent = nameValue
  profession.textContent = professionValue
  popupProfileWindow.classList.remove('popup_opened')
}

// Добавление новой карточки вместе с привязкой событий на кнопки like и delete
function addNewCard(placeValue, imageSrcValue) {
  const cardElement = cardTemplate
    .querySelector('.elements__element')
    .cloneNode(true)
  cardElement.querySelector('.elements__text').textContent = placeValue
  cardElement.querySelector('.elements__image').src = imageSrcValue
  cardElement
    .querySelector('.elements__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active')
    })
  cardElement
    .querySelector('.elements__delete')
    .addEventListener('click', (evt) => {
      let cardItem = evt.target.closest('.elements__element')
      cardItem.remove()
    })
  cardList.insertAdjacentElement('afterbegin', cardElement)
}

// Изменение полей и сохранение полей popup
function showImagePopup(imgValue, textValue) {
  const caption = popupCardImage.querySelector('.popup__caption')
  const imgSrc = popupCardImage.querySelector('.popup__picture')
  caption.textContent = textValue
  imgSrc.src = imgValue
}

initialCardsRender(initialCards)
const cardImages = document.querySelectorAll('.elements__image')

// Реализация закрытия любого popup
buttonsClose.forEach((button) => {
  button.addEventListener('click', function () {
    let popupMain = button.closest('.popup_opened')
    popupMain.classList.remove('popup_opened')
  })
})

// Реализация открытия popup с фотографии карточки на которую кликнули
cardImages.forEach((image) => {
  image.addEventListener('click', function () {
    popupCardImage.classList.add('popup_opened')
    const text = image
      .closest('.elements__element')
      .querySelector('.elements__text').textContent
    const imgSrc = image.src
    showImagePopup(imgSrc, text)
  })
})

// Открытие popup для редактирования данных профиля
buttonEdit.addEventListener('click', () => {
  popupProfileWindow.classList.add('popup_opened')
})

// Открытие popup для редкатирования данных профиля
addCardButton.addEventListener('click', () => {
  popupCardWindow.classList.add('popup_opened')
})

// Добавляем событие на кнопку "Сохранить" в popup
buttonSaveProfile.addEventListener('click', function (evt) {
  evt.preventDefault()
  editProfileFields(inputName.value, inputProfession.value)
})

// Добавляем новую карточку нажатием на кнопку "Сохранить" в popup
buttonSaveCard.addEventListener('click', function (evt) {
  evt.preventDefault()
  addNewCard(placeValue.value, imageSrcValue.value)
  placeValue.value = ''
  imageSrcValue.value = ''
  popupCardWindow.classList.remove('popup_opened')
})

// Реализация клика по like иконке
elementsLike.forEach((element) => {
  element.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active')
  })
})
