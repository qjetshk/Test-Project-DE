/**
 *
 */
export const clearErrors = (form: HTMLFormElement) => {
  const errorInputs = form.querySelectorAll(".input__error");
  errorInputs.forEach((input) => {
    input.classList.remove("input__error");
  });

  const errorLabels = form.querySelectorAll(".modal__label.label__error");
  errorLabels.forEach((label) => {
    label.classList.remove("label__error");

    const errorSpans = label.querySelectorAll(".error__message");
    errorSpans.forEach((span) => span.remove());
  });
};

/**
 *
 */
export const clearFieldError = (fieldName: string, form: HTMLFormElement) => {
  const input = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
  if (input) {
    input.classList.remove("input__error");

    const label =
      input.closest(".modal__label") ||
      input.previousElementSibling?.closest(".modal__label") ||
      input.nextElementSibling?.closest(".modal__label");

    if (label && label.classList.contains("modal__label")) {
      label.classList.remove("label__error");
      const errorSpan = label.querySelector(".error__message");
      if (errorSpan) {
        errorSpan.remove();
      }
    }
  }
};

/**
 *
 */
export const displayErrors = (
  errors: Record<string, string>,
  form: HTMLFormElement
) => {
  Object.entries(errors).forEach(([ fieldName, errorMessage ]) => {
    const input = form.querySelector(`[name="${fieldName}"]`) as
      | HTMLInputElement
      | HTMLTextAreaElement;

    if (input) {
      input.classList.add("input__error");

      const label =
        input.closest(".modal__label") ||
        input.previousElementSibling?.closest(".modal__label") ||
        input.nextElementSibling?.closest(".modal__label");

      if (label && label.classList.contains("modal__label")) {
        label.classList.add("label__error");

        let errorSpan = label.querySelector(".error__message") as HTMLElement;

        if (!errorSpan) {
          errorSpan = document.createElement("span");
          errorSpan.className = "error__message";
          label.appendChild(errorSpan);
        }

        errorSpan.textContent = errorMessage;
      }
    }
  });
};

/**
 *
 */
export const validateForm = (form: HTMLFormElement) => {
  const formData: Record<string, string> = {};
  const formErrors: Record<string, string> = {};
  const emailRegex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

  const inputs = form.querySelectorAll("input, textarea") as NodeListOf<
    HTMLInputElement | HTMLTextAreaElement
  >;

  clearErrors(form);

  inputs.forEach((input) => {
    if (input.type !== "submit" && input.name) {
      formData[input.name] = input.value.trim();
    }
  });

  let isValid = true;

  for (const [ fieldName, value ] of Object.entries(formData)) {
    if (!value) {
      formErrors[fieldName] = `${fieldName} is required`;
      isValid = false;
    }
  }

  if (formData.email) {
    emailRegex.lastIndex = 0;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "please enter a valid email address";
      isValid = false;
    }
  }

  if (Object.keys(formErrors).length > 0) {
    displayErrors(formErrors, form);
  } else {
    clearErrors(form);
  }

  return {
    isValid,
    data: formData,
    errors: formErrors,
  };
};

/**
 *
 */
export const validateSingleField = (
  fieldName: string,
  form: HTMLFormElement
) => {
  const input = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
  const value = input.value.trim();
  const errors: Record<string, string> = {};

  clearFieldError(fieldName, form);

  if (!value) {
    errors[fieldName] = `${fieldName} is required`;
  } else if (fieldName === "email") {
    const emailRegex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    emailRegex.lastIndex = 0;
    if (!emailRegex.test(value)) {
      errors[fieldName] = "please enter a valid email address";
    }
  }

  if (Object.keys(errors).length > 0) {
    displayErrors(errors, form);
    return false;
  }

  return true;
};
