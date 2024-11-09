class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (this._hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(settings.inactiveButtonClass);
      submitButtonSelector.disabled = true;
    } else {
      submitButtonSelector.classList.remove(settings.inactiveButtonClass);
      submitButtonSelector.disabled = false;
      console.log(buttonElement);
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
