import type { ICardOptions } from "../types/card.type";

/**
 *
 */
export class Card {

  title: string;

  desc: string;

  imgPath: string;

  imgStyle?: string;

  link?: string;

  defaultImgPadding?: boolean;

  constructor({
    title, desc, imgPath, imgStyle, link, defaultImgPadding, 
  }: ICardOptions) {
    this.title = title;
    this.desc = desc;
    this.imgPath = imgPath;
    this.imgStyle = imgStyle;
    this.link = link;
    this.defaultImgPadding = defaultImgPadding ?? true;
  }

  init(parent: Element | null) {
    if (parent) {
      parent.innerHTML += `
        <section class="card" style="${
          this.defaultImgPadding && "padding-top: 48px"
        }">
          <img src="${this.imgPath}" alt="" style="${
            this.imgStyle
          }" class="card__img" />
          <div class="card__content">
            <h3 class="card__title h3">
              ${this.title}
            </h3>
            <p class="card__text">
              ${this.desc}
            </p>
            <a href="${this.link || "#none"}" class="card__link">
              <h3 class="card__link__title">Learn more</h3>
              <img src="/img/link_arrow.svg" alt="" class="card__link__arrow" />
            </a>
          </div>
        </section>`;
    } else {
      throw new Error("Parent element for cards is not defined");
    }
  }

}
