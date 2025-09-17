import { Card } from "./components/card";
import { fetchReq } from "./components/form/send-request";
import { validateForm, validateSingleField } from "./components/form/validate";
import { Modal } from "./components/modal";
import { CARDS } from "./data/card.data";

const cards = document.querySelector(".cards");

CARDS.forEach((card) => new Card(card).init(cards));

const modal = new Modal("modal", "openModalBtn");
const popup = new Modal("popup");

const form = modal.modal.querySelector("form") as HTMLFormElement;

const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  const validationResult = validateForm(form);

  if (validationResult.isValid) {
    const response = await fetchReq(true); //true or false to simulate the response from the server

    if (response) {
      popup.openModal();
      const popuMessage = popup.modal.querySelector(
        "#popup__message"
      ) as HTMLElement;
      popuMessage.textContent = response.message;
    }
  }
};

form.addEventListener("submit", handleSubmit);

/**
 *
 */
const singleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.name) {
    validateSingleField(target.name, form);
  }
};

form.addEventListener("input", singleInput);

export * from "./main";
