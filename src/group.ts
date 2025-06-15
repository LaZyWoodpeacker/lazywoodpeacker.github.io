import type { Mesh } from "./object";
export class Group {
  offsetX = 0;
  offsetY = 0;
  mouseOffsetX = 0;
  mouseOffsetY = 0;
  maxX = 0;
  maxY = 0;
  isDragging = false;
  left = Infinity;
  top = Infinity;
  width = 0;
  height = 0;
  collided = false;
  border: HTMLDivElement;
  objects: Mesh[];
  constructor(border: HTMLDivElement, objects: Mesh[]) {
    this.border = border;
    this.objects = objects;
    this.offsetX = border.getBoundingClientRect().left;
    this.offsetY = border.getBoundingClientRect().top;
    const cords = objects.reduce<{
      l: number[];
      r: number[];
      t: number[];
      b: number[];
    }>(
      (acc, o) => {
        acc.l.push(o.div.getBoundingClientRect().left - this.offsetX);
        acc.r.push(o.div.getBoundingClientRect().right - this.offsetX);
        acc.t.push(o.div.getBoundingClientRect().top - this.offsetY);
        acc.b.push(o.div.getBoundingClientRect().bottom - this.offsetY);
        return acc;
      },
      { l: [], r: [], t: [], b: [] }
    );
    this.left = Math.min(...cords.l);
    this.top = Math.min(...cords.t);
    this.width = Math.max(...cords.r) - this.left;
    this.height = Math.max(...cords.b) - this.top;
    this.maxX = this.border.offsetWidth - this.width;
    this.maxY = this.border.offsetHeight - this.height;
    this.objects.forEach((o) =>
      o
        .setOnClick((e) => this.onMouseDown(e))
        .setOffsetX(
          o.div.getBoundingClientRect().left - this.offsetX - this.left
        )
        .setOffsetY(o.div.getBoundingClientRect().top - this.offsetY - this.top)
    );
  }

  get bottom() {
    return this.top + this.height;
  }

  get right() {
    return this.left + this.width;
  }

  onMouseDown(e: MouseEvent) {
    e.stopPropagation();
    this.isDragging = true;
    this.mouseOffsetX = e.clientX - this.offsetX - this.left;
    this.mouseOffsetY = e.clientY - this.offsetY - this.top;
  }

  setPositionCollide(x: number, y: number, box?: Group) {
    x = x - this.offsetX - this.mouseOffsetX;
    y = y - this.offsetY - this.mouseOffsetY;
    let collideX = false;
    let collideY = false;
    if (!box) {
      this.left = Math.max(0, Math.min(x, this.maxX));
      this.top = Math.max(0, Math.min(y, this.maxY));
      this.objects.forEach((o) => {
        o.setPosition(this.left + o.offsetX, this.top + o.offsetY);
      });
      return false;
    }
    if (!(this.bottom < box.top + 1 || this.top > box.bottom - 1)) {
      if (this.left < box.left) {
        this.left = Math.max(0, Math.min(x, box.left - this.width));
        collideX = x > box.left - this.width;
      } else {
        this.left = Math.max(box.right, Math.min(x, this.maxX));
        collideX = x < box.right;
      }
    } else {
      this.left = Math.max(0, Math.min(x, this.maxX));
    }
    if (!(this.right < box.left + 1 || this.left > box.right - 1)) {
      if (this.top < box.top) {
        this.top = Math.max(0, Math.min(y, box.top - this.height));
        collideY = y > box.top - this.height;
      } else {
        this.top = Math.max(box.bottom, Math.min(y, this.maxY));
        collideY = y < box.bottom;
      }
    } else {
      this.top = Math.max(0, Math.min(y, this.maxY));
    }
    this.objects.forEach((o) => {
      o.setPosition(this.left + o.offsetX, this.top + o.offsetY);
    });
    if (collideY || collideX) return true;
    return false;
  }
}
