export class Mesh {
  div: HTMLDivElement;
  offsetX = 0;
  offsetY = 0;
  color?: { fill: string; border: string };
  border: HTMLDivElement;
  onSelected?: (object: Mesh) => void;
  onClick?: (e: MouseEvent) => void;
  fill?: string;
  stroke?: string;
  constructor(id: string, border: HTMLDivElement) {
    this.border = border;
    this.div = document.getElementById(id) as HTMLDivElement;
    if (!this.div) throw new Error(`${id} not found`);
    this.div.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      if (this.onClick) this.onClick(e);
      if (this.onSelected) this.onSelected(this);
    });
  }

  setSelected(fnk: (object: Mesh) => void) {
    this.onSelected = fnk;
    return this;
  }

  setOnClick(onClickHandler: (e: MouseEvent) => void) {
    this.onClick = onClickHandler;
    return this;
  }

  setOffsetX(offset: number) {
    this.offsetX = offset;
    return this;
  }

  setOffsetY(offset: number) {
    this.offsetY = offset;
    return this;
  }

  setSize(width: number) {
    this.div.style.width = `${width}px`;
    this.div.style.height = `${width}px`;
    return this;
  }

  setPosition(x: number, y: number) {
    this.div.style.left = `${x}px`;
    this.div.style.top = `${y}px`;
    return this;
  }

  setColor(color: { fill: string; border: string }) {
    this.color = color;
    this.div.style.borderColor = color.border;
    this.div.style.backgroundColor = color.fill;
    return this;
  }
}
