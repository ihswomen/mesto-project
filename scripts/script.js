// Селекторы для формы аватара
const popupAvatar = document.getElementById("popup-avatar");
const avatarForm = popupAvatar.querySelector(".popup__form");
const urlLink = avatarForm.querySelector(".popup__item_el_avatar");
// Селекторы для формы профайла
const popupProfileWindow = document.getElementById("popup-profile");
const profileForm = popupProfileWindow.querySelector(".popup__form");
const inputName = profileForm.querySelector(".popup__item_el_name");
const inputNameError = profileForm.querySelector(`.${inputName.id}-error`);

// const inputName = popupProfileWindow.querySelector(".popup__item_el_name");
const inputProfession = popupProfileWindow.querySelector(
  ".popup__item_el_profession"
);

// Селекторы для формы карточки
const popupCardWindow = document.getElementById("popup-card");
const placeValue = popupCardWindow.querySelector(".popup__item_el_name");
const imageSrcValue = popupCardWindow.querySelector(
  ".popup__item_el_profession"
);
const cardForm = popupCardWindow.querySelector(".popup__form");
const popupCardImage = document.getElementById("popup-image");
// Селекторы кнопок
const addCardButton = document.querySelector(".button_type_add");
const closeButtons = document.querySelectorAll(".button_type_close");
const editButton = document.querySelector(".button_type_edit");
const saveProfileButton = popupProfileWindow.querySelector(".button_type_save");
const saveCardButton = popupCardWindow.querySelector(".button_type_save");

const caption = popupCardImage.querySelector(".popup__caption");
const imgSrc = popupCardImage.querySelector(".popup__picture");
const profile = document.querySelector(".profile");
const photo = profile.querySelector(".profile__photo");
const avatar = profile.querySelector(".profile__avatar");
const cardTemplate = document.querySelector("#card").content;
const cardList = document.querySelector(".elements__list");
const name = profile.querySelector(".profile__name");
const profession = profile.querySelector(".profile__profession");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция для первоначальной загрузки карточек
function renderInitialCards(initialCards) {
  initialCards.map((card) => {
    addNewCard(card.name, card.link);
  });
}

// Изменение полей и сохранение полей popup
function editProfileFields(nameValue, professionValue) {
  name.textContent = nameValue;
  profession.textContent = professionValue;
  closePopup(popupProfileWindow);
}

// Изменение аватарки
function editAvatarPicture(urlLink) {
  photo.src = urlLink;
  closePopup(popupAvatar);
}

// Функция создания карточки
function createCard(placeValue, imageSrcValue) {
  const newCard = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = newCard.querySelector(".elements__image");
  newCard.querySelector(".elements__text").textContent = placeValue;
  cardImage.src = imageSrcValue;
  cardImage.alt = placeValue;
  cardImage.addEventListener("click", () => {
    openPopup(popupCardImage);
    showImagePopup(imageSrcValue, placeValue, placeValue);
  });
  newCard
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
  newCard.querySelector(".elements__delete").addEventListener("click", () => {
    newCard.remove();
  });

  return newCard;
}

// Добавление новой карточки вместе с привязкой событий на кнопки like и delete
function addNewCard(placeValue, imageSrcValue) {
  const cardElement = createCard(placeValue, imageSrcValue);
  cardList.insertAdjacentElement("afterbegin", cardElement);
}

// Изменение полей и сохранение полей popup
function showImagePopup(imgValue, textValue, altTextValue) {
  caption.textContent = textValue;
  imgSrc.src = imgValue;
  imgSrc.alt = altTextValue;
}

// Функция для закрытия любого popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция для открытия любого popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      popup.classList.remove("popup_opened");
    }
  });
}

// Функция для добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__item-error_active");
}

// Функция для добавления класса с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__item_type_error");
  errorElement.classList.remove("popup__item-error_active");
  errorElement.textContent = "";
}

// Функция для проверки валидности поля
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Функция добавления обработчика всем полям формы
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  const buttonElement = formElement.querySelector(".button_type_save");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция для добавления обработчиков всем формам
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
}

// Функция для передачи сигнала кнопке о валидности формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция изменения состояния кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_type_save_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_type_save_inactive");
  }
}

renderInitialCards(initialCards);

enableValidation();

// Закрытие любого popup по нажатию клавиши escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
});

// Реализация закрытия любого popup по кнопке button
closeButtons.forEach((button) => {
  const popupMain = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popupMain);
  });
});

// Открытие popup для редактирования данных профиля
editButton.addEventListener("click", () => {
  openPopup(popupProfileWindow);
});

// Открытие popup для редкатирования данных профиля
addCardButton.addEventListener("click", () => {
  openPopup(popupCardWindow);
});

// Открытие popup для измненения аватарки
avatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// Добавляем событие на кнопку "Сохранить" в popup
profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  editProfileFields(inputName.value, inputProfession.value);
});

// Добавляем событие на кнопку "Сохранить" в popup для аватарки
popupAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editAvatarPicture(urlLink.value);
});

// Добавляем новую карточку нажатием на кнопку "Сохранить" в popup
cardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addNewCard(placeValue.value, imageSrcValue.value);
  evt.target.reset();
  closePopup(popupCardWindow);
});
