/**
 *
 */
export class Modal {

  modal: HTMLElement;

  private openButton?: HTMLElement;

  private closeButton: HTMLElement;

  constructor(
    modalId: string,
    openButtonId?: string,
    closeButtonClass = "close"
  ) {
    this.modal = document.getElementById(modalId) as HTMLElement;
    if (openButtonId) {
      this.openButton = document.getElementById(openButtonId) as HTMLElement;
    }
    this.closeButton = this.modal.querySelector(
      `.${closeButtonClass}`
    ) as HTMLElement;

    this.init();
  }

  private init() {
    this.openButton?.addEventListener("click", () => {
      this.openModal();
    });

    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });

    this.modal.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape" && this.modal.classList.contains("show")) {
        this.closeModal();
      }
    });
  }

  public openModal() {
    this.modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  public closeModal() {
    this.modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  public toggleModal() {
    if (this.modal.classList.contains("show")) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

}
