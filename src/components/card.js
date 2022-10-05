import { closePopup, openPopup } from './modal.js'
import { profileId } from './profile.js'
import { deleteMyCard, cardLikeAdd, cardLikeRemove } from './api.js'

const popupCardWindow = document.querySelector('#popup-card')
const popupQuestion = document.querySelector('#popup-agree')
const cardTemplate = document.querySelector('#card').content
const cardList = document.querySelector('.elements__list')
export const popupCardImage = document.querySelector('#popup-image')
const caption = popupCardImage.querySelector('.popup__caption')
const imgSrc = popupCardImage.querySelector('.popup__picture')
const agreeButton = document.querySelector('.button_type_agree')

// Добавление новой карточки вместе с привязкой событий на кнопки like и delete
export function addNewCard(placeValue, imageSrcValue, likes, owner, cardId) {
  const cardElement = createCard(
    placeValue,
    imageSrcValue,
    likes,
    owner,
    cardId
  )
  cardList.insertAdjacentElement('afterbegin', cardElement)
}

// Функция создания карточки
function createCard(placeValue, imageSrcValue, likes, owner, cardId) {
  const newCard = cardTemplate
    .querySelector('.elements__element')
    .cloneNode(true)
  const cardImage = newCard.querySelector('.elements__image')
  const cardLikesNumber = newCard.querySelector('.elements__number')
  const cardLike = newCard.querySelector('.elements__like')
  newCard.querySelector('.elements__text').textContent = placeValue
  newCard.id = cardId
  cardImage.src = imageSrcValue
  cardImage.alt = placeValue
  cardImage.addEventListener('click', () => {
    openPopup(popupCardImage)
    showImagePopup(imageSrcValue, placeValue, placeValue)
  })
  cardLikesNumber.textContent = likes.length ? likes.length : 0

  likes.forEach((like) => {
    if (like._id == profileId) {
      cardLike.classList.add('elements__like_active')
    }
  })

  newCard.querySelector('.elements__like').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('elements__like_active')) {
      cardLikeRemove(evt)
        .then((data) => {
          cardLikesNumber.textContent = data.likes.length
          evt.target.classList.toggle('elements__like_active')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      cardLikeAdd(evt)
        .then((data) => {
          console.log(data.likes)
          cardLikesNumber.textContent = data.likes.length
          evt.target.classList.toggle('elements__like_active')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
  if (owner._id !== profileId) {
    newCard
      .querySelector('.elements__delete')
      .classList.add('elements__delete_show_remove')
  }
  newCard
    .querySelector('.elements__delete')
    .addEventListener('click', (evt) => {
      openPopup(popupQuestion)
      agreeButton.addEventListener('click', () => {
        deleteMyCard(evt)
          .then((data) => {
            console.log(data)
            newCard.remove()
            closePopup(popupQuestion)
          })
          .catch((error) => {
            console.log(error)
          })
      })
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
