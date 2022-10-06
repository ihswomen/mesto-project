import { closePopup } from './modal.js'
import { saveProfile, renderProfileData, saveAvatar } from './api.js'

const popupProfileWindow = document.getElementById('popup-profile')
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const profession = profile.querySelector('.profile__profession')
const photo = profile.querySelector('.profile__photo')
const popupAvatar = document.getElementById('popup-avatar')
const saveButton = document.querySelector('.button_type_save')
let profileId = ''

// Получаем id текущего пользователя
renderProfileData()
  .then((res) => {
    return getProfileId(res._id)
  })
  .catch((error) => {
    console.log(error.message)
  })

function getProfileId(userId) {
  profileId = userId
}

// Добавляем данные в профайл
export const addDataToProfile = (
  nameValue,
  professionValue,
  urlLink,
  userId
) => {
  name.textContent = nameValue
  profession.textContent = professionValue
  photo.src = urlLink
  userId = profileId
}

// Изменение полей и сохранение полей popup
export function editProfileFields(nameValue, professionValue) {
  saveProfile(nameValue, professionValue)
    .then((data) => {
      saveButton.textContent = 'Сохранение...'
      renderProfileData()
        .then((res) => {
          addDataToProfile(res.name, res.about, res.avatar, res._id)
        })
        .then(() => {
          closePopup(popupProfileWindow)
        })
        .catch((error) => {
          console.log(error.message)
        })
        .finally(() => {
          saveButton.textContent = 'Сохранить'
        })
    })
    .catch((error) => {
      console.log(error.message)
    })
}

// Изменение аватарки
export function editAvatarPicture(urlLink) {
  saveAvatar(urlLink)
    .then((data) => {
      photo.src = urlLink
      closePopup(popupAvatar)
    })
    .catch((error) => {
      console.log(error)
    })
}

export {
  popupProfileWindow,
  profile,
  popupAvatar,
  profileId,
  name,
  profession,
  saveButton,
}
