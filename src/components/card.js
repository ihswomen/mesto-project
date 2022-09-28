import { openImagePopup } from './modal.js'

const popupCardWindow = document.getElementById('popup-card')
const cardTemplate = document.querySelector('#card').content
const cardList = document.querySelector('.elements__list')
export const popupCardImage = document.getElementById('popup-image')
const caption = popupCardImage.querySelector('.popup__caption')
const imgSrc = popupCardImage.querySelector('.popup__picture')

export const postNewCard = (placeValue, imageSrcValue) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
    method: 'POST',
    headers: {
      authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: placeValue,
      link: imageSrcValue,
    }),
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      addNewCard(data.name, data.link)
    })
    .catch((error) => {
      console.error('Error', error)
    })
}

// Добавление новой карточки вместе с привязкой событий на кнопки like и delete
export function addNewCard(placeValue, imageSrcValue) {
  const cardElement = createCard(placeValue, imageSrcValue)
  cardList.insertAdjacentElement('afterbegin', cardElement)
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
    openImagePopup(popupCardImage)
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

// Изменение полей и сохранение полей popup
function showImagePopup(imgValue, textValue, altTextValue) {
  caption.textContent = textValue
  imgSrc.src = imgValue
  imgSrc.alt = altTextValue
}

export { popupCardWindow }
