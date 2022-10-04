import { closePopup } from './modal.js'
import {
  saveProfile,
  renderProfileData,
  saveAvatar,
  saveButton,
} from './api.js'

const popupProfileWindow = document.getElementById('popup-profile')
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const profession = profile.querySelector('.profile__profession')
const photo = profile.querySelector('.profile__photo')
const popupAvatar = document.getElementById('popup-avatar')
let profileId = ''

// Добавляем данные в профайл
export const addDataToProfile = (
  nameValue,
  professionValue,
  urlLink,
  owner
) => {
  name.textContent = nameValue
  profession.textContent = professionValue
  photo.src = urlLink
  profileId = owner
}

// Изменение полей и сохранение полей popup
export function editProfileFields(nameValue, professionValue) {
  saveProfile(nameValue, professionValue)
  renderProfileData().then(() => {
    closePopup(popupProfileWindow)
  })
}

// Изменение аватарки
export function editAvatarPicture(urlLink) {
  saveAvatar(urlLink)
  photo.src = urlLink
  closePopup(popupAvatar)
}

export { popupProfileWindow, profile, popupAvatar, profileId, name, profession }
