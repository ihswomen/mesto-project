const popupProfileWindow = document.getElementById('popup-profile')
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const profession = profile.querySelector('.profile__profession')
const photo = profile.querySelector('.profile__photo')
const popupAvatar = document.getElementById('popup-avatar')

export const renderProfileData = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
    headers: {
      authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(res.status)
    })
    .then((res) => {
      addDataToProfile(res.name, res.about, res.avatar)
    })
}

const addDataToProfile = (nameValue, professionValue, urlLink) => {
  name.textContent = nameValue
  profession.textContent = professionValue
  photo.src = urlLink
}

// Изменение полей и сохранение полей popup
export function editProfileFields(nameValue, professionValue) {
  name.textContent = nameValue
  profession.textContent = professionValue
  closePopup(popupProfileWindow)
}

// Изменение аватарки
export function editAvatarPicture(urlLink) {
  photo.src = urlLink
  closePopup(popupAvatar)
}

export { popupProfileWindow, profile, popupAvatar }
