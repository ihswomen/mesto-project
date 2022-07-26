const addCardButton = document.querySelector('.button_type_add')
const popupProfileWindow = document.getElementById('popup-profile')
const profileForm = popupProfileWindow.querySelector('.popup__form')
const popupCardWindow = document.getElementById('popup-card')
const cardForm = popupCardWindow.querySelector('.popup__form')
const popupCardImage = document.getElementById('popup-image')
const closeButtons = document.querySelectorAll('.button_type_close')
const editButton = document.querySelector('.button_type_edit')
const saveProfileButton = popupProfileWindow.querySelector('.button_type_save')
const saveCardButton = popupCardWindow.querySelector('.button_type_save')
const inputName = popupProfileWindow.querySelector('.popup__item_el_name')
const inputProfession = popupProfileWindow.querySelector(
  '.popup__item_el_profession'
)
const placeValue = popupCardWindow.querySelector('.popup__item_el_name')
const imageSrcValue = popupCardWindow.querySelector(
  '.popup__item_el_profession'
)
const caption = popupCardImage.querySelector('.popup__caption')
const imgSrc = popupCardImage.querySelector('.popup__picture')
const profile = document.querySelector('.profile')
const cardTemplate = document.querySelector('#card').content
const cardList = document.querySelector('.elements__list')
const name = profile.querySelector('.profile__name')
const profession = profile.querySelector('.profile__profession')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

// Функция для первоначальной загрузки карточек
function renderInitialCards(initialCards) {
  initialCards.map((card) => {
    addNewCard(card.name, card.link)
  })
}

// Изменение полей и сохранение полей popup
function editProfileFields(nameValue, professionValue) {
  name.textContent = nameValue
  profession.textContent = professionValue
  closePopup(popupProfileWindow)
}

// Функция создания карточки
function createCard(placeValue, imageSrcValue) {
  const newCard = cardTemplate
    .querySelector('.elements__element')
    .cloneNode(true)
  const cardImage = newCard.querySelector('.elements__image')
  newCard.querySelector('.elements__text').textContent = placeValue
  cardImage.src = imageSrcValue
  cardImage.alt = placeValue
  cardImage.addEventListener('click', () => {
    openPopup(popupCardImage)
    showImagePopup(imageSrcValue, placeValue, placeValue)
  })
  newCard
    .querySelector('.elements__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active')
    })
  newCard.querySelector('.elements__delete').addEventListener('click', () => {
    newCard.remove()
  })

  return newCard
}

// Добавление новой карточки вместе с привязкой событий на кнопки like и delete
function addNewCard(placeValue, imageSrcValue) {
  const cardElement = createCard(placeValue, imageSrcValue)
  cardList.insertAdjacentElement('afterbegin', cardElement)
}

// Изменение полей и сохранение полей popup
function showImagePopup(imgValue, textValue, altTextValue) {
  caption.textContent = textValue
  imgSrc.src = imgValue
  imgSrc.alt = altTextValue
}

// Функция для закрытия любого popup
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// Функция для открытия любого popup
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

renderInitialCards(initialCards)

// Реализация закрытия любого popup
closeButtons.forEach((button) => {
  const popupMain = button.closest('.popup')
  button.addEventListener('click', function () {
    closePopup(popupMain)
  })
})

// Открытие popup для редактирования данных профиля
editButton.addEventListener('click', () => {
  openPopup(popupProfileWindow)
})

// Открытие popup для редкатирования данных профиля
addCardButton.addEventListener('click', () => {
  openPopup(popupCardWindow)
})

// Добавляем событие на кнопку "Сохранить" в popup
profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  editProfileFields(inputName.value, inputProfession.value)
})

// Добавляем новую карточку нажатием на кнопку "Сохранить" в popup
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  addNewCard(placeValue.value, imageSrcValue.value)
  evt.target.reset()
  closePopup(popupCardWindow)
})
