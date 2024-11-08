class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formEl = formEl;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement, settings) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._inputList, buttonElement, {
      _inactiveButtonClass: this._inactiveButtonClass,
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._formEl, {
          _inputErrorClass: this._inputErrorClass,
          _errorClass: this._errorClass,
        });
        this._toggleButtonState(this._inputList, buttonElement, {
          _inactiveButtonClass: this._inactiveButtonClass,
        });
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
