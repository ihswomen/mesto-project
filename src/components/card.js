import { openPopup } from './modal.js'

const popupCardWindow = document.getElementById('popup-card')
const cardTemplate = document.querySelector('#card').content
const cardList = document.querySelector('.elements__list')
export const popupCardImage = document.getElementById('popup-image')
const caption = popupCardImage.querySelector('.popup__caption')
const imgSrc = popupCardImage.querySelector('.popup__picture')

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

// Изменение полей и сохранение полей popup
function showImagePopup(imgValue, textValue, altTextValue) {
  caption.textContent = textValue
  imgSrc.src = imgValue
  imgSrc.alt = altTextValue
}

export { popupCardWindow }
