import { constants } from "./constants";
import type { Mesh } from "./object";

export default class Panel {
  select: HTMLDivElement;
  button: HTMLDivElement;
  current?: Mesh;
  buttonClick?: () => void;
  constructor() {
    this.select = document.getElementById("colorSelector") as HTMLDivElement;
    this.setButtonVisible();
    this.button = document.getElementById("btn") as HTMLDivElement;
    this.button.style.display = "none";
    this.button.addEventListener("click", () => {
      if (this.buttonClick) {
        this.buttonClick();
      }
    });
  }

  setOnButtonClick(buttonClick: () => void) {
    this.buttonClick = buttonClick;
    return this;
  }

  setButtonVisible(isShow: boolean = false) {
    if (this.button) this.button.style.display = isShow ? "flex" : "none";
  }

  onSelect(obj: Mesh) {
    this.current = obj;
    this.drawSelect();
  }

  drawSelect() {
    this.select.innerHTML = ``;
    constants.colors.forEach((color) => {
      const btn = document.createElement("div");
      btn.classList.add("colorSelectItem");
      btn.style.backgroundColor = color.fill;
      btn.style.borderColor = color.border;
      btn.addEventListener("click", () => {
        this.current?.setColor(color);
      });
      this.select.appendChild(btn);
    });
  }
}
