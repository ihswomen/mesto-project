// Функция для добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(obj['inputErrorClass'])
  errorElement.textContent = errorMessage
  errorElement.classList.add(obj['errorClass'])
}

// Функция для добавления класса с ошибкой
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(obj['inputErrorClass'])
  errorElement.classList.remove(obj['errorClass'])
  errorElement.textContent = ''
}

// Функция для проверки валидности поля
function isValid(formElement, inputElement, obj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    )
  } else {
    hideInputError(formElement, inputElement, obj)
  }
}

// Функция добавления обработчика всем полям формы
function setEventListener(formElement, obj) {
  const inputList = Array.from(
    formElement.querySelectorAll(obj['inputSelector'])
  )
  const buttonElement = formElement.querySelector(obj['submitButtonSelector'])
  toggleButtonState(inputList, buttonElement, obj)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj)
      toggleButtonState(inputList, buttonElement, obj)
    })
  })
}

// Функция для передачи сигнала кнопке о валидности формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Функция изменения состояния кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(obj['inactiveButtonClass'])
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(obj['inactiveButtonClass'])
  }
}

// Функция для удаления ошибок с форм при закрытии popup
export function resetError(formElement, obj) {
  const inputList = Array.from(
    formElement.querySelectorAll(obj['inputSelector'])
  )
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, obj)
  )
  const buttonElement = formElement.querySelector(obj['submitButtonSelector'])
  toggleButtonState(inputList, buttonElement, obj)
}

// Функция для добавления обработчиков всем формам
export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj['formSelector']))
  formList.forEach((formElement) => {
    setEventListener(formElement, obj)
  })
}
